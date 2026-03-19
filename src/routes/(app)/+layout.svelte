<script lang="ts">
	import {
		Home,
		Inbox,
		UserPlus,
		Settings,
		Bell,
		ChevronRight,
		LogOut,
		Sidebar,
		FileText,
		MessageSquare,
		RotateCcw,
		Package
	} from '@lucide/svelte';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { children, data } = $props();
	let isCollapsed = $state(false);

	function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}

	// Session Heartbeat: If user is logged in, ping the server every 2 minutes 
	// to refresh the 5-minute sliding window cookie.
	onMount(() => {
		if (data?.user) {
			const interval = setInterval(() => {
				// invalidateAll triggers a server request, which hits hooks.server.ts 
				// and refreshes the 'set-cookie' header.
				invalidateAll();
			}, 2 * 60 * 1000); // Every 2 minutes
			
			return () => clearInterval(interval);
		}
	});

	let isAdmin = $derived($page.url.pathname.startsWith('/admin'));
	let breadcrumbText = $derived(
		$page.url.pathname === '/admin'
			? 'Admin Dashboard'
			: $page.url.pathname === '/admin/clients'
				? 'Clients Management'
				: $page.url.pathname === '/admin/uploads'
					? 'Uploads & Revisions'
					: $page.url.pathname === '/admin/finances'
						? 'Payments & Revenue'
						: $page.url.pathname === '/clients'
							? 'My Orders'
							: $page.url.pathname === '/clients/documents'
								? 'My Documents'
								: $page.url.pathname === '/clients/revision-messages'
									? 'Revision & Messages'
									: $page.url.pathname === '/clients/referrals'
										? 'Refferals'
										: isAdmin
											? 'Admin'
											: 'Dashboard'
	);
</script>

