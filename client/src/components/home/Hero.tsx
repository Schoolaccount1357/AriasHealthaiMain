import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";
import PeerSupportImg from "@assets/Peertopeer.jpg";

export function Hero() {
  const { trackResourceClick } = useResourceTracking();
  
  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-0 sm:mb-12">
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
          <div className="w-full max-w-sm mx-auto sm:mx-0 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-100 via-white to-amber-50 text-transparent bg-clip-text">
              You are not alone.
            </h1>
            <p className="text-sm md:text-base text-white/90 mb-6">
              Confidential veteran-to-veteran support, built with care.
            </p>

            <Button 
              onClick={scrollToEnrollmentForm}
              className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-all duration-300 rounded-md py-3 px-6 text-sm font-medium w-full sm:w-auto"
              size="default"
            >
              Get early access to PairLink
            </Button>
          </div>
        </div>
      </div>

      {/* Crisis Resources Banner - Desktop Only - Aligned with hero content area */}
      <div className="hidden sm:block bg-[#1e293b] border-l-4 border-[#3e64dd] p-4 ml-auto mr-8 max-w-[50%] -mt-6 relative z-10 rounded-r-lg shadow-lg">
        <div className="flex items-center justify-between gap-4">
          {/* Header Section */}
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-3 text-[#3e64dd] flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm leading-tight">Need immediate help?</h3>
              <p className="text-white/80 text-xs leading-tight mt-1">Crisis support available 24/7</p>
            </div>
          </div>
          
          {/* Buttons Section */}
          <div className="flex gap-2">
            <Button 
              onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
              size="sm"
              className="bg-[#3e64dd] hover:bg-[#2a4bba] text-xs px-3 py-1 flex-shrink-0"
            >
              <Phone className="h-3 w-3 mr-1" />
              Call 988 - Press 1
            </Button>
            <Button 
              onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
              size="sm"
              variant="outline"
              className="border-[#3e64dd] text-[#3e64dd] hover:bg-[#3e64dd]/10 text-xs px-3 py-1"
            >
              Text 838255
            </Button>
            <Button 
              onClick={() => trackResourceClick("chat", () => window.open("https://www.veteranscrisisline.net/get-help/chat", "_blank"))}
              size="sm"
              variant="outline"
              className="border-[#3e64dd] text-[#3e64dd] hover:bg-[#3e64dd]/10 text-xs px-3 py-1"
            >
              <Globe className="h-3 w-3 mr-1" />
              Chat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}