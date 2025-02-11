<script lang="ts">
    import { Twitter, Instagram, Facebook, Youtube } from "lucide-svelte";

    interface SocialLink {
        icon: typeof Twitter | typeof Instagram | typeof Facebook | typeof Youtube;
        href: string;
    }

    let { class: className = "" } = $props<{
        class?: string;
    }>();

    const socialLinks: SocialLink[] = [
        { icon: Twitter, href: "/" },
        { icon: Instagram, href: "/" },
        { icon: Facebook, href: "/" },
        { icon: Youtube, href: "/" }
    ];

    const linkClass = "text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E100FF] hover:to-[#7F00FF]";
</script>

<div class={`flex gap-4 ${className}`}>
    {#each socialLinks as { icon: Icon, href }}
        <a {href} class={linkClass}>
            <Icon class="w-5 h-5" />
        </a>
    {/each}
</div> 