<script lang="ts">
	import { slide } from "svelte/transition";
	import type { ActionData } from "./$types";

	let { form } = $props<{ form: ActionData }>();
	let submitting = $state(false);

	function handleSubmit() {
		submitting = true;
	}
</script>

<svelte:head>
	<title>Forgot Password | HybornCV</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-[#F8F9FA] p-4 font-sans sm:p-8"
>
	<!-- Main Card container matching the reference image layout closely -->
	<div
		class="relative flex min-h-[600px] w-full max-w-[950px] overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_12px_40px_rgb(0,0,0,0.06)] md:p-4"
	>
		<!-- Left side - Form -->
		<div
			class="relative flex w-full flex-col px-6 py-10 md:w-[50%] lg:w-[45%] lg:px-12"
		>
			<!-- Logo -->
			<div class="mb-16 flex justify-start">
				<a
					href="/"
					class="flex items-center gap-2.5 transition-transform active:scale-95"
				>
					<img
						src="/hylogo2.png"
						alt="HybornCV Logo"
						class="h-9 w-9 object-contain"
					/>
					<div class="flex items-baseline font-sans uppercase tracking-tight">
						<span class="text-2xl font-black text-[#A100FF]">Hyborn</span>
						<span class="ml-0.5 text-xl font-light text-[#E100FF]">CV</span>
					</div>
				</a>
			</div>

			<div class="w-full max-w-[340px] flex-1">
				<div class="mb-8">
					<h1
						class="mb-3 text-[24px] font-extrabold tracking-tight text-[#111827]"
					>
						Forget something?
					</h1>
					<p class="text-[13px] font-medium leading-relaxed text-[#6B7280]">
						Enter your email below to receive password reset instructions.
					</p>
					<p class="mt-2 text-[12px] text-[#9CA3AF]">
						Didn't receive instructions? <a
							href="/auth#help"
							class="text-[#9CA3AF] underline decoration-gray-300 underline-offset-2 hover:text-[#111827]"
							>Try different method</a
						>
					</p>
				</div>

				{#if form?.success}
					<div
						class="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm"
						transition:slide
					>
						Instructions have been sent to your email.
					</div>
				{/if}

				{#if form?.error}
					<div
						class="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm"
						transition:slide
					>
						{form.error}
					</div>
				{/if}

				<form
					method="POST"
					action="?/submit"
					onsubmit={handleSubmit}
					class="space-y-6"
				>
					<div class="space-y-2">
						<label
							for="email"
							class="block text-[13px] font-bold text-[#111827]">Email*</label
						>
						<input
							type="email"
							id="email"
							name="email"
							required
							placeholder="johndoe@email.com"
							class="h-[46px] w-full rounded-xl border border-[#E5E7EB] px-4 text-[14px] outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
						/>
					</div>

					<button
						type="submit"
						disabled={submitting}
						class="flex h-[46px] w-full items-center justify-center rounded-xl bg-linear-to-r from-[#E100FF] to-[#7F00FF] text-[14px] font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
					>
						{#if submitting}
							<span
								class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
							></span>
						{/if}
						Submit
					</button>
				</form>

				<div class="my-6 flex items-center gap-3">
					<div class="h-px flex-1 bg-[#F3F4F6]"></div>
					<span class="text-[11px] font-medium text-[#9CA3AF]">or</span>
					<div class="h-px flex-1 bg-[#F3F4F6]"></div>
				</div>

				<a
					href="/auth/google"
					class="flex h-[46px] w-full items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white text-[13px] font-bold text-[#374151] shadow-sm transition-all hover:bg-gray-50/80 active:scale-[0.98]"
				>
					<svg class="h-[18px] w-[18px]" viewBox="0 0 24 24">
						<path
							fill="#4285F4"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="#34A853"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="#FBBC05"
							d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
						/>
						<path
							fill="#EA4335"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
						/>
					</svg>
					Sign in with Google
				</a>
			</div>
		</div>

		<!-- Right side - Image -->
		<div
			class="group relative hidden min-h-[550px] self-stretch overflow-hidden rounded-[1.75rem] md:flex md:w-[50%] lg:w-[55%]"
		>
			<div
				class="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
			>
				<img
					src="/staff.jpg"
					alt="Happy professional staff"
					class="h-full w-full object-cover object-center"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-black/40"></div>
			</div>
		</div>
	</div>
</div>
