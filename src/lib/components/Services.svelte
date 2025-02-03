<script>
  import { Button } from "$lib/components/ui/button";

  import { Wrench, MapPin, Zap, Layout, User, Calendar, ArrowRight } from "lucide-svelte";

  const services = [
    {
      icon: Wrench,
      title: "Professional Resume/CV Writing",
      description: "ATS-optimized resumes that highlight your achievements and get you noticed by top employers. 98% interview success rate!"
    },
    {
      icon: MapPin,
      title: "Cover Letter Writing Services", 
      description: "Compelling cover letters that tell your career story and make you stand out from other candidates."
    },
    {
      icon: Zap,
      title: "Statement of Purpose/ Letter of Intent/Sustainability",
      description: "Persuasive statements that showcase your goals, achievements and fit for your Masters or PhD program Abroad."
    },
    {
      icon: Layout,
      title: "Linkedin Profile Makeover",
      description: "SEO-optimized LinkedIn profiles that attract recruiters and unlock hidden job opportunities."
    },
    {
      icon: User,
      title: "Web based Portfolio creation",
      description: "Eye-catching online portfolios that showcase your work and personal brand to potential employers."
    },
    {
      icon: Calendar,
      title: "Interview tips & Preparation",
      description: "Expert coaching  to help you ace interviews and negotiate the best compensation package."
    }
  ];
</script>

<section id="services" class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-12 sm:px-6 md:px-24 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-sm text-gray-400  font-normal mb-4">Our Services</h2>
      <p class="text-5xl font-extralight bg-gradient-to-r from-[#E100FF] to-[#7F00FF] text-transparent bg-clip-text">What we really do.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {#each services as service}
        <div class="group relative transform hover:scale-105 hover:translate-y-[-10px] transition-all duration-500 ease-out">
          <!-- Card Background with Gradient -->
          <div class="absolute inset-0 bg-white group-hover:bg-gradient-to-br group-hover:from-[#E100FF] group-hover:to-[#7F00FF] rounded-2xl shadow-md transition-all duration-500">
            <!-- Animated Particles -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div class="absolute top-2 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float1"></div>
              <div class="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-float2"></div>
              <div class="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-float3"></div>
            </div>
          </div>
          
          <!-- Card Content -->
          <div class="relative p-8 text-gray-900 group-hover:text-white transition-colors duration-300">
            <div class="mb-6">
              <div class="w-12 h-12 rounded-full bg-[hsl(274,54%,41%)]/10 group-hover:bg-white/20 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                <svelte:component 
                  this={service.icon} 
                  class="w-6 h-6 text-[hsl(274,54%,41%)] group-hover:text-white transition-colors duration-300"
                />
              </div>
            </div>
            <h3 class="text-2xl font-bold mb-3 transform group-hover:translate-x-2 transition-transform duration-300">{service.title}</h3>
            <p class="text-gray-600 group-hover:text-white/90 text-md leading-relaxed transition-all duration-300 mb-12">{service.description}</p>
            
            <!-- Order Now Button -->
            <div class="absolute bottom-6 left-8">
              <Button 
                variant="outline" 
                class="bg-transparent border border-gray-200 text-gray-700 group-hover:bg-white group-hover:text-[#E100FF] group-hover:border-transparent transition-all duration-300 rounded-full text-sm px-6"
                href="/auth"
              >
                Order Now
                <ArrowRight class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          <!-- Card Border -->
          <div class="absolute inset-0 border border-gray-100 group-hover:border-transparent rounded-2xl transition-colors duration-300"></div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(10px, -10px) scale(1.2); }
  }
  
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-15px, -5px) scale(0.8); }
  }
  
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(5px, -15px) scale(1.1); }
  }

  :global(.animate-float1) { animation: float1 4s ease-in-out infinite; }
  :global(.animate-float2) { animation: float2 6s ease-in-out infinite; }
  :global(.animate-float3) { animation: float3 5s ease-in-out infinite; }
</style>
  