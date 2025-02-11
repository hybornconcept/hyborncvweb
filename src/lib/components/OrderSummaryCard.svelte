<script lang="ts">
    import * as Card from "$lib/components/ui/card";

    interface Package {
        value: string;
        label: string;
        price: number;
    }

    let { 
        selectedServices = [], 
        additionalServices = [], 
        selectedPackage = null,
        discount = 0 
    } = $props<{
        selectedServices?: string[];
        additionalServices?: Array<{
            id: string;
            label: string;
            price: number;
        }>;
        selectedPackage?: Package | null;
        discount?: number;
    }>();

    let selectedItems = $derived(
        additionalServices.filter(service => selectedServices.includes(service.id))
    );

    let packageTotal = $derived(selectedPackage?.price || 0);

    let servicesTotal = $derived(
        selectedItems.reduce((sum, item) => sum + item.price, 0)
    );

    let calculatedTotal = $derived(packageTotal + servicesTotal);

    let finalTotal = $derived(calculatedTotal - discount);
</script>

<div class="w-full bg-white rounded-lg shadow-sm">
    <Card.Root class="w-full">
        <Card.Header>
            <Card.Title class="text-xl font-semibold text-gray-900">Order Summary</Card.Title>
        </Card.Header>
        <Card.Content class="space-y-6">
            <!-- Selected Package -->
            {#if selectedPackage}
                <div class="flex justify-between text-sm font-medium">
                    <span class="text-gray-900">{selectedPackage.label}</span>
                    <span>₦{selectedPackage.price.toLocaleString()}</span>
                </div>
            {/if}

            <!-- Selected Services -->
            {#if selectedItems.length > 0}
                <div class="space-y-2">
                    {#each selectedItems as item}
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">{item.label}</span>
                            <span>${item.price.toFixed(2)}</span>
                        </div>
                    {/each}
                </div>
            {/if}

            <!-- Price Breakdown -->
            <div class="space-y-3 border-b pb-4">
                <div class="flex justify-between">
                    <span class="text-gray-600">Order Subtotal</span>
                    <span>${calculatedTotal.toFixed(2)}</span>
                </div>
                {#if discount > 0}
                    <div class="flex justify-between text-red-500">
                        <span>Sale Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                    </div>
                {/if}
            </div>
            
            <!-- Total -->
            <div class="pt-2">
                <div class="flex justify-between font-medium">
                    <span>Pre-Tax Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                </div>
            </div>
        </Card.Content>
    </Card.Root>
</div> 