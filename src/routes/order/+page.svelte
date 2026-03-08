<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import FormSelect from '$lib/components/FormSelect.svelte';
	import { orderSchema, validateStep1, validateStep2, type OrderSchema } from '$lib/schema';
	import { careerlevelOptions, additional, packageOptions, steps } from '$lib';
	import { Upload, X, Check } from 'lucide-svelte';
	import OrderSummaryCard from '$lib/components/OrderSummaryCard.svelte';
	import StepsIndicator from '$lib/components/StepsIndicator.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import FormStep from '$lib/components/FormStep.svelte';
	import { type SuperValidated, type Infer, superForm, filesProxy } from 'sveltekit-superforms';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	import { zod } from 'sveltekit-superforms/adapters';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { CalendarIcon } from 'lucide-svelte';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { page } from '$app/state';
	import { slide, fade } from 'svelte/transition';

	let { data }: { data: { form: SuperValidated<Infer<OrderSchema>> } } = $props();
	let currentStep = $state(1);
	let isSubmitted = $state(false);
	let uploadedFiles: UploadedFile[] = $state([]);
	let uploadProgress: Record<number, number> = $state({});
	let showErrors = $state(false);
	let isExpanded = $state(false);

	// Ensure no errors are shown on initial load
	if (data?.form) {
		data.form.errors = {};
	}

	const form = superForm<OrderSchema>(data.form, {
		validators: zod(orderSchema),
		validationMethod: 'onsubmit',
		taintedMessage: null,
		errorSelector: 'error-message',
		dataType: 'json',
		onSubmit: async ({ formData, cancel }) => {
			showErrors = true;
			const isValid = await validateCurrentStep();
			if (!isValid) {
				cancel();
				return;
			}

			if (currentStep < totalSteps) {
				currentStep++;
				showErrors = false;
				cancel();
				return;
			}
		},
		onUpdated: ({ form }) => {
			if (form.valid) {
				isSubmitted = true;
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
	});

	const { form: formData, enhance, delayed, errors } = form;
	const files = filesProxy<OrderSchema, 'documents'>(form, 'documents');

	let totalSteps = 2;

	// Function to validate current step before proceeding
	async function validateCurrentStep() {
		showErrors = true;

		if (currentStep === 1) {
			const step1Data = {
				fullname: $formData.fullname,
				jobtitle: $formData.jobtitle,
				careerlevel: $formData.careerlevel,
				package: $formData.package,
				services: $formData.services
			};
			const result = validateStep1(step1Data);
			if (!result.success) {
				$errors.fullname = undefined;
				$errors.jobtitle = undefined;
				$errors.careerlevel = undefined;
				$errors.package = undefined;
				result.error.issues.forEach((issue) => {
					if (issue.path[0]) $errors[issue.path[0] as keyof typeof $errors] = [issue.message];
				});
			} else {
				$errors.fullname = undefined;
				$errors.jobtitle = undefined;
				$errors.careerlevel = undefined;
				$errors.package = undefined;
			}
			return result.success;
		} else {
			const step2Data = {
				phone: $formData.phone,
				comments: $formData.comments,
				joblink: $formData.joblink,
				documents: Array.from($files || []),
				deadline: $formData.deadline
			};
			const result = validateStep2(step2Data);
			if (!result.error) {
				$errors.phone = undefined;
				$errors.comments = undefined;
				$errors.joblink = undefined;
				$errors.documents = undefined;
				$errors.deadline = undefined;
			} else {
				$errors.phone = undefined;
				$errors.comments = undefined;
				$errors.joblink = undefined;
				$errors.documents = undefined;
				$errors.deadline = undefined;
				result.error.issues.forEach((issue) => {
					if (issue.path[0]) $errors[issue.path[0] as keyof typeof $errors] = [issue.message];
				});
			}
			return result.success;
		}
	}

	// Update the nextStep function
	async function nextStep() {
		const isValid = await validateCurrentStep();
		if (isValid && currentStep < totalSteps) {
			currentStep++;
			showErrors = false;
		}
	}

	function previousStep() {
		if (currentStep > 1) {
			currentStep--;
			showErrors = false;
		}
	}

	// +++++++++++++++++++++++++++++++++++++
	// Update uploadedFiles type
	type UploadedFile = {
		file: File;
		progress: number;
		size: string;
		error?: string;
	};

	function handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const newFiles = Array.from(input.files || []);

		// Check for duplicate files
		const existingFileNames = new Set(Array.from($files || []).map((f) => `${f.name}-${f.size}`));

		const validFiles = newFiles.filter((file) => {
			const fileIdentifier = `${file.name}-${file.size}`;
			if (existingFileNames.has(fileIdentifier)) {
				return false; // Skip duplicate files
			}
			if (file.size > 5 * 1024 * 1024) {
				return false; // Skip files over 5MB
			}
			return true;
		});

		validFiles.forEach((file) => {
			const size = formatFileSize(file.size);
			uploadedFiles = [
				...uploadedFiles,
				{
					file,
					progress: 0,
					size
				}
			];
			simulateUpload(file);
		});

		if (validFiles.length > 0) {
			files.update(($files) => [...($files || []), ...validFiles]);
		}
	}

	function simulateUpload(file: File) {
		const index = uploadedFiles.findIndex((f) => f.file === file);
		let progress = 0;
		const interval = setInterval(() => {
			progress += 10;
			uploadProgress[index] = progress;
			if (progress >= 100) {
				clearInterval(interval);
			}
		}, 300);
	}

	function removeFile(file: File) {
		uploadedFiles = uploadedFiles.filter((f) => f.file !== file);
		files.update(($files) => Array.from($files || []).filter((f) => f !== file));
	}

	const df = new DateFormatter('en-US', { dateStyle: 'long' });
	let deadlineValue = $state<DateValue | undefined>();
	let placeholder = $state(today(getLocalTimeZone()));

	$effect(() => {
		try {
			deadlineValue = $formData?.deadline ? parseDate($formData.deadline) : undefined;
		} catch (e) {
			console.error('Invalid date format:', $formData?.deadline);
			deadlineValue = undefined;
		}
	});

	function formatFileSize(bytes: number): string {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
	}

	// Pre-select package from query parameter
	$effect(() => {
		const pkg = page.url.searchParams.get('package');
		if (pkg && packageOptions.some((opt) => opt.value === pkg)) {
			$formData.package = pkg;
		}
	});
</script>

<div class="min-h-screen bg-[#F5F1FF] px-4 py-4 md:px-8 md:py-2">
	<div class="flex h-full items-center justify-center">
		<div
			class="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl lg:flex-row"
		>
			<!-- Left side - Form -->
			<div class="flex h-full w-full flex-col px-4 py-6 md:px-8 lg:w-[60%] lg:py-4">
				<!-- Updated Form Header -->
				<h1
					class="mb-2 bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text px-5 py-4 text-3xl font-bold text-transparent"
				>
					Place Your Order
				</h1>

				<!-- Updated Step Indicator -->
				<div class="mx-5 mb-2">
					<div class="mb-2 text-sm text-gray-500">STEP {currentStep} OF {totalSteps}</div>
					<h2 class="text-md mb-4 font-semibold text-gray-900">
						{#if currentStep === 1}
							Choose Service
						{:else if currentStep === 2}
							Additional Information & Documents
						{/if}
					</h2>
					<div class="flex w-full gap-2">
						{#each Array(totalSteps) as _, i}
							<div
								class="h-1 flex-1 rounded-full transition-all duration-300"
								class:bg-gradient-to-r={i < currentStep}
								class:from-[#E100FF]={i < currentStep}
								class:to-[#7F00FF]={i < currentStep}
								class:bg-gray-200={i >= currentStep}
							></div>
						{/each}
					</div>
				</div>

				<div class="relative flex-1 overflow-hidden">
					{#if isSubmitted}
						<div
							class="flex h-full flex-col items-center justify-center px-5 py-12 text-center"
							transition:fade
						>
							<div
								class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600"
							>
								<Check class="h-10 w-10" />
							</div>
							<h2 class="mb-2 text-3xl font-bold text-gray-900">Order Placed!</h2>
							<p class="mb-8 max-w-sm text-gray-500">
								Thank you! Your order has been successfully submitted. Our team will contact you
								shortly to begin working on your professional documents.
							</p>
							<Button
								href="/"
								class="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] px-8 text-white hover:opacity-90"
							>
								Back to Home
							</Button>
						</div>
					{:else}
						<form method="POST" enctype="multipart/form-data" use:enhance class="mx-5">
							<!-- Step 1: Patient Information -->
							{#if currentStep === 1}
								<FormStep>
									<div class="space-y-4">
										<Form.Field {form} name="fullname">
											<Form.Control>
												{#snippet children({ props })}
													<Form.Label>Full Name</Form.Label>
													<Input
														{...props}
														bind:value={$formData.fullname}
														placeholder="Enter the exact format you want on the Resume"
													/>
												{/snippet}
											</Form.Control>
											{#if $errors.fullname}
												<p class="mt-1 text-sm text-red-500">{$errors.fullname}</p>
											{/if}
										</Form.Field>

										<Form.Field {form} name="jobtitle">
											<Form.Control>
												{#snippet children({ props })}
													<Form.Label>Job Title</Form.Label>
													<Input
														{...props}
														bind:value={$formData.jobtitle}
														placeholder="e.g Pharm sales rep, Medical doctor, Community Pharm"
														class={cn(
															'focus-visible:ring-[#7F00FF]',
															showErrors && $errors.jobtitle ? 'border-red-500' : 'border-input'
														)}
													/>
												{/snippet}
											</Form.Control>
											{#if showErrors && $errors.jobtitle}
												<p class="mt-1 text-sm text-red-500">{$errors.jobtitle}</p>
											{/if}
										</Form.Field>

										<FormSelect
											{form}
											name="careerlevel"
											formLabel="Career Level"
											options={careerlevelOptions}
											placeholder="Select your career level"
											{showErrors}
										/>

										<FormSelect
											{form}
											name="package"
											formLabel="Package"
											options={packageOptions}
											placeholder="Select your package"
											{showErrors}
										/>

										<Form.Field
											{form}
											name="services"
											class="relative flex flex-col gap-4 rounded-md border p-4"
										>
											<Form.Control>
												{#snippet children({ props })}
													<Form.Label class="text-base font-semibold"
														>Additional Services</Form.Label
													>
													<div
														class="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3"
													>
														{#each additional as service, i (service.id)}
															<div
																transition:slide={{ duration: 300 }}
																class={cn(
																	'flex items-center space-x-2 rounded border border-transparent bg-gray-50/50 p-2 transition-colors hover:border-gray-200',
																	i >= 6 && !isExpanded && 'hidden lg:flex'
																)}
															>
																<Checkbox
																	id={service.id}
																	class="data-[state=checked]:border-[#7F00FF] data-[state=checked]:bg-[#7F00FF]"
																	checked={$formData.services?.[service.id] ?? false}
																	onCheckedChange={(checked) => {
																		$formData.services = {
																			...$formData.services,
																			[service.id]: !!checked
																		};
																	}}
																/>
																<Form.Label
																	for={service.id}
																	class="cursor-pointer text-xs font-medium leading-tight text-gray-900"
																>
																	{service.label}
																</Form.Label>
															</div>
														{/each}
													</div>

													{#if !isExpanded}
														<div
															class="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-white via-white/80 to-transparent pb-2 lg:hidden"
														>
															<Button
																variant="outline"
																size="sm"
																class="rounded-full border-[#7F00FF] text-[#7F00FF] hover:bg-[#7F00FF] hover:text-white"
																onclick={() => (isExpanded = true)}
															>
																More (+{additional.length - 6})
															</Button>
														</div>
													{/if}
												{/snippet}
											</Form.Control>
										</Form.Field>
									</div>
								</FormStep>

								<!-- Step 2: Additional Information -->
							{:else}
								<FormStep>
									<div class="space-y-6">
										<Form.Field {form} name="phone">
											<Form.Control>
												{#snippet children({ props })}
													<Form.Label>Phone Number</Form.Label>
													<Input
														{...props}
														type="tel"
														bind:value={$formData.phone}
														placeholder="Enter your phone number"
													/>
												{/snippet}
											</Form.Control>
											{#if $errors.phone}
												<p class="mt-1 text-sm text-red-500">{$errors.phone}</p>
											{/if}
										</Form.Field>

										<Form.Field {form} name="comments">
											<Form.Control>
												{#snippet children({ props })}
													<Form.Label>Additional Information/Instructions for the Job</Form.Label>
													<Textarea
														{...props}
														bind:value={$formData.comments}
														placeholder="Please provide more information about this order (if any)"
													/>
												{/snippet}
											</Form.Control>
											{#if $errors.comments}
												<p class="mt-1 text-sm text-red-500">{$errors.comments}</p>
											{/if}
										</Form.Field>

										<Form.Field {form} name="documents">
											<Form.Control>
												{#snippet children({ props })}
													<Form.Label>Upload Documents</Form.Label>
													<div
														class="rounded-lg border-2 border-dashed border-gray-300 p-2 text-center transition-colors hover:border-gray-400"
													>
														<div class="relative flex flex-col items-center justify-center">
															<div class="mb-2">
																<Upload class="h-6 w-6 text-gray-400" />
															</div>
															<div class="space-y-0.5">
																<p class="text-sm font-medium">Drag & Drop your files here</p>
																<p class="text-xs text-gray-500">or</p>
																<Button variant="outline" type="button" size="sm" class="my-0.5"
																	>Browse Files</Button
																>
																<p class="text-xs text-gray-400">
																	Maximum file size: 10MB • Supported formats: JPG, JPEG, PNG, PDF,
																	DOC, DOCX
																</p>
															</div>
															<input
																type="file"
																multiple
																name="documents"
																accept=".jpg,.jpeg,.png,.doc,.docx,.pdf"
																class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
																onchange={handleFileUpload}
															/>
														</div>
													</div>

													<!-- File List -->
													{#if $files?.length}
														<div class="mt-4 space-y-3">
															<div class="text-sm font-medium text-gray-700">Uploaded Files</div>
															{#each Array.from($files) as file, i}
																<div class="rounded-lg border bg-white p-3">
																	<div class="mb-1 flex items-center justify-between">
																		<div class="flex items-center space-x-2">
																			<div class="rounded bg-gray-100 p-1.5">
																				<Upload class="h-3 w-3 text-gray-600" />
																			</div>
																			<div>
																				<p class="text-sm font-medium text-gray-900">{file.name}</p>
																				<p class="text-xs text-gray-500">
																					{formatFileSize(file.size)}
																				</p>
																			</div>
																		</div>
																		<button
																			type="button"
																			class="text-gray-400 hover:text-gray-500"
																			onclick={() => {
																				files.update(($files) =>
																					Array.from($files).filter((f) => f !== file)
																				);
																			}}
																		>
																			<X class="h-4 w-4" />
																		</button>
																	</div>
																	<!-- Progress Bar -->
																	{#if uploadProgress[i]}
																		<div class="h-1 w-full rounded-full bg-gray-100">
																			<div
																				class="h-1 rounded-full bg-blue-600 transition-all duration-300"
																				style="width: {uploadProgress[i]}%"
																			></div>
																		</div>

																		<div class="mt-0.5 flex justify-end">
																			<span class="text-xs text-gray-500">{uploadProgress[i]}%</span
																			>
																		</div>
																	{/if}
																</div>
															{/each}
														</div>
													{/if}
												{/snippet}
											</Form.Control>
											{#if $errors.documents}
												<p class="mt-1 text-sm text-red-500">{$errors.documents}</p>
											{/if}
										</Form.Field>

										<Form.Field {form} name="joblink">
											<Form.Control>
												{#snippet children({ props })}
													<Form.Label>Direct link to the job (Optional)</Form.Label>
													<Input
														{...props}
														bind:value={$formData.joblink}
														placeholder="Paste the job link here"
													/>
												{/snippet}
											</Form.Control>
											{#if $errors.joblink}
												<p class="mt-1 text-sm text-red-500">{$errors.joblink}</p>
											{/if}
										</Form.Field>

										<Form.Field {form} name="deadline" class="flex flex-col">
											<Form.Control>
												{#snippet children({ props })}
													<Form.Label>Deadline (Expected date for job delivery)</Form.Label>
													<Popover.Root>
														<Popover.Trigger {...props}>
															{#snippet child({ props })}
																<Button
																	variant="outline"
																	class={cn(
																		'w-full justify-start pl-4 text-left font-normal',
																		!deadlineValue && 'text-muted-foreground'
																	)}
																	{...props}
																>
																	{deadlineValue
																		? df.format(deadlineValue.toDate(getLocalTimeZone()))
																		: 'Select deadline'}
																	<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
																</Button>
															{/snippet}
														</Popover.Trigger>
														<Popover.Content class="w-auto p-0" side="bottom">
															<Calendar
																type="single"
																value={deadlineValue}
																bind:placeholder
																minValue={today(getLocalTimeZone())}
																maxValue={new CalendarDate(
																	today(getLocalTimeZone()).year + 1,
																	today(getLocalTimeZone()).month,
																	today(getLocalTimeZone()).day
																)}
																calendarLabel="Deadline"
																onValueChange={(v) => {
																	if (v) {
																		$formData.deadline = v.toString();
																	} else {
																		$formData.deadline = '';
																	}
																}}
															/>
														</Popover.Content>
													</Popover.Root>
													<Form.FieldErrors />
													<input hidden value={$formData.deadline} name={props.name} />
												{/snippet}
											</Form.Control>
										</Form.Field>
									</div>
								</FormStep>
							{/if}

							<!-- Navigation Buttons -->
							<div class="mt-6 flex justify-between">
								<Button
									type="button"
									variant="outline"
									onclick={previousStep}
									disabled={currentStep === 1}
								>
									Previous
								</Button>

								{#if currentStep === totalSteps}
									<Form.Button
										type="submit"
										class="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white hover:opacity-90"
									>
										<!-- disabled={!form.valid || $delayed} -->
										{$delayed ? 'Submitting...' : 'Submit'}
									</Form.Button>
								{:else}
									<Button
										type="button"
										onclick={nextStep}
										class="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white hover:opacity-90"
									>
										Next
									</Button>
								{/if}
							</div>
						</form>
					{/if}
				</div>
			</div>

			<!-- Right side - Contact Information -->
			<div class="flex w-full flex-col space-y-6 bg-[#f2f6ff] p-6 md:p-10 lg:w-[40%]">
				<!-- Logo Section -->
				<div class="flex items-center gap-2">
					<img src="hylogo2.png" alt="company logo" class="my-auto h-8 w-8" />
					<h1 class="text-bold my-auto text-xl font-semibold text-gray-900">HYBORN CV</h1>
				</div>

				<!-- Order Summary Section -->
				<div class="flex-none">
					<OrderSummaryCard
						selectedServices={Object.entries($formData?.services || {})
							.filter(([_, checked]) => checked)
							.map(([id]) => id)}
						additionalServices={additional}
						selectedPackage={packageOptions.find((p) => p.value === $formData?.package)}
						discount={0}
					/>
				</div>

				<!-- Steps Section -->
				<div class="mt-8 flex-1">
					<StepsIndicator {steps} />
				</div>

				<!-- Social Media Links -->
				<SocialLinks class="mt-auto pt-4" />
			</div>
		</div>
	</div>
</div>
