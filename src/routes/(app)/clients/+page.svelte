<script lang="ts">
	import {
		ChevronDown,
		Calendar,
		MoreVertical,
		FileText,
		ArrowUpDown,
		Check,
		Square,
		ChevronLeft,
		ChevronRight,
		Download,
		RefreshCw,
		CheckCircle2,
		Clock,
		ShoppingBag,
		CreditCard,
		FileCheck,
		AlertCircle,
		Eye,
		Wallet,
		ArrowDown
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
		ShoppingBag,
		Clock,
		CheckCircle2,
		CreditCard,
		RefreshCw,
		FileCheck,
		AlertCircle,
		Wallet
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
			<h1 class="text-[22px] font-semibold tracking-tight text-gray-900">
				{data.pageInfo.greeting}
			</h1>
			<p class="text-[13px] text-gray-500">
				{data.pageInfo.subtext}
			</p>
		</div>

		<div class="flex items-center gap-3">
			<Select.Root type="single" bind:value={selectedStatus}>
				<Select.Trigger class="h-9 w-[140px] text-[13px] font-medium text-gray-700">
					{selectedStatus === 'all'
						? 'Order Status'
						: selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="all">All Status</Select.Item>
					<Select.Item value="In Progress">In Progress</Select.Item>
					<Select.Item value="Completed">Completed</Select.Item>
					<Select.Item value="Revision">Revision</Select.Item>
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
			<a
				href="/order"
				class="group flex h-9 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-[13px] font-semibold whitespace-nowrap text-[#A100FF] transition-all duration-300 hover:border-[#A100FF] hover:bg-[#A100FF] hover:text-white active:scale-95"
			>
				<ChevronLeft
					class="group-hover:animate-bounce-left h-3.5 w-3.5 transition-transform duration-300"
				/>
				Order a service
				<ChevronRight
					class="group-hover:animate-bounce-right h-3.5 w-3.5 transition-transform duration-300"
				/>
			</a>
		</div>
	</div>

	<!-- Cards Grid -->
	<div class="grid grid-cols-1 gap-5 lg:grid-cols-3">
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
								? 'relative pr-4 before:absolute before:top-1 before:right-0 before:bottom-1 before:w-[1px] before:bg-gray-100'
								: 'pl-3'}"
						>
							<p class="text-[12px] text-gray-500">{metric.label}</p>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2.5 text-xl font-semibold text-gray-900">
									<Icon class="h-[18px] w-[18px] stroke-[1.5] text-gray-400" />
									{#if metric.label.toLowerCase().includes('payment')}
										₦{Number(metric.value).toLocaleString()}
									{:else}
										{metric.value}
									{/if}
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

	<!-- Recent messages Section -->
	<div class="space-y-4 pt-2">
		<!-- Table -->
		<div
			class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
		>
			<div class="overflow-x-auto">
				<table class="w-full text-left text-[13px] whitespace-nowrap text-gray-600">
					<thead class="border-b border-gray-100 bg-white text-[12px] font-medium text-gray-500">
						<tr>
							<th class="w-10 px-4 py-3">
								<button class="text-gray-300 transition-colors hover:text-gray-400">
									<Square class="h-4 w-4 rounded-sm" />
								</button>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Order ID <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Service <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Date Ordered <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Delivery Date <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Amount (₦) <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Payment Status <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3">
								<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
									Order Status <ArrowUpDown class="h-3 w-3 text-gray-400" />
								</div>
							</th>
							<th class="px-4 py-3 text-center">Action</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#each data.orders as order}
							<tr class="group font-medium transition-colors hover:bg-gray-50/60">
								<td class="px-4 py-4">
									<button
										class="transition-colors group-hover:opacity-100 {order.checked
											? 'text-[#6534FF]'
											: 'text-gray-200'}"
									>
										{#if order.checked}
											<div
												class="flex h-4 w-4 items-center justify-center rounded border border-[#6534FF] bg-white"
											>
												<Check class="h-3 w-3 stroke-[3] text-[#6534FF]" />
											</div>
										{:else}
											<Square class="h-4 w-4 rounded-sm text-gray-200 group-hover:text-gray-300" />
										{/if}
									</button>
								</td>
								<td class="px-4 py-4 font-semibold text-gray-900">
									{order.id}
								</td>
								<td class="px-4 py-4 font-semibold text-gray-700">
									{order.service}
								</td>
								<td class="px-4 py-4 text-[12px] text-gray-500">
									{order.dateOrdered}
								</td>
								<td class="px-4 py-4 text-[12px] text-gray-500">
									{order.deliveryDate}
								</td>
								<td class="px-4 py-4 font-semibold text-gray-900">
									₦{order.amount}
								</td>
								<td class="px-4 py-4">
									<div
										class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold {order.paymentStatusColor}"
									>
										{#if order.paymentIconName}
											{@const PaymentIcon = iconMap[order.paymentIconName]}
											<PaymentIcon class="h-3 w-3" />
										{/if}
										{order.paymentStatus}
									</div>
								</td>
								<td class="px-4 py-4">
									<div
										class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold {order.orderStatusColor}"
									>
										{#if order.orderIconName}
											{@const StatusIcon = iconMap[order.orderIconName]}
											<StatusIcon class="h-3 w-3" />
										{/if}
										{order.orderStatus}
									</div>
								</td>
								<td class="px-4 py-4">
									<div class="flex items-center justify-center">
										<button
											class="group flex items-center gap-3 rounded-full border border-gray-100 bg-[#FAFAFA] p-0.5 pr-6 text-[12px] font-medium text-gray-600 transition-all hover:bg-gray-100 active:scale-[0.98]"
											title="Download Document"
										>
											<div
												class="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm"
											>
												<ArrowDown class="h-4 w-4" />
											</div>
											download
										</button>
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
					<span class="flex h-7 w-7 items-center justify-center text-gray-400">...</span>
					<button
						class="flex h-7 w-7 items-center justify-center rounded-lg border border-transparent font-medium text-gray-600 hover:bg-gray-50"
					>
						5
					</button>
					<button
						class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
					>
						<ChevronRight class="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes bounce-left {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-4px);
		}
	}
	@keyframes bounce-right {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(4px);
		}
	}
	:global(.group:hover .group-hover\:animate-bounce-left) {
		animation: bounce-left 0.8s ease-in-out infinite;
	}
	:global(.group:hover .group-hover\:animate-bounce-right) {
		animation: bounce-right 0.8s ease-in-out infinite;
	}
</style>
