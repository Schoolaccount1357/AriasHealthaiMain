import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function AboutSUDS() {
  return (
    <section className="mb-16 glass-card p-4 sm:p-6 md:p-8 rounded-2xl mx-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#10066A]">
            The Challenges Veterans Face
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#10066A] to-[#3e64dd] mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Many veterans face barriers to care — especially in substance use recovery.
            Traditional services don't always meet them where they are.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-[#10066A]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#10066A] to-[#3e64dd] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Limited Access</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Limited access to timely mental health support when veterans need it most</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-[#10066A]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#3e64dd] to-[#2a4bba] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Peer Connection</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Difficulty connecting with peers who truly understand their military experiences</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-[#10066A]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#141e2f] to-[#10066A] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Stigma Barriers</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Stigma around seeking help for substance use disorders and mental health</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-[#10066A]/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#2a4bba] to-[#141e2f] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Privacy Concerns</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Lack of privacy and anonymity in traditional support environments</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mb-3 sm:mb-4 text-sm sm:text-base mt-8 sm:mt-10">
          At AriasHealth.ai, we believe that combining AI technology with peer-to-peer connection creates
          a powerful support system that meets veterans exactly where they are in their recovery journey.
        </p>
        
        <div className="bg-accent/20 p-3 sm:p-4 rounded-lg my-4">
          <h3 className="font-medium mb-2 text-primary text-base sm:text-lg">How Peer Support Helps:</h3>
          <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
            <li>Reduces feelings of isolation</li>
            <li>Provides practical advice from those with similar experiences</li>
            <li>Creates accountability in recovery</li>
            <li>Offers hope through seeing others' progress</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-5 sm:mt-6">
        <a 
          href="https://www.va.gov/health-care/health-needs-conditions/substance-use-problems/"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-primary hover:text-secondary font-medium inline-flex items-center text-sm sm:text-base relative overflow-hidden"
        >
          <span className="relative z-10 inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
            Visit Website
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </a>
      </div>
    </section>
  );
}
