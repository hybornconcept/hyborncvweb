<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';

  export let value;
  export let duration = 30000; // 30 seconds
  
  const number = tweened(0, {
    duration,
    easing: linear
  });

  let hasStarted = false;

  onMount(() => {
    // Small delay before starting the count
    setTimeout(() => {
      if (!hasStarted) {
        hasStarted = true;
        number.set(parseFloat(value.replace(/[^0-9.]/g, '')));
      }
    }, 500);
  });

  $: displayValue = value.includes('%') ? 
    `${$number.toFixed(0)}%` : 
    value.includes('+') ? 
    `${$number.toFixed(0)}+` : 
    value.includes('x') ? 
    `${$number.toFixed(0)}x` : 
    $number.toFixed(0);
</script>

<span>{displayValue}</span> 