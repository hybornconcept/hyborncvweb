<script>
  import { Button } from "$lib/components/ui/button";
  import StatsCard from "$lib/components/StatsCard.svelte";
</script>

<div 
  class="relative bg-cover bg-center bg-no-repeat h-[85vh]"
  style="background-image: url('https://img.freepik.com/free-photo/violet-watercolor-texture-background_1083-172.jpg')"
>
  <div class="absolute inset-0 bg-white/80"></div>
  
  <div class="relative h-full px-4 mx-auto max-w-7xl md:px-24 lg:px-8 flex flex-col justify-center">
    <div class="grid gap-0 lg:grid-cols-2 items-center">
      <div class="flex flex-col justify-center max-w-2xl -mt-10">
        <h1 class="mb-4 text-5xl font-extrabold tracking-tight leading-tight md:text-6xl xl:text-7xl text-[#1a1a1a]">
          We Are Complete
          <br />
          Consulting Service
          <br />
          Provide
        </h1>
        <p class="mb-8 text-base text-gray-500 md:text-lg max-w-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div class="flex gap-6 items-center">
          <Button variant="default" class="bg-[hsl(274,54%,41%)] hover:bg-[hsl(274,54%,41%)]/90 text-lg px-8 py-6">Get Started</Button>
          <button class="flex items-center gap-3 text-gray-700 hover:text-gray-900">
            <div class="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
              </svg>
            </div>
            <span class="text-lg">Watch Now</span>
          </button>
        </div>
      </div>
      <div class="relative flex justify-end pt-5 -ml-25">
        <img
          class="object-contain"
          src="business.png"
          alt="hero-image"
          width="500"
          height="600"
          style="width: 500px; height: 600px;"
        />
      </div>
    </div>
    
    <div class="absolute -bottom-12 left-0 right-0">
      <StatsCard />
    </div>
  </div>
</div>