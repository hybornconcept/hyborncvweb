<script lang="ts">
	import './layout.css';
	import { navigating } from '$app/state';
	import { fade, scale } from 'svelte/transition';

	let { children } = $props();
</script>

{#if navigating.to}
	<div
		transition:fade={{ duration: 150 }}
		class="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-md"
	>
		<div
			class="relative flex flex-col items-center gap-6"
			in:scale={{ duration: 250, start: 0.98 }}
		>
			<!-- Premium Gradient Loader -->
			<div class="relative flex h-24 w-24 items-center justify-center">
				<!-- Outer spinning gradient ring -->
				<div
					class="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-r-[#7F00FF] border-t-[#E100FF]"
					style="animation-duration: 0.8s;"
				></div>
				<!-- Inner slow spinning gradient ring -->
				<div
					class="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-b-[#7F00FF] border-l-[#E100FF]"
					style="animation-duration: 1.5s; animation-direction: reverse;"
				></div>
				<!-- Centered dot/logo -->
				<div
					class="h-6 w-6 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] shadow-[0_0_15px_rgba(127,0,255,0.5)]"
				></div>
			</div>

			<div class="flex flex-col items-center space-y-1">
				<p
					class="bg-gradient-to-r from-[#E100FF] to-[#7F00FF] bg-clip-text text-lg font-bold text-transparent"
				>
					Loading
				</p>
				<p class="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">Please wait</p>
			</div>
		</div>
	</div>
{/if}

{@render children()}
