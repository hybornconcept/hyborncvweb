<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  import { Card } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";

  const testimonials = [
    {
      quote: "No matter how skilled you are, recruiters see your resume before they see you.",

      author: "Anonymous",
    },
    {
      quote: "75% of resumes are rejected by ATS before a human ever sees them.",
      author: "Jobscan (2018)",
 
    },
    {
      quote: "Recruiters spend just 6–7 seconds scanning a resume.",
      author: "TheLadders, (2012)",

    },
    {
      quote: "Recruiters are 77% more likely to reject resumes due to typographical errors.",
      author: "CareerBuilder, 2018",

    }
  ];


</script>

<section class="py-20 bg-white">
  <div class="max-w-5xl mx-auto px-16 md:px-24 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <!-- Left Side - Large Text -->
      <div class="text-center lg:text-left">
        <h2 class="text-3xl -mb-5 md:mb-0 md:text-[4rem] leading-[1.1] font-light bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Why do you<span class="hidden md:inline"><br/></span> 
          Need Our <span class="hidden md:inline"><br/></span>
          Services
        </h2>
      </div>

      <!-- Right Side - Description and Button -->
      <div class="space-y-4">
        {#each testimonials as { quote, author }, index}
          <div class="space-y-2 text-center md:text-left">
            <p class="text-md md:text-xl leading-relaxed italic">
              "{quote}"
            </p>
            <p class="text-gray-500 text-xs md:text-sm">- {author}</p>
          </div>
          {#if index !== testimonials.length - 1}
            <Separator />

          {/if}
        {/each}
      </div>
    </div>
  </div>
</section>
