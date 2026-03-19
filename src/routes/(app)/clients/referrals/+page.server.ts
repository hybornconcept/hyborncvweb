import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const user = locals.user;

	if (!user?.id) {
		return { referrals: [], kpis: {}, walletBalance: 0, referralCode: '', user };
	}

	// Fetch referrals where this user is the referrer
	const rawReferrals = await pb.collection('referrals').getFullList({
		filter: `referrer = "${user.id}"`,
		sort: '-created',
		expand: 'referee'
	});

	const totalReferrals = rawReferrals.length;
	const successful = rawReferrals.filter((r) => r.status === 'Completed');
	const pending = rawReferrals.filter((r) => r.status === 'Pending');
	const totalEarned = rawReferrals.reduce((sum, r) => sum + (r.reward_amount || 0), 0);

	const referrals = rawReferrals.map((r) => {
		const referee = r.expand?.referee;
		const isPaid = r.payout_status === 'Paid' || r.payout_status === 'Approved';
		return {
			id: r.id,
			name: referee?.fullname || referee?.email || 'Unknown',
			date: new Date(r.created).toLocaleDateString('en-GB', {
				day: '2-digit',
				month: '2-digit',
				year: '2-digit'
			}),
			type: r.status === 'Completed' ? 'Completed' : 'Pending',
			typeColor: r.status === 'Completed' ? 'text-green-600' : 'text-amber-500',
			typeDot: r.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500',
			reward: r.reward_amount ? `₦${r.reward_amount.toLocaleString()}` : '₦0',
			source: r.source || 'Direct Link',
			status: r.payout_status || 'Pending',
			statusColor: isPaid ? 'text-green-600' : 'text-amber-500',
			statusDot: isPaid ? 'bg-green-500' : 'bg-amber-500',
			avatarBg: 'bg-purple-100 text-purple-600'
		};
	});

	return {
		user,
		referrals,
		referralCode: user.referral_code || '',
		walletBalance: user.wallet_balance || 0,
		kpis: {
			totalReferrals,
			successfulReferrals: successful.length,
			pendingReferrals: pending.length,
			totalEarned
		}
	};
};
