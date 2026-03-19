<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { value, duration = 3000 } = $props();

	let displayValue = $state(value);

	onMount(() => {
		if (!browser) return;

		const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));

		const format = (n) => {
			if (value.includes('%')) return `${Math.round(n)}%`;
			if (value.includes('+')) return `${Math.round(n)}+`;
			if (value.includes('x')) return `${Math.round(n)}x`;
			return `${Math.round(n)}`;
		};

		let start = null;
		let raf;

		const animate = (timestamp) => {
			if (!start) start = timestamp;
			const elapsed = timestamp - start;
			const progress = Math.min(elapsed / duration, 1);
			displayValue = format(numericValue * progress);
			if (progress < 1) {
				raf = requestAnimationFrame(animate);
			}
		};

		const timeout = setTimeout(() => {
			raf = requestAnimationFrame(animate);
		}, 500);

		return () => {
			clearTimeout(timeout);
			cancelAnimationFrame(raf);
		};
	});
</script>

<span>{displayValue}</span>
