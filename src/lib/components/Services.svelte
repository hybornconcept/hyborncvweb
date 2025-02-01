<script>
  const services = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>`,
      title: "Business Services",
      description: "We provide business services to you so that you can set up a successful business",
      link: "/services/business"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>`,
      title: "Social Media Marketing",
      description: "We provide marketing services so that your business can be recognized by many people",
      link: "/services/marketing"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>`,
      title: "Consumer Product",
      description: "We provide consumer product services so that your product is more recognizable",
      link: "/services/product"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>`,
      title: "Research & Discovery",
      description: "We provide services to research your business if there is still something missing and unclear",
      link: "/services/research"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>`,
      title: "Quality Resourcing",
      description: "We will find the best and also we have highly skilled partners and quality work",
      link: "/services/resourcing"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M7 15h0M12 15h0M17 15h0"/>
            </svg>`,
      title: "Financial Services",
      description: "We provide financial services so you don't have to worry about finance in your business",
      link: "/services/financial"
    }
  ];
</script>

<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 md:px-24 lg:px-8">
    <div class="mb-16">
      <p class="text-[hsl(274,54%,41%)] font-medium mb-2">Our Service</p>
      <div class="flex justify-between items-end">
        <h2 class="text-4xl font-bold text-[#1a1a1a] max-w-md">We Quality Service Provider With Love</h2>
        <p class="text-gray-500 max-w-md text-sm">We will provide the best service for you and we provide many services so you don't have to build your business we will teach you from start to success</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each services as service}
        <div class="group hover:bg-white p-8 rounded-lg transition-all duration-300">
          <div class="mb-6">
            <div class="w-16 h-16 rounded-lg flex items-center justify-center text-[hsl(274,54%,41%)] group-hover:bg-[hsl(274,54%,41%)]/10 transition-colors duration-300">
              {@html service.icon}
            </div>
          </div>
          <h3 class="text-xl font-bold mb-3 text-[#1a1a1a]">{service.title}</h3>
          <p class="text-gray-500 mb-4 text-sm">{service.description}</p>
          <a 
            href={service.link} 
            class="inline-flex items-center text-sm text-[#1a1a1a] font-medium hover:text-[hsl(274,54%,41%)] transition-colors"
          >
            Learn More 
            <svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>
  