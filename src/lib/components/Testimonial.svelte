<script>
  const testimonials = [
    {
      name: "Thomson Zarki",
      avatar: "https://ui-avatars.com/api/?name=Thomson+Zarki&background=603285&color=fff",
      rating: 5,
      comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been text ever since.",
      time: "2 days ago"
    },
    {
      name: "Thomson Zarki",
      avatar: "https://ui-avatars.com/api/?name=Thomson+Zarki&background=603285&color=fff",
      rating: 5,
      comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been text ever since.",
      time: "3 days ago"
    },
    {
      name: "Thomson Zarki",
      avatar: "https://ui-avatars.com/api/?name=Thomson+Zarki&background=603285&color=fff",
      rating: 5,
      comment: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been text ever since.",
      time: "4 days ago"
    }
  ];
</script>

<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 md:px-24 lg:px-8">
    <div class="mb-12">
      <p class="text-[hsl(274,54%,41%)] font-medium mb-2">Testimonials</p>
      <h2 class="text-3xl font-bold text-[#1a1a1a]">What Our Clients Saying?</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each testimonials as testimonial}
        <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <div class="flex items-center gap-4 mb-4">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name}
              class="w-12 h-12 rounded-full"
            />
            <div>
              <h3 class="font-semibold text-[#1a1a1a]">{testimonial.name}</h3>
              <div class="flex items-center gap-1">
                {#each Array(5) as _, i}
                  <svg 
                    class="w-4 h-4 {i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                {/each}
              </div>
            </div>
          </div>

          <p class="text-gray-600 text-sm mb-4">{testimonial.comment}</p>
          
          <p class="text-gray-400 text-xs">{testimonial.time}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
