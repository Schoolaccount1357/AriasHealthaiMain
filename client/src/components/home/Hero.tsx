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
    <section className="relative w-screen h-screen -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-[calc((100vw-1280px)/2)] -mt-16 sm:-mt-20 mb-8 sm:mb-12 lg:mb-16">
      {/* Full-Width Hero Section */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Image */}
        <img 
          src={PeerSupportImg} 
          alt="Support group discussion in a bright, supportive environment" 
          className="w-full h-full object-cover"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content Overlay - Centered on Mobile, Bottom Left on Desktop */}
        <div className="absolute inset-0 flex items-center justify-center sm:items-end sm:justify-start pt-16 sm:pt-20">
          <div className="max-w-lg mx-4 sm:mx-8 lg:mx-16 mb-8 sm:mb-12 lg:mb-16 text-center sm:text-left text-white px-4 sm:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight" 
                style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 248, 220, 0.4), 0 0 80px rgba(255, 248, 220, 0.2)'
                }}>
              Stronger Every Day.
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed opacity-90 max-w-md sm:max-w-lg">
              Strength grows in circles, and everyone deserves one to lean on. Willow is our digital offering designed to build steady peer support, starting with the communities that carry the heaviest loads.
            </p>
            <Button 
              onClick={scrollToEnrollmentForm}
              size="lg"
              className="bg-[#3e64dd] hover:bg-[#2a4bba] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              aria-label="Get early access to Willow - Navigate to enrollment form"
            >
              Get early access to Willow
            </Button>
          </div>
        </div>
      </div>

      {/* Crisis Resources Footer with Glassmorphism */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/10 border-t border-white/20 px-4 sm:px-6 py-4 sm:py-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* Header */}
            <div className="flex items-center justify-center sm:justify-start">
              <Phone className="h-4 w-4 mr-2 text-white opacity-90" />
              <span className="text-white/90 text-sm font-medium">Need immediate support?</span>
              <span className="text-white/60 text-xs ml-2 hidden sm:inline">Available 24/7 for everyone</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 text-xs">
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs px-4 py-3 sm:py-2 h-auto rounded-full min-h-[44px] sm:min-h-auto border border-white/30"
              >
                <Phone className="h-3 w-3 mr-2 sm:mr-1" />
                Call 988
              </Button>
              <div className="flex gap-2">
                <Button 
                  onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                  size="sm"
                  className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white text-xs px-4 py-3 sm:py-2 h-auto rounded-full flex-1 sm:flex-initial min-h-[44px] sm:min-h-auto border border-white/20"
                >
                  Text 838255
                </Button>
                <Button 
                  onClick={() => trackResourceClick("chat", () => window.open("https://988lifeline.org/chat", "_blank"))}
                  size="sm"
                  className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white text-xs px-4 py-3 sm:py-2 h-auto rounded-full flex-1 sm:flex-initial min-h-[44px] sm:min-h-auto border border-white/20"
                >
                  <Globe className="h-3 w-3 mr-2 sm:mr-1" />
                  Online Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}