<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Twitter, FacebookIcon, Instagram } from 'lucide-svelte';
</script>

<footer class="w-full bg-slate-900">
  <div class="px-4 pt-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div class="grid gap-8 row-gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="sm:col-span-2 text-center sm:text-left">
        <a href="/" aria-label="Go home" title="Company" class="inline-flex items-center justify-center sm:justify-start">
          <img src="hylogo2.png" alt="HybornCV" class="w-10 h-10" />
          <span class="ml-2 text-xl font-bold tracking-wide text-white">HybornCV</span>
        </a>
        <div class="mt-4 hidden md:block lg:max-w-sm mx-auto sm:mx-0">
          <p class="text-sm text-white">
            Transforming careers through expert resume writing and professional branding services. Your success story starts with a compelling resume.
          </p>
          <p class="mt-4 text-sm text-white">
            We help professionals stand out in competitive job markets with ATS-optimized resumes and strategic career guidance.
          </p>
        </div>
      </div>
      <div class="space-y-2 text-xs md:text-sm text-center sm:text-left">
        <p class="text-base font-bold tracking-wide text-white">Contacts</p>
        <div class="flex flex-row sm:flex-col justify-center items-center sm:items-start gap-4 sm:gap-2">
          <div class="flex justify-center sm:justify-start">
            <p class="mr-1 text-white">Phone:</p>
            <a href="tel:+2347065155036" aria-label="Our phone" title="Our phone" class="transition-colors duration-300 text-white hover:text-deep-purple-800">+234 706 515 5036</a>
            <span class="text-white sm:hidden pl-2">|</span>
          </div>

          <div class="flex justify-center sm:justify-start">
            <p class="mr-1 text-white">Email:</p>
            <a href="mailto:info@hyborncv.com" aria-label="Our email" title="Our email" class="transition-colors duration-300 text-white hover:text-white">info@hyborncv.com</a>
            <span class="text-white sm:hidden pl-2">|</span>
          </div>
          <div class="flex justify-center sm:justify-start">
            <p class="mr-1 text-white">Address:</p>

            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" class="transition-colors duration-300 text-white hover:text-deep-purple-800">
              Port Harcourt, Nigeria
            </a>
          </div>
        </div>
      </div>
      <div class="text-center sm:text-left">
        <span class="text-base font-bold tracking-wide text-white">Social</span>
        <div class="flex items-center mt-1 space-x-3 justify-center sm:justify-start">
          <Button 
            variant="ghost"
            href="/" 
            class="text-white transition-colors duration-300 hover:text-gray-300"
            aria-label="Follow us on Twitter"
          >
            <Twitter class="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost"
            href="/" 
            class="text-white transition-colors duration-300 hover:text-gray-300"
            aria-label="Follow us on Facebook"
          >
            <FacebookIcon class="h-5 w-5" />
          </Button>
          <Button 
          variant="ghost"
            href="/" 
            class="text-white transition-colors duration-300 hover:text-gray-300"
            aria-label="Follow us on Instagram"
          >
            <Instagram class="h-5 w-5" />
          </Button>
        </div>
        <p class="mt-4 text-sm text-gray-300 hidden md:block">
          Follow us for career tips, resume trends, and professional development insights.
        </p>
      </div>
    </div>
    <div class="flex flex-col-reverse justify-between pt-5 pb-4 border-t border-gray-700 lg:flex-row text-xs md:text-sm">
      <p class="  text-gray-300 text-center lg:text-left">
        © Copyright 2025 HybornCV. All rights reserved.
      </p>

      <ul class="flex flex-row justify-center lg:justify-start mb-3 lg:mb-0 items-center lg:items-start w-full lg:w-auto">
        <li>
          <a href="/" class="text-sm text-gray-300 transition-colors duration-300 hover:text-white">FAQ</a>
        </li>
        <span class="text-gray-300 px-2">|</span>
        <li>
          <a href="/" class="text-sm text-gray-300 transition-colors duration-300 hover:text-white">Privacy Policy</a>
        </li>
        <span class="text-gray-300 px-2">|</span>
        <li>
          <a href="/" class="text-sm text-gray-300 transition-colors duration-300 hover:text-white">Terms &amp; Conditions</a>
        </li>
      </ul>
    </div>
  </div>
</footer>