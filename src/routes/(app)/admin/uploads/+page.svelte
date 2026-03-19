<script lang="ts">
	import {
		UploadCloud,
		Check,
		Search,
		Download,
		MoreHorizontal,
		X
	} from '@lucide/svelte';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	// Reactive selected option (order + user combo)
	let selectedOption = $state('');
	let message = $state('');
	let selectedTag = $state('Delivered');

	// Tags available
	const tags = ['Delivered', 'In Review', 'Action Required', 'Completed'];

	// File upload state
	let uploadedFiles: { file: File; size: string }[] = $state([]);

	function handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const newFiles = Array.from(input.files || []);
		newFiles.forEach((file) => {
			uploadedFiles = [...uploadedFiles, { file, size: formatFileSize(file.size) }];
		});
	}

	function removeFile(file: File) {
		uploadedFiles = uploadedFiles.filter((f) => f.file !== file);
	}

	function formatFileSize(bytes: number): string {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
	}

	// Derive selected order's user id and order id from the selected option
	// option format: "orderId::userId"
	let selectedOrderId = $derived(selectedOption.split('::')[0] || '');
	let selectedUserId = $derived(selectedOption.split('::')[1] || '');

	// Search for revisions table
	let revisionSearch = $state('');
	let filteredRevisions = $derived(
		data.revisions.filter(
			(r: { client: string; orderId: string; service: string }) =>
				r.client.toLowerCase().includes(revisionSearch.toLowerCase()) ||
				r.orderId.toLowerCase().includes(revisionSearch.toLowerCase()) ||
				r.service.toLowerCase().includes(revisionSearch.toLowerCase())
		)
	);
</script>

