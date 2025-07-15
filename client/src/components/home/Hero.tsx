import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";
import PeerSupportImg from "@assets/AdobeStock_1368008048.jpeg";

export function Hero() {
  const { trackResourceClick } = useResourceTracking();
  
  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-8 sm:mb-12">
      {/* Hero Banner - Using the new Peertopeer.jpg image */}
      <div className="relative h-[500px] sm:h-[300px] md:h-[400px] overflow-hidden bg-[#0F172A]">
        {/* Left side - Image of veterans in support group */}
        <div className="absolute top-0 left-0 h-full w-full sm:w-2/3 overflow-hidden">
          <img 
            src={PeerSupportImg} 
            alt="Support group discussion in a bright, supportive environment" 
            className="h-full w-full object-cover object-center"
          />
          {/* Gradient overlay - bottom to top for mobile, left to right for desktop */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent sm:from-transparent sm:via-[#0F172A]/60 sm:to-[#0F172A]"></div>
        </div>

        {/* Content area - positioned at bottom for mobile, right side for desktop */}
        <div className="absolute bottom-0 sm:top-0 sm:right-0 w-full sm:w-1/2 p-6 pb-12 sm:p-0 flex flex-col justify-end sm:justify-center items-center sm:items-start sm:pl-8">
          <div className="w-full max-w-sm mx-auto sm:mx-0 text-center sm:text-left" role="main" aria-labelledby="hero-heading">
            <h1 
              id="hero-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
              style={{textShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)'}}
            >
              You are not alone.
            </h1>
            <p className="text-sm md:text-base text-white/90 mb-6" aria-describedby="hero-heading">
              We're building bridges of support for people at high risk, beginning with veterans and front-line communities, to ensure no one has to navigate loneliness, depression, or relapse without support.
            </p>

            <Button 
              onClick={scrollToEnrollmentForm}
              className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-all duration-300 rounded-md py-3 px-6 text-sm font-medium w-full sm:w-auto"
              size="default"
              aria-label="Get early access to Willow - Navigate to enrollment form"
            >
              Get early access to Willow
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle Crisis Support Banner - Integrated with Hero */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1e293b] border-t border-white/10 px-6 py-3 -mt-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Header - More Subtle */}
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-[#3e64dd] opacity-80" />
              <span className="text-white/90 text-sm font-medium">Need immediate help?</span>
              <span className="text-white/60 text-xs ml-2 hidden sm:inline">Crisis support available 24/7</span>
            </div>
            
            {/* Compact Button Group */}
            <div className="flex flex-wrap gap-2 text-xs">
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
                size="sm"
                className="bg-[#3e64dd]/80 hover:bg-[#3e64dd] text-white text-xs px-3 py-1.5 h-auto"
              >
                <Phone className="h-3 w-3 mr-1" />
                Call 988
              </Button>
              <Button 
                onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                size="sm"
                className="bg-[#3e64dd]/80 hover:bg-[#3e64dd] text-white text-xs px-3 py-1.5 h-auto"
              >
                Text 838255
              </Button>
              <Button 
                onClick={() => trackResourceClick("chat", () => window.open("https://www.my.vavet.sites.va.gov/vclchat", "_blank"))}
                size="sm"
                className="bg-[#3e64dd]/80 hover:bg-[#3e64dd] text-white text-xs px-3 py-1.5 h-auto"
              >
                <Globe className="h-3 w-3 mr-1" />
                Chat
              </Button>
              <span className="text-white/50 text-xs self-center mx-2 hidden sm:inline">|</span>
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:001-800-273-8255")}
                size="sm"
                className="bg-[#3e64dd]/60 hover:bg-[#3e64dd]/80 text-white text-xs px-3 py-1.5 h-auto"
              >
                International: 001-800-273-8255
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}