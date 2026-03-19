<script>
	import { Card } from '$lib/components/ui/card';
	import CountUp from '$lib/components/CountUp.svelte';

	const stats = [
		{
			value: '1,120+',
			label: 'Resumes & CVs Delivered',
			sublabel: 'with ATS-compliant formatting',
			countUp: true
		},
		{
			value: '98%',
			label: 'Client Satisfaction Rate',
			sublabel: 'from verified client feedback',
			countUp: true
		},
		{
			value: '72hrs',
			label: 'Average Turnaround Time',
			sublabel: 'from order to final delivery',
			countUp: false
		},
		{
			value: '850+',
			label: 'Clients Hired on First Attempt',
			sublabel: 'across multiple industries worldwide',
			countUp: true
		}
	];
</script>

<section class="w-full bg-[#FAFAFF]">
	<div class="mx-auto -mt-10 max-w-7xl px-4 md:px-24 lg:px-8">
		<Card
			class="rounded-xl bg-white/95 p-8 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl"
		>
			<div class="grid grid-cols-2 gap-8 md:gap-4 lg:grid-cols-4">
				{#each stats as stat}
					<div class="group cursor-pointer text-center">
						<div
							class="transform transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-xl"
						>
							<h2
								class="mb-2 bg-gradient-to-r from-[#E100FF] to-[#7F00FF] bg-clip-text text-4xl font-extrabold text-transparent transition-all duration-300 md:text-5xl"
							>
								{#if stat.countUp}
									<CountUp value={stat.value} />
								{:else}
									{stat.value}
								{/if}
							</h2>
							<p
								class="mb-1 text-sm font-medium text-gray-700 transition-transform duration-300 group-hover:-translate-y-1 md:text-base"
							>
								{stat.label}
							</p>

							<p
								class="text-xs text-gray-500 transition-transform duration-300 group-hover:-translate-y-1 md:text-base"
							>
								{stat.sublabel}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</Card>
	</div>
</section>
