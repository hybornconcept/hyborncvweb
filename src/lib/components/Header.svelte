<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";
  import { Twitter, FacebookIcon, Instagram, Phone, Mail, Clock } from 'lucide-svelte';
  import { browser } from '$app/environment';

  let isMenuOpen = false;

  function scrollToSection(id: string) {
    if (!browser) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const navItems = [
    { href: "/", label: "Home", current: true },
    { href: "#services", label: "Services", current: false, scroll: true },
    { href: "#pricing", label: "Pricing", current: false, scroll: true },
    { href: "#testimonials", label: "Testimonial", current: false, scroll: true },
  ];

  const contactInfo = [
    { Icon: Phone, text: "+234 706 515 5036" },
    { Icon: Mail, text: "info@hyborncv.com" },
    { Icon: Clock, text: "Available 24 hours" }
  ];

  const socialLinks = [
    { Icon: Twitter, href: "https://twitter.com/hyborncv", label: "Twitter" },
    { Icon: FacebookIcon, href: "https://facebook.com/hyborncv", label: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com/hyborncv", label: "Instagram" }
  ];

  $effect: if (browser) {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }
</script>

<div class="bg-[#0B1120] text-white py-2">
  <div class="container mx-auto px-4 flex justify-between items-center text-xs md:text-sm">
    <div class="flex items-center space-x-6">
      {#each contactInfo as { Icon, text }}
        <div class="flex items-center">
          <svelte:component this={Icon} class="w-4 h-4 mr-2" />
          <span>{text}</span>
        </div>
      {/each}
    </div>
    <div class="flex items-center space-x-4">
      <span>Follow</span>
      {#each socialLinks as { Icon, href, label }}
        <a {href} class="hover:text-gray-300" aria-label={label}>
          <svelte:component this={Icon} class="w-4 h-4" />
        </a>
      {/each}
    </div>
  </div>
</div>

<header class="h-[9vh] lg:h-[10vh]">
  <div class="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div class="relative flex items-center justify-between">
      <a href="/" class="flex items-center space-x-2">
        <img src="hylogo2.png" alt="logo" class="w-10 h-10" />
        <span class="text-xl font-bold">HybornCV</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:block flex-1 max-w-2xl mx-auto">
        <div class="flex justify-center gap-x-6">
          {#each navItems as { href, label, current, scroll }}
            <a 
              {href}
              on:click|preventDefault={scroll ? () => scrollToSection(href.slice(1)) : undefined}
              class={cn(
                "py-2 px-1 inline-flex items-center gap-2 border-b-2 text-sm whitespace-nowrap transition-colors",
                current 
                  ? "border-[hsl(274,54%,41%)] text-[hsl(274,54%,41%)] font-medium" 
                  : "border-transparent text-gray-500 hover:text-[hsl(274,54%,41%)] hover:border-[hsl(274,54%,41%)]/50"
              )}
              aria-current={current ? "page" : undefined}
            >
              {label}
            </a>
          {/each}
        </div>
      </nav>

      <!-- Auth Buttons -->
      <div class="hidden lg:flex items-center space-x-4">
        <Button variant="ghost" href="/auth">Sign In</Button>
        <Button 
          href="/auth?signup=true" 
          class="bg-gradient-to-r from-[#E100FF] to-[#7F00FF] text-white hover:opacity-90 text-sm px-4 py-3 rounded-full"
        >
          Get Started
        </Button>
      </div>

      <button
        class="lg:hidden p-2 -mr-1"
        on:click={() => (isMenuOpen = !isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <svg class="w-6 h-6" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>

    {#if isMenuOpen}
      <nav class="lg:hidden absolute top-full left-0 right-0 bg-background border-b px-4 py-4 space-y-4">
        {#each navItems as { href, label }}
          <a
            {href}
            class="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {label}
          </a>
        {/each}
        <div class="pt-4 space-y-2">
          <Button variant="outline" class="w-full justify-start">Login</Button>
          <Button 
            href="/auth?signup=true" 
            class="w-full justify-start bg-gradient-to-r from-[#E100FF] to-[#7F00FF] text-white hover:opacity-90 border-0"
          >
            Get Started
          </Button>
        </div>
      </nav>
    {/if}
  </div>
</header>
