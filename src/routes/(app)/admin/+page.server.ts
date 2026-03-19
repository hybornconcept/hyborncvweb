import type { PageServerLoad, Actions } from './$types';
import { packageOptions } from '$lib/index';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const user = locals.user;

	// Fetch all orders for aggregation
	const allOrders = await pb.collection('orders').getFullList({ sort: '-created' });

	// Count by order_status
	const total = allOrders.length;
	const active = allOrders.filter((o) => o.order_status === 'In Progress').length;
	const completed = allOrders.filter((o) => o.order_status === 'Completed').length;
	const pending = allOrders.filter((o) => o.order_status === 'Pending').length;

	// Count total registered clients
	const clientsResult = await pb.collection('users').getList(1, 1, {
		filter: 'role = "client"'
	});
	const totalClients = clientsResult.totalItems;

	// Count new clients in the last 7 days
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
	const sevenDaysAgoStr = sevenDaysAgo.toISOString().replace('T', ' ');
	const newClientsResult = await pb.collection('users').getList(1, 1, {
		filter: `role = "client" && created >= "${sevenDaysAgoStr}"`
	});
	const newClients = newClientsResult.totalItems;

	const kpiGroups = [
		{
			title: 'Order Tracking',
			metrics: [
				{
					label: 'Total Orders',
					value: String(total),
					iconName: 'ShoppingBag',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'all time'
				},
				{
					label: 'Active Orders',
					value: String(active),
					iconName: 'Clock',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'being worked on'
				}
			]
		},
		{
			title: 'Pipeline',
			metrics: [
				{
					label: 'Completed Orders',
					value: String(completed),
					iconName: 'CheckCircle2',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'successfully delivered'
				},
				{
					label: 'Pending Orders',
					value: String(pending),
					iconName: 'AlertCircle',
					trend: '',
					trendColor: 'text-rose-600 bg-rose-50/80',
					subtext: 'not yet assigned'
				}
			]
		},
		{
			title: 'Users',
			metrics: [
				{
					label: 'Total Clients',
					value: String(totalClients),
					iconName: 'UserPlus',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'registered'
				},
				{
					label: 'New Clients',
					value: String(newClients),
					iconName: 'UserPlus',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'this week'
				}
			]
		}
	];

	// Map recent orders for the table display (latest 20)
	const recentRaw = allOrders.slice(0, 20);
	const orders = recentRaw.map((o) => {
		const statusColorMap: Record<string, string> = {
			Completed: 'text-blue-600 bg-blue-50 border-blue-100',
			'In Progress': 'text-gray-600 bg-gray-50 border-gray-100',
			Revision: 'text-purple-600 bg-purple-50 border-purple-100',
			Pending: 'text-gray-600 bg-gray-50 border-gray-100'
		};
		const paymentColorMap: Record<string, string> = {
			Paid: 'text-emerald-600 bg-emerald-50 border-emerald-100',
			Unpaid: 'text-amber-600 bg-amber-50 border-amber-100',
			Failed: 'text-rose-600 bg-rose-50 border-rose-100'
		};
		const orderStatus = o.order_status || 'Pending';
		const paymentStatus = o.payment_status || 'Unpaid';

		// Resolve service label from Package
		const packageLabel =
			packageOptions.find((p) => p.value === o.Package)?.label || o.Package || 'N/A';

		return {
			id: `#ORD-${o.id.slice(0, 6).toUpperCase()}`,
			clientName: o.fullname || 'Unknown',
			service: packageLabel,
			dateOrdered: new Date(o.created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			deadline: o.Deadline
				? new Date(o.Deadline).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric'
					})
				: '—',
			paymentStatus,
			paymentStatusColor: paymentColorMap[paymentStatus] || 'text-gray-600 bg-gray-50 border-gray-100',
			paymentIconName: paymentStatus === 'Paid' ? 'CheckCircle2' : 'AlertCircle',
			orderStatus,
			orderStatusColor: statusColorMap[orderStatus] || 'text-gray-600 bg-gray-50 border-gray-100',
			orderIconName: orderStatus === 'Completed' ? 'CheckCircle2' : 'Clock',
			checked: false,
			// Keep raw id for actions
			rawId: o.id
		};
	});

	return { user, kpiGroups, orders };
};

export const actions: Actions = {
	updateStatus: async ({ request, locals }) => {
		const pb = locals.pb;
		const data = await request.formData();
		const orderId = data.get('order_id') as string;
		const orderStatus = data.get('order_status') as string;
		const paymentStatus = data.get('payment_status') as string;

		if (!orderId) {
			return fail(400, { message: 'Order ID is required' });
		}

		try {
			const updateData: Record<string, string> = {};
			if (orderStatus) updateData.order_status = orderStatus;
			if (paymentStatus) updateData.payment_status = paymentStatus;

			if (Object.keys(updateData).length > 0) {
				await pb.collection('orders').update(orderId, updateData);
			}
			return { success: true };
		} catch (err) {
			console.error('Update status error:', err);
			return fail(500, { message: 'Failed to update order status' });
		}
	}
};
