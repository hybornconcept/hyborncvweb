<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let { 
        class: className = "", 
        children = () => {} 
    } = $props<{
        class?: string;
        children?: () => unknown;
    }>();

    const transitionParams = {
        duration: 500,
        easing: cubicOut
    };
</script>

<div 
    class={className}
    in:fade|local={transitionParams}
    out:fade|local={{ ...transitionParams, delay: 200 }}
>
    <div
        in:slide|local={transitionParams}
        out:slide|local={{ ...transitionParams, delay: 200 }}
    >
        {@render children()}
    </div>
</div> 