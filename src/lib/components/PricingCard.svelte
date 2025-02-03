<script lang="ts">
  import { Card } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Check } from "lucide-svelte";

  let plans = [
    {
      name: "Basic",
      price: 10000,
      oldPrice: 15000,
      savePercent: "20",
      features: ["Professional resume", "ATS optimisation", "Eye-catching formatting", "Cover Letter"],
      included: [0, 1, 2, 3]
    },
    {
      name: "Optimal", 
      price: 25000,
      oldPrice: 30000,
      savePercent: "50",
      tag: "Most popular",
      features: ["Professional resume", "ATS optimisation", "Eye-catching formatting", "Cover Letter", "LinkedIn makeover"],
      included: [0, 1, 2, 3, 4]
    },
    {
      name: "All-in-one",
      price: 40000,
      oldPrice: 50000,
      savePercent: "25",
      features: ["Professional resume", "ATS optimisation", "Eye-catching formatting", "Cover Letter", "LinkedIn makeover", "Interview tips", "2 months support", "Resume in M-word format"],
      included: [0, 1, 2, 3, 4, 5, 6]
    }
  ];

  const getHeight = (name: string): string => {
    const heights: Record<string, string> = {
      'Basic': 'h-[425px]',
      'Optimal': 'h-[480px]',
      'All-in-one': 'h-[585px]'
    };
    return heights[name];
  };
</script>

<section id="pricing" class="py-20 bg-white">
  <div class="text-center mb-12">
    <h2 class="text-4xl font-thin mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E100FF] to-[#7F00FF]">Choose the best package for you</h2>
    <p class="text-gray-400 text-lg font-thin">Get the Right Resume for Your Career</p>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-24 lg:px-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
      {#each plans as plan}
        <Card 
          class={`
            p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden bg-white 
            flex flex-col justify-between ${getHeight(plan.name)} border-[1px] mx-auto w-full max-w-sm
            ${plan.name === 'Optimal' 
              ? 'bg-gradient-to-br from-[#E100FF] to-[#7F00FF] p-[1.5px]' 
              : 'border-gray-300'
            }`}
        >
          <div class={plan.name === 'Optimal' ? 'bg-white h-full rounded-lg p-8 text-center md:text-left' : 'text-center md:text-left'}>

            <div>
              {#if plan.tag}
                <div class="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full">{plan.tag}</div>
              {/if}

              <div class="flex justify-center md:justify-between items-center mb-6">
                <h3 class="text-xl font-bold">{plan.name}</h3>
              </div>

              <div class="mb-8">
                <div class="flex items-baseline justify-center md:justify-start">
                  <span class="text-xl font-medium">₦</span>
                  <span class="text-5xl font-bold mx-1">{plan.price}</span>
                  {#if plan.oldPrice}
                    <span class="text-gray-400 line-through ml-2">₦{plan.oldPrice}</span>
                  {/if}
                </div>
                <div class="flex items-center gap-2 mt-1 justify-center md:justify-start">
                  <p class="text-gray-500 text-sm">/one-time payment</p>
                  <div class="bg-[#E7F9F1] text-[#12B76A] text-xs px-3 py-1 rounded-full font-medium">
                    Save {plan.savePercent}%
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                {#each plan.features as feature, index}
                  <div class="flex items-center justify-center md:justify-start">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center mr-3">
                      <Check class="w-3 h-3 text-[#E100FF]" />
                    </div>
                    <span class="text-gray-600">{feature}</span>
                  </div>
                {/each}
              </div>
            </div>

            <div class="my-6">
              <Button class="w-full bg-gradient-to-r from-[#E100FF] to-[#7F00FF] hover:opacity-90 border-0 mb-4 text-white rounded-full py-6">
                Order now
              </Button>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>
