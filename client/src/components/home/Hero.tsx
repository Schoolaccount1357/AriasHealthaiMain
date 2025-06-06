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
      <div className="relative h-[400px] sm:h-[300px] md:h-[400px] overflow-hidden bg-[#134e4a]">
        {/* Left side - Image of veterans in support group */}
        <div className="absolute top-0 left-0 h-full w-full sm:w-2/3 overflow-hidden">
          <img 
            src={PeerSupportImg} 
            alt="Support group discussion in a bright, supportive environment" 
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient overlay - bottom to top for mobile, left to right for desktop */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#134e4a] via-[#134e4a]/60 to-transparent sm:from-transparent sm:via-[#134e4a]/60 sm:to-[#134e4a]"></div>
        </div>

        {/* Content area - positioned at bottom for mobile, right side for desktop */}
        <div className="absolute bottom-0 sm:top-0 sm:right-0 w-full sm:w-1/2 p-6 pb-8 sm:p-0 flex flex-col justify-end sm:justify-center items-center sm:items-start sm:pl-8">
          <div className="max-w-xs mx-auto sm:mx-0 text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white" style={{ textShadow: '0 0 20px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.3)' }}>
              You are not alone.
            </h1>
            <p className="text-sm md:text-base text-white/90 mb-4">
              Confidential veteran-to-veteran support, built with care.
            </p>

            <Button 
              onClick={scrollToEnrollmentForm}
              className="bg-[#0d9488] text-white hover:bg-[#0f766e] transition-all duration-300 rounded-md py-2 px-4 text-sm font-medium"
              size="default"
            >
              Get Support – Join the Waitlist
            </Button>
          </div>
        </div>
      </div>

      {/* Breaking Down Barriers Through Peer Connection */}
      <div className="mt-12 mb-8 bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Breaking Down Barriers Through Peer Connection</h2>
        
        <div className="prose max-w-none prose-sm sm:prose-base">
          <p className="mb-3 sm:mb-4 text-sm sm:text-base text-foreground">
            Military service brings unique experiences that can impact wellness during the transition to civilian life. 
            Many veterans find strength through connecting with others who share similar backgrounds and understand 
            their journey. Our platform facilitates these meaningful connections.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-4">
            {/* Transition Considerations */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <h3 className="font-medium mb-2 text-base sm:text-lg text-foreground">Transition Considerations:</h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base text-foreground">
                <li>Navigating civilian healthcare systems</li>
                <li>Finding peers who understand military experiences</li>
                <li>Accessing confidential and judgment-free support</li>
                <li>Connecting with others on similar wellness journeys</li>
              </ul>
            </div>
            
            {/* Evidence & Research */}
            <div className="bg-[#2c3e50] rounded-lg p-3 sm:p-4">
              <h3 className="font-medium mb-2 text-white text-base sm:text-lg">Research Shows:</h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base text-gray-300">
                <li>Peer support significantly improves wellness outcomes</li>
                <li>Shared military experiences enhance therapeutic connections</li>
                <li>Early intervention leads to better long-term wellness</li>
              </ul>
            </div>
            
            {/* Connection Benefits */}
            <div className="bg-blue-100 rounded-lg p-3 sm:p-4">
              <h3 className="font-medium mb-2 text-base sm:text-lg text-foreground">Benefits of Peer Connection:</h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base text-foreground">
                <li>Creates meaningful relationships with shared understanding</li>
                <li>Provides practical insights from lived experiences</li>
                <li>Builds community and reduces isolation</li>
                <li>Offers hope through witnessing others' wellness journeys</li>
              </ul>
            </div>
          </div>
          
          <p className="mb-3 sm:mb-4 text-sm sm:text-base text-foreground">
            AriasHealth.ai uses thoughtful AI matching to connect veterans based on shared experiences, 
            service background, and wellness goals, creating supportive relationships that honor the 
            strength and resilience inherent in military service.
          </p>
        </div>
      </div>


    </section>
  );
}