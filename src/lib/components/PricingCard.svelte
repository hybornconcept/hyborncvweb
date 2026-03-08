<script lang="ts">
	import { Check, User } from 'lucide-svelte';

	let plans = [
		{
			id: 'basic',
			name: 'Basic Package',
			price: '10,000',
			oldPrice: '15,000',
			savePercent: '33',
			description: 'Essential resume writing service to get you started and noticed.',
			features: [
				'Professional resume',
				'ATS optimisation',
				'Modern professional design',
				'Cover Letter'
			],
			isPopular: false,
			height: 'min-h-[450px]'
		},
		{
			id: 'regular',
			name: 'Optimal Package',
			price: '25,000',
			oldPrice: '30,000',
			savePercent: '50',
			description: 'Comprehensive package for the modern job seeker.',
			features: [
				'Professional resume',
				'ATS optimisation',
				'Modern professional design',
				'Cover Letter',
				'LinkedIn makeover',
				'Dedicated career consultant',
				'Targeted job search strategy'
			],
			isPopular: true,
			height: 'min-h-[580px]'
		},
		{
			id: 'allinone',
			name: 'All-in-one Package',
			price: '40,000',
			oldPrice: '50,000',
			savePercent: '20',
			description: 'The complete career advancement toolkit for success.',
			features: [
				'Professional resume',
				'ATS optimisation',
				'Modern professional design',
				'Cover Letter',
				'LinkedIn makeover',
				'Interview tips & coaching',
				'Editable Word format',
				'1-on-1 career strategy call',
				'Executive recruiter distribution',
				'Customized value proposition'
			],
			isPopular: false,
			height: 'min-h-[650px]'
		}
	];

	let isSubscription = false;
</script>

<section id="pricing" class="bg-gray-50/30 py-16 font-sans">
	<div class="mx-auto max-w-7xl px-6 md:px-12 lg:px-8">
		<div class="mb-8 text-center">
			<h2
				class="mb-4 bg-gradient-to-r from-[#E100FF] to-[#7F00FF] bg-clip-text text-3xl font-light tracking-tight text-transparent md:text-5xl"
			>
				Choose the best package for you
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-500">
				Get the Right Resume for Your Career. Select a plan that aligns with your goals and level of
				experience.
			</p>
		</div>

		<!-- Toggle One Time/Subscription -->
		<div class="mb-10 flex justify-center">
			<div
				class="inline-flex items-center rounded-full bg-white p-1 shadow-[0_2px_10px_rgb(0,0,0,0.05)] ring-1 ring-gray-100"
			>
				<button
					class="rounded-full px-8 py-2.5 text-sm font-semibold transition-all {!isSubscription
						? 'bg-gradient-to-r from-[#E100FF] to-[#7F00FF] text-white shadow-md'
						: 'text-gray-500 hover:text-gray-900'}"
					on:click={() => (isSubscription = false)}
				>
					One Time
				</button>
				<button
					class="rounded-full px-8 py-2.5 text-sm font-semibold transition-all {isSubscription
						? 'bg-gradient-to-r from-[#E100FF] to-[#7F00FF] text-white shadow-md'
						: 'text-gray-500 hover:text-gray-900'}"
					on:click={() => (isSubscription = true)}
				>
					Subscription
				</button>
			</div>
		</div>

		<div class="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 md:grid-cols-3">
			{#each plans as plan}
				{#if plan.isPopular}
					<!-- Optimal Package with Gradient Background -->
					<div
						class="relative flex w-full flex-col rounded-[1.8rem] bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-8 text-white shadow-2xl transition-all duration-300"
					>
						<div class="mb-8">
							<div class="mb-4 flex items-center justify-between">
								<div class="flex items-baseline">
									<span class="text-[2rem] font-bold tracking-tight text-white">₦{plan.price}</span>
									<span class="ml-2 text-sm text-white/70 line-through">
										₦{plan.oldPrice}
									</span>
								</div>
								<span
									class="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-bold text-[#7F00FF]"
								>
									Save {plan.savePercent}%
								</span>
							</div>
							<h3 class="mb-2 text-xl font-extrabold tracking-tight text-white">
								{plan.name}
							</h3>
							<p class="text-sm leading-relaxed text-white/80">
								{plan.description}
							</p>
						</div>

						<ul class="mb-6 flex-1 space-y-4">
							{#each plan.features as feature}
								<li class="flex items-start">
									<div
										class="mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#7F00FF]"
									>
										<Check class="h-3 w-3 stroke-[3]" />
									</div>
									<span class="text-sm text-white/90">
										{feature}
									</span>
								</li>
							{/each}
						</ul>

						<a
							href="/order?package={plan.id}"
							class="mt-auto flex w-full items-center justify-center rounded-full bg-white py-3.5 text-sm font-bold text-[#7F00FF] transition-all hover:bg-gray-50"
						>
							<User class="mr-2 h-4 w-4" />
							Order now
						</a>
					</div>
				{:else}
					<!-- Other Packages with Gradient Border -->
					<div
						class="group relative w-full rounded-[1.8rem] bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-[2px] transition-all duration-300 hover:shadow-xl"
					>
						<div class="flex h-full flex-col rounded-[calc(1.8rem-2px)] bg-white p-8 {plan.height}">
							<div class="mb-8">
								<div class="mb-4 flex items-center justify-between">
									<div class="flex items-baseline">
										<span class="text-[2rem] font-bold tracking-tight text-gray-900"
											>₦{plan.price}</span
										>
										<span class="ml-2 text-sm text-gray-400 line-through">
											₦{plan.oldPrice}
										</span>
									</div>
								</div>
								<h3 class="mb-2 text-xl font-extrabold tracking-tight text-gray-900">
									{plan.name}
								</h3>
								<p class="text-sm leading-relaxed text-gray-500">
									{plan.description}
								</p>
							</div>

							<ul class="mb-6 flex-1 space-y-4">
								{#each plan.features as feature}
									<li class="flex items-start">
										<div
											class="mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white"
										>
											<Check class="h-3 w-3 stroke-[3]" />
										</div>
										<span class="text-sm text-gray-600">
											{feature}
										</span>
									</li>
								{/each}
							</ul>

							<a
								href="/order?package={plan.id}"
								class="mt-auto flex w-full items-center justify-center rounded-full border-2 border-transparent bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-border py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
							>
								<User class="mr-2 h-4 w-4" />
								Order now
							</a>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
