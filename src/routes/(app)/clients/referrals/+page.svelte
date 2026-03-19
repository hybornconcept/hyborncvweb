<script lang="ts">
	import {
		Users,
		CheckCircle2,
		RefreshCw,
		Wallet,
		ArrowUpRight,
		Search,
		ChevronDown,
		Settings,
		MoreVertical,
		Download,
		AlertCircle,
		Folder,
		Copy
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { fly, fade } from 'svelte/transition';

	let { data } = $props();

	let pageInfo = {
		greeting: 'Referrals & Rewards',
		subtext:
			'Invite your friends and colleagues to the platform and earn rewards for every successful order.'
	};

	let referralLink = `https://hyborncv.com/ref/${data.referralCode}`;
	let balance = (data.walletBalance || 0).toLocaleString();
	let showCopied = $state(false);

	function copyLink() {
		navigator.clipboard.writeText(referralLink);
		showCopied = true;
		setTimeout(() => {
			showCopied = false;
		}, 2000);
	}

	// KPIs matching the requested items (adapted to image card style)
	let kpis = [
		{
			title: 'Total Referrals',
			subtitle: `${data.kpis.totalReferrals} people · All time`,
			icon: Users,
			color: 'text-blue-500'
		},
		{
			title: 'Successful Referrals',
			subtitle: `${data.kpis.successfulReferrals} people · ₦${(data.kpis.totalEarned || 0).toLocaleString()} earned`,
			icon: CheckCircle2,
			color: 'text-green-500'
		},
		{
			title: 'Pending Referrals',
			subtitle: `${data.kpis.pendingReferrals} people · Waiting`,
			icon: RefreshCw,
			color: 'text-amber-500'
		},
		{
			title: 'Total Earnings',
			subtitle: `₦${(data.kpis.totalEarned || 0).toLocaleString()} · Lifetime`,
			icon: Wallet,
			color: 'text-[#A100FF]'
		}
	];

	// History table matching the requested items
	let referrals = data.referrals || [];

	// Search and Filter State
	let searchQuery = $state('');
	let statusFilter = $state('All');

	// Filtered logic
	let filteredReferrals = $derived(
		referrals.filter((ref) => {
			const matchesSearch = ref.name.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = statusFilter === 'All' || ref.type === statusFilter;
			return matchesSearch && matchesStatus;
		})
	);
</script>

<div class="space-y-6 rounded-[2rem] bg-[#F9F9FA] p-4 pt-2 pb-6 font-sans md:p-8 md:pt-4">
	<!-- Header -->
	<div class="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
		<div class="space-y-1">
			<h1 class="text-3xl font-semibold tracking-tight text-gray-900">{pageInfo.greeting}</h1>
			<p class="text-[13px] text-gray-500">
				{pageInfo.subtext}
			</p>
		</div>

		<div class="relative w-full md:w-auto">
			<button
				onclick={copyLink}
				class="flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#A100FF] to-[#7F00FF] px-6 text-sm font-normal whitespace-nowrap text-white shadow-lg shadow-purple-500/20 transition-all hover:opacity-95 active:scale-[0.98]"
			>
				Copy and share referral link
			</button>

			{#if showCopied}
				<div
					in:fly={{ y: -10, duration: 400 }}
					out:fly={{ y: 20, duration: 1000, opacity: 0 }}
					class="absolute top-full left-1/2 mt-2 -translate-x-1/2 px-3 py-1 text-sm font-light whitespace-nowrap"
				>
					Link Copied!
				</div>
			{/if}
		</div>
	</div>

	<!-- Top KPIs (Folder Style) -->
	<div class="grid grid-cols-2 gap-5 xl:grid-cols-4">
		{#each kpis as kpi}
			{@const Icon = kpi.icon}
			<div
				class="group flex h-[140px] cursor-pointer flex-col justify-between rounded-lg border-1 border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
			>
				<div class="relative flex items-start justify-between">
					<!-- Faux Folder Graphic -->
					<div
						class="relative h-10 w-12 {kpi.color} opacity-80 transition-opacity group-hover:opacity-100"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" class="h-10 w-12 transition-colors">
							<path
								d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
							></path>
						</svg>
					</div>
					<button
						class="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-colors group-hover:bg-gray-100"
					>
						<ArrowUpRight class="h-3.5 w-3.5" />
					</button>
				</div>
				<div>
					<h3 class="text-[14px] leading-tight font-bold text-gray-900">{kpi.title}</h3>
					<p class="mt-1 text-[11px] font-medium text-gray-400">{kpi.subtitle}</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- Main grid -->
	<div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
		<!-- Left: Recent Referrals Table -->
		<div
			class="flex flex-col rounded-lg border-1 border-slate-200 bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.03)] xl:col-span-2"
		>
			<!-- Table Header actions -->
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-[17px] font-bold text-gray-900">Lifetime Referrals</h2>
				<button
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
				>
					<ArrowUpRight class="h-4 w-4" />
				</button>
			</div>

			<div class="mb-6 flex flex-col justify-end gap-4 lg:flex-row lg:items-center">
				<div class="flex flex-1 items-center justify-between gap-3 lg:justify-end">
					<div class="flex items-center gap-3">
						<div class="relative hidden sm:block">
							<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search.."
								class="h-9 w-[180px] rounded-xl border border-gray-200 bg-white pr-4 pl-9 text-[13px] font-medium outline-none placeholder:text-gray-400 focus:border-[#2B5CE6] focus:ring-1 focus:ring-[#2B5CE6]"
							/>
						</div>
						<div class="relative">
							<select
								bind:value={statusFilter}
								class="h-9 appearance-none rounded-xl border border-gray-200 bg-white px-3 pr-8 text-[13px] font-semibold text-gray-700 outline-none hover:bg-gray-50 focus:border-[#2B5CE6] focus:ring-1 focus:ring-[#2B5CE6]"
							>
								<option value="All">All Status</option>
								<option value="Completed">Completed</option>
								<option value="Pending">Pending</option>
							</select>
							<ChevronDown
								class="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Table -->
			<div class="flex-1 overflow-x-auto">
				<table class="w-full text-left text-[13px] whitespace-nowrap">
					<thead class="text-[11px] font-semibold text-gray-400">
						<tr>
							<th class="px-4 py-3"
								><div class="flex items-center gap-1 font-semibold">
									Referee Name <ChevronDown class="h-3 w-3" />
								</div></th
							>
							<th class="px-4 py-3"
								><div class="flex items-center gap-1 font-semibold">
									Date Joined <ChevronDown class="h-3 w-3" />
								</div></th
							>
							<th class="px-4 py-3"
								><div class="flex items-center gap-1 font-semibold">
									Order Status <ChevronDown class="h-3 w-3" />
								</div></th
							>
							<th class="px-4 py-3"
								><div class="flex items-center gap-1 font-semibold">
									Reward (₦) <ChevronDown class="h-3 w-3" />
								</div></th
							>
							<th class="px-4 py-3"
								><div class="flex items-center gap-1 font-semibold">
									Payout Status <ChevronDown class="h-3 w-3" />
								</div></th
							>
							<th class="py-3 pl-4 text-right"><Settings class="inline-block h-4 w-4" /></th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-50">
						{#each filteredReferrals as ref}
							<tr class="group transition-colors hover:bg-gray-50/50">
								<td class="px-4 py-4">
									<div class="flex items-center gap-3">
										<div
											class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-transparent text-[10px] font-normal text-slate-500 shadow-sm"
										>
											{ref.name
												.split(' ')
												.map((n) => n[0])
												.join('')
												.slice(0, 2)
												.toUpperCase()}
										</div>
										<span class="font-normal text-gray-800">{ref.name}</span>
									</div>
								</td>
								<td class="px-4 py-4 font-normal text-gray-500">{ref.date}</td>
								<td class="px-4 py-4">
									<div
										class="inline-flex items-center gap-1.5 rounded-lg border border-gray-100 bg-[#FAFAFA] px-2.5 py-1 text-xs font-normal {ref.typeColor}"
									>
										<span class="block h-1.5 w-1.5 rounded-full {ref.typeDot}"></span>
										{ref.type}
									</div>
								</td>
								<td class="px-4 py-4 font-normal">
									{ref.reward}
								</td>
								<td class="px-4 py-4">
									<div
										class="inline-flex items-center gap-1.5 rounded-lg border border-gray-100 bg-[#FAFAFA] px-2.5 py-1 text-xs font-normal {ref.statusColor}"
									>
										<span class="block h-1.5 w-1.5 rounded-full {ref.statusDot}"></span>
										{ref.status}
									</div>
								</td>
								<td class="py-4 pl-4 text-right">
									<button class="text-gray-400 hover:text-gray-600"
										><MoreVertical class="h-4 w-4" /></button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Right Column -->
		<div class="flex flex-col gap-6 xl:col-span-1">
			<!-- Wallet Balance Card (Moved up) -->
			<!-- Using the exact blue gradient and styling from the image -->
			<div
				class="relative flex w-full flex-col self-start overflow-hidden rounded-lg border-1 border-slate-200 bg-gradient-to-br from-[#A100FF] to-[#7F00FF] p-7 text-white shadow-xl shadow-purple-500/10"
			>
				<!-- Background Decoration -->
				<div class="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>

				<div class="relative z-10 flex h-full flex-col">
					<div class="mb-8 flex items-center justify-between">
						<h2 class="text-[15px] font-bold tracking-wide text-white">Wallet Balance</h2>
						<button
							class="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
							><MoreVertical class="h-4 w-4" /></button
						>
					</div>

					<div class="flex items-center gap-6">
						<!-- Circular Chart mimicking image -->
						<div class="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full">
							<!-- Dashed circle mimicking the image chart -->
							<svg class="absolute inset-0 h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
								<!-- Background dashed circle -->
								<circle
									cx="50"
									cy="50"
									r="46"
									fill="none"
									stroke="rgba(255,255,255,0.15)"
									stroke-width="6"
									stroke-dasharray="3 5"
								></circle>
								<!-- Foreground solid progress arc -->
								<circle
									cx="50"
									cy="50"
									r="46"
									fill="none"
									stroke="white"
									stroke-width="6"
									stroke-dasharray="80 200"
									stroke-linecap="round"
								></circle>
							</svg>
							<!-- Inner Text -->
							<div class="translate-y-0.5 text-center">
								<span class="block text-[28px] leading-none font-black tracking-tight">25%</span>
								<span class="mt-2 block text-[10px] font-medium text-purple-100">₦{balance}</span>
								<span
									class="mt-0.5 block text-[9px] font-medium tracking-widest text-purple-200 uppercase opacity-80"
									>Available</span
								>
							</div>
						</div>

						<!-- Right Pills -->
						<div class="flex-1 space-y-2">
							<div
								class="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/15"
							>
								<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_4px_white]"
								></span>
								<div>
									<p class="text-[11px] font-bold tracking-wide text-white">25% · ₦6k</p>
									<p class="mt-0.5 text-[9px] tracking-widest text-purple-100 uppercase">
										Total Earned
									</p>
								</div>
							</div>
							<div
								class="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/15"
							>
								<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-white/50"></span>
								<div>
									<p class="text-[11px] font-bold tracking-wide text-white">10% · ₦1.5k</p>
									<p class="mt-0.5 text-[9px] tracking-widest text-purple-100 uppercase">
										Withdrawn
									</p>
								</div>
							</div>
							<div
								class="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/15"
							>
								<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-white/30"></span>
								<div>
									<p class="text-[11px] font-bold tracking-wide text-white">65% · ₦4.5k</p>
									<p class="mt-0.5 text-[9px] tracking-widest text-purple-100 uppercase">
										Balance Left
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Push button to bottom if space permits, though in this layout it sits here -->
				</div>
			</div>
		</div>
	</div>
</div>
