<script>
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let email = "";
  let name = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ email, name });
  };
</script>

<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 md:px-24 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <!-- Image Container -->
      <div class="relative">
        <div class="rounded-lg overflow-hidden relative">
          <div class="absolute inset-0 bg-[#ff4d1c]/10 rounded-lg"></div>
          <img 
            src="team.png" 
            alt="Team Meeting" 
            class="w-full h-full object-cover rounded-lg"
          />
          <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#ff4d1c]/10 to-transparent"></div>
        </div>
      </div>

      <!-- Form Container -->
      <div class="bg-white p-8 rounded-lg">
        <div class="mb-8">
          <p class="text-[#ff4d1c] font-medium mb-2">Request A Quote</p>
          <h2 class="text-3xl font-bold text-[#1a1a1a] mb-4">
            Get Your Personalized Quote Today
          </h2>
          <p class="text-gray-500 text-sm">
            Complete these fields to receive a personalized quote. We'll respond within 24 hours.
          </p>
        </div>

        <form onsubmit={handleSubmit} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Input
                type="text"
                placeholder="Enter Name"
                bind:value={name}
                class="w-full p-3 rounded-lg border border-gray-200 focus:border-[hsl(274,54%,41%)] focus:ring-1 focus:ring-[hsl(274,54%,41%)]"
              />
            </div>
            <div class="space-y-2">
              <Input
                type="email"
                placeholder="Enter Email"
                bind:value={email}
                class="w-full p-3 rounded-lg border border-gray-200 focus:border-[#ff4d1c] focus:ring-1 focus:ring-[#ff4d1c]"
              />
            </div>
          </div>

          <Button 
            type="submit"
            class="w-full bg-[hsl(274,54%,41%)] hover:bg-[hsl(274,54%,41%)]/90 text-white py-3 rounded-lg transition-colors"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  </div>
</section>
