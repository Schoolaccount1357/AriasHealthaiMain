import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import PeerSupportImg from "@assets/Peertopeer.jpg";

export function Hero() {
  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12">
      {/* Hero Banner - Using the new Peertopeer.jpg image */}
      <div className="relative h-[400px] overflow-hidden bg-[#0F172A]">
        {/* Left side - Image of veterans in support group */}
        <div className="absolute top-0 left-0 h-full w-2/3 overflow-hidden">
          <img 
            src={PeerSupportImg} 
            alt="Support group discussion in a bright, supportive environment" 
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient overlay from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0F172A]/40 to-[#0F172A]"></div>
        </div>

        {/* Right side - Content area */}
        <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col justify-center items-start pl-8">
          <div className="max-w-xs">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-100 via-white to-amber-50 text-transparent bg-clip-text">
              You are not alone.
            </h1>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gradient bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 text-transparent bg-clip-text">
              Mental Health, Reimagined for Veterans
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-4">
              Confidential veteran-to-veteran support, built with care.
            </p>

            <Button 
              onClick={scrollToEnrollmentForm}
              className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-all duration-300 rounded-md py-2 px-4 text-sm font-medium"
              size="default"
            >
              Get Support – Join the Waitlist
            </Button>

            <p className="mt-2 text-xs md:text-sm text-white/80">
              <span className="font-semibold">Early Access:</span> Be among the first to experience veteran-matched support.
            </p>
          </div>
        </div>
      </div>

      {/* Your Journey with AriasHealth.ai */}
      <div className="mt-12 bg-gray-50 p-4 sm:p-8 rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Your Journey with AriasHealth.ai</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
            <div className="bg-[#141e2f] w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-[#3e64dd] transition-all duration-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800 group-hover:text-[#10066A] transition-colors duration-300">Join the Waitlist</h3>
            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Fill out a simple form to reserve your spot.</p>
            {/* Right arrow for desktop */}
            <div className="hidden md:block absolute right-0 top-1/3 transform translate-x-1/2 z-10 transition-all duration-300 group-hover:translate-x-[60%]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Down arrow for mobile */}
            <div className="md:hidden mt-2 transition-all duration-300 group-hover:translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3e64dd] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          <div className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
            <div className="bg-[#141e2f] w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-[#3e64dd] transition-all duration-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800 group-hover:text-[#10066A] transition-colors duration-300">Get Matched</h3>
            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">We'll connect you with peers who truly understand your journey.</p>
            {/* Right arrow for desktop */}
            <div className="hidden md:block absolute right-0 top-1/3 transform translate-x-1/2 z-10 transition-all duration-300 group-hover:translate-x-[60%]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Down arrow for mobile and tablet */}
            <div className="md:hidden mt-2 transition-all duration-300 group-hover:translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3e64dd] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          <div className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
            <div className="bg-[#141e2f] w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-[#3e64dd] transition-all duration-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800 group-hover:text-[#10066A] transition-colors duration-300">Stay Connected</h3>
            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Spot early warning signs together and stay engaged.</p>
            {/* Right arrow for desktop */}
            <div className="hidden md:block absolute right-0 top-1/3 transform translate-x-1/2 z-10 transition-all duration-300 group-hover:translate-x-[60%]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Down arrow for mobile and tablet */}
            <div className="md:hidden mt-2 transition-all duration-300 group-hover:translate-y-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3e64dd] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          <div className="relative flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
            <div className="bg-[#141e2f] w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 text-[#3e64dd] transition-all duration-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800 group-hover:text-[#10066A] transition-colors duration-300">Grow Stronger</h3>
            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">Get real-time encouragement, stay supported, and thrive in your journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
}