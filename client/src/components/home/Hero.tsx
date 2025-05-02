
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import veteransGroupImg from "../../assets/veterans-group.png";

export function Hero() {
  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 2xl:-mx-24">
      <div className="bg-[#141e2f] overflow-hidden shadow-lg w-screen relative left-1/2 right-1/2 -translate-x-1/2">
        <div className="flex flex-col md:flex-row relative max-w-7xl mx-auto min-h-[450px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[550px] gap-6 sm:gap-8 md:gap-0 lg:gap-0 md:pr-6 lg:pr-8 xl:pr-12">
          {/* Text Content - Right Side */}
          <div className="md:w-1/2 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-center z-20 md:order-2 py-12 sm:py-14 md:py-16 lg:py-20 md:ml-auto md:pl-10 lg:pl-14 xl:pl-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 lg:mb-10 bg-gradient-to-r from-white via-orange-200 to-orange-100 bg-clip-text text-transparent leading-tight">
              You are <span className="underline decoration-2">not alone</span>.
            </h1>
            <p className="text-gray-300 mb-8 md:mb-10 text-lg md:text-xl leading-relaxed">
              Confidential veteran-to-veteran support, built with care.
            </p>
            <div className="space-y-4 md:space-y-5">
              <Button 
                onClick={scrollToEnrollmentForm}
                className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-all duration-300 w-full py-6 sm:py-4 sm:w-auto relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10">
                  Get Support – Join the Waitlist
                </span>
              </Button>

              <div className="mt-4 md:mt-5">
                <p className="text-xs sm:text-sm text-gray-200">
                  <span className="text-white font-semibold">Early Access:</span> Be among the first to experience veteran-matched support.
                </p>
              </div>
            </div>
          </div>

          {/* Image - Left Side */}
          <div className="h-[280px] sm:h-[340px] md:h-full md:absolute md:inset-y-0 md:left-0 md:w-1/2 relative overflow-hidden md:order-1">
            {/* Primary left-to-right gradient overlay with balanced transparency */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/60 to-transparent z-10"></div>
            
            {/* Right side gradient for subtle blending with text */}
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#141e2f]/30 to-transparent z-10"></div>
            
            {/* Top-to-bottom alignment gradients */}
            <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-[#0F172A]/40 to-transparent z-10"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-[#0F172A]/40 to-transparent z-10"></div>
            
            {/* Image enhancement wrapper for improved brightness/contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 mix-blend-overlay z-10 opacity-30"></div>
            
            {/* Boost visibility with slight brightness adjustment */}
            <div className="absolute inset-0 bg-white opacity-[0.03] mix-blend-overlay z-10"></div>
            
            <img 
              src={veteransGroupImg} 
              alt="Veterans engaged in a support group discussion with American flag in background" 
              className="w-full h-full object-cover object-center md:object-[center_center] scale-100 md:scale-[0.98] brightness-[1.12] contrast-[1.05] transition-all duration-500" 
            />
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
