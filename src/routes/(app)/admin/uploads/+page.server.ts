import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const user = locals.user;

	// Fetch all client users for the "Select User" dropdown
	const clientUsers = await pb.collection('users').getFullList({
		filter: 'role = "client"',
		sort: 'fullname'
	});

	// Fetch all orders so admin can pick user+order combos
	const allOrders = await pb.collection('orders').getFullList({
		sort: '-created',
		expand: 'user'
	});

	// Build a list: "Client Name — Order ID" for the dropdown
	const userOrderOptions = allOrders.map((o) => {
		const clientName = o.expand?.user?.fullname || o.fullname || o.expand?.user?.email || 'Unknown';
		return {
			orderId: o.id,
			userId: o.user || o.expand?.user?.id || '',
			label: `${clientName} — #ORD-${o.id.slice(0, 6).toUpperCase()}`,
			orderStatus: o.order_status || 'Pending'
		};
	});

	// Fetch revision requests for the bottom table (with expand)
	const rawRevisions = await pb.collection('revisions').getFullList({
		sort: '-created',
		expand: 'order,user'
	});

	const revisions = rawRevisions.map((r) => {
		const order = r.expand?.order;
		const client = r.expand?.user;
		return {
			id: r.id,
			orderId: order ? `ORD-${order.id.slice(0, 6).toUpperCase()}` : '—',
			client: client?.fullname || client?.email || 'Unknown',
			notes: r.notes || '',
			service: order?.Package || '—',
			status: r.status || 'Open',
			date: new Date(r.created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
		};
	});

	return { user, userOrderOptions, revisions };
};

export const actions: Actions = {
	// Admin posts a delivery (uploads files for an order)
	deliver: async ({ request, locals }) => {
		const pb = locals.pb;

		const data = await request.formData();
		const orderId = data.get('order_id') as string;
		const userId = data.get('user_id') as string;
		const message = data.get('message') as string;
		const tag = data.get('tag') as string;
		const files = data.getAll('files') as File[];

		if (!orderId || !userId) {
			return fail(400, { message: 'Order and user are required.' });
		}

		if (!files || files.length === 0 || (files.length === 1 && files[0].size === 0)) {
			return fail(400, { message: 'Please attach at least one file.' });
		}

		try {
			const formData = new FormData();
			formData.set('order', orderId);
			formData.set('user', userId);
			formData.set('message', message || '');
			formData.set('tag', tag || 'Delivered');
			files.forEach((f) => formData.append('files', f));

			await pb.collection('deliveries').create(formData);

			// Update the order status to match the delivery tag
			if (tag === 'Delivered' || tag === 'Completed') {
				await pb.collection('orders').update(orderId, { order_status: tag });
			}

			return { success: true };
		} catch (err) {
			console.error('Delivery create error:', err);
			return fail(500, { message: 'Failed to post delivery.' });
		}
	},

	// Admin resolves a revision request
	resolveRevision: async ({ request, locals }) => {
		const pb = locals.pb;
		const data = await request.formData();
		const revisionId = data.get('revision_id') as string;

		if (!revisionId) return fail(400, { message: 'Revision ID missing.' });

		try {
			await pb.collection('revisions').update(revisionId, { status: 'Resolved' });
			return { success: true };
		} catch (err) {
			console.error('Revision resolve error:', err);
			return fail(500, { message: 'Failed to resolve revision.' });
		}
	}
};