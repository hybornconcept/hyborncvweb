<script lang="ts">
	import {
		ChevronDown,
		Calendar,
		MoreVertical,
		ArrowUpDown,
		ChevronLeft,
		ChevronRight,
		CheckCircle2,
		Clock,
		CreditCard,
		AlertCircle,
		Download,
		TrendingUp,
		XCircle,
		BarChart3
	} from '@lucide/svelte';
	import RangeCalendar from '$lib/components/ui/range-calendar/range-calendar.svelte';
	import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date';
	import type { DateRange } from 'bits-ui';
	import * as Select from '$lib/components/ui/select';
	import * as Popover from '$lib/components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const iconMap: Record<string, any> = {
		CreditCard,
		AlertCircle,
		Clock,
		CheckCircle2,
		TrendingUp,
		XCircle
	};

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	let value = $state<DateRange>({
		start: new CalendarDate(2025, 6, 12),
		end: new CalendarDate(2025, 7, 15)
	});

	let selectedStatus = $state('all');
</script>

<div class="min-h-full space-y-8 bg-white/50 pb-8 font-sans">
	<!-- Header & Filters -->
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
		<div class="space-y-1">
			<h1 class="text-[22px] font-semibold tracking-tight text-gray-900">Payments & Revenue</h1>
			<p class="text-[13px] text-gray-500">
				Monitor your business financials, incoming payments, and overall growth.
			</p>
		</div>

		<div class="flex items-center gap-3">
			<Select.Root type="single" bind:value={selectedStatus}>
				<Select.Trigger class="h-9 w-[150px] text-[13px] font-medium text-gray-700">
					{selectedStatus === 'all'
						? 'Payment Status'
						: selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="all">All Status</Select.Item>
					<Select.Item value="Paid">Paid</Select.Item>
					<Select.Item value="Pending">Pending</Select.Item>
					<Select.Item value="Failed">Failed</Select.Item>
				</Select.Content>
			</Select.Root>

			<Popover.Root>
				<Popover.Trigger
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'h-9 justify-start px-3 text-left text-[13px] font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50',
						!value && 'text-gray-400'
					)}
				>
					<Calendar class="mr-2 h-3.5 w-3.5 text-gray-400" />
					{#if value && value.start}
						{#if value.end}
							{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
								value.end.toDate(getLocalTimeZone())
							)}
						{:else}
							{df.format(value.start.toDate(getLocalTimeZone()))}
						{/if}
					{:else}
						Pick a date
					{/if}
					<ChevronDown class="ml-2 h-3.5 w-3.5 text-gray-400" />
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0" align="end">
					<RangeCalendar bind:value class="rounded-lg border shadow-sm" numberOfMonths={2} />
				</Popover.Content>
			</Popover.Root>

			<button
				class="inline-flex h-9 items-center justify-center rounded-md bg-[#6534FF] px-4 text-sm font-medium text-white shadow transition-colors hover:bg-[#5b2ee6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
			>
				<Download class="mr-2 h-4 w-4" />
				Export to Excel
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
					<button class="text-gray-400 hover:text-gray-600"><MoreVertical class="h-4 w-4" /></button
					>
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

	<!-- Transactions Table Section -->
	<div class="space-y-4 pt-2">
		<h2 class="text-[16px] font-semibold text-gray-900">All Transactions</h2>
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
									Transaction ID <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Date <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Client <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Payment Method <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Amount (₦) <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Status <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#each data.transactions as trx}
							<tr class="group font-medium transition-colors hover:bg-gray-50/60">
								<td class="px-4 py-4 font-semibold text-gray-900">
									{trx.id}
								</td>
								<td class="px-4 py-4 text-[12px] text-gray-500">
									{trx.date}
								</td>
								<td class="px-4 py-4 font-semibold text-gray-900">
									{trx.client}
								</td>
								<td class="px-4 py-4 font-semibold text-gray-700">
									{trx.method}
								</td>
								<td class="px-4 py-4 font-semibold text-gray-900">
									₦{trx.amount}
								</td>
								<td class="px-4 py-4">
									<div
										class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold {trx.statusColor}"
									>
										{#if trx.iconName}
											{@const StatusIcon = iconMap[trx.iconName]}
											{#if StatusIcon}
												<StatusIcon class="h-3 w-3" />
											{/if}
										{/if}
										{trx.status}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			<div
				class="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3 text-[13px]"
			>
				<div class="flex items-center gap-2">
					<button
						class="rounded-lg border border-gray-200 px-3 py-1.5 font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Previous
					</button>
					<button
						class="rounded-lg border border-gray-200 px-3 py-1.5 font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
					>
						Next
					</button>
				</div>
				<div class="flex items-center gap-1">
					<button
						class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-400 shadow-sm transition-colors hover:bg-gray-50"
					>
						<ChevronLeft class="h-4 w-4" />
					</button>
					<button
						class="flex h-7 w-7 items-center justify-center rounded-lg border border-transparent bg-gray-100 font-medium text-gray-900"
					>
						1
					</button>
					<button
						class="flex h-7 w-7 items-center justify-center rounded-lg border border-transparent font-medium text-gray-600 hover:bg-gray-50"
					>
						2
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