<div class="space-y-8 pb-12">
	<!-- Header Section -->
	<div class="space-y-1">
		<h1 class="font-sans text-2xl font-bold tracking-tight text-gray-900">Uploads & Revisions</h1>
		<p class="text-sm font-medium text-gray-500">
			Manage job deliveries, post updates, and track client revision requests.
		</p>
	</div>

	{#if form?.success}
		<div class="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
			✓ Delivery posted successfully!
		</div>
	{/if}
	{#if form?.message && !form?.success}
		<div class="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-700">
			{form.message}
		</div>
	{/if}

	<!-- Main Form Layout -->
	<div class="rounded-3xl border border-gray-100 bg-white shadow-sm">
		<form
			method="POST"
			action="?/deliver"
			enctype="multipart/form-data"
			use:enhance={() => {
				return async ({ update }) => {
					await update();
					// Reset form on success
					selectedOption = '';
					message = '';
					selectedTag = 'Delivered';
					uploadedFiles = [];
				};
			}}
		>
			<!-- Hidden inputs for extracted ids -->
			<input type="hidden" name="order_id" value={selectedOrderId} />
			<input type="hidden" name="user_id" value={selectedUserId} />

			<div class="mx-auto max-w-6xl space-y-6 px-8 py-8 text-left">
				<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<!-- Left Column: User & Upload -->
					<div class="space-y-6">
						<!-- Select User + Order -->
						<div class="relative space-y-2">
							<label for="user" class="block text-sm font-bold text-gray-900">Select User & Order</label>
							<div class="relative">
								<select
									id="user"
									bind:value={selectedOption}
									class="w-full appearance-none rounded-2xl border border-transparent bg-[#FAFAFA] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-gray-100"
								>
									<option value="" disabled>Select a user and order...</option>
									{#each data.userOrderOptions as opt}
										<option value="{opt.orderId}::{opt.userId}">{opt.label}</option>
									{/each}
								</select>
								<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5 text-gray-400">
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
										></path></svg
									>
								</div>
							</div>
						</div>

						<!-- Big Upload Area -->
						<div class="space-y-2">
							<div
								class="group relative cursor-pointer rounded-[2rem] border-2 border-dashed border-gray-200 bg-[#FAFAFA] px-6 py-6 text-center transition-all"
							>
								<div
									class="absolute inset-0 rounded-[2rem] bg-white/50 opacity-0 transition-opacity group-hover:opacity-100"
								></div>
								<div class="relative z-10 flex flex-col items-center">
									<div
										class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#A100FF]/10 text-[#A100FF]"
									>
										<UploadCloud class="h-6 w-6" />
									</div>
									<div class="space-y-1">
										<h3 class="mb-1 text-base font-bold text-gray-900">Upload Files</h3>
										<p class="mb-4 max-w-xs text-[10px] font-medium text-gray-500">
											PDF, DOCX, Images &lt; <span class="font-bold text-[#A100FF]">30 MB</span>
										</p>
										<button
											type="button"
											class="rounded-xl bg-gradient-to-r from-[#E100FF] to-[#7F00FF] px-8 py-2 text-xs font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95"
										>
											Upload
										</button>
									</div>
								</div>
								<input
									type="file"
									name="files"
									multiple
									class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
									onchange={handleFileUpload}
								/>
							</div>

							<!-- File List -->
							{#if uploadedFiles.length > 0}
								<div class="mt-4 grid grid-cols-1 gap-2">
									{#each uploadedFiles as { file, size }}
										<div
											class="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
										>
											<div class="flex items-center gap-3">
												<div
													class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A100FF]/10 text-[#A100FF]"
												>
													<Check class="h-5 w-5" />
												</div>
												<div class="flex flex-col">
													<span class="max-w-[150px] truncate text-[13px] font-bold text-gray-900"
														>{file.name}</span
													>
													<span class="text-[11px] font-medium text-gray-500">{size}</span>
												</div>
											</div>
											<button
												type="button"
												class="rounded-lg p-2 text-gray-400 hover:bg-rose-50 hover:text-rose-500"
												onclick={() => removeFile(file)}
											>
												<X class="h-4 w-4" />
											</button>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>

					<!-- Right Column: Message & Tags -->
					<div class="flex flex-col gap-6">
						<div class="space-y-2">
							<label for="tag" class="block text-sm font-bold text-gray-900">Delivery Status / Tag</label>
							<div class="relative">
								<select
									id="tag"
									name="tag"
									bind:value={selectedTag}
									class="w-full appearance-none rounded-2xl border border-transparent bg-[#FAFAFA] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-gray-100"
								>
									{#each tags as tag}
										<option value={tag}>{tag}</option>
									{/each}
								</select>
								<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5 text-gray-400">
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
										></path></svg
									>
								</div>
							</div>
						</div>
						<div class="flex-1">
							<textarea
								id="message"
								name="message"
								bind:value={message}
								placeholder="Write a message to accompany the files..."
								class="h-full min-h-[195px] w-full resize-none rounded-2xl border border-transparent bg-[#FAFAFA] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-gray-100"
							></textarea>
						</div>
					</div>
				</div>

				<!-- Submit Button -->
				<div class="pt-4">
					<button
						type="submit"
						class="w-full rounded-2xl bg-gradient-to-r from-[#E100FF] to-[#7F00FF] py-4 text-sm font-bold text-white shadow-xl shadow-purple-500/20 transition-all hover:opacity-90 focus:ring-4 focus:ring-purple-100 active:scale-[0.99]"
					>
						Post Delivery
					</button>
				</div>
			</div>
		</form>
	</div>

	<!-- Bottom Section: Revision Requests Table -->
	<div class="overflow-hidden rounded-3xl border border-gray-100 bg-white text-left shadow-sm">
		<!-- Table Header -->
		<div class="flex items-center justify-between border-b border-gray-100 p-8">
			<div class="space-y-1.5">
				<h2 class="font-sans text-2xl font-bold tracking-tight text-gray-900">Revision Requests</h2>
				<p class="text-sm font-medium text-gray-500">
					Track and manage all client revision requests in one place.
				</p>
			</div>
			<div class="flex items-center gap-3">
				<div class="relative">
					<Search class="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						bind:value={revisionSearch}
						placeholder="Search revisions..."
						class="w-[280px] rounded-xl border border-transparent bg-gray-50 py-2.5 pr-4 pl-11 text-sm font-medium text-gray-900 transition-all outline-none focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-gray-100"
					/>
				</div>
			</div>
		</div>

		<!-- Table Data -->
		<div class="overflow-hidden">
			<table class="w-full text-left text-sm">
				<thead class="border-b border-gray-100 bg-gray-50/50 text-gray-500">
					<tr>
						<th class="px-8 py-5 font-semibold">Client Name</th>
						<th class="px-8 py-5 font-semibold">Order ID</th>
						<th class="px-8 py-5 font-semibold">Service</th>
						<th class="max-w-md px-8 py-5 font-semibold">Client Notes</th>
						<th class="px-8 py-5 font-semibold">Status</th>
						<th class="px-8 py-5 text-right font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#if filteredRevisions.length === 0}
						<tr>
							<td colspan="6" class="px-8 py-12 text-center text-sm font-medium text-gray-400">
								No revision requests found.
							</td>
						</tr>
					{/if}
					{#each filteredRevisions as rev}
						<tr class="group transition-colors hover:bg-gray-50/30">
							<td class="px-8 py-5 font-medium text-gray-900">
								<div class="flex items-center gap-3">
									<div
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#A100FF] to-[#E100FF] text-[10px] font-bold text-white shadow-sm ring-2 ring-[#A100FF]/20 ring-offset-2 ring-offset-white"
									>
										{rev.client
											.split(' ')
											.map((n: string) => n[0])
											.join('')
											.substring(0, 2)}
									</div>
									<span class="font-bold text-gray-900">{rev.client}</span>
								</div>
							</td>
							<td class="px-8 py-5">
								<span
									class="inline-flex items-center rounded-md bg-purple-50 px-2.5 py-1 text-xs font-bold text-[#A100FF]"
								>
									{rev.orderId}
								</span>
							</td>
							<td class="px-8 py-5 font-medium text-gray-600">
								{rev.service}
							</td>
							<td class="px-8 py-5 text-gray-500">
								<div class="flex items-center gap-2">
									<p class="line-clamp-2 max-w-[200px] text-xs leading-relaxed font-medium">
										{rev.notes}
									</p>
								</div>
							</td>
							<td class="px-8 py-5">
								<span
									class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap
									{rev.status === 'Open'
										? 'bg-rose-50 text-rose-700'
										: rev.status === 'In Review'
											? 'border border-gray-200 bg-[#FAFAFA] text-gray-800'
											: 'bg-emerald-50 text-emerald-700'}"
								>
									{#if rev.status === 'Open'}
										<div class="h-1.5 w-1.5 rounded-full bg-rose-500"></div>
									{:else if rev.status === 'In Review'}
										<div class="h-1.5 w-1.5 rounded-full bg-gray-500"></div>
									{:else}
										<Check class="h-3 w-3" strokeWidth={3} />
									{/if}
									{rev.status}
								</span>
							</td>
							<td class="px-8 py-5 text-right">
								<div class="flex items-center justify-end gap-2">
									<form method="POST" action="?/resolveRevision" use:enhance>
										<input type="hidden" name="revision_id" value={rev.id} />
										<button
											type="submit"
											class="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs font-bold text-gray-600 transition-all hover:bg-emerald-50 hover:text-emerald-600 active:scale-95"
											title="Mark as Resolved"
											disabled={rev.status === 'Resolved'}
										>
											<Check class="h-3.5 w-3.5" />
											Resolve
										</button>
									</form>
									<button
										class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
									>
										<MoreHorizontal class="h-5 w-5" />
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="border-t border-gray-100 bg-gray-50/30 p-4 text-center">
			<span class="text-sm font-medium text-gray-400"
				>{data.revisions.length} total revision{data.revisions.length !== 1 ? 's' : ''}</span
			>
		</div>
	</div>
</div>
