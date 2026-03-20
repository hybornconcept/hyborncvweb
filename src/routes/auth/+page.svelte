<script lang="ts">
	import { MapPin, EyeOff, Eye } from "@lucide/svelte";
	import { slide } from "svelte/transition";
	import { superForm } from "sveltekit-superforms/client";
	import { page } from "$app/state";
	import type { PageData } from "./$types";
	import * as Form from "$lib/components/ui/form/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Input } from "$lib/components/ui/input/index.js";

	export const nigeriaStates = [
		"International",
		"Abia",
		"Adamawa",
		"Akwa Ibom",
		"Anambra",
		"Bauchi",
		"Bayelsa",
		"Benue",
		"Borno",
		"Cross River",
		"Delta",
		"Ebonyi",
		"Edo",
		"Ekiti",
		"Enugu",
		"FCT - Abuja",
		"Gombe",
		"Imo",
		"Jigawa",
		"Kaduna",
		"Kano",
		"Katsina",
		"Kebbi",
		"Kogi",
		"Kwara",
		"Lagos",
		"Nasarawa",
		"Niger",
		"Ogun",
		"Ondo",
		"Osun",
		"Oyo",
		"Plateau",
		"Rivers",
		"Sokoto",
		"Taraba",
		"Yobe",
		"Zamfara",
	];

	let { data }: { data: PageData } = $props();

	let isLogin = $state(page.url.searchParams.get("mode") !== "signup");
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	const loginSuper = superForm(data.loginForm);
	const loginForm = loginSuper.form;
	const loginErrors = loginSuper.errors;
	const loginEnhance = loginSuper.enhance;
	const loginSubmitting = loginSuper.submitting;

	const registerSuper = superForm(data.registerForm);
	const registerForm = registerSuper.form;
	const registerErrors = registerSuper.errors;
	const registerEnhance = registerSuper.enhance;
	const registerSubmitting = registerSuper.submitting;
</script>

