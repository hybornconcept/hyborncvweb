<script lang="ts">
	import { 
		Upload, 
		MoreHorizontal, 
		Search, 
		ListFilter, 
		LayoutGrid, 
		List, 
		ChevronLeft, 
		ChevronRight, 
		ChevronsLeft, 
		ChevronsRight, 
		FileText, 
		FileSpreadsheet,
		File as FileIconLucide,
		Image as ImageIcon,
		Square,
		Check,
		ArrowUpDown,
		Download,
		X
	} from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();

	// Use IIFE to bypass Svelte 5 "reference only captures initial value" warning/error
	let initialAllFiles = (() => data.allFiles)();
	let initialRecentFiles = (() => data.recentFiles)();

	let searchQuery = $state('');
	let allFiles = $state(initialAllFiles);
	let recentFiles = $state(initialRecentFiles);

	let activeTab = $state('View all');
	const tabs = ['View all', 'PDF', 'Documents', 'Images'];

	let filteredFiles = $derived.by(() => {
		let result = activeTab === 'View all' ? allFiles :
			activeTab === 'PDF' ? allFiles.filter((f: any) => f.type === 'pdf') :
			activeTab === 'Documents' ? allFiles.filter((f: any) => ['doc', 'docx'].includes(f.type)) :
			activeTab === 'Images' ? allFiles.filter((f: any) => ['image', 'png', 'jpg', 'jpeg'].includes(f.type)) :
			allFiles;

		if (searchQuery.trim()) {
			const lower = searchQuery.toLowerCase();
			result = result.filter((f: any) => f.name.toLowerCase().includes(lower));
		}
		
		return result;
	});

	function getFileIcon(type: string) {
		switch (type) {
			case 'pdf': return FileText;
			case 'doc': 
			case 'docx': return FileText;
			case 'sheet':
			case 'csv': return FileSpreadsheet;
			case 'image':
			case 'png':
			case 'jpg':
			case 'jpeg': return ImageIcon;
			case 'ppt': return FileIconLucide;
			default: return FileIconLucide;
		}
	}
	
	function getFileIconColorBg(type: string) {
		switch (type) {
			case 'pdf': return 'text-rose-500 bg-rose-50';
			case 'doc': 
			case 'docx': return 'text-gray-500 bg-gray-50';
			case 'sheet':
			case 'csv': return 'text-emerald-500 bg-emerald-50';
			case 'image':
			case 'png':
			case 'jpg':
			case 'jpeg': return 'text-blue-500 bg-blue-50';
			case 'ppt': return 'text-orange-500 bg-orange-50';
			default: return 'text-gray-400 bg-gray-50';
		}
	}

	function getFileIconColor(type: string) {
		switch (type) {
			case 'pdf': return 'text-rose-500';
			case 'doc': 
			case 'docx': return 'text-gray-500';
			case 'sheet':
			case 'csv': return 'text-emerald-500';
			case 'image':
			case 'png':
			case 'jpg':
			case 'jpeg': return 'text-blue-500';
			case 'ppt': return 'text-orange-500';
			default: return 'text-gray-400';
		}
	}
	
	let selectedRows = $state<number[]>([]);
	function toggleRow(id: number) {
		if (selectedRows.includes(id)) {
			selectedRows = selectedRows.filter(r => r !== id);
		} else {
			selectedRows = [...selectedRows, id];
		}
	}

	let selectedDocument = $state<any>(null);

	function openPreview(file: any) {
		selectedDocument = file;
	}

	function closePreview() {
		selectedDocument = null;
	}

	let fileInput: HTMLInputElement;

	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		
		if (files && files.length > 0) {
			const file = files[0];
			
			// Mock determining file type
			let type = 'doc';
			if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) type = 'pdf';
			else if (file.type.startsWith('image/')) type = 'image';
			else if (file.name.endsWith('.csv') || file.name.endsWith('.xlsx')) type = 'sheet';

			const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
			const today = new Date().toLocaleDateString('en-US', dateOptions);
			
			const newFile = {
				id: Math.random(), 
				name: file.name,
				type: type,
				orderId: '#ORD-NEW',
				dateCreated: today,
				date: today,
				owner: { name: 'Omar', initials: 'OM' },
				url: '#'
			};

			// Add to very top
			allFiles = [newFile, ...allFiles];
			recentFiles = [newFile, ...recentFiles].slice(0, 4);

			target.value = ''; // Reset
		}
	}
</script>

