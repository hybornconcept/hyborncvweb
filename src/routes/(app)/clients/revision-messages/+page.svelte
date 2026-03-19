<script lang="ts">
	import { UploadCloud, Check, X } from '@lucide/svelte';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';

	let { data } = $props();

	// Form state
	let selectedOrder = $state('');
	let message = $state('');
	let selectedType = $state('Revision Request');

	// Mock Orders (relevant for client)
	const orders = [
		{ id: '1', name: 'CV Writing - Order #ORD-0012' },
		{ id: '2', name: 'LinkedIn Makeover - Order #ORD-0013' }
	];

	// Mock Message Types
	const messageTypes = [
		{ value: 'Revision Request', label: 'Revision Request' },
		{ value: 'General Message', label: 'General Message' },
		{ value: 'Inquiry', label: 'Inquiry' }
	];

	// File upload state
	let uploadedFiles: { file: File; size: string; progress: number }[] = $state([]);

	function handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const newFiles = Array.from(input.files || []);

		// Duplicate check
		const existingFileNames = new Set(uploadedFiles.map((f) => f.file.name + f.file.size));

		const validFiles = newFiles.filter((file) => {
			if (existingFileNames.has(file.name + file.size)) return false;
			if (file.size > 10 * 1024 * 1024) return false;
			return true;
		});

		validFiles.forEach((file) => {
			const size = formatFileSize(file.size);
			const newUpload = { file, size, progress: 0 };
			uploadedFiles = [...uploadedFiles, newUpload];
			simulateUpload(newUpload);
		});

		input.value = '';
	}

	function simulateUpload(upload: any) {
		let prg = 0;
		const interval = setInterval(() => {
			prg += 10;
			const idx = uploadedFiles.findIndex((f) => f.file === upload.file);
			if (idx !== -1) {
				uploadedFiles[idx].progress = prg;
			}
			if (prg >= 100) clearInterval(interval);
		}, 200);
	}

	function removeFile(file: File) {
		uploadedFiles = uploadedFiles.filter((f) => f.file !== file);
	}

	function formatFileSize(bytes: number): string {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
	}
</script>

