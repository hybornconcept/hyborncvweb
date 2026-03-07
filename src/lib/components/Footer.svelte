<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Twitter, FacebookIcon, Instagram } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();
</script>

<footer class="w-full bg-slate-900">
	<div class="mx-auto px-4 pt-10 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
		<div class="row-gap-6 mb-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div class="text-center sm:col-span-2 sm:text-left">
				<a
					href="/"
					aria-label="Go home"
					title="Company"
					class="inline-flex items-center justify-center sm:justify-start"
				>
					<img src="hylogo2.png" alt="HybornCV" class="h-10 w-10" />
					<span class="ml-2 text-xl font-bold tracking-wide text-white">HybornCV</span>
				</a>
				<div class="mx-auto mt-4 hidden sm:mx-0 md:block lg:max-w-sm">
					<p class="text-sm text-white">
						Transforming careers through expert resume writing and professional branding services.
						Your success story starts with a compelling resume.
					</p>
					<p class="mt-4 text-sm text-white">
						We help professionals stand out in competitive job markets with ATS-optimized resumes
						and strategic career guidance.
					</p>
				</div>
			</div>
			<div class="space-y-2 text-center text-xs sm:text-left md:text-sm">
				<p class="text-base font-bold tracking-wide text-white">Contacts</p>
				<div class="flex flex-col items-center justify-center gap-4 sm:items-start sm:gap-2">
					<div class="flex justify-center sm:justify-start">
						<p class="mr-1 text-white">Phone:</p>
						<a
							href="tel:+2347065155036"
							aria-label="Our phone"
							title="Our phone"
							class="hover:text-deep-purple-800 text-white transition-colors duration-300"
							>+234 706 515 5036</a
						>
					</div>

					<div class="flex justify-center sm:justify-start">
						<p class="mr-1 text-white">Email:</p>
						<a
							href="mailto:info@hyborncv.com"
							aria-label="Our email"
							title="Our email"
							class="text-white transition-colors duration-300 hover:text-white"
							>info@hyborncv.com</a
						>
					</div>
					<div class="flex justify-center sm:justify-start">
						<p class="mr-1 text-white">Address:</p>

						<a
							href="https://www.google.com/maps"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Our address"
							title="Our address"
							class="hover:text-deep-purple-800 text-white transition-colors duration-300"
						>
							Port Harcourt, Nigeria
						</a>
					</div>
				</div>
			</div>
			<div class="text-center sm:text-left">
				<span class="text-base font-bold tracking-wide text-white">Social</span>
				<div class="mt-4 flex items-center justify-center space-x-4 sm:justify-start">
					<Button
						variant="ghost"
						href="/"
						class="h-10 w-10 rounded-full bg-white p-0 text-slate-900 shadow-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-lg"
						aria-label="Follow us on Twitter"
					>
						<Twitter class="h-5 w-5" />
					</Button>
					<Button
						variant="ghost"
						href="/"
						class="h-10 w-10 rounded-full bg-white p-0 text-slate-900 shadow-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-lg"
						aria-label="Follow us on Facebook"
					>
						<FacebookIcon class="h-5 w-5" />
					</Button>
					<Button
						variant="ghost"
						href="/"
						class="h-10 w-10 rounded-full bg-white p-0 text-slate-900 shadow-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-lg"
						aria-label="Follow us on Instagram"
					>
						<Instagram class="h-5 w-5" />
					</Button>
				</div>
				<p class="mt-4 hidden text-sm text-gray-300 md:block">
					Follow us for career tips, resume trends, and professional development insights.
				</p>
			</div>
		</div>
		<div
			class="flex flex-col-reverse justify-between border-t border-gray-700 pb-4 pt-5 text-xs md:text-sm lg:flex-row"
		>
			<p class="  text-center text-gray-300 lg:text-left">
				© Copyright {currentYear} HybornCV. All rights reserved.
			</p>

			<ul
				class="mb-3 flex w-full flex-row items-center justify-center lg:mb-0 lg:w-auto lg:items-start lg:justify-start"
			>
				<li>
					<a href="/" class="text-sm text-gray-300 transition-colors duration-300 hover:text-white"
						>FAQ</a
					>
				</li>
				<span class="px-2 text-gray-300">|</span>
				<li>
					<a href="/" class="text-sm text-gray-300 transition-colors duration-300 hover:text-white"
						>Privacy Policy</a
					>
				</li>
				<span class="px-2 text-gray-300">|</span>
				<li>
					<a href="/" class="text-sm text-gray-300 transition-colors duration-300 hover:text-white"
						>Terms &amp; Conditions</a
					>
				</li>
			</ul>
		</div>
	</div>
</footer>