<div class="flex h-full min-h-screen gap-6 pb-8 font-sans transition-all duration-300">
	<!-- Main Content Area -->
	<div class="flex-1 space-y-8 overflow-hidden transition-all duration-300">
		<!-- Header -->
		<div class="flex items-center justify-between">
			<h1 class="text-[22px] font-semibold tracking-tight text-gray-900">My Documents</h1>
			<input 
				type="file" 
				class="hidden" 
				bind:this={fileInput}
				onchange={handleFileUpload}
			/>
			<button 
				onclick={() => fileInput.click()}
				class="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
			>
				<Upload class="h-4 w-4" />
				Upload File
			</button>
		</div>

		<!-- Recent Files -->
		<div class="space-y-4 pt-2">
			<h2 class="text-[15px] font-bold text-gray-900">Recent Files</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
				{#each recentFiles as file}
					{@const Icon = getFileIcon(file.type)}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div 
						onclick={() => openPreview(file)}
						class="group flex cursor-pointer items-center gap-3.5 rounded-2xl border {selectedDocument?.id === file.id ? 'border-[#A100FF] bg-purple-50/20 shadow-md' : 'border-gray-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:shadow-md'} p-3.5 transition-all"
					>
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-100 shadow-sm {getFileIconColorBg(file.type)}">
							<Icon class="h-[18px] w-[18px]" />
						</div>
						<div class="flex flex-col overflow-hidden">
							<span class="truncate text-[13px] font-semibold text-gray-900 transition-colors group-hover:text-[#A100FF]" title={file.name}>{file.name}</span>
							<span class="text-[11px] font-medium text-gray-400">{file.date}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- All Files -->
		<div class="space-y-4 pt-4">
			<h2 class="text-[15px] font-bold text-gray-900">All Files</h2>
			
			<!-- Filters and Search -->
			<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div class="flex gap-1 rounded-lg bg-gray-100/80 p-1">
					{#each tabs as tab}
						<button 
							onclick={() => activeTab = tab}
							class="rounded-md px-3.5 py-1.5 text-[13px] font-semibold transition-all {activeTab === tab ? 'bg-white text-gray-900 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]' : 'text-gray-500 hover:text-gray-900'}"
						>
							{tab}
						</button>
					{/each}
				</div>
				
				<div class="flex items-center gap-2.5">
					<div class="relative">
						<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
						<input 
							type="text" 
							placeholder="Search file..."
							bind:value={searchQuery}
							class="h-[38px] w-[220px] rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-[13px] font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#A100FF] focus:outline-none focus:ring-1 focus:ring-[#A100FF]"
						/>
					</div>
				</div>
			</div>

			<!-- Table -->
			<div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
				<div class="overflow-x-auto">
					<table class="w-full whitespace-nowrap text-left text-[13px] text-gray-600">
						<thead class="bg-gray-50/10 text-[12px] font-medium text-gray-400">
							<tr>
								<th class="w-10 px-5 py-4">
									<button class="text-gray-200 transition-colors hover:text-gray-300">
										<Square class="h-[18px] w-[18px] rounded-sm" />
									</button>
								</th>
								<th class="px-5 py-4">
									<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
										Filename <ArrowUpDown class="h-3 w-3 text-gray-300" />
									</div>
								</th>
								<th class="px-5 py-4">
									<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
										Order ID <ArrowUpDown class="h-3 w-3 text-gray-300" />
									</div>
								</th>
								<th class="px-5 py-4">
									<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
										Date Created <ArrowUpDown class="h-3 w-3 text-gray-300" />
									</div>
								</th>
								<th class="px-5 py-4">
									<div class="flex cursor-pointer items-center gap-1.5 hover:text-gray-700">
										Owner <ArrowUpDown class="h-3 w-3 text-gray-300" />
									</div>
								</th>
								<th class="w-16 px-5 py-4 text-center">Action</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-100/80 border-t border-gray-100/80">
							{#each filteredFiles as file}
								{@const Icon = getFileIcon(file.type)}
								{@const isSelected = selectedRows.includes(file.id)}
								<tr 
									class="group cursor-pointer transition-colors hover:bg-gray-50/60 {selectedDocument?.id === file.id ? 'bg-purple-50/10' : ''}"
									onclick={(e) => {
										// Don't open preview if clicking the checkbox
										if (!(e.target as HTMLElement).closest('button')) {
											openPreview(file);
										}
									}}
								>
									<td class="px-5 py-3.5">
										<button 
											onclick={(e) => {
												e.stopPropagation();
												toggleRow(file.id);
											}}
											class="transition-colors {isSelected ? 'text-[#A100FF]' : 'text-gray-200'} group-hover:opacity-100"
										>
											{#if isSelected}
												<div class="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-[#A100FF] bg-[#A100FF]/5">
													<Check class="h-3.5 w-3.5 stroke-[3] text-[#A100FF]" />
												</div>
											{:else}
												<Square class="h-[18px] w-[18px] rounded-sm text-gray-200 group-hover:text-gray-300 opacity-60 group-hover:opacity-100" />
											{/if}
										</button>
									</td>
									<td class="px-5 py-3.5">
										<div class="flex items-center gap-3">
											<Icon class="h-4 w-4 {getFileIconColor(file.type)}" />
											<span class="max-w-[140px] truncate font-semibold text-gray-900 sm:max-w-xs">{file.name}</span>
										</div>
									</td>
									<td class="px-5 py-3.5 font-medium text-gray-900">{file.orderId}</td>
									<td class="px-5 py-3.5 text-[12px] font-medium text-gray-500">{file.dateCreated}</td>
									<td class="px-5 py-3.5">
										<div class="flex items-center gap-2">
											<div class="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200/50 bg-gray-100 text-[10px] font-semibold text-gray-500">
												{file.owner?.initials || 'OM'}
											</div>
											<span class="text-[12px] font-medium text-gray-500">{file.owner?.name || 'Omar'}</span>
										</div>
									</td>
									<td class="px-5 py-3.5 text-center">
										<button 
											class="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
											onclick={(e) => e.stopPropagation()}
											title="Download"
										>
											<Download class="h-[18px] w-[18px]" />
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
					
					{#if filteredFiles.length === 0}
						<div class="flex flex-col items-center justify-center py-12 text-center">
							<div class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
								<FileIconLucide class="h-6 w-6 text-gray-300" />
							</div>
							<h3 class="text-sm font-semibold text-gray-900">No files found</h3>
							<p class="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
						</div>
					{/if}
				</div>

				<!-- Pagination Footer -->
				<div class="flex items-center justify-between border-t border-gray-100 bg-white px-5 py-4 text-[12px] font-medium text-gray-500">
					<div>{selectedRows.length || 1} of {filteredFiles.length} row(s) selected.</div>
					<div class="flex items-center gap-5">
						<span>Page 1 of 1</span>
						<div class="flex items-center gap-1.5">
							<button class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50">
								<ChevronLeft class="h-3 w-3" />
							</button>
							<button class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600">
								<ChevronRight class="h-3 w-3" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Preview Panel Sidebar (40%) -->
	{#if selectedDocument}
		<div transition:slide={{ axis: 'x', duration: 300 }} class="flex w-[400px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] xl:w-[480px]">
			<!-- Preview Header -->
			<div class="flex items-center justify-between border-b border-gray-100 px-5 py-4">
				<h3 class="font-semibold text-gray-900 truncate pr-4">{selectedDocument.name}</h3>
				<button 
					onclick={closePreview}
					class="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
				>
					<X class="h-4 w-4" />
				</button>
			</div>

			<!-- Preview Body (Scrollable) -->
			<div class="flex-1 overflow-y-auto p-5">
				<div class="flex aspect-[3/4] w-full items-center justify-center rounded-lg border border-gray-100 bg-gray-50/50 mb-6 relative group overflow-hidden">
					{#if ['pdf', 'doc', 'docx'].includes(selectedDocument.type)}
						<FileText class="h-16 w-16 text-gray-300" />
					{:else if ['image', 'png', 'jpg', 'jpeg'].includes(selectedDocument.type)}
						<ImageIcon class="h-16 w-16 text-gray-300" />
					{:else}
						<FileIconLucide class="h-16 w-16 text-gray-300" />
					{/if}
					
					<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
						<button class="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm shadow-sm hover:bg-gray-50 transition-colors">
							<Upload class="h-4 w-4" />
							Open Fullscreen
						</button>
					</div>
				</div>

				<div class="space-y-4">
					<div>
						<h4 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">File Details</h4>
						<div class="grid grid-cols-2 gap-y-3 text-sm">
							<div class="text-gray-500">Order ID:</div>
							<div class="font-medium text-gray-900">{selectedDocument.orderId || 'N/A'}</div>
							
							<div class="text-gray-500">Date Created:</div>
							<div class="font-medium text-gray-900">{selectedDocument.dateCreated || selectedDocument.date || 'N/A'}</div>
							
							<div class="text-gray-500">Type:</div>
							<div class="font-medium text-gray-900 uppercase">{selectedDocument.type}</div>
							
							<div class="text-gray-500">Size:</div>
							<div class="font-medium text-gray-900">2.4 MB</div>
						</div>
					</div>

					<div class="border-t border-gray-100 pt-4">
						<h4 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Owner</h4>
						<div class="flex items-center gap-3">
							<div class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200/50 bg-gray-100 text-[11px] font-bold text-gray-600">
								{selectedDocument.owner?.initials || 'OM'}
							</div>
							<div class="flex flex-col">
								<span class="text-sm font-semibold text-gray-900">{selectedDocument.owner?.name || 'Omar'}</span>
								<span class="text-xs text-gray-500">Client / Member</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Preview Footer -->
			<div class="border-t border-gray-100 p-5">
				<button class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A100FF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8A00DB]">
					<Download class="h-4 w-4" />
					Download Document
				</button>
			</div>
		</div>
	{/if}
</div>
