import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function AboutSUDS() {
  return (
    <section className="mb-12 bg-gradient-to-br from-slate-50 to-blue-50 p-5 sm:p-6 md:p-8 rounded-xl shadow-lg border border-blue-100">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#10066A] text-center">The Challenges Veterans Face</h2>
      
      <div className="prose max-w-none prose-sm sm:prose-base">
        <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-700 text-center max-w-3xl mx-auto">
          Many Veterans face isolation, stigma, and barriers to care — especially in substance use recovery.
          Traditional services don't always meet them where they are.
        </p>
        
        <div className="mb-4 bg-white/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-200 shadow-sm">
          <ul className="grid md:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            <li className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm border-l-4 border-red-400">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Limited access to timely mental health support</span>
            </li>
            <li className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm border-l-4 border-orange-400">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Difficulty connecting with peers who truly understand their experiences</span>
            </li>
            <li className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm border-l-4 border-amber-400">
              <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Stigma around seeking help for substance use disorders</span>
            </li>
            <li className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm border-l-4 border-yellow-400">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">Lack of privacy and anonymity in traditional support environments</span>
            </li>
          </ul>
        </div>
        
        <p className="mb-3 sm:mb-4 text-sm sm:text-base">
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
