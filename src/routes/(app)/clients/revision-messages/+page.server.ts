import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const user = locals.user;

	const hour = new Date().getHours();
	let greeting = 'Good Evening';
	if (hour < 12) greeting = 'Good Morning';
	else if (hour < 17) greeting = 'Good Afternoon';

	// Fetch open revision requests for this user
	const rawRevisions = await pb.collection('revisions').getFullList({
		filter: `user = "${user?.id}"`,
		sort: '-created',
		expand: 'order'
	});

	const revisions = rawRevisions.map((r) => {
		const order = r.expand?.order;
		return {
			id: r.id,
			orderId: order ? `#ORD-${order.id.slice(0, 6).toUpperCase()}` : '—',
			service: order?.Package || '—',
			notes: r.notes || '',
			status: r.status || 'Open',
			date: new Date(r.created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
		};
	});

	return {
		pageInfo: {
			greeting: `${greeting}, ${user?.fullname || user?.name || 'there'}`,
			subtext: 'Message us or let us know if you need any corrections to your documents.'
		},
		revisions,
		user
	};
};

export const actions: Actions = {
	// Client submits a new revision request
	create: async ({ request, locals }) => {
		const pb = locals.pb;
		const user = locals.user;

		if (!user?.id) return fail(401, { message: 'Unauthorized' });

		const data = await request.formData();
		const orderId = data.get('order_id') as string;
		const notes = data.get('notes') as string;

		if (!orderId || !notes) {
			return fail(400, { message: 'Order and notes are required.' });
		}

		try {
			await pb.collection('revisions').create({
				order: orderId,
				user: user.id,
				notes,
				status: 'Open'
			});
			return { success: true };
		} catch (err) {
			console.error('Revision create error:', err);
			return fail(500, { message: 'Failed to submit revision request.' });
		}
	}
};
