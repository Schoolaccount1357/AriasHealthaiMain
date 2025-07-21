
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

      {/* Full-Width Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image */}
        <img 
          src={PeerSupportImg} 
          alt="Support group discussion in a bright, supportive environment" 
          className="w-full h-full object-cover"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content Overlay - Bottom Left */}
        <div className="absolute inset-0 flex items-end justify-start">
          <div className="max-w-lg mx-4 sm:mx-8 lg:mx-16 mb-8 sm:mb-12 lg:mb-16 text-left text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Stronger Every Day.
            </h1>
            <p className="text-lg sm:text-xl mb-6 leading-relaxed opacity-90">
              Strength grows in circles, and everyone deserves one to lean on. Willow is our digital offering designed to build steady peer support, starting with the communities that carry the heaviest loads.
            </p>
            <Button 
              onClick={scrollToEnrollmentForm}
              size="lg"
              className="bg-[#3e64dd] hover:bg-[#2a4bba] text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Get early access to Willow - Navigate to enrollment form"
            >
              Get early access to Willow
            </Button>
          </div>
        </div>
      </div>

      {/* Crisis Resources Footer */}
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