<div class="space-y-8 pb-12 font-sans">
	<!-- Header Section -->
	<div class="space-y-1">
		<h1 class="text-[22px] font-semibold tracking-tight text-gray-900">{data.pageInfo.greeting}</h1>
		<p class="text-[13px] text-gray-500">{data.pageInfo.subtext}</p>
	</div>

	<!-- Main Form Layout (Duplicated from Admin Uploads) -->
	<div class="rounded-lg border border-gray-100 bg-white shadow-sm">
		<!-- Form body -->
		<div class="mx-auto max-w-6xl space-y-6 px-8 py-8 text-left">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<!-- Left Column: Message & Type -->
				<div class="flex flex-col gap-6">
					<div>
						<Label for="type" class="mb-3 block text-sm font-bold text-gray-900">Message Type</Label
						>
						<Select.Root
							type="single"
							bind:value={selectedType}
							onValueChange={(v) => (selectedType = v)}
						>
							<Select.Trigger
								class="h-[52px] w-full rounded-2xl border border-gray-100 bg-[#FAFAFA] px-5 text-sm font-medium text-gray-900 focus:ring-4 focus:ring-purple-100"
							>
								{selectedType || 'Select type...'}
							</Select.Trigger>
							<Select.Content class="rounded-xl border-gray-100 shadow-xl">
								{#each messageTypes as type}
									<Select.Item value={type.value} class="text-sm font-medium"
										>{type.label}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<div class="flex flex-col">
						<Label for="message" class="mb-3 block text-sm font-bold text-gray-900"
							>Message / Request Details</Label
						>
						<Textarea
							id="message"
							bind:value={message}
							placeholder="Describe your revision request or leave a message for your writer..."
							class="h-[180px] w-full resize-none rounded-2xl border border-gray-100 bg-[#FAFAFA] px-5 py-4 text-sm font-medium text-gray-900 focus:ring-4 focus:ring-purple-100"
						/>
					</div>
				</div>

				<!-- Right Column: Order & Upload -->
				<div class="flex flex-col gap-6">
					<!-- Select Order -->
					<div class="relative">
						<Label for="order" class="mb-3 block text-sm font-bold text-gray-900"
							>Select Order ID</Label
						>
						<Select.Root
							type="single"
							bind:value={selectedOrder}
							onValueChange={(v) => (selectedOrder = v)}
						>
							<Select.Trigger
								class="h-[52px] w-full rounded-2xl border border-gray-100 bg-[#FAFAFA] px-5 text-sm font-medium text-gray-900 focus:ring-4 focus:ring-purple-100"
							>
								{orders.find((o) => o.id === selectedOrder)?.name || 'Select an order...'}
							</Select.Trigger>
							<Select.Content class="rounded-xl border-gray-100 shadow-xl">
								{#each orders as order}
									<Select.Item value={order.id} class="text-sm font-medium"
										>{order.name}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<!-- Upload Area -->
					<div class="flex flex-col">
						<Label class="mb-3 block text-sm font-bold text-gray-900">Attachments (Optional)</Label>
						<div
							class="group relative flex h-[180px] cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-gray-200 bg-[#FAFAFA] px-6 py-6 text-center transition-all hover:bg-white hover:shadow-md"
						>
							<div
								class="absolute inset-0 rounded-[2rem] bg-[#A100FF]/5 opacity-0 transition-opacity group-hover:opacity-100"
							></div>
							<div class="relative z-10 flex flex-col items-center">
								<div
									class="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#A100FF]/10 text-[#A100FF]"
								>
									<UploadCloud class="h-6 w-6" />
								</div>
								<div class="space-y-1">
									<h2 class="mb-0.5 text-sm font-bold text-gray-900">Upload Files</h2>
									<p class="mb-3 max-w-xs text-[10px] font-medium text-gray-500">
										PDF, DOCX &lt; <span class="font-bold text-[#A100FF]">30 MB</span> • Photos &lt;
										<span class="font-bold text-[#A100FF]">5 MB</span>
									</p>
									<Button
										variant="secondary"
										class="pointer-events-none h-8 rounded-lg bg-[#A100FF] px-6 text-[11px] font-bold text-white shadow-lg transition-all"
									>
										Browse Files
									</Button>
								</div>
							</div>
							<input
								type="file"
								multiple
								class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
								onchange={handleFileUpload}
							/>
						</div>

						<!-- File List -->
						{#if uploadedFiles.length > 0}
							<div class="mt-4 grid grid-cols-1 gap-2">
								{#each uploadedFiles as upload}
									<div
										class="flex flex-col rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
									>
										<div class="flex items-center justify-between">
											<div class="flex items-center gap-3">
												<div
													class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A100FF]/10 text-[#A100FF]"
												>
													<Check class="h-5 w-5" />
												</div>
												<div class="flex flex-col">
													<span class="max-w-[150px] truncate text-[13px] font-bold text-gray-900"
														>{upload.file.name}</span
													>
													<span class="text-[11px] font-medium text-gray-500">{upload.size}</span>
												</div>
											</div>
											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8 rounded-lg text-gray-400 hover:bg-rose-50 hover:text-rose-600"
												onclick={() => removeFile(upload.file)}
											>
												<X class="h-4 w-4" />
											</Button>
										</div>

										<!-- Progress Bar -->
										{#if upload.progress < 100}
											<div class="mt-2 h-1 w-full rounded-full bg-gray-50">
												<div
													class="h-1 rounded-full bg-gradient-to-r from-[#E100FF] to-[#7F00FF] transition-all duration-300"
													style="width: {upload.progress}%"
												></div>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Large Bottom Submit Button -->
			<div class="pt-6">
				<Button
					class="w-full rounded-2xl bg-[#A100FF] py-7 text-base font-bold text-white shadow-xl shadow-[#A100FF]/20 transition-all hover:bg-[#8A00DB] active:scale-[0.99]"
				>
					Send Request
				</Button>
			</div>
		</div>
	</div>
</div>
