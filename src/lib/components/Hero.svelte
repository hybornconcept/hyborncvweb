<script>
  import { Button } from "$lib/components/ui/button";
  import StatsCard from "$lib/components/StatsCard.svelte";
</script>

<div 
  class="relative bg-cover bg-center bg-no-repeat h-[60vh] sm:h-[90vh]"
  style="background-image: url('https://img.freepik.com/free-photo/violet-watercolor-texture-background_1083-172.jpg')"
>
  <!-- Gradient overlay -->
  <div class="absolute inset-0 bg-gradient-to-br from-white via-[hsl(274,54%,41%)]/10 to-[hsl(274,54%,41%)]/20"></div>
  
  <div class="relative h-full px-4 mx-auto max-w-7xl md:px-24 lg:px-8 flex flex-col justify-center">
    <div class="grid gap-8 lg:gap-0 lg:grid-cols-2 items-center my-auto">
      <div class="flex flex-col justify-center max-w-2xl md:max-w-3xl mx-auto lg:mx-0 text-center lg:text-left -mt-[5vh] md:-mt-[15vh]">
        <h1 class="mb-4 text-3xl md:text-6xl  font-extrabold tracking-tight leading-[1.2] text-[#1a1a1a]">
          Build that<br />
          <span class="bg-gradient-to-r from-[#E100FF] to-[#7F00FF] text-transparent bg-clip-text">Resume</span> that
          gets you 
          <span class="bg-gradient-to-r from-[#E100FF] to-[#7F00FF] text-transparent bg-clip-text">hired.</span>
        </h1>
        <p class="mb-4 text-base text-gray-600 md:text-lg max-w-lg mx-auto lg:mx-0">
          Improve Your Career Path - Get that resume expeertly tailored to help you get that your dream job!
        </p>
        <div class="flex gap-4 items-center justify-center lg:justify-start">
          <Button 
            variant="default" 
            class="bg-gradient-to-r from-[#E100FF] to-[#7F00FF] hover:opacity-90 text-xl px-10 py-6 rounded-full border-0"
          >
            Get Started
          </Button>
        </div>
      </div>
      <div class="relative flex justify-center lg:justify-end">
        <!-- Dashboard image with shadow and border -->
        <div class="relative md:block hidden">
          <div class="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent rounded-lg"></div>
          <img
            class="object-contain relative w-full max-w-[500px] h-auto"
            src="business.png"
            alt="Dashboard Preview"
            width="450"
            height="550"
            style="width: 450px; height: 550px;"
          />
        </div>
      </div>
    </div>
    
    <div class="absolute -bottom-12 left-0 lg:block hidden right-0">
      <StatsCard />
    </div>
  </div>
</div>