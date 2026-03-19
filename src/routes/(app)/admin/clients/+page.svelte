<script lang="ts">
	import {
		Search,
		MoreVertical,
		ArrowUpDown,
		ChevronLeft,
		ChevronRight,
		Users,
		UserPlus,
		Star,
		UserMinus,
		Mail,
		Eye,
		MessageSquare
	} from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const iconMap: Record<string, any> = {
		Users,
		UserPlus,
		Star,
		UserMinus
	};
</script>

<div class="min-h-full space-y-8 bg-white/50 pb-8 font-sans">
	<!-- Header & Filters -->
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
		<div class="space-y-1">
			<h1 class="text-[22px] font-semibold tracking-tight text-gray-900">Client Management</h1>
			<p class="text-[13px] text-gray-500">
				Manage your client list, follow up efficiently, and identify VIPs.
			</p>
		</div>

		<div class="flex items-center gap-3">
			<div class="relative">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
				<input
					type="text"
					placeholder="Search clients..."
					class="flex h-9 w-[260px] rounded-md border border-gray-200 bg-white px-3 py-1 pl-9 text-[13px] text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
				/>
			</div>
			<button
				class="inline-flex h-9 items-center justify-center rounded-md bg-[#6534FF] px-4 text-sm font-medium text-white shadow transition-colors hover:bg-[#5b2ee6]"
			>
				<UserPlus class="mr-2 h-4 w-4" />
				Add Client
			</button>
		</div>
	</div>

	<!-- Cards Grid -->
	<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
		{#each data.kpiGroups as group}
			<div
				class="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
			>
				<div class="flex items-center justify-between">
					<h2 class="text-[14px] font-semibold text-gray-900">{group.title}</h2>
					<button class="text-gray-400 hover:text-gray-600"><MoreVertical class="h-4 w-4" /></button>
				</div>
				<div class="grid grid-cols-2 gap-4">
					{#each group.metrics as metric, i}
						{@const Icon = iconMap[metric.iconName]}
						<div
							class="space-y-1.5 {i === 0
								? 'relative pr-4 before:absolute before:bottom-1 before:right-0 before:top-1 before:w-[1px] before:bg-gray-100'
								: 'pl-3'}"
						>
							<p class="text-[12px] text-gray-500">{metric.label}</p>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2.5 text-xl font-semibold text-gray-900">
									{#if Icon}
										<Icon class="h-[18px] w-[18px] stroke-[1.5] text-gray-400" />
									{/if}
									{metric.value}
								</div>
								<div
									class="flex items-center gap-1 rounded-[4px] px-1.5 py-0.5 text-[11px] font-medium {metric.trendColor}"
								>
									{metric.trend}
								</div>
							</div>
							<p class="mt-2 text-[11px] text-gray-400">{metric.subtext}</p>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Clients Table Section -->
	<div class="space-y-4 pt-2">
		<h2 class="text-[16px] font-semibold text-gray-900">All Registered Clients</h2>
		<!-- Table -->
		<div
			class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
		>
			<div class="overflow-x-auto">
				<table class="w-full whitespace-nowrap text-left text-[13px] text-gray-600">
					<thead class="border-b border-gray-100 bg-white text-[12px] font-medium text-gray-500">
						<tr>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Client Details <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Contact <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3 text-center">
								<div class="flex cursor-pointer items-center justify-center gap-1.5 hover:text-gray-700">
									Total Orders <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3 text-right">
								<div class="flex cursor-pointer items-center justify-end gap-1.5 hover:text-gray-700">
									Amount Spent (₦) <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Status <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3 text-center">Action</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#each data.clients as client}
							<tr class="group font-medium transition-colors hover:bg-gray-50/60">
								<td class="px-4 py-4">
									<div class="flex items-center gap-3">
										<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[12px] font-bold text-indigo-600 border border-indigo-100">
											{client.name.split(' ').map(n => n[0]).join('')}
										</div>
										<div class="flex flex-col">
											<span class="font-semibold text-gray-900">{client.name}</span>
											<span class="text-[12px] font-normal text-gray-500">Joined {client.joined}</span>
										</div>
									</div>
								</td>
								<td class="px-4 py-4">
									<div class="flex flex-col gap-1">
										<a href="mailto:{client.email}" class="text-gray-600 hover:text-[#6534FF] inline-flex items-center gap-1 transition-colors">
											<Mail class="h-3 w-3" /> {client.email}
										</a>
									</div>
								</td>
								<td class="px-4 py-4 text-center font-semibold text-gray-900">
									{client.orders}
								</td>
								<td class="px-4 py-4 text-right font-semibold text-gray-900">
									₦{client.spent}
								</td>
								<td class="px-4 py-4">
									{#if client.isVip}
										<div class="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-700 shadow-sm">
											<Star class="h-3 w-3 fill-purple-400 text-purple-400" />
											VIP Client
										</div>
									{:else}
										<div class="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600">
											Standard
										</div>
									{/if}
								</td>
								<td class="px-4 py-4">
									<div class="flex items-center justify-center gap-2">
										<button
											class="p-1.5 text-gray-400 transition-colors hover:text-[#6534FF]"
											title="Direct Message"
										>
											<MessageSquare class="h-4 w-4" />
										</button>
										<button
											class="p-1.5 text-gray-400 transition-colors hover:text-blue-600"
											title="View Profile & History"
										>
											<Eye class="h-4 w-4" />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			<div class="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3 text-[13px]">
				<span class="text-gray-500">Showing 1 to 4 of 84 clients</span>
				<div class="flex items-center gap-1">
					<button class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 shadow-sm transition-colors hover:bg-gray-50">
						<ChevronLeft class="h-4 w-4" />
					</button>
					<button class="flex h-7 w-7 items-center justify-center rounded-lg border border-transparent bg-gray-100 font-medium text-gray-900">1</button>
					<button class="flex h-7 w-7 items-center justify-center rounded-lg border border-transparent font-medium text-gray-600 hover:bg-gray-50">2</button>
					<span class="flex h-7 w-7 items-center justify-center text-gray-400">...</span>
					<button class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600 shadow-sm transition-colors hover:bg-gray-50">
						<ChevronRight class="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
