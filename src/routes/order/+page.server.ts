import { superValidate } from 'sveltekit-superforms/server';
import { orderSchema } from '$lib/schema';
import { additional } from '$lib';
import { packageOptions } from '$lib/index';
import type { PageServerLoad, Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const form = await superValidate(zod(orderSchema), { errors: false });

	// Set default values without triggering validation errors
	form.data.services = {};

	return { form, user: locals.user ?? null };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const pb = locals.pb;
		const user = locals.user;

		// Clone the request BEFORE superValidate consumes the body stream.
		const form = await superValidate(request, zod(orderSchema));

		if (!form.valid) {
			form.data.documents = []; // Clear files for serialization
			return fail(400, { form });
		}

		// Extract files safely before they get cleared later for serialization.
		// When dataType: 'json' is used, superValidate automatically parses the Bracket-notation
		// keys (like 'documents[0]', 'documents[1]') back into a clean File array in form.data.documents.
		const extractedFiles = form.data.documents && form.data.documents.length > 0 
			? form.data.documents 
			: [];

		try {
			// 1. Prepare additional services with labels and prices for JSON storage
			const selectedServices = Object.entries(form.data.services || {})
				.filter(([_, checked]) => checked)
				.map(([id]) => {
					const service = additional.find((s) => s.id === id);
					return {
						id,
						label: service?.label || id,
						price: service?.price || 0
					};
				});

			// 2. Prepare FormData for PocketBase
			const pbData = new FormData();
			pbData.append('Job_Title', form.data.jobtitle);
			pbData.append('Career_Level', form.data.careerlevel);
			pbData.append('Package', form.data.package);
			pbData.append('Additional_Services', JSON.stringify(selectedServices));

			// Format deadline for PocketBase
			const deadline = form.data.deadline;
			pbData.append('Deadline', deadline.includes('T') ? deadline : `${deadline} 12:00:00.000Z`);

			pbData.append('fullname', form.data.fullname);
			pbData.append('phone', form.data.phone);
			pbData.append('Additional_comments', form.data.comments || '');
			pbData.append('job_link', form.data.joblink || '');

			// ADD new fields
			if (user?.id) {
				pbData.append('user', user.id);
			}

			const pkgPrice = packageOptions.find((p) => p.value === form.data.package)?.price || 0;
			const addonsPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
			pbData.append('amount', String(pkgPrice + addonsPrice));
			pbData.append('order_status', 'Pending');
			pbData.append('payment_status', 'Unpaid');
			pbData.append('payment_method', 'Bank Transfer');

			// 3. Handle multiple file uploads
			for (const file of extractedFiles) {
				if (file instanceof File && file.size > 0) {
					pbData.append('documents', file);
				}
			}

			// 4. Create the record in PocketBase
			const record = await pb.collection('orders').create(pbData);

			// Referral Reward Logic
			if (user?.id && user.referred_by) {
				try {
					// Check if there is a pending referral where this user is the referee
					const referrals = await pb.collection('referrals').getFullList({
						filter: `referee = "${user.id}" && status = "Pending"`
					});

					if (referrals.length > 0) {
						const referral = referrals[0];
						const rewardAmount = 5000; // Customizable reward
						
						// Mark referral as completed
						await pb.collection('referrals').update(referral.id, {
							status: 'Completed',
							reward_amount: rewardAmount
						});

						// Update referrer's wallet balance
						const referrerId = user.referred_by;
						const referrer = await pb.collection('users').getOne(referrerId);
						await pb.collection('users').update(referrerId, {
							wallet_balance: (referrer.wallet_balance || 0) + rewardAmount
						});
					}
				} catch (err) {
					console.error('Failed to process referral reward:', err);
					// Proceed without failing the order creation
				}
			}

			form.data.documents = []; // Clear files for serialization
			return {
				form,
				success: true,
				record
			};
		} catch (error) {
			console.error('Expert PB Submission Error:', error);
			form.data.documents = []; // Clear files for serialization
			return fail(500, {
				form,
				error:
					error instanceof Error
						? error.message
						: 'An unexpected error occurred during order creation'
			});
		}
	}
} satisfies Actions;
