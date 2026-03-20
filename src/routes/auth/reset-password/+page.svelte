<script lang="ts">
	import { slide } from "svelte/transition";
	import { Eye, EyeOff } from "@lucide/svelte";
	import type { ActionData } from "./$types";
	import { page } from "$app/state";

	let { form } = $props<{ form: ActionData }>();

	let submitting = $state(false);
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	let token = $derived(page.url.searchParams.get("token"));

	function handleSubmit() {
		submitting = true;
	}
</script>

<svelte:head>
	<title>Reset Password | HybornCV</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-[#F8F9FA] p-4 font-sans sm:p-8"
>
	<div
		class="relative flex min-h-[600px] w-full max-w-[900px] overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_12px_40px_rgb(0,0,0,0.06)] md:p-4"
	>
		<!-- Left side - Form -->
		<div
			class="relative flex w-full flex-col px-6 py-10 md:w-[50%] lg:w-[50%] lg:px-8"
		>
			<!-- Logo -->
			<div class="mb-12 flex justify-start">
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

			<div class="mx-auto w-full max-w-[340px] flex-1">
				<div class="mb-8">
					<h1
						class="mb-3 text-[24px] font-extrabold tracking-tight text-[#111827]"
					>
						Reset your password
					</h1>
					<p class="text-[13px] font-medium leading-relaxed text-[#6B7280]">
						Please enter your new password below to regain access to your
						account.
					</p>
				</div>

				{#if form?.success}
					<div
						class="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm"
						transition:slide
					>
						Password reset successfully! <a
							href="/auth"
							class="font-bold underline hover:text-green-900">Sign in</a
						>
					</div>
				{:else}
					{#if form?.error}
						<div
							class="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm"
							transition:slide
						>
							{form.error}
						</div>
					{/if}

					{#if !token}
						<div
							class="mb-6 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm text-orange-700 shadow-sm"
						>
							Warning: Invalid or missing token. You may not be able to reset
							your password.
						</div>
					{/if}

					<form
						method="POST"
						action="?/submit"
						onsubmit={handleSubmit}
						class="space-y-5"
					>
						<input type="hidden" name="token" value={token} />

						<div class="space-y-2">
							<label
								for="password"
								class="block text-[13px] font-bold text-[#111827]"
								>New Password*</label
							>
							<div class="relative">
								<input
									type={showPassword ? "text" : "password"}
									id="password"
									name="password"
									required
									placeholder="Enter new password"
									class="h-[46px] w-full rounded-xl border border-[#E5E7EB] px-4 pr-10 text-[14px] outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
								/>
								<button
									type="button"
									class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
									onclick={() => (showPassword = !showPassword)}
								>
									{#if showPassword}
										<Eye class="h-4 w-4" />
									{:else}
										<EyeOff class="h-4 w-4" />
									{/if}
								</button>
							</div>
						</div>

						<div class="space-y-2">
							<label
								for="confirmPassword"
								class="block text-[13px] font-bold text-[#111827]"
								>Confirm Password*</label
							>
							<div class="relative">
								<input
									type={showConfirmPassword ? "text" : "password"}
									id="confirmPassword"
									name="confirmPassword"
									required
									placeholder="Confirm new password"
									class="h-[46px] w-full rounded-xl border border-[#E5E7EB] px-4 pr-10 text-[14px] outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
								/>
								<button
									type="button"
									class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
									onclick={() => (showConfirmPassword = !showConfirmPassword)}
								>
									{#if showConfirmPassword}
										<Eye class="h-4 w-4" />
									{:else}
										<EyeOff class="h-4 w-4" />
									{/if}
								</button>
							</div>
						</div>

						<button
							type="submit"
							disabled={submitting}
							class="mt-2 flex h-[46px] w-full items-center justify-center rounded-xl bg-linear-to-r from-[#E100FF] to-[#7F00FF] text-[14px] font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
						>
							{#if submitting}
								<span
									class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
								></span>
							{/if}
							Update Password
						</button>
					</form>
				{/if}
			</div>
		</div>

		<!-- Right side - Image -->
		<div
			class="group relative hidden min-h-[550px] self-stretch overflow-hidden rounded-[1.75rem] md:flex md:w-[50%] lg:w-[50%]"
		>
			<div
				class="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
			>
				<img
					src="/man.jpg"
					alt="Happy professional staff"
					class="h-full w-full object-cover object-center"
					loading="lazy"
				/>
				<div class="absolute inset-0 bg-black/40"></div>
			</div>
		</div>
	</div>
</div>
