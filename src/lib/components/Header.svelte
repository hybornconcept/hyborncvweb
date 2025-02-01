<script>
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";

  let isMenuOpen = false;

  const navItems = [
    { href: "/", label: "Home", current: false },
    { href: "/features", label: "Features", current: true },
    { href: "/pricing", label: "Pricing", current: false },
    { href: "/about", label: "About", current: false },
  ];
</script>

<header class="h-[10vh]">
  <div class="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div class="relative flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2">
        <img src="hylogo2.png" alt="logo" class="w-10 h-10" />
        <span class="text-xl font-bold">HybornCV</span>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden lg:block flex-1 max-w-2xl mx-auto">
        <div class="border-b-2 border-gray-200">
          <nav class="-mb-0.5 flex justify-center gap-x-6">
            {#each navItems as item}
              <a 
                href={item.href}
                class={cn(
                  "py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm whitespace-nowrap transition-colors",
                  item.current 
                    ? "border-[hsl(274,54%,41%)] text-[hsl(274,54%,41%)] font-medium" 
                    : "border-transparent text-gray-500 hover:text-[hsl(274,54%,41%)] hover:border-[hsl(274,54%,41%)]/50"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </a>
            {/each}
          </nav>
        </div>
      </div>

      <!-- Auth Buttons -->
      <div class="hidden lg:flex items-center space-x-4">
        <Button variant="ghost" href="/auth">Sign In</Button>
        <Button href="/auth?signup=true">Get Started</Button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="lg:hidden p-2 -mr-1"
        on:click={() => (isMenuOpen = !isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <svg class="w-6 h-6" stroke="currentColor" viewBox="0 0 24 24">
          {#if isMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div class="lg:hidden absolute top-full left-0 right-0 bg-background border-b">
        <nav class="px-4 py-4 space-y-4">
          {#each navItems as item}
            <a
              href={item.href}
              class="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          {/each}
          <div class="pt-4 space-y-2">
            <Button variant="ghost" href="/auth" class="w-full justify-start">Sign In</Button>
            <Button href="/auth?signup=true" class="w-full justify-start">Get Started</Button>
          </div>
        </nav>
      </div>
    {/if}
  </div>
</header>