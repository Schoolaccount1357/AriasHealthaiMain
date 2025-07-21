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
      {/* Inclusive Crisis Support Banner */}
      <div className="w-full bg-red-100 text-red-800 text-center py-2 text-sm border-b">
        In crisis? Call <strong>988</strong> (USA) or visit{" "}
        <a href="https://988lifeline.org" className="underline font-medium hover:text-red-900">
          988lifeline.org
        </a>{" "}
        for free, confidential emotional support — for anyone, anytime.
      </div>

      {/* Full-Bleed Hero Section - FitFlow Style */}
      <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between relative bg-gradient-to-br from-slate-50 via-white to-gray-100">

        {/* Left Content Container */}
        <div className="z-10 w-full md:w-1/2 px-6 md:px-20 py-16 md:py-0 flex flex-col justify-center">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              You are not alone.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Everyone deserves a circle to lean on. WILLOW is our digital offering to build steady peer support, starting with the communities that carry the heaviest loads.
            </p>
            <Button 
              onClick={scrollToEnrollmentForm}
              className="bg-[#3e64dd] hover:bg-[#2a4bba] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              size="lg"
              aria-label="Get early access to Willow - Navigate to enrollment form"
            >
              Get early access to Willow
            </Button>
          </div>
        </div>

        {/* Right Visual Container */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-screen mt-12 md:mt-0 overflow-hidden">
          <img 
            src={PeerSupportImg} 
            alt="Support group discussion in a bright, supportive environment" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay for better text contrast and visual blend */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white/60 md:bg-gradient-to-r md:from-white/60 md:via-white/20 md:to-transparent"></div>

          {/* Optional: Subtle color tint for healthcare feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e64dd]/10 to-transparent opacity-30"></div>
        </div>
      </div>

      {/* Integrated Crisis Resources - Streamlined */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Header */}
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-[#3e64dd] opacity-90" />
              <span className="text-white/90 text-sm font-medium">Need immediate support?</span>
              <span className="text-white/60 text-xs ml-2 hidden sm:inline">Available 24/7 for everyone</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 text-xs">
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
                size="sm"
                className="bg-[#3e64dd]/90 hover:bg-[#3e64dd] text-white text-xs px-4 py-2 h-auto rounded-full"
              >
                <Phone className="h-3 w-3 mr-1" />
                Call 988
              </Button>
              <Button 
                onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                size="sm"
                className="bg-[#3e64dd]/70 hover:bg-[#3e64dd]/90 text-white text-xs px-4 py-2 h-auto rounded-full"
              >
                Text 838255
              </Button>
              <Button 
                onClick={() => trackResourceClick("chat", () => window.open("https://988lifeline.org/chat", "_blank"))}
                size="sm"
                className="bg-[#3e64dd]/70 hover:bg-[#3e64dd]/90 text-white text-xs px-4 py-2 h-auto rounded-full"
              >
                <Globe className="h-3 w-3 mr-1" />
                Online Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}