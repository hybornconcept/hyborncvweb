<script>
  import { Card } from "$lib/components/ui/card";
  import CountUp from "$lib/components/CountUp.svelte";
  
  const stats = [
    {
      value: "1120",
      label: "Job seekers served",
      sublabel: "with ATS compliant Resumes/CVs",
      countUp: true
    },
    {
      value: "1121+",
      label: "SOPs and letters",
      sublabel: "written with professional touch",
      countUp: true
    },
    {
      value: "80%",
      label: "more likely to land an inteviews",
      sublabel: "with high conversion rates for past clients",
      countUp: true
    },
    {
      value: "2x",
      label: "More likely to land an interview",
      sublabel: "with our services",
      countUp: false
    }
  ];
</script>

<div class="w-full max-w-7xl mx-auto px-4 md:px-24 lg:px-8  -mt-20">
  <Card class="p-8 shadow-xl bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-2xl transition-shadow duration-300">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
      {#each stats as stat}
        <div class="text-center group cursor-pointer">
          <div class="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <h2 
              class="text-4xl md:text-5xl  font-extrabold mb-2 transition-all duration-300 bg-gradient-to-r from-[#E100FF] to-[#7F00FF] group-hover:text-[#1a1a1a] text-transparent bg-clip-text"
            >
              {#if stat.countUp}
                <CountUp value={stat.value} />
              {:else}
                {stat.value}
              {/if}
            </h2>
            <p class="text-sm md:text-base font-medium text-gray-700 mb-1 transition-transform duration-300 group-hover:-translate-y-1">
              {stat.label}
            </p>

            <p class="text-xs md:text-base  text-gray-500 transition-transform duration-300 group-hover:-translate-y-1">
              {stat.sublabel}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </Card>
</div>

<style>
  .group {
    perspective: 1000px;
  }

  .group:hover > div {
    animation: bounce 0.8s cubic-bezier(0.36, 0, 0.66, -0.56) alternate infinite;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0) scale(1.1);
    }
    50% {
      transform: translateY(-15px) scale(1.1);
    }
    100% {
      transform: translateY(0) scale(1.1);
    }
  }
</style>
