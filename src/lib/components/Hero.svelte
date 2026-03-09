<script>
	import { ArrowRight, Star, Award, Users } from 'lucide-svelte';
	import StatsCard from '$lib/components/StatsCard.svelte';

	function scrollToSection(e, href) {
		if (href.startsWith('#')) {
			e.preventDefault();
			const el = document.querySelector(href);
			if (el) {
				const offset = 80;
				const bodyRect = document.body.getBoundingClientRect().top;
				const elementRect = el.getBoundingClientRect().top;
				const elementPosition = elementRect - bodyRect;
				const offsetPosition = elementPosition - offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		}
	}
</script>

<div
	class="relative flex min-h-[25vh] w-full items-center overflow-hidden bg-[#FAFAFF] pb-6 pt-28 font-sans lg:pt-36"
>
	<!-- Decorative background elements -->
	<!-- Top left big circle -->
	<div
		class="pointer-events-none absolute -left-48 -top-72 z-0 h-[300px] w-[300px] rounded-full border-[30px] border-[#edeaff] opacity-40 lg:-left-20 lg:-top-40 lg:h-[600px] lg:w-[600px] lg:border-[80px] lg:opacity-60"
	></div>

	<!-- Purple floating circle -->
	<div
		class="absolute left-[42%] top-[35%] z-0 hidden h-16 w-16 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] shadow-lg xl:block"
	></div>

	<!-- Random crosses -->
	<div
		class="absolute left-[28%] top-[28%] z-0 hidden rotate-45 text-2xl font-extrabold text-black opacity-80 lg:block"
	>
		+
	</div>
	<div
		class="absolute right-[32%] top-[25%] z-0 hidden rotate-45 text-2xl font-extrabold text-black opacity-80 lg:block"
	>
		+
	</div>
	<div
		class="absolute bottom-[40%] left-[44%] z-0 hidden rotate-45 text-xl font-extrabold text-[#E100FF] lg:block"
	>
		+
	</div>

	<!-- Dot patterns -->
	<div
		class="absolute right-[44%] top-[32%] z-0 grid hidden grid-cols-4 gap-2.5 opacity-20 xl:grid"
	>
		{#each Array(16) as _}
			<div class="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
		{/each}
	</div>

	<div
		class="absolute bottom-[10%] right-[10%] z-0 grid hidden grid-cols-4 gap-2.5 opacity-20 lg:grid"
	>
		{#each Array(16) as _}
			<div class="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
		{/each}
	</div>

	<!-- Bottom right purple circle curve -->
	<div
		class="pointer-events-none absolute -bottom-48 -right-24 z-0 h-48 w-48 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] opacity-60 lg:-bottom-56 lg:-right-24 lg:h-80 lg:w-80 lg:opacity-90"
	></div>

	<!-- Bottom left slanted pill -->
	<div
		class="absolute -bottom-10 left-[15%] z-0 hidden h-10 w-32 -rotate-45 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] opacity-90 lg:block"
	></div>

	<div class="container relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
		<div class="grid items-center gap-8 lg:grid-cols-2 xl:gap-16">
			<!-- Left Content -->
			<div
				class="mx-auto flex max-w-xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left xl:max-w-2xl"
			>
				<h1
					class="mb-5 text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-[#1a1a1a] md:text-6xl xl:text-[4rem]"
				>
					Get that<br />
					<span class="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text text-transparent"
						>Resume</span
					>
					that<br />
					gets you
					<span class="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text text-transparent"
						>hired.</span
					>
				</h1>

				<p
					class="mx-auto mb-8 max-w-md text-sm font-normal leading-[1.8] text-gray-400 md:text-base lg:mx-0"
				>
					Written by certified professionals. ATS-optimized. Delivered in 48 hours.
				</p>

				<div class="mb-10 flex flex-col items-center gap-5 lg:items-start">
					<div class="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
						<a
							href="/order"
							class="group flex items-center gap-3 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-[#8566FF]/30"
						>
							<span class="bounce-text"> Get Resume </span>
							<span class="bounce-icon rounded-full bg-white/20 p-1">
								<ArrowRight class="h-4 w-4" />
							</span>
						</a>
						<a
							href="#contact"
							onclick={(e) => scrollToSection(e, '#contact')}
							class="group relative flex items-center justify-center rounded-full bg-white p-[2px] transition-all"
						>
							<div
								class="absolute inset-0 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF]"
							></div>
							<div
								class="relative flex h-full w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-3 transition-colors group-hover:bg-gray-50"
							>
								<span
									class="bounce-text bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text text-sm font-bold text-transparent"
								>
									Contact us
								</span>
								<span class="bounce-icon">
									<ArrowRight class="h-4 w-4 text-[#7F00FF]" />
								</span>
							</div>
						</a>
					</div>

					<!-- Mini Trust Rating -->
					<div class="flex items-center gap-2 pl-1">
						<div class="flex -space-x-1">
							{#each Array(5) as _, i}
								<Star
									class="h-5 w-5 fill-[#FFB800] text-[#FFB800]"
									style={i === 4 ? 'clip-path: inset(0 10% 0 0);' : ''}
								/>
							{/each}
						</div>
						<div class="flex items-center gap-2">
							<div
								class="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF]"
							>
								<span class="text-[8px] font-black text-white">G</span>
							</div>
							<span class="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60"
								>5-STAR RATING</span
							>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Content / Image Area -->
			<div class="relative hidden h-full w-full items-center justify-end lg:flex">
				<!-- Decorative Shapes (Restored) -->

				<!-- Region 1: Left Area -->
				<!-- Top Left: Solid Purple Diamond -->
				<div
					class="absolute left-10 top-[5%] z-0 h-12 w-12 rotate-[35deg] bg-gradient-to-br from-[#E100FF] to-[#7F00FF] opacity-90 shadow-xl lg:h-10 lg:w-10"
				></div>
				<div
					class="absolute left-[-20px] top-[35%] z-0 h-14 w-14 rounded-full border-[5px] border-[#E100FF] opacity-80"
				></div>
				<div
					class="absolute bottom-[30%] left-5 z-0 h-16 w-16 rotate-[25deg] border-[5px] border-[#E100FF] opacity-80"
				></div>

				<!-- Region 2: Bottom Area -->
				<!-- Bottom Center-Left: Dashed Corner -->
				<div
					class="absolute -bottom-40 left-[15%] z-0 h-28 w-28 border-b-8 border-l-8 border-dashed border-[#E100FF] opacity-30"
				></div>

				<!-- Region 3: Top Right Area -->
				<!-- Top: Dot Grid (Diamond pattern) - Reduced Height -->
				<div
					class="absolute right-[16%] top-[10px] z-0 grid -rotate-[15deg] grid-cols-7 gap-3 opacity-60 lg:opacity-70"
				>
					{#each Array(28) as _}
						<div class="h-2 w-2 rounded-full bg-[#E100FF]"></div>
					{/each}
				</div>

				<div
					class="absolute right-[12%] top-[8%] z-0 h-24 w-32 rotate-[35deg] bg-gradient-to-br from-[#E100FF] to-[#7F00FF] opacity-90 shadow-2xl"
				></div>

				<!-- Region 4: Right/Bottom-Right Area -->
				<!-- Extreme Right: Overlapping Dashed Rectangle -->
				<div
					class="absolute -right-14 top-[40%] z-20 h-24 w-12 rotate-[45deg] border-4 border-dashed border-[#E100FF] opacity-70"
				></div>

				<!-- Extreme Right: Overlapping Small Square -->
				<div
					class="absolute bottom-[18%] right-[-10px] z-20 h-10 w-10 rotate-[20deg] border-4 border-[#E100FF] opacity-85"
				></div>

				<!-- New accent at the very edge -->
				<div
					class="absolute -right-20 top-[65%] z-0 h-32 w-16 rotate-[25deg] bg-gradient-to-br from-[#E100FF] to-[#7F00FF] opacity-40 blur-[2px]"
				></div>

				<div
					class="relative z-10 -mr-12 w-[120%] max-w-none -translate-y-[10%] xl:-mr-24 xl:w-[135%]"
				>
					<img
						src="/image.svg"
						alt="Hero Presentation"
						class="h-auto w-full origin-right drop-shadow-2xl"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes bounce-left {
		0% {
			transform: translateX(0);
		}
		35% {
			transform: translateX(-12px);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes bounce-right {
		0% {
			transform: translateX(0);
		}
		35% {
			transform: translateX(12px);
		}
		100% {
			transform: translateX(0);
		}
	}

	.bounce-text,
	.bounce-icon {
		display: inline-block;
		transition: transform 0.3s ease;
	}

	.group:hover .bounce-text {
		animation: bounce-left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.group:hover .bounce-icon {
		animation: bounce-right 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}
</style>
