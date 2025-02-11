<script lang="ts">
    import type { SuperForm } from 'sveltekit-superforms';
    import type { z } from 'zod';
    import * as Form from "$lib/components/ui/form";
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

    // Initialize showErrors with a default value
    let showErrors = initialShowErrors ?? false;

    const { form: formData, errors } = form;
</script>

<Form.Field {form} {name}>
    <Form.Control>
        {#snippet children({ props })}
            <Form.Label>{formLabel}</Form.Label>
            <select
                {...props}
                class="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
        <Form.FieldErrors class="text-sm text-destructive mt-1" />
    {/if}
</Form.Field>