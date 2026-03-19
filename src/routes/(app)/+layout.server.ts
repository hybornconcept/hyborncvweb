import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// Protect all routes under (app)/ — redirect to login if not authenticated
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/auth');
	}

	const user = locals.user;

	// Role-based protection: don't let clients hit /admin
	if (url.pathname.startsWith('/admin') && user?.role !== 'admin') {
		throw redirect(303, '/clients');
	}

	let hasNotifications = false;
	try {
		if (user?.role === 'admin') {
			const revs = await locals.pb.collection('revisions').getList(1, 1, { filter: 'status = "Open"', requestKey: null });
			const users = await locals.pb.collection('users').getList(1, 1, { filter: `created >= "${new Date(Date.now() - 24*60*60*1000).toISOString().replace('T', ' ')}" && role = "client"`, requestKey: null });
			hasNotifications = revs.totalItems > 0 || users.totalItems > 0;
		} else if (user?.role === 'client') {
			const revs = await locals.pb.collection('revisions').getList(1, 1, { filter: `user = "${user?.id}" && status = "Resolved"`, requestKey: null });
			hasNotifications = revs.totalItems > 0;
		}
	} catch (e) {
		console.error('Notification check failed', e);
	}

	// Pass the user data down to all child pages
	return {
		user,
		hasNotifications
	};
};
