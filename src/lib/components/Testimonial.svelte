<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';

	let currentIndex = 2; // Start with the center item

	const testimonials = [
		{
			name: 'Chinelo Okafor',
			role: 'Pharmacist',
			avatar:
				'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200',
			comment:
				'Hyborn CV refined my professional profile perfectly. As a pharmacist, the technical details are crucial, and they captured my clinical expertise in a way that truly stands out to recruiters.'
		},
		{
			name: 'Tunde Bakare',
			role: 'Pharm Sales Rep',
			avatar:
				'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=200&h=200',
			comment:
				'The transition from clinical work to pharmaceutical sales was tough until I got my CV rewritten here. The impact was immediate – I secured a role with a top multinational within 3 weeks.'
		},
		{
			name: 'Oluchi Nwosu',
			role: 'Developer',
			avatar:
				'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200',
			comment:
				'I was struggling to get past ATS filters for senior dev roles. After the technical optimization by the team, my response rate from recruiters tripled. Highly professional service!'
		},
		{
			name: 'Amina Yusuf',
			role: 'Flight Attendant',
			avatar:
				'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200',
			comment:
				'Hospitality and service are my strengths, but translating that to paper was hard. They created a resume that perfectly showcases my personality and global experience.'
		},
		{
			name: 'Babatunde Ojo',
			role: 'Administrator',
			avatar:
				'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200',
			comment:
				'A truly streamlined experience. My new administrative profile is now much more efficient and clearly highlights my organizational value to prospective employers.'
		},
		{
			name: 'Ngozi Okonjo',
			role: 'Managing Director',
			avatar:
				'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
			comment:
				'At an executive level, your narrative must be precise. The team at Hyborn delivered an exceptional executive summary that resonates with board-level stakeholders.'
		},
		{
			name: 'Emeka Obi',
			role: 'Project Manager',
			avatar:
				'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
			comment:
				'Managing complex projects requires a CV that shows leadership and results. Hyborn CV structured my achievements brilliantly. The return on investment has been incredible.'
		}
	];

	let timer: any;

	function next() {
		currentIndex = (currentIndex + 1) % testimonials.length;
		resetTimer();
	}

	function prev() {
		currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
		resetTimer();
	}

	function setIndex(index: number) {
		currentIndex = index;
		resetTimer();
	}

	function resetTimer() {
		if (timer) clearInterval(timer);
		timer = setInterval(next, 5000);
	}

	onMount(() => {
		timer = setInterval(next, 5000);
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	function getPositionIndex(idx: number, current: number) {
		const total = testimonials.length;
		let diff = idx - current;

		if (diff < -2) diff += total;
		if (diff > 2) diff -= total;

		// Maps relative position to an index 0-4
		if (diff >= -2 && diff <= 2) {
			return diff + 2;
		}
		return -1;
	}

	const getClass = (pos: number) => {
		switch (pos) {
			case 0:
				return 'left-[0%] sm:left-[5%] md:left-[15%] bottom-[55px] md:bottom-[65px] scale-75 opacity-40 z-10';
			case 1:
				return 'left-[22%] sm:left-[27%] md:left-[32.5%] bottom-[30px] md:bottom-[35px] scale-90 opacity-70 hover:opacity-100 z-20';
			case 2:
				return 'left-[50%] bottom-[5px] scale-[1.1] sm:scale-[1.3] opacity-100 z-30'; // Center
			case 3:
				return 'left-[78%] sm:left-[73%] md:left-[67.5%] bottom-[30px] md:bottom-[35px] scale-90 opacity-70 hover:opacity-100 z-20';
			case 4:
				return 'left-[100%] sm:left-[95%] md:left-[85%] bottom-[55px] md:bottom-[65px] scale-75 opacity-40 z-10';
			default:
				return 'left-[50%] bottom-[5px] scale-0 opacity-0 z-0 pointer-events-none';
		}
	};
</script>

<section id="testimonials" class="overflow-hidden bg-[#F8F9FD] py-14 font-sans">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-4 text-center">
			<h2
				class="mb-4 bg-gradient-to-r from-[#E100FF] to-[#7F00FF] bg-clip-text text-3xl font-light tracking-tight text-transparent md:text-5xl"
			>
				What our clients are saying?
			</h2>
			<p class="mx-auto max-w-2xl text-[13px] leading-relaxed text-gray-400 md:text-sm">
				Real stories from real professionals. See how our expert resume writing and strategic
				branding have helped thousands land their dream roles and accelerate their careers.
			</p>
		</div>

		<!-- Curved Gallery -->
		<div class="relative mb-4 mt-6 h-[110px] w-full md:mb-8">
			<!-- Visual Curve Line -->
			<div
				class="pointer-events-none absolute bottom-[20px] left-1/2 h-[500px] w-[200%] -translate-x-1/2 rounded-[50%] border-b-[2px] border-[#E5E7EB] sm:w-[150%] md:w-[120%]"
			></div>

			<!-- Avatars -->
			{#each testimonials as item, index}
				{@const pos = getPositionIndex(index, currentIndex)}
				<button
					class={`absolute -translate-x-1/2 cursor-pointer transition-all [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] ${getClass(pos)}`}
					on:click={() => pos !== -1 && setIndex(index)}
					aria-label={`View testimonial from ${item.name}`}
				>
					<div
						class={`rounded-full transition-all duration-700 ${pos === 2 ? 'bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-[4px] shadow-lg shadow-[#8566FF]/30' : 'bg-transparent p-0'}`}
					>
						<img
							src={item.avatar}
							alt={item.name}
							class={`pointer-events-none h-[60px] w-[60px] rounded-full border-[3px] object-cover transition-all duration-700 ${pos === 2 ? 'border-white' : 'border-white/50 grayscale-[20%]'}`}
						/>
					</div>
				</button>
			{/each}
		</div>

		<!-- Main Testimonial Card -->
		<div class="relative mx-auto max-w-2xl px-4 sm:px-0">
			<!-- Prev Button -->
			<button
				class="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white shadow-lg transition-transform hover:scale-110 sm:-left-5"
				on:click={prev}
				aria-label="Previous Testimonial"
			>
				<ChevronLeft class="h-5 w-5" />
			</button>

			<!-- Card Content -->
			<div
				class="flex min-h-[180px] flex-col justify-center overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 md:p-10"
			>
				{#key currentIndex}
					<div class="animate-fade-in flex flex-grow flex-col justify-center">
						<h3
							class="mb-1 bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text text-xl font-bold text-transparent md:text-2xl"
						>
							{testimonials[currentIndex].name}
						</h3>
						<p class="mb-4 text-sm font-medium text-gray-400">{testimonials[currentIndex].role}</p>

						<p class="text-[13px] leading-relaxed text-gray-500 md:text-[15px]">
							{testimonials[currentIndex].comment}
						</p>
					</div>
				{/key}
			</div>

			<!-- Next Button -->
			<button
				class="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white shadow-lg transition-transform hover:scale-110 sm:-right-5"
				on:click={next}
				aria-label="Next Testimonial"
			>
				<ChevronRight class="h-5 w-5" />
			</button>
		</div>
	</div>
</section>

<style>
	/* Custom simple fade in for the text change */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fadeIn 0.5s ease-out forwards;
	}
</style>