<svelte:head>
	<title>{isLogin ? "Sign in" : "Create Account"} | HybornCV</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-[#F8F9FA] p-4 font-sans sm:p-8"
>
	<div
		class="relative flex min-h-[950px] w-full max-w-[1080px] overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_12px_40px_rgb(0,0,0,0.06)] md:p-4"
	>
		<!-- Left side - Form -->
		<div
			class="relative flex w-full flex-col px-6 py-10 md:w-[50%] lg:w-[45%] lg:px-8"
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

			<div class="mx-auto w-full max-w-[340px]">
				<div class="mb-6">
					<h1
						class="mb-2 text-[28px] font-extrabold tracking-tight text-[#111827]"
					>
						{isLogin ? "Welcome back" : "Sign up"}
					</h1>
					<p class="text-sm font-normal text-[#6B7280]">
						{isLogin
							? "Please enter your details to sign in."
							: "Be the next to land thier dream job !"}
					</p>
				</div>

				<!-- Toggle Sign up/Log In -->
				<div class="mb-6 flex w-full justify-center">
					<div
						class="inline-flex w-full items-center rounded-full bg-white p-1 shadow-[0_2px_10px_rgb(0,0,0,0.05)] ring-1 ring-gray-100"
					>
						<button
							class="w-1/2 rounded-full py-2.5 text-center text-[13px] font-bold transition-all {isLogin
								? 'bg-linear-to-r from-[#E100FF] to-[#7F00FF] text-white shadow-md'
								: 'text-gray-500 hover:text-gray-900'}"
							onclick={() => (isLogin = true)}
							type="button"
						>
							Sign in
						</button>
						<button
							class="w-1/2 rounded-full py-2.5 text-center text-[13px] font-bold transition-all {!isLogin
								? 'bg-linear-to-r from-[#E100FF] to-[#7F00FF] text-white shadow-md'
								: 'text-gray-500 hover:text-gray-900'}"
							onclick={() => (isLogin = false)}
							type="button"
						>
							Sign up
						</button>
					</div>
				</div>

				<!-- Social Buttons -->
				<div class="mb-6 space-y-3">
					<a
						href="/auth/google"
						class="flex w-full items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white py-3 text-[13px] font-bold text-[#374151] shadow-sm transition-all hover:bg-gray-50/80"
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
						{isLogin ? "Continue with Google" : "Sign up with Google"}
					</a>
				</div>

				<div class="mb-6 flex items-center gap-3">
					<div class="h-px flex-1 bg-[#F3F4F6]"></div>
					<span
						class="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]"
						>or</span
					>
					<div class="h-px flex-1 bg-[#F3F4F6]"></div>
				</div>

				<!-- Form Fields -->
				{#if isLogin}
					<form
						method="POST"
						action="?/login"
						use:loginEnhance
						class="space-y-4"
					>
						<Form.Field form={loginSuper} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label class="block text-[13px] font-bold text-[#111827]"
										>Email*</Form.Label
									>
									<Input
										{...props}
										type="email"
										id="login-email"
										bind:value={$loginForm.email}
										placeholder="Enter your email"
										class="h-[50px] w-full rounded-xl border border-[#E5E7EB] px-4 py-0 text-sm outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="text-xs text-red-500" />
						</Form.Field>

						<Form.Field form={loginSuper} name="password">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label class="block text-[13px] font-bold text-[#111827]"
										>Password*</Form.Label
									>
									<div class="relative">
										<Input
											{...props}
											type={showPassword ? "text" : "password"}
											id="login-password"
											bind:value={$loginForm.password}
											placeholder="Enter your password"
											class="h-[50px] w-full rounded-xl border border-[#E5E7EB] px-4 pr-10 py-0 text-sm outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
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
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="text-xs text-red-500" />
						</Form.Field>

						<div
							class="flex justify-end pt-1"
							transition:slide={{ duration: 300 }}
						>
							<a
								href="/auth/forgot-password"
								class="text-[12px] font-semibold text-[#7F00FF] hover:underline"
							>
								Forgot password?
							</a>
						</div>

						<button
							type="submit"
							disabled={$loginSubmitting}
							class="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-[#E100FF] to-[#7F00FF] text-[14px] font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
						>
							{#if $loginSubmitting}
								<span
									class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
								></span>
							{/if}
							Sign in
						</button>
					</form>
				{:else}
					<form
						method="POST"
						action="?/register"
						use:registerEnhance
						class="space-y-3"
					>
						<Form.Field form={registerSuper} name="fullname">
							<Form.Control>
								{#snippet children({ props })}
									<Input
										{...props}
										bind:value={$registerForm.fullname}
										placeholder="Full name"
										class="h-[50px] w-full rounded-xl border border-[#E5E7EB] px-4 py-0 text-sm outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="block text-[10px] text-red-500" />
						</Form.Field>

						<Form.Field form={registerSuper} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Input
										{...props}
										type="email"
										bind:value={$registerForm.email}
										placeholder="Email"
										class="h-[50px] w-full rounded-xl border border-[#E5E7EB] px-4 py-0 text-sm outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="block text-[10px] text-red-500" />
						</Form.Field>

						<Form.Field form={registerSuper} name="location">
							<Form.Control>
								{#snippet children({ props })}
									<Select.Root
										type="single"
										name={props.name}
										bind:value={$registerForm.location}
									>
										<Select.Trigger
											{...props}
											class="h-[50px] w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-0 text-sm outline-none transition-all focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10 {$registerForm.location
												? 'text-[#111827]'
												: 'text-[#9CA3AF]'}"
										>
											{$registerForm.location || "Select location"}
										</Select.Trigger>
										<Select.Content class="max-h-60 overflow-y-auto">
											<Select.Group>
												{#each nigeriaStates as state}
													<Select.Item value={state} label={state}
														>{state}</Select.Item
													>
												{/each}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="text-[10px] text-red-500" />
						</Form.Field>

						<Form.Field form={registerSuper} name="phone">
							<Form.Control>
								{#snippet children({ props })}
									<Input
										{...props}
										type="tel"
										bind:value={$registerForm.phone}
										placeholder="Phone number"
										class="h-[50px] w-full rounded-xl border border-[#E5E7EB] px-4 py-0 text-sm outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="block text-[10px] text-red-500" />
						</Form.Field>

						<Form.Field form={registerSuper} name="password">
							<Form.Control>
								{#snippet children({ props })}
									<div class="relative">
										<Input
											{...props}
											type={showPassword ? "text" : "password"}
											bind:value={$registerForm.password}
											placeholder="Password"
											class="h-[50px] w-full rounded-xl border border-[#E5E7EB] px-4 pr-10 py-0 text-sm outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
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
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="block text-[10px] text-red-500" />
						</Form.Field>

						<Form.Field form={registerSuper} name="passwordConfirm">
							<Form.Control>
								{#snippet children({ props })}
									<div class="relative">
										<Input
											{...props}
											type={showConfirmPassword ? "text" : "password"}
											bind:value={$registerForm.passwordConfirm}
											placeholder="Confirm password"
											class="h-[50px] w-full rounded-xl border border-[#E5E7EB] px-4 pr-10 py-0 text-sm outline-none transition-all placeholder:text-[#9CA3AF] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
										/>
										<button
											type="button"
											class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
											onclick={() =>
												(showConfirmPassword = !showConfirmPassword)}
										>
											{#if showConfirmPassword}
												<Eye class="h-4 w-4" />
											{:else}
												<EyeOff class="h-4 w-4" />
											{/if}
										</button>
									</div>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors class="block text-[10px] text-red-500" />
						</Form.Field>

						<button
							type="submit"
							disabled={$registerSubmitting}
							class="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-[#E100FF] to-[#7F00FF] text-[14px] font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
						>
							{#if $registerSubmitting}
								<span
									class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
								></span>
							{/if}
							Sign up
						</button>
					</form>
				{/if}

				<div class="mt-6 text-center">
					{#if isLogin}
						<p class="text-[13px] text-[#4B5563]">
							Don't have an account? <button
								onclick={() => (isLogin = false)}
								class="font-bold text-[#111827] underline decoration-gray-300 decoration-2 underline-offset-4 transition-colors hover:decoration-black"
								>Sign up</button
							>
						</p>
					{:else}
						<p class="text-[13px] text-[#4B5563]">
							Already have an account? <button
								onclick={() => (isLogin = true)}
								class="font-bold text-[#111827] underline decoration-gray-300 decoration-2 underline-offset-4 transition-colors hover:decoration-black"
								>Sign in</button
							>
						</p>
					{/if}
				</div>

				<!-- {#if !isLogin}
					<p
						class="mx-auto mt-4 max-w-[240px] text-center text-[11px] leading-relaxed text-[#9CA3AF]"
					>
						By creating an account you agree to our <a
							href="/terms"
							class="underline hover:text-[#4B5563]">Terms of use</a
						>
					</p>
				{/if} -->
			</div>
		</div>

		<!-- Right side - Image & Organic Overlays -->
		<div
			class="group relative hidden min-h-[600px] self-stretch overflow-hidden rounded-[1.75rem] md:flex md:w-[50%] lg:w-[55%]"
		>
			<!-- Image Background -->
			<div
				class="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
			>
				<img
					src="/woman.jpg"
					alt="Happy professional staff"
					class="h-full w-full object-cover object-center"
					loading="lazy"
				/>

				<!-- Gradient to make text pop -->
				<div
					class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
				></div>
			</div>

			<!-- Intricate Organic Cutout Mask for Top-Left -->
			<div
				class="pointer-events-none absolute left-0 top-0 z-10 h-[72px] w-[100px] rounded-br-[32px] bg-white"
			>
				<!-- Right connecting inward curve -->
				<div
					class="absolute -right-[28px] top-0 h-[28px] w-[28px] rounded-tl-[32px] bg-transparent"
					style="box-shadow: -12px -12px 0 12px white;"
				></div>
				<!-- Bottom connecting inward curve -->
				<div
					class="absolute -bottom-[28px] left-0 h-[28px] w-[28px] rounded-tl-[32px] bg-transparent"
					style="box-shadow: -12px -12px 0 12px white;"
				></div>
			</div>

			<!-- Intricate Organic Cutout Mask for Bottom-Right -->
			<div
				class="pointer-events-none absolute bottom-0 right-0 z-10 h-[72px] w-[100px] rounded-tl-[32px] bg-white"
			>
				<!-- Left connecting inward curve -->
				<div
					class="absolute -left-[28px] bottom-0 h-[28px] w-[28px] rounded-br-[32px] bg-transparent"
					style="box-shadow: 12px 12px 0 12px white;"
				></div>
				<!-- Top connecting inward curve -->
				<div
					class="absolute -top-[28px] right-0 h-[28px] w-[28px] rounded-br-[32px] bg-transparent"
					style="box-shadow: 12px 12px 0 12px white;"
				></div>
			</div>

			<!-- Merged Testimonial Pill -->
			<div class="absolute left-6 right-6 top-[80px] z-20 max-h-[150px]">
				<div
					class="group/pill flex w-full items-center gap-4 rounded-[20px] border border-white/20 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20"
				>
					<div
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 transition-colors group-hover/pill:bg-white/20"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="white"
							class="text-white"
						>
							<path
								d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.89543 10.9124 7 12.017 7H19.017C20.1216 7 21.017 7.89543 21.017 9V15C21.017 16.1046 20.1216 17 19.017 17H16.017C16.017 17.5523 15.5693 18 15.017 18V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91242 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56928 13 4.017 13H2.017C1.46472 13 1.017 12.5523 1.017 12V9C1.017 7.89543 1.91242 7 3.017 7H10.017C11.1216 7 12.017 7.89543 12.017 9V15C12.017 16.1046 11.1216 17 10.017 17H7.017C7.017 17.5523 6.56928 18 6.017 18V21H5.017Z"
							/>
						</svg>
					</div>
					<div class="flex min-w-0 flex-1 flex-col">
						<p
							class="text-base font-medium italic leading-[1.3] tracking-wide text-white"
							style="font-family: 'Cormorant Garamond', serif;"
						>
							"Five years of Joblessness ended with the right resume from HYBORN
							CV. I finally lannded my dream job with one resume review, they
							are simply the best."
						</p>
						<div class="mt-2 flex items-center justify-between">
							<p class="text-[12px] font-bold text-white/90">— Amelia Udeme</p>
							<p
								class="flex items-center gap-1.5 text-[10px] font-medium text-white/80"
							>
								<MapPin size={12} strokeWidth={2.5} class="text-white" /> Abuja, Nigeria
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
