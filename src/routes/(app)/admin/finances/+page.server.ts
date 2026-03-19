import type { PageServerLoad } from './$types';
import { packageOptions } from '$lib/index';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { user } = await parent();
	const pb = locals.pb;

	// Fetch actual orders from Pocketbase
	const rawOrders = await pb.collection('orders').getFullList({
		sort: '-created'
	});

	let totalRevenue = 0;
	let pendingPayments = 0; // we'll assume all are confirmed for now but you could add logic
	let revenueThisMonth = 0;
	
	const now = new Date();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();

	// Calculate aggregations by date for the chart
	const revenueByDate: Record<string, number> = {};

	const transactions = rawOrders.map(order => {
		const pkgOption = packageOptions.find(p => p.value === order.Package);
		const pkgPrice = pkgOption ? pkgOption.price : 0;
		
		const addonsPrice = Array.isArray(order.Additional_Services) 
			? order.Additional_Services.reduce((sum, service) => sum + (service.price || 0), 0)
			: 0;

		const amount = order.amount !== undefined && order.amount !== 0 ? order.amount : (pkgPrice + addonsPrice);
		totalRevenue += amount;

		const orderDate = new Date(order.created);
		if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
			revenueThisMonth += amount;
		}

		// Group revenue for the chart
		const dateStr = orderDate.toISOString().split('T')[0];
		revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + amount;

		const paymentStatus = order.payment_status || 'Unpaid';
		const isPaid = paymentStatus === 'Paid';

		return {
			id: `#ORD-${order.id.slice(0, 5).toUpperCase()}`,
			date: orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
			client: order.fullname,
			amount: amount.toLocaleString(),
			method: order.payment_method || 'Bank Transfer', // Fallback
			status: paymentStatus,
			statusColor: isPaid 
				? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
				: paymentStatus === 'Failed' 
					? 'text-rose-600 bg-rose-50 border-rose-100'
					: 'text-amber-600 bg-amber-50 border-amber-100',
			iconName: isPaid ? 'CheckCircle2' : paymentStatus === 'Failed' ? 'XCircle' : 'Clock'
		};
	});

	// Build the KPI groups dynamically
	const kpiGroups = [
		{
			title: 'Financials Overview',
			metrics: [
				{
					label: 'Total Revenue (₦)',
					value: totalRevenue > 1000000 ? (totalRevenue / 1000000).toFixed(1) + 'M' : totalRevenue.toLocaleString(),
					iconName: 'CreditCard',
					trend: '↑--',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'cumulative earnings'
				},
				{
					label: 'Pending Payments',
					value: transactions.filter(t => t.status === 'Pending').length.toString(),
					iconName: 'AlertCircle',
					trend: '--',
					trendColor: 'text-amber-600 bg-amber-50/80',
					subtext: 'unpaid/unconfirmed'
				}
			]
		},
		{
			title: 'Recent Performance',
			metrics: [
				{
					label: 'Revenue This Month',
					value: '₦ ' + revenueThisMonth.toLocaleString(),
					iconName: 'TrendingUp',
					trend: '↑--',
					trendColor: 'text-emerald-600 bg-emerald-50/80',
					subtext: 'current month'
				},
				{
					label: 'Failed Transactions',
					value: transactions.filter(t => t.status === 'Failed').length.toString(),
					iconName: 'XCircle',
					trend: '--',
					trendColor: 'text-rose-600 bg-rose-50/80',
					subtext: 'needs attention'
				}
			]
		}
	];

	// Ensure chart runs for at least the last 90 days
	const chartData = [];
	for (let i = 89; i >= 0; i--) {
		const d = new Date();
		d.setDate(d.getDate() - i);
		const dateStr = d.toISOString().split('T')[0];
		chartData.push({
			date: d,
			revenue: revenueByDate[dateStr] || 0
		});
	}

	return {
		user,
		kpiGroups,
		transactions,
		chartData
	};
};
