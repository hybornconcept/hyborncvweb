import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, cookies }) => {
	// Clear the PocketBase auth store
	locals.pb.authStore.clear();
	locals.user = undefined;

	// Delete the auth cookie — try both the default PocketBase name and common variants
	cookies.delete('pb_auth', { path: '/' });

	// Redirect back to the login page
	throw redirect(303, '/auth');
};
