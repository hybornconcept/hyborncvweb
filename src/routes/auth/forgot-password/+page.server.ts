import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	submit: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email || typeof email !== 'string') {
			return fail(400, {
				error: 'Please enter a valid email address.'
			});
		}

		try {
			// Because you have configured SMTP inside PocketBase, we can securely 
			// use the native PocketBase password reset system! This avoids API rule
			// blocks (like List/View protections) and keeps everything native.
			
			await locals.pb.collection('users').requestPasswordReset(email);

			return {
				success: true
			};
		} catch (error: any) {
			console.error('Password reset action error:', error?.response || error);
			// We return success even on fail to prevent email enumeration,
			// or you can return a fail state if you prefer showing errors.
			return {
				success: true
			};
		}
	}
} satisfies Actions;