<div class="flex h-screen w-full bg-[#FAFAFA] font-sans text-sm text-gray-800">
	<!-- Left Sidebar -->
	<aside
		class="flex h-full shrink-0 flex-col justify-between border-r border-gray-200 bg-white transition-all duration-300 ease-in-out {isCollapsed
			? 'w-[72px]'
			: 'w-[260px]'}"
	>
		<div>
			<!-- Logo -->
			<div
				class="flex items-center {isCollapsed
					? 'justify-center px-2'
					: 'justify-between px-4'} pt-6 pb-4"
			>
				<a href="/" class="flex items-center gap-2 transition-transform active:scale-95">
					<img src="/hylogo2.png" alt="HybornCV Logo" class="h-8 w-8 object-contain" />
					{#if !isCollapsed}
						<div class="flex items-baseline font-sans tracking-tight uppercase">
							<span class="text-xl font-black text-[#A100FF]">Hyborn</span>
							<span class="ml-0.5 text-lg font-light text-[#E100FF]">CV</span>
						</div>
					{/if}
				</a>
				{#if !isCollapsed}
					<button
						class="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-100 bg-white text-gray-400 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-600 active:scale-95"
						onclick={toggleSidebar}
					>
						<Sidebar class="h-3.5 w-3.5" />
					</button>
				{/if}
			</div>

			{#if isCollapsed}
				<div class="mb-4 flex justify-center">
					<button
						class="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
						onclick={toggleSidebar}
					>
						<Sidebar class="h-4 w-4" />
					</button>
				</div>
			{/if}

			<!-- Navigation -->
			<div class="mt-5 space-y-6 px-2">
				<!-- Main Section -->
				<div>
					<nav class="space-y-0.5">
						{#if isAdmin}
							<!-- Admin Links -->
							<a
								href="/admin"
								class="relative flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors {isAdmin &&
								$page.url.pathname === '/admin'
									? 'bg-gray-50 text-gray-900 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-[#A100FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} {isCollapsed
									? 'justify-center px-0'
									: ''}"
								title="Dashboard"
							>
								<Home class="h-4 w-4 text-gray-500" />
								{#if !isCollapsed}Admin{/if}
							</a>
							<a
								href="/admin/clients"
								class="relative flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors {isAdmin &&
								$page.url.pathname === '/admin/clients'
									? 'bg-gray-50 text-gray-900 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-[#A100FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} {isCollapsed
									? 'justify-center px-0'
									: ''}"
								title="Clients"
							>
								<UserPlus class="h-4 w-4 text-gray-400" />
								{#if !isCollapsed}Clients{/if}
							</a>
							<a
								href="/admin/uploads"
								class="relative flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors {isAdmin &&
								$page.url.pathname === '/admin/uploads'
									? 'bg-gray-50 text-gray-900 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-[#A100FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} {isCollapsed
									? 'justify-center px-0'
									: ''}"
								title="Uploads & Revisions"
							>
								<Inbox class="h-4 w-4 text-gray-400" />
								{#if !isCollapsed}Uploads{/if}
							</a>
							<a
								href="/admin/finances"
								class="relative flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors {isAdmin &&
								$page.url.pathname === '/admin/finances'
									? 'bg-gray-50 text-gray-900 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-[#A100FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} {isCollapsed
									? 'justify-center px-0'
									: ''}"
								title="Finances"
							>
								<Settings class="h-4 w-4 text-gray-400" />
								{#if !isCollapsed}Revenue{/if}
							</a>
						{:else}
							<!-- Client Links -->
							<a
								href="/clients"
								class="relative flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors {!isAdmin &&
								$page.url.pathname === '/clients'
									? 'bg-gray-50 text-gray-900 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-[#A100FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} {isCollapsed
									? 'justify-center px-0'
									: ''}"
								title="My Orders"
							>
								<Package class="h-4 w-4 text-gray-400" />
								{#if !isCollapsed}My Orders{/if}
							</a>
							<a
								href="/clients/documents"
								class="relative flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors {!isAdmin &&
								$page.url.pathname === '/clients/documents'
									? 'bg-gray-50 text-gray-900 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-[#A100FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} {isCollapsed
									? 'justify-center px-0'
									: ''}"
								title="My Documents"
							>
								<FileText class="h-4 w-4 text-gray-400" />
								{#if !isCollapsed}My Documents{/if}
							</a>
							<a
								href="/clients/revision-messages"
								class="relative flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors {!isAdmin &&
								$page.url.pathname === '/clients/revision-messages'
									? 'bg-gray-50 text-gray-900 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-[#A100FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} {isCollapsed
									? 'justify-center px-0'
									: ''}"
								title="Revision & Messages"
							>
								<MessageSquare class="h-4 w-4 text-gray-400" />
								{#if !isCollapsed}Revision & Messages{/if}
							</a>
							<a
								href="/clients/referrals"
								class="relative flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors {!isAdmin &&
								$page.url.pathname === '/clients/referrals'
									? 'bg-gray-50 text-gray-900 before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-1 before:rounded-r-full before:bg-[#A100FF]'
									: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} {isCollapsed
									? 'justify-center px-0'
									: ''}"
								title="Refferals"
							>
								<UserPlus class="h-4 w-4 text-gray-400" />
								{#if !isCollapsed}Refferals{/if}
							</a>
						{/if}

						<div class="my-2 border-t border-gray-100"></div>
						<a
							href="/logout"
							class="flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-purple-50 hover:text-[#A100FF] {isCollapsed
								? 'justify-center px-0'
								: ''}"
							title="Logout"
						>
							<LogOut class="h-4 w-4 text-gray-400 group-hover:text-rose-500" />
							{#if !isCollapsed}Logout{/if}
						</a>
					</nav>
				</div>
			</div>
		</div>

		<!-- User Profile -->
		<div class="border-t border-gray-100 p-3">
			<div
				class="group flex w-full items-center gap-3 rounded-2xl bg-[#FDFCFE] p-2.5 transition-all hover:bg-purple-50/50 {isCollapsed
					? 'justify-center px-0'
					: ''}"
			>
				{#if isAdmin}
					<div
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-transparent text-[13px] font-normal text-slate-500 shadow-sm"
					>
						AD
					</div>
					{#if !isCollapsed}
						<div class="flex flex-col overflow-hidden">
							<span class="truncate text-[13px] font-bold text-gray-900">Admin</span>
							<span class="truncate text-[10px] font-medium text-gray-500">Admin</span>
						</div>
					{/if}
				{:else}
					<div
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-transparent text-[13px] font-normal text-slate-500 shadow-sm uppercase uppercase"
					>
						{data?.user?.fullname ? data.user.fullname.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'US'}
					</div>
					{#if !isCollapsed}
						<div class="flex flex-col overflow-hidden">
							<span class="truncate text-[13px] font-bold text-gray-900">{data?.user?.fullname || 'User'}</span>
							<span class="truncate text-[10px] font-medium text-gray-500">User</span>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</aside>

	<!-- Main Container -->
	<div
		class="relative flex h-full flex-1 flex-col overflow-hidden border-l border-gray-200 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)]"
	>
		<!-- Top Bar -->
		<header
			class="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6"
		>
			<!-- Breadcrumbs -->
			<div class="flex items-center text-sm font-medium text-gray-500">
				<Home class="mr-2 h-4 w-4 text-gray-400" />
				<ChevronRight class="mx-1.5 h-4 w-4 text-gray-400" />
				<span class="text-gray-900">{breadcrumbText}</span>
			</div>

			<!-- Right Actions -->
			<div class="flex items-center gap-4 text-gray-400">
				{#if data?.user?.email}
					<div
						class="flex items-center justify-center rounded-full border border-slate-200 px-3 py-1.5"
					>
						<span class="text-[13px] font-medium text-gray-600">{data.user.email}</span>
					</div>
				{/if}
				<button class="transition-colors hover:text-gray-600">
					<Settings class="h-4 w-4" />
				</button>
				<button class="relative transition-colors hover:text-gray-600">
					<Bell class="h-4 w-4" />
					{#if data?.hasNotifications}
						<span class="absolute -top-1 -right-1 flex h-2.5 w-2.5">
							<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
							<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-1 ring-white"></span>
						</span>
					{/if}
				</button>
			</div>
		</header>

		<!-- Main Content Scroll Area -->
		<main class="w-full flex-1 overflow-y-auto">
			<div class="mx-auto max-w-[1400px] space-y-6 p-6">
				{@render children()}
			</div>
		</main>
	</div>
</div>
