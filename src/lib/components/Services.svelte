<script lang="ts">
	import { Wrench, MapPin, Zap, Layout, User, Calendar, ArrowRight } from 'lucide-svelte';

	const services = [
		{
			icon: Wrench,
			title: 'Professional Resume/CV Writing',
			description:
				'ATS-optimized resumes that highlight your achievements and get you noticed by top employers. 98% interview success rate!'
		},
		{
			icon: MapPin,
			title: 'Cover Letter Writing Services',
			description:
				'Compelling cover letters that tell your career story and make you stand out from other candidates.'
		},
		{
			icon: Zap,
			title: 'Statement of Purpose/Letter of Intent/Sustainability',
			description:
				'Persuasive statements that showcase your goals, achievements and fit for your Masters or PhD program Abroad.'
		},
		{
			icon: Layout,
			title: 'Linkedin Profile Makeover',
			description:
				'SEO-optimized LinkedIn profiles that attract recruiters and unlock hidden job opportunities.'
		},
		{
			icon: User,
			title: 'Web based Portfolio creation',
			description:
				'Eye-catching online portfolios that showcase your work and personal brand to potential employers.'
		},
		{
			icon: Calendar,
			title: 'Interview tips & Preparation',
			description:
				'Expert coaching to help you ace interviews and negotiate the best compensation package.'
		}
	];
</script>

<section id="services" class="bg-white py-24 font-sans">
	<div class="mx-auto max-w-7xl px-14 md:px-20 lg:px-32">
		<div class="mb-20 text-center">
			<p class="mb-2 text-sm font-light tracking-tight text-gray-400">Our Services</p>
			<h2
				class="bg-gradient-to-r from-[#E100FF] to-[#7F00FF] bg-clip-text text-2xl font-light tracking-tight text-transparent md:text-4xl"
			>
				What we really do.
			</h2>
		</div>

		<div class="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service}
				<a
					href="/auth"
					class="group relative mt-6 flex h-full w-full cursor-pointer flex-col drop-shadow-md transition-all duration-300 hover:drop-shadow-2xl"
				>
					<!-- Folder Tab (Gradient outline, white background) -->
					<div
						class="absolute -top-6 left-0 z-10 h-[26px] w-7/12 overflow-hidden rounded-t-xl bg-gradient-to-r from-[#E100FF] to-[#7F00FF] p-[2px] transition-all duration-300 group-hover:p-0 sm:w-5/12"
					>
						<div
							class="h-full w-full rounded-t-[calc(0.75rem-2px)] bg-white transition-all duration-300 group-hover:bg-transparent"
						>
							<!-- Slide-in background for Tab -->
							<div
								class="absolute inset-0 -translate-x-full translate-y-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] transition-transform duration-700 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
							></div>

							<!-- Subtle decorative dot on the tab -->
							<div
								class="absolute right-3 top-[8px] z-20 h-1.5 w-1.5 rounded-full bg-gray-200 transition-colors duration-300 group-hover:bg-white/30"
							></div>
						</div>
					</div>

					<!-- Gap Cover -->
					<div
						class="absolute left-[2px] top-0 z-20 h-[3px] w-[calc(58.333333%-4px)] bg-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#E100FF] group-hover:to-[#7F00FF] sm:w-[calc(41.666667%-4px)]"
					></div>

					<!-- Overlapping Big Icon on the Right -->
					<div
						class="absolute -right-4 -top-10 z-30 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white shadow-xl shadow-[#7F00FF]/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:bg-none group-hover:text-[#7F00FF] group-hover:shadow-[#E100FF]/50"
					>
						<svelte:component this={service.icon} class="h-8 w-8" strokeWidth={1} />
					</div>

					<!-- Folder Main Body -->
					<div
						class="relative z-0 flex flex-grow flex-col overflow-hidden rounded-[2rem] rounded-tl-none bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-[2px] transition-all duration-300 group-hover:p-0"
					>
						<div
							class="relative flex h-full flex-grow flex-col rounded-[calc(2rem-2px)] rounded-tl-none bg-white px-5 py-3 transition-all duration-300 group-hover:bg-transparent"
						>
							<!-- Slide-in background for Main Body -->
							<div
								class="absolute inset-0 z-0 -translate-x-full translate-y-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] transition-transform duration-700 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"
							></div>

							<!-- Content Wrapper (Ensures text stays above slide-in bg) -->
							<div class="relative z-10 flex h-full flex-col">
								<!-- Title -->
								<div class="mb-2 mt-1.5 pr-10">
									<h3
										class="font-mono text-lg font-normal leading-tight text-[#7F00FF] transition-colors duration-300 group-hover:text-white"
									>
										{service.title}
									</h3>
								</div>

								<p
									class="mb-1 flex-grow text-sm leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-white/90"
								>
									{service.description}
								</p>

								<div class="mt-auto pt-0">
									<span
										class="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] px-5 text-xs text-white transition-all duration-300 group-hover:bg-white group-hover:bg-none"
									>
										<span
											class="font-bold transition-all group-hover:bg-gradient-to-r group-hover:from-[#E100FF] group-hover:to-[#7F00FF] group-hover:bg-clip-text group-hover:text-transparent"
										>
											Order Now
										</span>
										<ArrowRight
											class="ml-2 h-3 w-3 transition-all group-hover:translate-x-1 group-hover:text-[#7F00FF]"
										/>
									</span>
								</div>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Fine-tuning for crisp folder outline rendering */
	section {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
