<!-- code for schema.ts  -->

import { z } from 'zod';
import { facilityValuesTuple } from "$lib";
// Step 1: Patient Information
export const step1Schema = z.object({
  uniquePatientId: z.string().min(1, "Unique Patient ID is required"),
  sex: z.enum(["Male", "Female"]).nullable(),
  hIVRelatedDeath: z.enum(["Yes", "No"]).nullable(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  facility: z.enum(facilityValuesTuple).describe("Please select a valid facility"),
  artStartDate: z.string().min(1, "ART start date is required"),
  lastPickupDate: z.string().min(1, "Last pickup date is required"),
  dateOfDeath: z.string().min(1, "Date of death is required"),
  dateOfDeathConfirmed: z.string().min(1, "Death confirmation is required"),
  deathInfoProvider: z.string().min(1, "Provider information is required"),
  deathInfoValidator: z.string().min(1, "Validator information is required"),
  causeOfDeath: z.string().min(1, "Cause of death is required")
});

// Step 2: Medical History
export const step2Schema = step1Schema.extend({
  comorbidConditions: z.string().min(1, "Comorbid conditions are required"),
  medicationsAndTreatments: z.string().min(1, "Medications and treatments are required"),
  primaryDiagnosis: z.string().min(1, "Primary diagnosis is required"),
  secondaryDiagnosis: z.string().min(1, "Secondary diagnosis is required")
});

// Step 3: Clinical Information
export const step3Schema = step2Schema.extend({
  symptomsPriorToDeath: z.string().min(1, "Symptoms prior to death are required"),
  symptomsDurationMonths: z.string().min(1, "Duration of symptoms is required"),
  diagnosticTestsAndResults: z.string().min(1, "Diagnostic tests and results are required"),
  treatmentPriorToDeath: z.string().min(1, "Treatment prior to death is required"),
  treatmentLocations: z.string().min(1, "Treatment locations are required"),
  treatmentResponse: z.string().min(1, "Treatment response is required"),
  locationOfDeath: z.string().min(1, "Location of death is required")
});

// Step 4: Social and Environmental
export const step4Schema = step3Schema.extend({
  supportSystem: z.string().min(1, "Support system is required"),
  socioeconomicStatus: z.enum(["low", "medium", "high"]),
  livingConditions: z.string().min(1, "Living conditions are required")
});

// Final Step: Reviewer Information
export const personalInfoSchema = step4Schema.extend({
  reviewerName: z.string().min(1, "Reviewer name is required"),
  confirmReview: z.boolean(),

});

export type PersonalInfoSchema = typeof personalInfoSchema;



<!-- code for page.svelte -->

<script lang="ts">

  import { CalendarIcon } from "lucide-svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import FinalPage from "$lib/components/final-page.svelte";

  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";

  import { zod } from 'sveltekit-superforms/adapters';
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label"
  import {
    superForm,
  } from "sveltekit-superforms";
  import {   step1Schema, step2Schema, step3Schema, step4Schema,personalInfoSchema } from '$lib/schemas';
  import {   socioeconomicOptions, facilityOptions, sexOptions } from '$lib';

	import type { PageData } from './$types.ts';
  import { page } from '$app/stores';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const steps = [
		'Patient Information',
		'Medical History',
		'Clinical Information',
		'Social and Environmental Factors',
		'Reviewer Information'
	];
	
	let currentStep = $state(1);
	const totalSteps = 5;
	let isSubmitted = $state(false);
	let isConfirmed = $state(false);
	let validSteps: number[] = $state([]);

	const { form, errors, allErrors, constraints, enhance, delayed, validateForm, options, message, submitting } =
		superForm(data.form, {
			dataType: 'json',
			taintedMessage: 'The data you have entered will be lost. Are you sure you want to leave?',
			async onSubmit({ cancel }) {
				options.validators = [zod(step1Schema), zod(step2Schema), zod(step3Schema), zod(step4Schema), zod(personalInfoSchema)][currentStep - 1];

				const result = await validateForm({ update: true });

				if (!result.valid) {
					cancel();
					return;
				}

				// If it's valid, go to next step
				validSteps = [...validSteps, currentStep];
				if (currentStep < steps.length) {
					cancel();
					currentStep = currentStep + 1;
				}

				// If it's the last step, submit the form
				return;
			},
			async onUpdate({ result }) {
				if (result.type === 'success') {
					validSteps = [];
					currentStep = 1;
				}
			},
			async onResult({ result }) {
				if (result.type === 'success') {
					isSubmitted = true;
					document.scrollingElement?.scrollTo({
						top: 0,
						behavior: 'smooth'
					});
				}
			}
		});
  
  async function handleNext() {
    const currentStepFields = getCurrentStepFields(currentStep);
    
    // Validate current step
    options.validators = [
      zod(step1Schema), 
      zod(step2Schema), 
      zod(step3Schema), 
      zod(step4Schema), 
      zod(personalInfoSchema)
    ][currentStep - 1];

    const result = await validateForm({ update: true });

    if (!result.valid) {
      // Show errors and don't proceed
      return;
    }

    // If valid, proceed to next step
    validSteps = [...validSteps, currentStep];
    currentStep++;
  }
  
  function handlePrev() {
    if (currentStep > 1) {
      currentStep--;
    }
  }
  
  const progress = $derived((currentStep / totalSteps) * 100);

  const buttonText = $derived(
    $delayed ? 'Submitting...' : (currentStep === totalSteps ? 'Submit' : 'Next')
  );



  type Sex = typeof sexOptions[number]['value'] | undefined;


  const sexTriggerContent = $derived(
    $form?.sex ? sexOptions.find((option) => option.value === $form.sex)?.label : "Select sex"
  );

  const socioeconomicTriggerContent = $derived(
    $form?.socioeconomicStatus ? socioeconomicOptions.find((option) => option.value === $form.socioeconomicStatus)?.label : "Select Status"
  );
  const facilityTriggerContent = $derived(
    $form?.facility ? facilityOptions.find((option) => option.value === $form.facility)?.label : "Select the Facility"
  );

  function getCurrentStepFields(step: number) {
    switch (step) {
      case 1:
        return ['uniquePatientId', 'sex', 'dateOfBirth', 'artStartDate', 
                'lastPickupDate', 'dateOfDeath', 'dateOfDeathConfirmed', 
                'deathInfoProvider', 'deathInfoValidator', 'causeOfDeath'];
      case 2:
        return ['comorbidConditions', 'medicationsAndTreatments', 
                'primaryDiagnosis', 'secondaryDiagnosis'];
      case 3:
        return ['symptomsPriorToDeath', 'symptomsDurationMonths', 
                'diagnosticTestsAndResults', 'treatmentPriorToDeath',
                'treatmentLocations', 'treatmentResponse', 'locationOfDeath'];
      case 4:
        return ['supportSystem', 'socioeconomicStatus', 'livingConditions'];
      case 5:
        return ['reviewerName', 'confirmReview'];
      default:
        return [];
    }
  }
</script>
{#if isSubmitted}
  <FinalPage />
{:else}
  <div class="flex min-h-screen w-full flex-col overflow-hidden">
    <main
      class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10"
    >
      <div class="mx-auto grid w-full max-w-6xl gap-2">
        <h1 class="text-4xl font-bold text-center md:text-left mb-4"> Clinical Audit Template</h1>
      </div>
      <div
        class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
      >
        <!-- Vertical Progress Bar (replacing the nav) -->
        <div class="hidden md:flex flex-col items-start w-full">
          <div class="flex flex-col space-y-6 w-full">
            {#each [
              'Patient Information', 
              'Medical History', 
              'Clinical Information', 
              'Social and Environmental Factors',
              'Reviewer Information'
            ] as step, i}
              <div class="flex items-center gap-4 w-full">
                <div class={`rounded-full w-10 h-10 flex items-center justify-center shrink-0
                  ${currentStep > i ? 'bg-primary text-white' : 
                    currentStep === i ? 'border-2 border-primary text-primary' : 
                    'bg-muted text-muted-foreground'}`}>
                  {i + 1}
                </div>
                <span class={`text-sm font-medium whitespace-normal
                  ${currentStep >= i ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step}
                </span>
              </div>
              {#if i < 4}
                <div class="ml-5 w-0.5 h-6 bg-border"></div>
              {/if}
            {/each}
          </div>
        </div>

        <!-- Form Content -->
        <div class="grid gap-6">
          <Card.Root class="bg-transparent">
            <Card.Header>
              <Card.Title>
                {#if currentStep === 1}
                  Patient Information
                {:else if currentStep === 2}
                  Medical History
                {:else if currentStep === 3}
                  Clinical Information
                {:else if currentStep === 4}
                  Social and Environmental Factors
                {:else}
                  Reviewer Information
                {/if}
              </Card.Title>
              <Card.Description>
                Please fill the form with detailed information.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              {#if $allErrors.length > 0}
                <div class="bg-destructive/15 text-destructive p-4 rounded-md mb-4">
                  <p class="font-medium">Please fix the following errors:</p>
                  <ul class="list-disc pl-4 mt-2">
                    {#each $allErrors.filter(error => getCurrentStepFields(currentStep).includes(error.path[0])) as error}
                      <li>{error.messages.join('. ')}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
              <form 
                method="POST" 
                use:enhance
                class="space-y-6" 
                action="?/create"
                id="clinical-audit-form"
                on:submit|preventDefault={(e) => {
                  if (currentStep !== totalSteps) {
                    e.preventDefault();
                  }
                }}
              >
                {#if currentStep === 1}
                  <!-- PATIENT INFORMATION -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                    <div class="space-y-2">
                      <Label for="uniquePatientId">Unique Patient ID</Label>
                      <Input 
                        id="uniquePatientId"
                        name="uniquePatientId"
                        bind:value={$form.uniquePatientId}
                      />
                      {#if $errors.uniquePatientId}
                        <span class="text-destructive text-sm">{$errors.uniquePatientId}</span>
                      {/if}
                    </div>

                    <div class="space-y-2 md:col-span-1">
                      <Label for="facility">Select the facility</Label>
                      <Select.Root type="single" name="facility" bind:value={$form.facility}>
                        <Select.Trigger class="w-full">
                          {facilityTriggerContent}
                        </Select.Trigger>
                        <Select.Content>
                          {#each facilityOptions as option}
                            <Select.Item value={option.value}>{option.label}</Select.Item>
                          {/each}
                        </Select.Content>
                      </Select.Root>
                      {#if $errors.facility}
                        <span class="text-destructive text-sm">{$errors.facility}</span>
                      {/if}
                    </div>

                    <div class="space-y-2 md:col-span-1">
                      <Label for="sex">Select the Sex</Label>
                      <Select.Root type="single" name="sex" bind:value={$form.sex}>
                        <Select.Trigger class="w-full">
                          {sexTriggerContent}
                        </Select.Trigger>
                        <Select.Content>
                          {#each sexOptions as option}
                            <Select.Item value={option.value}>{option.label}</Select.Item>
                          {/each}
                        </Select.Content>
                      </Select.Root>
                      {#if $errors.sex}
                        <span class="text-destructive text-sm">{$errors.sex}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="dateOfBirth">Date of Birth</Label>
                      <div class="relative">
                        <Input 
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          bind:value={$form.dateOfBirth}
                          aria-invalid={$errors.dateOfBirth ? 'true' : undefined}
                          class={$errors.dateOfBirth ? 'border-destructive pl-10' : 'pl-10'}
                        />
                        <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      {#if $errors.dateOfBirth}
                        <span class="text-destructive text-sm">{$errors.dateOfBirth}</span>
                      {/if}
                    </div>

             
                    <div class="space-y-2 md:col-span-1">
                      <Label for="hIVRelatedDeath">HIV related death?</Label>
                  
                    <Select.Root type="single" name="hIVRelatedDeath" bind:value={$form.hIVRelatedDeath}>
                      <Select.Trigger >
                        {$form.hIVRelatedDeath
                          ? $form.hIVRelatedDeath
                          : "Select HIV related death"}
                      </Select.Trigger>
                      <Select.Content >
                        <Select.Item value="Yes">Yes</Select.Item>
                        <Select.Item value="No">No</Select.Item>
                      </Select.Content>
                    </Select.Root>
                    {#if $errors.hIVRelatedDeath}
                    <span class="text-destructive text-sm">{$errors.hIVRelatedDeath}</span>
                  {/if}
                    </div>
                    <div class="space-y-2">
                      <Label for="artStartDate">ART Start Date</Label>
                      <div class="relative">
                        <Input 
                          id="artStartDate"
                          name="artStartDate"
                          type="date"
                          bind:value={$form.artStartDate}
                          aria-invalid={$errors.artStartDate ? 'true' : undefined}
                          class={$errors.artStartDate ? 'border-destructive pl-10' : 'pl-10'}
                        />
                        <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      {#if $errors.artStartDate}
                        <span class="text-destructive text-sm">{$errors.artStartDate}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="lastPickupDate">Last Pickup Date</Label>
                      <div class="relative">
                        <Input 
                          id="lastPickupDate"
                          name="lastPickupDate"
                          type="date"
                          bind:value={$form.lastPickupDate}
                          aria-invalid={$errors.lastPickupDate ? 'true' : undefined}
                          class={$errors.lastPickupDate ? 'border-destructive pl-10' : 'pl-10'}
                        />
                        <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      {#if $errors.lastPickupDate}
                        <span class="text-destructive text-sm">{$errors.lastPickupDate}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="dateOfDeath">Date of Death</Label>
                      <div class="relative">
                        <Input 
                          id="dateOfDeath"
                          name="dateOfDeath"
                          type="date"
                          bind:value={$form.dateOfDeath}
                          aria-invalid={$errors.dateOfDeath ? 'true' : undefined}
                          class={$errors.dateOfDeath ? 'border-destructive pl-10' : 'pl-10'}
                        />
                        <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      {#if $errors.dateOfDeath}
                        <span class="text-destructive text-sm">{$errors.dateOfDeath}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="dateOfDeathConfirmed">Date of Death Was Confirmed</Label>
                      <div class="relative">
                        <Input 
                          id="dateOfDeathConfirmed"
                          name="dateOfDeathConfirmed"
                          type="date"
                          bind:value={$form.dateOfDeathConfirmed}
                          aria-invalid={$errors.dateOfDeathConfirmed ? 'true' : undefined}
                          class={$errors.dateOfDeathConfirmed ? 'border-destructive pl-10' : 'pl-10'}
                        />
                        <CalendarIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                      {#if $errors.dateOfDeathConfirmed}
                        <span class="text-destructive text-sm">{$errors.dateOfDeathConfirmed}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="deathInfoProvider">Death Information Provided By</Label>
                      <Input 
                        id="deathInfoProvider"
                        name="deathInfoProvider"
                        bind:value={$form.deathInfoProvider}
                        aria-invalid={$errors.deathInfoProvider ? 'true' : undefined}
                        class={$errors.deathInfoProvider ? 'border-destructive' : ''}
                      />
                      {#if $errors.deathInfoProvider}
                        <span class="text-destructive text-sm">{$errors.deathInfoProvider}</span>
                      {/if}
                    </div>

                    <div class="space-y-2 md:col-span-2">
                      <Label for="deathInfoValidator">Death Information Validated By</Label>
                      <Input 
                        id="deathInfoValidator"
                        name="deathInfoValidator"
                        bind:value={$form.deathInfoValidator}
                        aria-invalid={$errors.deathInfoValidator ? 'true' : undefined}
                        class={$errors.deathInfoValidator ? 'border-destructive' : ''}
                      />
                      {#if $errors.deathInfoValidator}
                        <span class="text-destructive text-sm">{$errors.deathInfoValidator}</span>
                      {/if}
                    </div>

                    <!-- Textarea should span full width -->
                    <div class="space-y-2 md:col-span-2">
                      <Label for="causeOfDeath">Cause of Death (be very detailed)</Label>
                      <textarea 
                        id="causeOfDeath"
                        name="causeOfDeath"
                        bind:value={$form.causeOfDeath}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.causeOfDeath ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.causeOfDeath ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.causeOfDeath}
                        <span class="text-destructive text-sm">{$errors.causeOfDeath}</span>
                      {/if}
                    </div>
                  </div>
                {:else if currentStep === 2}
                  <!-- MEDICAL HISTORY -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label for="comorbidConditions">Comorbid Conditions (if any)</Label>
                      <textarea 
                        id="comorbidConditions"
                        name="comorbidConditions"
                        bind:value={$form.comorbidConditions}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.comorbidConditions ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.comorbidConditions ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.comorbidConditions}
                        <span class="text-destructive text-sm">{$errors.comorbidConditions}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="medicationsAndTreatments">Medications & Previous Treatments</Label>
                      <textarea 
                        id="medicationsAndTreatments"
                        name="medicationsAndTreatments"
                        bind:value={$form.medicationsAndTreatments}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.medicationsAndTreatments ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.medicationsAndTreatments ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.medicationsAndTreatments}
                        <span class="text-destructive text-sm">{$errors.medicationsAndTreatments}</span>
                      {/if}
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <Label for="primaryDiagnosis">Primary Diagnosis (if any):</Label>
                    <textarea 
                      id="primaryDiagnosis"
                      name="primaryDiagnosis"
                      bind:value={$form.primaryDiagnosis}
                      class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                        $errors.primaryDiagnosis ? 'border-destructive' : 'border-input'
                      }`}
                      aria-invalid={$errors.primaryDiagnosis ? 'true' : undefined}
                    ></textarea>
                    {#if $errors.primaryDiagnosis}
                      <span class="text-destructive text-sm">{$errors.primaryDiagnosis}</span>
                    {/if}
                  </div>
                  
                  <div class="space-y-2">
                    <Label for="secondaryDiagnosis">Secondary Diagnosis (if any):</Label>
                    <textarea 
                      id="secondaryDiagnosis"
                      name="secondaryDiagnosis"
                      bind:value={$form.secondaryDiagnosis}
                      class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                        $errors.secondaryDiagnosis ? 'border-destructive' : 'border-input'
                      }`}
                      aria-invalid={$errors.secondaryDiagnosis ? 'true' : undefined}
                    ></textarea>
                    {#if $errors.secondaryDiagnosis}
                      <span class="text-destructive text-sm">{$errors.secondaryDiagnosis}</span>
                    {/if}
                  </div>
                  </div>
            
                {:else if currentStep === 3}
                  <!-- CLINICAL INFORMATION -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label for="symptomsPriorToDeath">Symptoms prior to death</Label>
                      <textarea 
                        id="symptomsPriorToDeath"
                        name="symptomsPriorToDeath"
                        bind:value={$form.symptomsPriorToDeath}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.symptomsPriorToDeath ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.symptomsPriorToDeath ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.symptomsPriorToDeath}
                        <span class="text-destructive text-sm">{$errors.symptomsPriorToDeath}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="diagnosticTestsAndResults">Diagnostic tests and results</Label>
                      <textarea 
                        id="diagnosticTestsAndResults"
                        name="diagnosticTestsAndResults"
                        bind:value={$form.diagnosticTestsAndResults}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.diagnosticTestsAndResults ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.diagnosticTestsAndResults ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.diagnosticTestsAndResults}
                        <span class="text-destructive text-sm">{$errors.diagnosticTestsAndResults}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="treatmentPriorToDeath">Treatment received prior to death</Label>
                      <textarea 
                        id="treatmentPriorToDeath"
                        name="treatmentPriorToDeath"
                        bind:value={$form.treatmentPriorToDeath}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.treatmentPriorToDeath ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.treatmentPriorToDeath ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.treatmentPriorToDeath}
                        <span class="text-destructive text-sm">{$errors.treatmentPriorToDeath}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="treatmentResponse">Response to treatment</Label>
                      <textarea 
                        id="treatmentResponse"
                        name="treatmentResponse"
                        bind:value={$form.treatmentResponse}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.treatmentResponse ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.treatmentResponse ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.treatmentResponse}
                        <span class="text-destructive text-sm">{$errors.treatmentResponse}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="symptomsDurationMonths">Duration of symptoms (months)</Label>
                      <Input 
                        id="symptomsDurationMonths"
                        name="symptomsDurationMonths"
                        bind:value={$form.symptomsDurationMonths}
                      />
                      {#if $errors.symptomsDurationMonths}
                        <span class="text-destructive text-sm">{$errors.symptomsDurationMonths}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="treatmentLocations">Location(s) treatment received</Label>
                      <Input 
                        id="treatmentLocations"
                        name="treatmentLocations"
                        bind:value={$form.treatmentLocations}
                      />
                      {#if $errors.treatmentLocations}
                        <span class="text-destructive text-sm">{$errors.treatmentLocations}</span>
                      {/if}
                    </div>

                    <div class="space-y-2 md:col-span-2">
                      <Label for="locationOfDeath">Location of death</Label>
                      <textarea 
                        id="locationOfDeath"
                        name="locationOfDeath"
                        bind:value={$form.locationOfDeath}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.locationOfDeath ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.locationOfDeath ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.locationOfDeath}
                        <span class="text-destructive text-sm">{$errors.locationOfDeath}</span>
                      {/if}
                    </div>
                  </div>
                {:else if currentStep === 4}
                  <!-- SOCIAL AND ENVIRONMENTAL FACTORS -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <Label for="supportSystem">Support system prior to death</Label>
                      <textarea 
                        id="supportSystem"
                        name="supportSystem"
                        bind:value={$form.supportSystem}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.supportSystem ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.supportSystem ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.supportSystem}
                        <span class="text-destructive text-sm">{$errors.supportSystem}</span>
                      {/if}
                    </div>

                    <div class="space-y-2">
                      <Label for="livingConditions">Living conditions prior to death</Label>
                      <textarea 
                        id="livingConditions"
                        name="livingConditions"
                        bind:value={$form.livingConditions}
                        class={`w-full min-h-[150px] rounded-md border bg-background px-3 py-2 ${
                          $errors.livingConditions ? 'border-destructive' : 'border-input'
                        }`}
                        aria-invalid={$errors.livingConditions ? 'true' : undefined}
                      ></textarea>
                      {#if $errors.livingConditions}
                        <span class="text-destructive text-sm">{$errors.livingConditions}</span>
                      {/if}
                    </div>

                    <div class="space-y-2 md:col-span-2">
                      <Label for="socioeconomicStatus">Socioeconomic status prior to death</Label>
                      <Select.Root type="single" name="socioeconomicStatus" bind:value={$form.socioeconomicStatus}>
                        <Select.Trigger class="w-full">
                          {socioeconomicTriggerContent}
                        </Select.Trigger>
                        <Select.Content>
                          {#each socioeconomicOptions as option}
                            <Select.Item value={option.value}>{option.label}</Select.Item>
                          {/each}
                        </Select.Content>
                      </Select.Root>
                      {#if $errors.socioeconomicStatus}
                        <span class="text-destructive text-sm">{$errors.socioeconomicStatus}</span>
                      {/if}
                    </div>
                  </div>
               
                {:else if currentStep === 5}
                  <!-- REVIEWER INFORMATION -->
                  <div class="grid grid-cols-1 gap-4">
                    <div class="space-y-2">
                      <Label for="reviewerName">Name of reviewer</Label>
                      <Input 
                        id="reviewerName"
                        name="reviewerName"
                        bind:value={$form.reviewerName}
                      />
                      {#if $errors.reviewerName}
                        <span class="text-destructive text-sm">{$errors.reviewerName}</span>
                      {/if}
                    </div>

                    <div class="space-y-2 md:col-span-2">
                      <div class="flex items-center space-x-2">
                        <Checkbox 
                          id="confirmReview"
                          bind:checked={$form.confirmReview}
                          aria-invalid={$errors.confirmReview ? 'true' : undefined}
                          class={$errors.confirmReview ? 'border-destructive' : ''}
                        />
                        <Label 
                          for="confirmReview" 
                          class="text-sm flex items-center"
                        >
                          I hereby confirm that the information provided in this form is accurate to the best of my knowledge and has been reviewed and validated by me.
                        </Label>
                      </div>
                      {#if $errors.confirmReview}
                        <span class="text-destructive text-sm">{$errors.confirmReview}</span>
                      {/if}
                    </div>
                  </div>
                {/if}
                
                <!-- Navigation Buttons -->
                <div class="flex justify-end gap-4 mt-6">
                  {#if currentStep > 1}
                    <Button 
                      variant="outline" 
                      type="button"
                      onclick={handlePrev}
                    >
                      Previous
                    </Button>
                  {/if}
                  
                  {#if currentStep === totalSteps}
                    <Button 
                      type="submit"
                      disabled={$delayed || !$form.confirmReview}
                      class={!$form.confirmReview ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      {buttonText}
                    </Button>
                  {:else}
                    <Button 
                      type="button"
                      onclick={handleNext}
                    >
                      Next
                    </Button>
                  {/if}
                </div>
              </form>
            </Card.Content>
          </Card.Root>
        </div>
      </div>
    </main>
  </div>
{/if}

<!-- page.server.ts code -->

import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { personalInfoSchema } from '$lib/schemas';
import type { Actions, PageServerLoad } from './$types';
import PocketBase from 'pocketbase';
import type { ClientResponseError } from 'pocketbase';

const pb = new PocketBase('https://clinical-audit.pockethost.io');

// Mock function to validate data before saving
async function validateAuditData(data: any) {
  try {
    // Add any additional validation logic here
    return true;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(personalInfoSchema));
  return { form };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const form = await superValidate(request, zod(personalInfoSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      // Validate form data
      const isValid = await validateAuditData(form.data);
      if (!isValid) {
        return message(form, 'Invalid audit data. Please check your entries.', { status: 400 });
      }

      // Remove duplicate fields and prepare data
      const formData = Object.entries(form.data).reduce((acc, [key, value]) => {
        if (!acc[key]) acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

      // Save to PocketBase
      await pb.collection('template').create({
        ...formData,
        dateOfReview: new Date().toISOString().split('T')[0]
      });
      
      return message(form, 'Clinical audit submitted successfully!');
    } catch (error) {
      const { status } = error as ClientResponseError;
      console.error('Failed to save audit:', status);
      return message(form, 'Failed to save audit data. Please try again.', { status: 500 });
    }
  }
}; 
