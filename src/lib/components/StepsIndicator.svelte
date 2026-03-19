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

<div class="space-y-16">
	{#each steps as step, index}
		<div class="flex items-start gap-4">
			<div class="relative">
				<!-- Outer Ring Container -->
				<div class="relative flex h-10 w-10 items-center justify-center">
					<!-- Gradient Ring -->
					<div
						class="absolute inset-0 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-[2px]"
					>
						<!-- Inner Circle (Matches sidebar bg for transparent look) -->
						<div class="flex h-full w-full items-center justify-center rounded-full bg-[#f2f6ff]">
							<span
								class="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text font-extrabold text-transparent"
							>
								{step.number}
							</span>
						</div>
					</div>
				</div>
				<!-- Vertical line (except for last step) -->
				{#if index !== steps.length - 1}
					<div class="absolute left-1/2 top-10 h-16 w-[1px] -translate-x-1/2 bg-gray-300"></div>
				{/if}
			</div>
			<div class="pt-1">
				<h3 class="text-md font-bold text-gray-900">{step.title}</h3>
				<p class="mt-1 text-sm leading-relaxed text-gray-500">{@html step.description}</p>
			</div>
		</div>
	{/each}
</div>
