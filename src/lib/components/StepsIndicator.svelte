<script lang="ts">
    
    type Step = {
        readonly number: number;
        readonly title: string;
        readonly description: string;
    };

    let { steps } = $props<{
        steps: readonly Step[];
    }>();

    const bgColors = {
        1: 'bg-pink-100 text-pink-600',
        2: 'bg-purple-100 text-purple-600',
        3: 'bg-green-100 text-green-600'
    };
</script>

<div class="space-y-8">
    {#each steps as step, index}
        <div class="flex items-start gap-4">
            <div class="relative">
                <!-- Circle with number -->
                <div class={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${bgColors[step.number as keyof typeof bgColors]}`}>
                    {step.number}
                </div>
                <!-- Vertical line (except for last step) -->
                {#if index !== steps.length - 1}
                    <div class="absolute left-1/2 top-12 w-[2px] h-16 -translate-x-1/2 bg-gray-200"></div>
                {/if}
            </div>
            <div class="pt-1">
                <h3 class="text-lg font-semibold text-gray-900 capitalize">{step.title}</h3>
                <p class="text-sm text-gray-600 mt-1">{step.description}</p>
            </div>
        </div>
    {/each}
</div> 