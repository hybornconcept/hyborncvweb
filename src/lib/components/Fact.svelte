<script lang="ts">
	import { ArrowRight, Star, Fingerprint, ShieldCheck, Target } from '@lucide/svelte';
	import type { Component } from 'svelte';

	interface Point {
		id: number;
		quote: string;
		author: string;
		icon: Component;
		position: string;
	}

	const points: Point[] = [
		{
			id: 1,
			quote: 'No matter how skilled you are, recruiters see your resume before they see you.',
			author: 'Anonymous',
			icon: Target,
			position: 'left-top'
		},
		{
			id: 2,
			quote: '75% of resumes are rejected by ATS before a human ever sees them.',
			author: 'Jobscan (2018)',
			icon: Star,
			position: 'right-top'
		},
		{
			id: 3,
			quote: 'Recruiters are 77% more likely to reject resumes due to typographical errors.',
			author: 'CareerBuilder, 2018',
			icon: Fingerprint,
			position: 'left-bottom'
		},
		{
			id: 4,
			quote: 'Recruiters spend just 6–7 seconds scanning a resume on average.',
			author: 'TheLadders, (2012)',
			icon: ShieldCheck,
			position: 'right-bottom'
		}
	];
</script>

<section class="relative overflow-hidden bg-[#FAFAFF] py-14 font-sans text-gray-900">
	<!-- Purple Gradient Background Elements -->
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(133,102,255,0.12),transparent_70%)]"
	></div>

	<!-- Large Purple Semi-Circle at Bottom Center -->
	<div
		class="pointer-events-none absolute bottom-[-5%] left-1/2 h-[350px] w-full max-w-[800px] -translate-x-1/2 rounded-t-full bg-gradient-to-t from-[#E100FF]/20 to-transparent blur-3xl md:h-[450px]"
	></div>

	<div class="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
		<!-- Header Segment accurately following the image layout -->
		<div class="mb-12 text-center md:text-left">
			<div class="mb-4 inline-flex items-center gap-3">
				<p class="text-sm font-light tracking-tight text-gray-400">Competitive Advantage</p>
			</div>
			<h2
				class="bg-gradient-to-r from-[#E100FF] to-[#7F00FF] bg-clip-text text-2xl font-light tracking-tight text-transparent md:text-6xl lg:text-[2.5rem]"
			>
				Why Choose Hyborn CV
			</h2>
		</div>

		<!-- The Central Interactive Hub -->
		<div
			class="relative mx-auto flex min-h-[300px] w-full items-center justify-center lg:min-h-[420px]"
		>
			<!-- Character Image Container -->
			<div class="relative z-10 hidden h-full w-full max-w-lg overflow-hidden rounded-3xl lg:block">
				<!-- Purple Overlay placeholder removed bg per user edit -->
				<div class="pointer-events-none absolute inset-0 z-20"></div>
				<img
					src="/subimage2.svg"
					alt="Career Professional"
					class="mx-auto h-auto w-full object-contain"
				/>
			</div>

			<!-- Floating Quote Cards - Surrounding the image exactly as per reference -->
			{#each points as point}
				{@const Icon = point.icon}
				<div
					class="absolute z-20 hidden md:block"
					class:left-[15%]={point.position === 'left-top'}
					class:right-[15%]={point.position === 'right-top'}
					class:left-[12%]={point.position === 'left-bottom'}
					class:right-[12%]={point.position === 'right-bottom'}
					class:top-[10%]={point.position.includes('top')}
					class:bottom-[15%]={point.position.includes('bottom')}
					class:mt-[-5%]={point.position.includes('top')}
				>
					<div
						class="group relative flex w-72 flex-col items-start rounded-[1.5rem] border border-white/40 bg-white/60 p-4 shadow-2xl backdrop-blur-md transition-all duration-300"
					>
						<!-- Line indicator pointing to center -->
						<div
							class="absolute top-1/2 h-px w-20 bg-gradient-to-r from-gray-100 via-gray-300 to-transparent opacity-40"
							class:-right-20={point.position.includes('left')}
							class:-left-20={point.position.includes('right')}
						></div>

						<!-- Circular Icon Badge - Overlapping and side-specific -->
						<div
							class="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white shadow-lg shadow-[#8566FF]/30"
							class:-left-5={point.position.includes('left')}
							class:-right-5={point.position.includes('right')}
						>
							<Icon class="h-5 w-5" />
						</div>

						<p class="mb-3 text-sm font-medium italic leading-relaxed text-gray-700">
							"{point.quote}"
						</p>
						<p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">
							- {point.author}
						</p>
					</div>
				</div>
			{/each}

			<!-- Mobile Grid Design -->
			<div class="mt-8 grid grid-cols-1 gap-6 md:hidden">
				{#each points as point}
					{@const Icon = point.icon}
					<div class="relative mx-auto w-full max-w-sm rounded-3xl bg-white p-7 shadow-xl">
						<div
							class="absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white shadow-lg shadow-[#8566FF]/30"
						>
							<Icon class="h-5 w-5" />
						</div>
						<p class="mb-3 text-sm italic text-gray-700">"{point.quote}"</p>
						<p class="text-xs font-bold text-gray-400">- {point.author}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* Force high quality text rendering */
	section {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
