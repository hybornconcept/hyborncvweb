import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema, registerSchema } from '$lib/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// If the user is already logged in, redirect them away from auth
	if (locals.pb.authStore.isValid) {
		const userRole = locals.user?.role;
		if (userRole === 'admin') {
			throw redirect(303, '/admin');
		}
		throw redirect(303, '/clients');
	}

	const loginForm = await superValidate(zod(loginSchema));
	const registerForm = await superValidate(zod(registerSchema));

	return {
		loginForm,
		registerForm
	};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const loginForm = await superValidate(request, zod(loginSchema));

		if (!loginForm.valid) {
			return fail(400, { loginForm });
		}

		let role = 'client';
		try {
			const authData = await locals.pb
				.collection('users')
				.authWithPassword(loginForm.data.email, loginForm.data.password);
			role = authData.record?.role || 'client';
		} catch (err) {
			console.error('Error logging in:', err);
			return fail(400, {
				loginForm,
				error: 'Invalid email or password'
			});
		}

		if (role === 'admin') {
			throw redirect(303, '/admin');
		}
		throw redirect(303, '/clients');
	},

	register: async ({ request, locals }) => {
		const registerForm = await superValidate(request, zod(registerSchema));

		if (!registerForm.valid) {
			return fail(400, { registerForm });
		}

		let role = 'client';
		try {
			const referralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

			// Field names match your PocketBase users collection
			const data = {
				fullname: registerForm.data.fullname,
				email: registerForm.data.email,
				emailVisibility: true,
				password: registerForm.data.password,
				passwordConfirm: registerForm.data.passwordConfirm,
				location: registerForm.data.location,
				phone: registerForm.data.phone,
				role: 'client',
				referral_code: referralCode,
				wallet_balance: 0
			};

			await locals.pb.collection('users').create(data);

			// Send a verification email (non-blocking — fire and forget)
			locals.pb
				.collection('users')
				.requestVerification(registerForm.data.email)
				.catch(() => {});

			// Log the user in immediately after registration
			const authData = await locals.pb
				.collection('users')
				.authWithPassword(registerForm.data.email, registerForm.data.password);
			role = authData.record?.role || 'client';
		} catch (err: any) {
			console.error('Error registering:', err?.response || err);
			return fail(400, {
				registerForm,
				error: 'Failed to create account. The email may already be in use.'
			});
		}

		if (role === 'admin') {
			throw redirect(303, '/admin');
		}
		throw redirect(303, '/clients');
	}
};
