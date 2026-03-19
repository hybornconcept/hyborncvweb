<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms';
	import type { z } from 'zod';
	import * as Form from '$lib/components/ui/form';
	import { orderSchema } from '$lib/schema';

	let {
		form,
		name,
		formLabel,
		options,
		placeholder,
		showErrors: initialShowErrors
	} = $props<{
		form: SuperForm<z.infer<typeof orderSchema>>;
		name: keyof z.infer<typeof orderSchema>;
		formLabel: string;
		options: readonly { value: string; label: string; price?: number }[];
		placeholder?: string;
		showErrors?: boolean;
	}>();

	// Use $derived for reactive showErrors
	let showErrors = $derived(initialShowErrors ?? false);

	const { form: formData, errors } = form;
</script>

<Form.Field {form} {name}>
	<Form.Control>
		{#snippet children({ props })}
			<Form.Label>{formLabel}</Form.Label>
			<select
				{...props}
				class="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-200 focus-gradient"
				style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: right 0.75rem center; background-size: 1rem;"
				class:border-destructive={showErrors && $errors[name]}
				bind:value={$formData[name]}
				aria-invalid={showErrors && $errors[name] ? 'true' : undefined}
				aria-describedby={showErrors && $errors[name] ? `${name}-error` : undefined}
			>
				<option value="">{placeholder}</option>
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		{/snippet}
	</Form.Control>
	{#if showErrors}
		<Form.FieldErrors class="mt-1 text-sm text-destructive" />
	{/if}
</Form.Field>
