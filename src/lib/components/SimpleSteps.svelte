<script lang="ts">
	const steps = [
		{
			num: '01',
			title: 'Step 1: Provide Your Details',
			desc: 'Choose from a variety of services, such as professional resumes, cover letters, or complete LinkedIn profile makeovers.'
		},
		{
			num: '02',
			title: 'Step 2: Expert Drafting',
			desc: 'Our certified writers will craft an ATS-optimized, compelling narrative that highlights your value proposition.'
		},
		{
			num: '03',
			title: 'Step 3: Satisfaction',
			desc: 'Review the drafts, request any necessary revisions, and get ready to land interviews and job offers.'
		}
	];
</script>

<section class="mx-auto max-w-7xl px-6 py-12 font-sans md:px-12 lg:px-8">
	<div class="rounded-[3rem] bg-[#F8F9FD] px-8 py-10 md:px-16 lg:px-24">
		<!-- Header -->
		<div class="mx-auto mb-10 max-w-2xl text-center">
			<h2
				class="mb-4 bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text font-sans text-3xl font-light tracking-tight text-transparent md:text-5xl"
			>
				Get amazing resumes in 3<br />simple steps
			</h2>
			<p class="text-md font-light text-slate-400">
				Our streamlined process is designed to take the stress out of resume writing. From your
				initial consultation to the final polished document.
			</p>
		</div>

		<!-- Main Content -->
		<div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
			<!-- Image Section -->
			<div
				class="relative mx-auto h-[162px] w-full max-w-[162px] lg:mx-0 lg:h-[324px] lg:max-w-[324px]"
			>
				<!-- Decorative stars -->
				<!-- Top left star -->
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="absolute -left-4 -top-6 z-20"
				>
					<defs>
						<linearGradient id="starGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style="stop-color:#E100FF;stop-opacity:1" />
							<stop offset="100%" style="stop-color:#7F00FF;stop-opacity:1" />
						</linearGradient>
					</defs>
					<path
						d="M20 0C20 11.0457 11.0457 20 0 20C11.0457 20 20 28.9543 20 40C20 28.9543 28.9543 20 40 20C28.9543 20 20 11.0457 20 0Z"
						fill="url(#starGradient1)"
					/>
				</svg>
				<!-- Bottom right star -->
				<svg
					width="32"
					height="32"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="absolute -bottom-4 right-8 z-20"
				>
					<defs>
						<linearGradient id="starGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style="stop-color:#E100FF;stop-opacity:1" />
							<stop offset="100%" style="stop-color:#7F00FF;stop-opacity:1" />
						</linearGradient>
					</defs>
					<path
						d="M20 0C20 11.0457 11.0457 20 0 20C11.0457 20 20 28.9543 20 40C20 28.9543 28.9543 20 40 20C28.9543 20 20 11.0457 20 0Z"
						fill="url(#starGradient2)"
					/>
				</svg>

				<!-- Back Image (Top right) -->
				<div
					class="absolute right-0 top-0 h-[70%] w-[65%] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-1 shadow-sm"
				>
					<div class="h-full w-full overflow-hidden rounded-[calc(2.5rem-4px)] bg-white">
						<img
							src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2070"
							alt="Professional Working"
							class="h-full w-full object-cover"
						/>
					</div>
				</div>

				<!-- Front Image (Bottom left overlapping) -->
				<div
					class="absolute bottom-0 left-0 z-10 h-[65%] w-[60%] overflow-hidden rounded-[2.5rem] rounded-bl-[0.5rem] bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-1 shadow-xl"
				>
					<div
						class="h-full w-full overflow-hidden rounded-[calc(2.5rem-4px)] rounded-bl-[calc(0.5rem-4px)] bg-white"
					>
						<img
							src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070"
							alt="Workspace"
							class="h-full w-full object-cover"
						/>
					</div>
				</div>
			</div>

			<!-- Steps Section -->
			<div class="relative mt-8 pl-2 lg:mt-0 lg:pl-8">
				<!-- Continuous Vertical Line -->
				<div
					class="absolute bottom-8 left-[36px] top-6 w-[2px] bg-gradient-to-b from-[#E100FF]/20 to-[#7F00FF]/20 lg:left-[59px]"
				></div>

				<div class="space-y-6">
					{#each steps as step}
						<div class="group relative flex items-start">
							<!-- Circle Number -->
							<div class="relative z-10 mr-5 flex-shrink-0">
								<div
									class="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-[3px] shadow-sm ring-[6px] ring-[#8566FF]/10 transition-all duration-300 group-hover:ring-[#8566FF]/30"
								>
									<div class="flex h-full w-full items-center justify-center rounded-full bg-white">
										<span
											class="bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text text-lg font-light text-transparent"
										>
											{step.num}
										</span>
									</div>
								</div>
							</div>

							<!-- Content -->
							<div class="pt-2">
								<h3
									class="mb-2 bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text font-sans text-xl font-light tracking-tight text-transparent"
								>
									{step.title}
								</h3>
								<p class="text-sm font-light leading-relaxed text-gray-500 md:text-base">
									{step.desc}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
