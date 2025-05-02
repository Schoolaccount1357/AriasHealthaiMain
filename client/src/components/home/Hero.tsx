
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import peerToPeerImg from "@assets/Peer to peer .png";

export function Hero() {
  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 2xl:-mx-24">
      {/* Introduction Banner */}
      <div className="bg-gray-100 w-screen relative left-1/2 right-1/2 -translate-x-1/2 py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#141e2f] mb-3">Veteran Care Re-imagined</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            AriasHealth.ai leverages cutting-edge technologies for veteran specific mental health support. Our platform
            provides personalized connections with those who truly understand your experiences.
          </p>
        </div>
      </div>

      {/* Hero Banner with Image */}
      <div className="bg-[#141e2f] overflow-hidden shadow-lg w-screen relative left-1/2 right-1/2 -translate-x-1/2">
        <div className="flex flex-col md:flex-row relative max-w-7xl mx-auto min-h-[400px] md:min-h-[450px] gap-0 w-full">
          {/* Image - Left Side */}
          <div className="h-[280px] md:h-full md:absolute md:inset-y-0 md:left-0 md:w-1/2 relative overflow-hidden">
            <img 
              src={peerToPeerImg} 
              alt="Veterans engaged in a peer support group discussion" 
              className="w-full h-full object-cover object-center brightness-100 contrast-100" 
            />
          </div>

          {/* Text Content - Right Side */}
          <div className="md:w-1/2 px-6 md:px-10 flex flex-col justify-center z-20 md:ml-auto py-10 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
              You are <span className="text-white">not alone</span>.
            </h1>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Confidential veteran-to-veteran support, built with care.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={scrollToEnrollmentForm}
                className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-all duration-300 py-3 px-6 relative overflow-hidden shadow-md hover:shadow-lg"
                size="lg"
              >
                Get Support – Join the Waitlist
              </Button>

              <div className="mt-3">
                <p className="text-sm text-gray-400">
                  <span className="text-gray-300 font-medium">Early Access:</span> Be among the first to experience veteran-matched support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Journey with AriasHealth.ai */}
      <div className="mt-12 py-10 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">Your Journey with AriasHealth.ai</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex flex-col items-center mb-8 md:mb-0">
            <div className="bg-[#141e2f] w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Join the Waitlist</h3>
            <p className="text-sm text-gray-600">Fill out a simple form to reserve your spot.</p>

            {/* Right arrow for desktop */}
            <div className="hidden md:block absolute right-0 transform translate-x-3/4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center mb-8 md:mb-0 relative">
            <div className="bg-[#141e2f] w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Get Matched</h3>
            <p className="text-sm text-gray-600">We'll connect you with peers who truly understand your journey.</p>

            {/* Right arrow for desktop */}
            <div className="hidden md:block absolute right-0 transform translate-x-3/4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center mb-8 md:mb-0 relative">
            <div className="bg-[#141e2f] w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Stay Connected</h3>
            <p className="text-sm text-gray-600">Spot early warning signs together and stay engaged.</p>

            {/* Right arrow for desktop */}
            <div className="hidden md:block absolute right-0 transform translate-x-3/4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center mb-8 md:mb-0">
            <div className="bg-[#141e2f] w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3e64dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Grow Stronger</h3>
            <p className="text-sm text-gray-600">Get real-time encouragement, stay supported, and thrive in your journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
