<script lang="ts">
	import StatsCard from '$lib/components/StatsCard.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Header from '$lib/components/Header.svelte';
	import Services from '$lib/components/Services.svelte';
	import PricingCard from '$lib/components/PricingCard.svelte';
	import Fact from '$lib/components/Fact.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SimpleSteps from '$lib/components/SimpleSteps.svelte';
</script>

<Header />

<main class="relative">
	<section id="home">
		<Hero />
	</section>

	<section id="stats">
		<StatsCard />
	</section>

	<section id="features">
		<Fact />
	</section>

	<section id="services">
		<Services />
	</section>

	<section id="pricing">
		<PricingCard />
	</section>
	<section id="pricing">
		<SimpleSteps />
	</section>

	<section id="testimonials">
		<Testimonial />
	</section>
</main>

<Footer />
