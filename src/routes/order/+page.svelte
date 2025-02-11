<script lang="ts">
   import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import FormSelect from "$lib/components/FormSelect.svelte";
    import { zodClient } from "sveltekit-superforms/adapters";
    import type { SubmitFunction } from '@sveltejs/kit';
    import { orderSchema, validateStep1, validateStep2, type OrderSchema } from '$lib/schema';
    import { interestOptions, careerlevelOptions, additional, packageOptions,  steps } from "$lib";
    import { Upload, X } from "lucide-svelte";
    import OrderSummaryCard from "$lib/components/OrderSummaryCard.svelte";
    import StepsIndicator from "$lib/components/StepsIndicator.svelte";
    import SocialLinks from "$lib/components/SocialLinks.svelte";
    import FormStep from "$lib/components/FormStep.svelte";
    import { type SuperValidated, type Infer, superForm, filesProxy } from "sveltekit-superforms";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  
    import { zod } from 'sveltekit-superforms/adapters';
    import { Calendar } from "$lib/components/ui/calendar";
    import * as Popover from "$lib/components/ui/popover";
    import { CalendarIcon } from "lucide-svelte";
    import { CalendarDate, DateFormatter, type DateValue, getLocalTimeZone, parseDate, today } from "@internationalized/date";
    import { cn } from "$lib/utils";

    let { data }: { data: { form: SuperValidated<Infer<OrderSchema>> } } = $props();
    let currentStep = $state(1);
    let isSubmitted = $state(false);
    let uploadedFiles: UploadedFile[] = $state([]);
    let uploadProgress: Record<number, number> = $state({});
    let showErrors = $state(false);

    const form = superForm<OrderSchema>(data.form, {
        validators: zod(orderSchema),
        validationMethod: "onsubmit",
        taintedMessage: null,
        errorSelector: "error-message",
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
        }
    });

    const { form: formData, enhance, delayed, errors } = form;
    const files = filesProxy<OrderSchema, 'documents'>(form, 'documents');

    type ServiceId = typeof additional[number]['id'];

    function addService(id: ServiceId) {
        $formData.services = { ...($formData.services || {}), [id]: true };
    }

    function removeService(id: ServiceId) {
        const { [id]: _, ...rest } = $formData.services || {};
        $formData.services = rest;
    }
    let totalSteps = 2;

    // Function to validate current step before proceeding
    async function validateCurrentStep() {
        showErrors = true;
        
        if (currentStep === 1) {
            const step1Data = {
                careerlevel: $formData.careerlevel,
                interest: $formData.interest,
                others: $formData.others,
                package: $formData.package,
                services: $formData.services,
                deadline: $formData.deadline
            };
            const result = validateStep1(step1Data);
            return result.success;
        } else {
            const step2Data = {
                fullname: $formData.fullname,
                phone: $formData.phone,
                comments: $formData.comments,
                documents: Array.from($files || [])
            };
            const result = validateStep2(step2Data);
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
        const existingFileNames = new Set(Array.from($files || []).map(f => `${f.name}-${f.size}`));
        
        const validFiles = newFiles.filter(file => {
            const fileIdentifier = `${file.name}-${file.size}`;
            if (existingFileNames.has(fileIdentifier)) {
                return false; // Skip duplicate files
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} exceeds 5MB limit`);
                return false;
            }
            return true;
        });

        validFiles.forEach(file => {
            const size = formatFileSize(file.size);
            uploadedFiles = [...uploadedFiles, {
                file,
                progress: 0,
                size
            }];
            simulateUpload(file);
        });
        
        if (validFiles.length > 0) {
            files.update($files => [...($files || []), ...validFiles]);
        }
    }

    function simulateUpload(file: File) {
        const index = uploadedFiles.findIndex(f => f.file === file);
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
        uploadedFiles = uploadedFiles.filter(f => f.file !== file);
        files.update($files => Array.from($files || []).filter(f => f !== file));
    }
  

    const df = new DateFormatter("en-US", { dateStyle: "long" });
    let deadlineValue = $state<DateValue | undefined>();
    let placeholder = $state(today(getLocalTimeZone()));

    $effect(() => {
        deadlineValue = $formData.deadline ? parseDate($formData.deadline) : undefined;
    });

    function formatFileSize(bytes: number): string {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
</script>

<div class="min-h-screen bg-[#F5F1FF] px-8 py-2">
    <div class="h-full flex items-center justify-center rounded-3xl">
        <div class="flex w-full max-w-6xl p-2 bg-white rounded-md shadow-md h-full">
            <!-- Left side - Form -->
            <div class="w-[60%] px-4 py-2 h-full flex flex-col">
                <!-- Updated Form Header -->
                <h1 class="text-3xl font-extralight text-gray-900 py-4 mb-2 px-5">Place Your Order</h1>

                <!-- Updated Step Indicator -->
                <div class="mb-2 mx-5">
                    <div class="text-sm text-gray-500 mb-2 ">STEP {currentStep} OF {totalSteps}</div>
                    <h2 class="text-md font-semibold text-gray-900 mb-4">
                        {#if currentStep === 1}
                           Choose Service
                       {:else if currentStep === 2}
                           Additional Information & Documents
                       {/if}
                   </h2>
                   <div class="flex gap-2 w-full">
                       {#each Array(totalSteps) as _, i}
                           <div 
                               class="h-1 flex-1 rounded-full transition-all duration-300" 
                               class:bg-indigo-600={i < currentStep} 
                               class:bg-gray-200={i >= currentStep}
                           ></div>
                       {/each}
                   </div>
               </div>

               <div class="relative overflow-hidden flex-1">
                   <form method="POST" enctype="multipart/form-data" use:enhance class='mx-5'>
                       <!-- Step 1: Patient Information -->
                       {#if currentStep === 1}
                           <FormStep>
                               <div class="space-y-4">
                             
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
                                                   name="interest"
                                                   formLabel="Interest"
                                                   options={interestOptions}
                                                   placeholder="Select your interest"
                                                   {showErrors}
                                               />
                           
                                   <Form.Field {form} name="others">
                                       <Form.Control>
                                           {#snippet children({ props })}
                                               <Form.Label>Others (Please specify)</Form.Label>
                                               <Input {...props} bind:value={$formData.others} placeholder="Enter additional information" />
                                           {/snippet}
                                       </Form.Control>
                                       {#if $errors.others}
                                           <p class="text-sm text-red-500 mt-1">{$errors.others}</p>
                                       {/if}
                                   </Form.Field>

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
                                       class="flex flex-col gap-4 rounded-md border p-4"
                                   >
                                       <Form.Control>
                                           {#snippet children({ props })}
                                               {#each additional as service}
                                                   <div class="flex items-center space-x-2">
                                                       <Checkbox 
                                                           checked={$formData.services?.[service.id] ?? false}
                                                           onCheckedChange={(checked) => {
                                                               $formData.services = {
                                                                   ...$formData.services,
                                                                   [service.id]: checked
                                                               };
                                                           }}
                                                       />
                                                       <Form.Label>{service.label}</Form.Label>
                                                   </div>
                                               {/each}
                                           {/snippet}
                                       </Form.Control>
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
                                                                   "w-full justify-start pl-4 text-left font-normal",
                                                                   !deadlineValue && "text-muted-foreground"
                                                               )}
                                                               {...props}
                                                           >
                                                               {deadlineValue
                                                                   ? df.format(deadlineValue.toDate(getLocalTimeZone()))
                                                                   : "Select deadline"}
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
                                                                   $formData.deadline = "";
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

                       <!-- Step 2: Additional Information -->
                       {:else}
                           <FormStep>
                               <div class="space-y-6">
                                  
                                   <Form.Field {form} name="fullname">
                                       <Form.Control>
                                           {#snippet children({ props })}
                                               <Form.Label>Full Name</Form.Label>
                                               <Input {...props} bind:value={$formData.fullname} placeholder="Enter your full name" />
                                           {/snippet}
                                       </Form.Control>
                                       {#if $errors.fullname}
                                           <p class="text-sm text-red-500 mt-1">{$errors.fullname}</p>
                                       {/if}
                                   </Form.Field>
                                   <Form.Field {form} name="phone">
                                       <Form.Control>
                                           {#snippet children({ props })}
                                               <Form.Label>Phone Number</Form.Label>
                                               <Input {...props} type="tel" bind:value={$formData.phone} placeholder="Enter your phone number" />
                                           {/snippet}
                                       </Form.Control>
                                       {#if $errors.phone}
                                           <p class="text-sm text-red-500 mt-1">{$errors.phone}</p>
                                       {/if}
                                   </Form.Field>

                                   <Form.Field {form} name="comments">
                                    <Form.Control>
                                        {#snippet children({ props })}
                                            <Form.Label>Additional Information</Form.Label>
                                            <Textarea {...props}  bind:value={$formData.comments} placeholder="Please provide more information about this order (if any)" />
                                        {/snippet}
                                    </Form.Control>
                                    {#if $errors.comments}
                                        <p class="text-sm text-red-500 mt-1">{$errors.comments}</p>
                                    {/if}
                                </Form.Field>

                                   <Form.Field {form} name="documents">
                                       <Form.Control>
                                           {#snippet children({ props })}
                                               <Form.Label>Upload Documents</Form.Label>
                                               <div class="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center hover:border-gray-400 transition-colors">
                                                   <div class="flex flex-col items-center justify-center relative">
                                                       <div class="mb-2">
                                                           <Upload class="w-6 h-6 text-gray-400" />
                                                       </div>
                                                       <div class="space-y-0.5">
                                                           <p class="text-sm font-medium">Drag & Drop your files here</p>
                                                           <p class="text-xs text-gray-500">or</p>
                                                           <Button variant="outline" type="button" size="sm" class="my-0.5">Browse Files</Button>
                                                           <p class="text-xs text-gray-400">Maximum file size: 10MB • Supported formats: JPG, JPEG, PNG, PDF, DOC, DOCX</p>
                                                       </div>
                                                       <input 
                                                           type="file"
                                                           multiple
                                                           name="documents"
                                                           accept=".jpg,.jpeg,.png,.doc,.docx,.pdf"
                                                           class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                           onchange={handleFileUpload}
                                                       />
                                                   </div>
                                               </div>

                                               <!-- File List -->
                                               {#if $files?.length}
                                                   <div class="mt-4 space-y-3">
                                                       <div class="text-sm font-medium text-gray-700">Uploaded Files</div>
                                                       {#each Array.from($files) as file, i}
                                                           <div class="bg-white border rounded-lg p-3">
                                                               <div class="flex items-center justify-between mb-1">
                                                                   <div class="flex items-center space-x-2">
                                                                       <div class="p-1.5 bg-gray-100 rounded">
                                                                           <Upload class="w-3 h-3 text-gray-600" />
                                                                       </div>
                                                                       <div>
                                                                           <p class="text-sm font-medium text-gray-900">{file.name}</p>
                                                                           <p class="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                                                       </div>
                                                                   </div>
                                                                   <button 
                                                                       type="button"
                                                                       class="text-gray-400 hover:text-gray-500"
                                                                       onclick={() => {
                                                                           files.update($files => Array.from($files).filter(f => f !== file));
                                                                       }}
                                                                   >
                                                                       <X class="w-4 h-4" />
                                                                   </button>
                                                               </div>
                                                               <!-- Progress Bar -->
                                                               {#if uploadProgress[i]}
                                                                   <div class="w-full bg-gray-100 rounded-full h-1">
                                                                       <div
                                                                           class="bg-blue-600 h-1 rounded-full transition-all duration-300"
                                                                           style="width: {uploadProgress[i]}%"
                                                                       >
                                                                        </div>
                                                                        </div>
                                                                  
                                                                   <div class="flex justify-end mt-0.5">
                                                                       <span class="text-xs text-gray-500">{uploadProgress[i]}%</span>
                                                                   </div>
                                                               {/if}
                                                           </div>
                                                       {/each}
                                                   </div>
                                               {/if}
                                           {/snippet}
                                       </Form.Control>
                                       {#if $errors.documents}
                                           <p class="text-sm text-red-500 mt-1">{$errors.documents}</p>
                                       {/if}
                                   </Form.Field>

                               </div>
                           </FormStep>
                       {/if}

                       <!-- Navigation Buttons -->
                       <div class="flex justify-between mt-6">
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
                                   >
                                   <!-- disabled={!form.valid || $delayed} -->
                                   {$delayed ? 'Submitting...' : 'Submit'}
                               </Form.Button>
                           {:else}
                               <Button 
                                   type="button" 
                                   onclick={nextStep}
                               >
                                   Next
                               </Button>
                           {/if}
                       </div>
                   </form>
               </div>
           </div>

           <!-- Right side - Contact Information -->
           <div class="w-[40%] bg-[#f2f6ff] p-6 flex flex-col">
               <!-- Logo Section -->
               <div class="flex items-center gap-2 mb-6">
                   <img src="hylogo2.png" alt="company logo" class="h-8 w-8 my-auto" />
                   <h1 class="text-bold text-xl font-semibold text-gray-900 my-auto">HYBORN CV</h1>
               </div>

               <!-- Order Summary Section -->
               <div class="flex-none">
                   <OrderSummaryCard 
                       selectedServices={Object.entries($formData.services)
                           .filter(([_, checked]) => checked)
                           .map(([id]) => id)}
                       additionalServices={additional}
                       selectedPackage={packageOptions.find(p => p.value === $formData.package)}
                       discount={10.50}
                   />
               </div>

               <!-- Steps Section -->
               <div class="flex-1 py-8">
                   <StepsIndicator {steps} />
               </div>

               <!-- Social Media Links -->
               <SocialLinks class="pt-4 mt-auto" />
           </div>
       </div>
   </div>
</div>