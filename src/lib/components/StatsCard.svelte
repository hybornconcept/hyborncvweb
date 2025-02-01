<script>
  import { Card } from "$lib/components/ui/card";
  
  const stats = [
    {
      value: "1120",
      label: "Job seekers served",
      sublabel: "in resumes/CVs and Cover letters"
    },
    {
      value: "601+",
      label: "SOPs and letters",
      sublabel: "delivered for students"
    },
    {
      value: "70%",
      label: "faster time to inteviews",
      sublabel: "with high conversion rates"
    },
    {
      value: "2x",
      label: "More Job Offers to Clients",
      sublabel: "with our services"
    }
  ];
</script>

<div class="w-full max-w-7xl mx-auto px-4 md:px-24 lg:px-8 -mt-20">
  <Card class="p-8 shadow-xl bg-white/95 backdrop-blur-sm rounded-xl hover:shadow-2xl transition-shadow duration-300">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
      {#each stats as stat}
        <div class="text-center group hover:scale-105 transition-transform duration-300">
          <h2 class="text-5xl font-extrabold text-[#1a1a1a] mb-2 group-hover:text-[#ff4d1c]">{stat.value}</h2>
          <p class="font-medium text-gray-700 mb-1">{stat.label}</p>
          <p class="text-sm text-gray-500">{stat.sublabel}</p>
        </div>
      {/each}
    </div>
  </Card>
</div>

<style>
    /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->