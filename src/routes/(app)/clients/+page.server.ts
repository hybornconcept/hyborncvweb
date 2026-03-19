import type { PageServerLoad } from './$types';
import { packageOptions } from '$lib/index';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const user = locals.user;

	const hour = new Date().getHours();
	let greeting = 'Good Evening';
	if (hour < 12) greeting = 'Good Morning';
	else if (hour < 17) greeting = 'Good Afternoon';

	// Format name to show only Firstname in Sentence Case
	const rawName = user?.fullname || user?.name || 'there';
	const firstName = rawName.split(' ')[0];
	const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

	const pageInfo = {
		greeting: `${greeting}, ${formattedName}`,
		subtext: 'Manage and track your active orders, delivery progress, and order history.'
	};

	// Fetch this client's orders only
	const rawOrders = await pb.collection('orders').getFullList({
		filter: `user = "${user?.id}"`,
		sort: '-created'
	});

	// Compute KPI counts
	const total = rawOrders.length;
	const inProgress = rawOrders.filter((o) => o.order_status === 'In Progress').length;
	const completed = rawOrders.filter((o) => o.order_status === 'Completed').length;
	const pendingPayment = rawOrders.filter((o) => o.payment_status === 'Unpaid').length;

	// Count pending revision requests
	const revisions = await pb.collection('revisions').getFullList({
		filter: `user = "${user?.id}" && status != "Resolved"`
	});
	const revisionCount = revisions.length;

	// Count deliveries with ready documents
	const readyDeliveries = await pb.collection('deliveries').getFullList({
		filter: `user = "${user?.id}" && tag = "Delivered"`
	});
	const documentsReady = readyDeliveries.length;

	const kpiGroups = [
		{
			title: 'Order Overview',
			metrics: [
				{
					label: 'Total Orders',
					value: String(total),
					iconName: 'ShoppingBag',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'lifetime orders'
				},
				{
					label: 'In Progress',
					value: String(inProgress),
					iconName: 'Clock',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'active now'
				}
			]
		},
		{
			title: 'Payment & Delivery',
			metrics: [
				{
					label: 'Completed',
					value: String(completed),
					iconName: 'CheckCircle2',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'delivered'
				},
				{
					label: 'Pending Payment',
					value: String(pendingPayment),
					iconName: 'Wallet',
					trend: '',
					trendColor: 'text-rose-600 bg-rose-50/80',
					subtext: 'awaiting payment'
				}
			]
		},
		{
			title: 'Document Status',
			metrics: [
				{
					label: 'Revision Requests',
					value: String(revisionCount),
					iconName: 'RefreshCw',
					trend: '',
					trendColor: 'text-amber-600 bg-amber-50/80',
					subtext: 'in review'
				},
				{
					label: 'Documents Ready',
					value: String(documentsReady),
					iconName: 'FileCheck',
					trend: '',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'ready to download'
				}
			]
		}
	];

	// Map orders for the table
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

	const orders = rawOrders.map((o) => {
		const orderStatus = o.order_status || 'Pending';
		const paymentStatus = o.payment_status || 'Unpaid';
		const pkgPrice = packageOptions.find((p) => p.value === o.Package)?.price || 0;
		const addonsPrice = Array.isArray(o.Additional_Services)
			? o.Additional_Services.reduce((a: number, s: { price?: number }) => a + (s.price || 0), 0)
			: 0;
		const amount = o.amount || pkgPrice + addonsPrice;
		const packageLabel =
			packageOptions.find((p) => p.value === o.Package)?.label || o.Package || 'N/A';

		return {
			id: `#ORD-${o.id.slice(0, 6).toUpperCase()}`,
			rawId: o.id,
			service: packageLabel,
			dateOrdered: new Date(o.created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			deliveryDate: o.Deadline
				? new Date(o.Deadline).toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric'
					})
				: '—',
			amount: amount.toLocaleString(),
			paymentStatus,
			paymentStatusColor: paymentColorMap[paymentStatus] || 'text-gray-600 bg-gray-50 border-gray-100',
			paymentIconName: paymentStatus === 'Paid' ? 'CheckCircle2' : 'Clock',
			orderStatus,
			orderStatusColor: statusColorMap[orderStatus] || 'text-gray-600 bg-gray-50 border-gray-100',
			orderIconName: orderStatus === 'Completed' ? 'CheckCircle2' : 'Clock',
			checked: false
		};
	});

	return { user, kpiGroups, orders, pageInfo };
};
