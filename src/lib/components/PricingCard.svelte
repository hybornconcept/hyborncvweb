<script>
  import { Card } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";

  const plans = [
    {
      name: "Silver",
      price: 10,
      period: "YEARLY",
      color: "hsl(274,54%,41%)",
      features: [
        "Watermark",
        "100 items",
      ],
      buttonClass: "bg-[hsl(274,54%,41%)] hover:bg-[hsl(274,54%,41%)]/90",
    },
    {
      name: "Gold",
      price: 20,
      period: "YEARLY",
      color: "hsl(274,54%,41%)",
      features: [
        "No watermark",
        "500 items",
        "500 MB storage",
        "Basic optimization",
      ],
      buttonClass: "bg-[hsl(274,54%,41%)] hover:bg-[hsl(274,54%,41%)]/90",
    },
    {
      name: "Diamond",
      price: 30,
      period: "YEARLY",
      color: "hsl(274,54%,41%)",
      features: [
        "No watermark",
        "1000 items",
        "1 GB storage",
        "Fast optimization",
        "Custom logo",
        "Team features",
      ],
      buttonClass: "bg-[hsl(274,54%,41%)] hover:bg-[hsl(274,54%,41%)]/90",
    }
  ];
</script>

<section class="py-20">
  <div class="max-w-7xl mx-auto px-4 md:px-24 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {#each plans as plan}
        <Card class="p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-white ">
          <!-- Period Badge -->
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold">{plan.name}</h3>
            <span class="text-xs font-medium px-2 py-1 rounded-full" style="color: {plan.color}; background-color: {plan.color}10">
              {plan.period}
            </span>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <div class="flex items-baseline">
              <span class="text-xl font-medium">$</span>
              <span class="text-5xl font-bold mx-1" style="color: {plan.color}">{plan.price}</span>
              <span class="text-gray-500">/mo</span>
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-4 mb-8">
            {#each plan.features as feature}
              <div class="flex items-center">
                <div 
                  class="w-5 h-5 rounded-full flex items-center justify-center mr-3" 
                  style="background-color: {plan.color}10; color: {plan.color}"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="w-3 h-3"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span class="text-gray-600">{feature}</span>
              </div>
            {/each}
          </div>

          <!-- Subscribe Button -->
          <Button 
            class="w-full {plan.buttonClass} text-white rounded-full py-6"
          >
            Subscribe
          </Button>
        </Card>
      {/each}
    </div>
  </div>
</section>
