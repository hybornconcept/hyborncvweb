import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	submit: async ({ request, locals }) => {
		const data = await request.formData();
		const password = data.get('password');
		const passwordConfirm = data.get('confirmPassword');
		const token = data.get('token');

		if (!token || typeof token !== 'string') {
			return fail(400, {
				error: 'Invalid or missing reset token.'
			});
		}

		if (!password || typeof password !== 'string' || password.length < 8) {
			return fail(400, {
				error: 'Password must be at least 8 characters long.'
			});
		}

		if (password !== passwordConfirm) {
			return fail(400, {
				error: 'Passwords do not match.'
			});
		}

		try {
			// Find the user with this token
			let user;
			try {
				user = await locals.pb.collection('users').getFirstListItem(`reset_token = "${token}"`);
			} catch (err) {
				return fail(400, { error: 'Invalid or expired reset token.' });
			}

			// Check if expired
			const now = new Date();
			const expiry = new Date(user.reset_token_expiry);
			if (now > expiry) {
				return fail(400, { error: 'Reset token has expired. Please request a new link.' });
			}

			// Update the password in PocketBase
			await locals.pb.collection('users').update(user.id, {
				password,
				passwordConfirm,
				reset_token: '', // Clear the token
				reset_token_expiry: null
			});

			return {
				success: true
			};
		} catch (error: any) {
			console.error('Password reset action error:', error);
			return fail(500, {
				error: error.message || 'Failed to update your password. Please try again later.'
			});
		}
	}
} satisfies Actions;
