<script lang="ts">
	import { Eye, EyeOff, X, LogIn } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';

	// --- Props ---
	let {
		open = $bindable(false),
		onSuccess = () => {}
	}: {
		open: boolean;
		onSuccess?: () => void;
	} = $props();

	// --- Local State ---
	let showPassword = $state(false);
	let isLoading = $state(false);
	let errorMessage = $state('');

	// Login fields
	let loginEmail = $state('');
	let loginPassword = $state('');

	let isShaking = $state(false);

	function close() {
		open = false;
		errorMessage = '';
		isShaking = false;
	}

	function triggerShake() {
		isShaking = true;
		setTimeout(() => (isShaking = false), 600);
	}

	// Handle Login via fetch (no page navigation)
	async function handleLogin(e: Event) {
		e.preventDefault();
		if (!loginEmail || !loginPassword) {
			errorMessage = 'Please fill in all fields.';
			triggerShake();
			return;
		}
		isLoading = true;
		errorMessage = '';

		try {
			const formData = new FormData();
			formData.set('email', loginEmail);
			formData.set('password', loginPassword);

			const res = await fetch('/auth?/login', {
				method: 'POST',
				body: formData,
				headers: { accept: 'application/json' },
				redirect: 'manual' // don't follow redirect — we stay on /order
			});

			// SvelteKit success often manifests as a 303 manual redirect
			if (res.type === 'opaqueredirect' || res.status === 303) {
				open = false;
				onSuccess();
				return;
			}

			const text = await res.text();
			let result;
			try {
				result = JSON.parse(text);
			} catch {
				// Fallback if not JSON
				if (res.ok) {
					open = false;
					onSuccess();
					return;
				}
				result = { type: 'error', error: 'Invalid response from server.' };
			}

			// SvelteKit returns { type: 'success', status: 200, ... } or { type: 'failure', status: 400, data: { ... } }
			if (result.type === 'success') {
				open = false;
				onSuccess();
			} else {
				// Pull error from result.data.error (common pattern) or result.error
				errorMessage = result?.data?.error || result?.error || 'Invalid email or password.';
				triggerShake();
			}
		} catch {
			errorMessage = 'Something went wrong. Please try again.';
			triggerShake();
		} finally {
			isLoading = false;
		}
	}
</script>

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
		aria-label="Login required"
	>
		<!-- Overlay -->
		<button
			class="absolute inset-0 bg-black/50 backdrop-blur-sm"
			onclick={close}
			aria-label="Close modal"
		></button>

		<!-- Modal Card -->
		<div
			class="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl {isShaking ? 'animate-shake' : ''}"
			transition:scale={{ duration: 250, start: 0.95 }}
		>
			<!-- Header stripe -->
			<div class="h-1.5 w-full bg-linear-to-r from-[#E100FF] to-[#7F00FF]"></div>

			<div class="px-8 py-7">
				<!-- Close Button -->
				<button
					onclick={close}
					class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
					aria-label="Close"
				>
					<X class="h-4 w-4" />
				</button>

				<!-- Logo + Title -->
				<div class="mb-5 flex flex-col items-start">
					<a href="/" class="mb-4 flex items-center gap-2" onclick={(e) => e.preventDefault()}>
						<img src="/hylogo2.png" alt="HybornCV" class="h-7 w-7 object-contain" />
						<div class="flex items-baseline font-sans uppercase tracking-tight">
							<span class="text-lg font-black text-[#A100FF]">Hyborn</span>
							<span class="ml-0.5 text-base font-light text-[#E100FF]">CV</span>
						</div>
					</a>
					<div class="flex items-center gap-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100"
						>
							<LogIn class="h-4 w-4 text-[#7F00FF]" />
						</div>
						<div>
							<h2 class="text-lg font-extrabold tracking-tight text-gray-900">
								Sign in to continue
							</h2>
							<p class="text-xs text-gray-500">
								Log in to place your order securely.
							</p>
						</div>
					</div>
				</div>

				<!-- Google OAuth -->
				<a
					href="/auth/google"
					class="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 text-[13px] font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50"
				>
					<svg class="h-4 w-4" viewBox="0 0 24 24">
						<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
						<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
						<path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
						<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
					</svg>
					Continue with Google
				</a>

				<!-- Divider -->
				<div class="mb-4 flex items-center gap-3">
					<div class="h-px flex-1 bg-gray-200"></div>
					<span class="text-[11px] font-semibold uppercase tracking-wide text-gray-400">or</span>
					<div class="h-px flex-1 bg-gray-200"></div>
				</div>

				<!-- Error Message -->
				{#if errorMessage}
					<div class="mb-3 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-[13px] font-medium text-red-600">
						{errorMessage}
					</div>
				{/if}

				<!-- ===== LOGIN FORM ===== -->
				<form onsubmit={handleLogin} class="space-y-3">
					<div class="space-y-1">
						<label for="modal-login-email" class="block text-[13px] font-bold text-gray-800">
							Email <span class="text-[#E100FF]">*</span>
						</label>
						<input
							id="modal-login-email"
							type="email"
							name="email"
							bind:value={loginEmail}
							placeholder="Enter your email"
							class="h-11 w-full rounded-xl border border-gray-200 px-3.5 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-[#7F00FF] focus:ring-2 focus:ring-[#7F00FF]/10"
							required
						/>
					</div>

					<div class="space-y-1">
						<label for="modal-login-password" class="block text-[13px] font-bold text-gray-800">
							Password <span class="text-[#E100FF]">*</span>
						</label>
						<div class="relative">
							<input
								id="modal-login-password"
								type={showPassword ? 'text' : 'password'}
								name="password"
								bind:value={loginPassword}
								placeholder="Enter your password"
								class="h-11 w-full rounded-xl border border-gray-200 px-3.5 pr-10 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-[#7F00FF] focus:ring-2 focus:ring-[#7F00FF]/10"
								required
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
								aria-label="Toggle password visibility"
							>
								{#if showPassword}
									<Eye class="h-4 w-4" />
								{:else}
									<EyeOff class="h-4 w-4" />
								{/if}
							</button>
						</div>
					</div>

					<div class="flex justify-end">
						<a href="/auth#forgot" class="text-[12px] font-semibold text-[#7F00FF] hover:underline">
							Forgot password?
						</a>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						class="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#E100FF] to-[#7F00FF] text-[14px] font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
					>
						{#if isLoading}
							<span class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
						{/if}
						Sign in & Place Order
					</button>
				</form>

				<p class="mt-4 text-center text-[12px] text-gray-500">
					Don't have an account?
					<a
						href="/auth?mode=signup"
						class="ml-1 font-bold text-[#7F00FF] hover:underline"
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	</div>
{/if}
