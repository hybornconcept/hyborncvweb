<script lang="ts">
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "$lib/components/ui/carousel";
  import Autoplay from 'embla-carousel-autoplay';
  import { Star } from 'lucide-svelte';
  import { browser } from '$app/environment';

  const autoplayPlugin = Autoplay({
    delay: 4000,
    stopOnInteraction: true,
    stopOnMouseEnter: false
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      avatar: "https://picsum.photos/seed/sarah/200",
      rating: 5,
      comment: "The resume writing service was exceptional. Within weeks of using my new resume, I landed multiple interviews with top tech companies.",
      time: "2 days ago"
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Amazon", 
      avatar: "https://picsum.photos/seed/michael/200",
      rating: 5,
      comment: "The team did an amazing job highlighting my achievements. The ATS optimization really made a difference in my job search.",
      time: "1 week ago"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director at Netflix",
      avatar: "https://picsum.photos/seed/emily/200", 
      rating: 5,
      comment: "Not only did they craft a stunning resume, but the LinkedIn makeover helped me get noticed by recruiters immediately.",
      time: "2 weeks ago"
    },
    {
      name: "David Kim",
      role: "Data Scientist at Microsoft",
      avatar: "https://picsum.photos/seed/david/200",
      rating: 5,
      comment: "The interview preparation service was invaluable. I felt confident and well-prepared, which helped me secure my dream job.",
      time: "3 weeks ago"
    },
    {
      name: "Lisa Thompson",
      role: "UX Designer at Apple",
      avatar: "https://picsum.photos/seed/lisa/200",
      rating: 5,
      comment: "The portfolio creation service helped me showcase my work in a professional and engaging way. Highly recommended!",
      time: "1 month ago"
    },
    {
      name: "James Wilson",
      role: "Financial Analyst at JP Morgan",
      avatar: "https://picsum.photos/seed/james/200",
      rating: 5,
      comment: "The cover letter writing service perfectly captured my experience and aspirations. Worth every penny!",
      time: "1 month ago"
    }
  ];

  const carouselOptions = {
    align: "start",
    loop: true,
    skipSnaps: true,
    plugins: [autoplayPlugin]
  };
</script>

<section id="testimonials" class="py-20 bg-gray-50 px-8 ">
  <div class="max-w-7xl text-center md:text-left mx-auto relative">
    <div class="mb-12">
      <p class="text-gray-400 text-lg font-thin">Testimonials</p>
      <h2 class="text-4xl font-thin mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E100FF] to-[#7F00FF]">
        What Our Clients Said About Us
      </h2>
    </div>

    <Carousel
      class="w-full relative group mx-auto"
      opts={carouselOptions}
    >
      <CarouselContent class="px-4 sm:px-2 flex">
        {#each testimonials as testimonial}
          <CarouselItem 
            class="px-2 sm:px-3 basis-full sm:basis-1/2 lg:basis-1/3 flex-shrink-0"
          >
            <div class="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full border border-gray-200">
              <div class="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div class="text-center sm:text-left">
                  <h3 class="font-semibold text-[#1a1a1a]">{testimonial.name}</h3>
                  <p class="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div class="flex items-center justify-center sm:justify-start gap-1 mb-3">
                {#each Array(5) as _, i}
                  <Star class="w-4 h-4 {i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}" />
                {/each}
              </div>

              <p class="text-gray-600 text-md mb-4 text-center sm:text-left">{testimonial.comment}</p>
              
              <p class="text-gray-400 text-xs text-center sm:text-left">{testimonial.time}</p>
            </div>
          </CarouselItem>
        {/each}
      </CarouselContent>
      <div class="absolute top-0 bottom-0 -left-4 -right-4 sm:-left-6 sm:-right-6 pointer-events-none">
        <CarouselPrevious 
          class="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" 
        />
        <CarouselNext 
          class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity" 
        />
      </div>
    </Carousel>
  </div>
</section>

<style>
  :global(.carousel-prev),
  :global(.carousel-next) {
    @apply bg-white hover:bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all scale-75 sm:scale-100;
  }
</style>
