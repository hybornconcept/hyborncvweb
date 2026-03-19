import type { PageServerLoad } from './$types';
import { packageOptions } from '$lib/index';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const user = locals.user;

	// Fetch all client users
	const clientUsers = await pb.collection('users').getFullList({
		filter: 'role = "client"',
		sort: '-created'
	});

	// Fetch all orders once so we can aggregate per client
	const allOrders = await pb.collection('orders').getFullList({ sort: '-created' });

	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	const ninetyDaysAgo = new Date();
	ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

	// Map client data with aggregated order totals
	const clients = clientUsers.map((u) => {
		const userOrders = allOrders.filter((o) => o.user === u.id);

		// Calculate total spend
		const totalSpent = userOrders.reduce((sum, o) => {
			const pkgPrice = packageOptions.find((p) => p.value === o.Package)?.price || 0;
			const addonsPrice = Array.isArray(o.Additional_Services)
				? o.Additional_Services.reduce((a: number, s: { price?: number }) => a + (s.price || 0), 0)
				: 0;
			return sum + pkgPrice + addonsPrice;
		}, 0);

		// VIP = 3+ orders
		const isVip = userOrders.length >= 3;

		// Inactive = last order > 90 days ago (or no orders)
		const lastOrder = userOrders[0]; // already sorted by -created
		const isInactive = !lastOrder || new Date(lastOrder.created) < ninetyDaysAgo;
		const isNew = new Date(u.created) > thirtyDaysAgo;

		return {
			id: u.id,
			name: u.fullname || u.email,
			email: u.email,
			joined: new Date(u.created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			orders: userOrders.length,
			spent: totalSpent.toLocaleString(),
			isVip,
			isInactive,
			isNew
		};
	});

	// KPI aggregates
	const totalClients = clients.length;
	const newClients = clients.filter((c) => c.isNew).length;
	const vipClients = clients.filter((c) => c.isVip).length;
	const inactiveClients = clients.filter((c) => c.isInactive).length;

	const kpiGroups = [
		{
			title: 'Client Overview',
			metrics: [
				{
					label: 'Total Clients',
					value: String(totalClients),
					iconName: 'Users',
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
					subtext: 'last 30 days'
				}
			]
		},
		{
			title: 'Client Engagement',
			metrics: [
				{
					label: 'VIP / Returning',
					value: String(vipClients),
					iconName: 'Star',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: '3+ orders'
				},
				{
					label: 'Inactive',
					value: String(inactiveClients),
					iconName: 'UserMinus',
					trend: '',
					trendColor: 'text-rose-600 bg-rose-50/80',
					subtext: '> 90 days'
				}
			]
		}
	];

	return { user, kpiGroups, clients };
};
