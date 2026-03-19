<script lang="ts">
	import { cn } from '$lib/utils';
	import { User, Menu, X, Twitter, Facebook, Instagram, Phone, Mail, Clock } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import { page } from '$app/state';

	let isMenuOpen = $state(false);
	let scrollY = $state(0);

	const contactInfo = [
		{ Icon: Phone, text: '+234 706 515 5036' },
		{ Icon: Mail, text: 'info@hyborncv.com' },
		{ Icon: Clock, text: 'Available 24 hours' }
	];

	const socialLinks = [
		{ Icon: Twitter, href: 'https://twitter.com/hyborncv', label: 'Twitter' },
		{ Icon: Facebook, href: 'https://facebook.com/hyborncv', label: 'Facebook' },
		{ Icon: Instagram, href: 'https://instagram.com/hyborncv', label: 'Instagram' }
	];

	const navItems = [
		{ href: '#home', label: 'Home' },
		{ href: '#features', label: 'Why Us' },
		{ href: '#services', label: 'Services' },
		{ href: '#pricing', label: 'Pricing' },
		{ href: '#testimonials', label: 'Testimonials' },
		{ href: '#contact', label: 'Contact us' }
	];

	function scrollToSection(e: MouseEvent, href: string) {
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
				isMenuOpen = false;
			}
		}
	}
</script>

<svelte:window bind:scrollY />

<nav
	class={cn(
		'fixed left-0 right-0 top-0 z-50 w-full font-sans transition-all duration-500',
		scrollY > 50 ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-transparent'
	)}
>
	<!-- Top Bar - Animated height -->
	<div
		class={cn(
			'overflow-hidden bg-[#0B1120] text-white transition-all duration-300',
			scrollY > 50 ? 'h-0 opacity-0' : 'h-8 py-1.5 opacity-100'
		)}
	>
		<div
			class="mx-auto flex max-w-7xl items-center justify-center px-4 text-[10px] sm:text-xs md:justify-end"
		>
			<div class="mr-6 flex items-center space-x-3 sm:space-x-4 lg:mr-10">
				<span class="font-medium text-white">Follow</span>
				{#each socialLinks as { Icon, href, label }}
					<a {href} class="transition-colors hover:text-white" aria-label={label}>
						<Icon class="h-[14px] w-[14px]" stroke-width="2.5" />
					</a>
				{/each}
			</div>

			<div class="flex items-center space-x-4 sm:space-x-6">
				{#each contactInfo as { Icon, text }, i}
					<div class="flex items-center {i === 2 ? 'hidden md:flex' : ''}">
						<Icon class="mr-1.5 h-[14px] w-[14px]" />
						<span>{text}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Main Header -->
	<header
		class={cn(
			'mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300',
			scrollY > 50 ? 'h-16' : 'h-20'
		)}
	>
		<!-- Left Logo -->
		<a href="/" class="group flex items-center gap-1 transition-all">
			<img src="logo.png" alt="HybornCV Logo" class="h-10 w-10 object-contain md:h-10 md:w-10" />
			<span
				class="text-md bg-gradient-to-br from-[#E100FF] to-[#7F00FF] bg-clip-text font-bold tracking-[0.05em] text-transparent md:text-xl"
			>
				HYBORN<span
					class="inline-block translate-y-[0.2em] text-[0.8em] font-light tracking-wider text-[#E100FF]"
					>CV</span
				>
			</span>
		</a>

		<!-- Center Nav -->
		<nav class="hidden items-center space-x-12 text-sm font-medium xl:flex">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={(e) => scrollToSection(e, item.href)}
					class={cn(
						'transition-all duration-300',
						scrollY > 50
							? 'text-gray-600 hover:bg-gradient-to-br hover:from-[#E100FF] hover:to-[#7F00FF] hover:bg-clip-text hover:text-transparent'
							: 'text-gray-800 hover:bg-gradient-to-br hover:from-[#E100FF] hover:to-[#7F00FF] hover:bg-clip-text hover:text-transparent'
					)}>{item.label}</a
				>
			{/each}
		</nav>

		<!-- Right Actions -->
		<div class="flex items-center gap-4">
			<div class="hidden items-center md:flex">
				{#if page.data.user}
					<a
						href={page.data.user.role === 'admin' ? '/admin' : '/clients'}
						class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-sm transition-all hover:scale-105"
					>
						<span class="text-[13px] font-bold text-[#A100FF] uppercase">
							{page.data.user.fullname ? page.data.user.fullname.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'AD'}
						</span>
					</a>
				{:else}
					<a
						href="/auth"
						class="group flex items-center gap-2 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#8566FF]/20 transition-all"
					>
						<div
							class="bounce-icon flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white"
						>
							<User class="h-3 w-3" stroke-width="3" />
						</div>
						<span class="bounce-text">Sign in</span>
					</a>
				{/if}
			</div>

			<!-- Mobile Menu Toggle -->
			<button
				class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] text-white shadow-lg transition-all hover:scale-110 xl:hidden"
				aria-label="Toggle Menu"
				onclick={() => (isMenuOpen = !isMenuOpen)}
			>
				{#if isMenuOpen}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
			</button>
		</div>
	</header>

	<!-- Mobile menu dropdown -->
	{#if isMenuOpen}
		<div
			transition:slide={{ duration: 400 }}
			class="absolute left-0 right-0 top-full flex flex-col space-y-4 border-b bg-white px-4 py-4 shadow-lg xl:hidden"
		>
			{#each navItems as item}
				<a
					href={item.href}
					onclick={(e) => scrollToSection(e, item.href)}
					class="py-2 font-medium text-gray-600 hover:text-gray-900">{item.label}</a
				>
			{/each}
			<div class="border-t pt-4">
				{#if page.data.user}
					<a
						href={page.data.user.role === 'admin' ? '/admin' : '/clients'}
						class="group flex w-full items-center justify-center gap-2 rounded-full bg-gray-50 py-3 font-bold text-gray-900 border border-gray-200 shadow-sm"
					>
						<div class="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-[10px] text-purple-700 uppercase">
							{page.data.user.fullname ? page.data.user.fullname.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'AD'}
						</div>
						<span>Go to Dashboard</span>
					</a>
				{:else}
					<a
						href="/auth"
						class="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#E100FF] to-[#7F00FF] py-3 font-bold text-white shadow-lg"
					>
						<span class="bounce-icon">
							<User class="h-4 w-4" />
						</span>
						<span class="bounce-text">Sign in</span>
					</a>
				{/if}
			</div>
		</div>
	{/if}
</nav>

<style>
	@keyframes bounce-left {
		0% {
			transform: translateX(0);
		}
		35% {
			transform: translateX(-10px);
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
			transform: translateX(10px);
		}
		100% {
			transform: translateX(0);
		}
	}

	.bounce-icon,
	.bounce-text {
		transition: transform 0.3s ease;
	}

	.group:hover .bounce-icon {
		animation: bounce-left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.group:hover .bounce-text {
		animation: bounce-right 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}
</style>
