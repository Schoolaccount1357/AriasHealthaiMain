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
    <section className="relative w-screen min-h-[120vh] sm:min-h-[130vh] -ml-4 sm:-ml-6 lg:-ml-8 xl:-ml-[calc((100vw-1280px)/2)] -mr-4 sm:-mr-6 lg:-mr-8 xl:-mr-[calc((100vw-1280px)/2)] -mt-16 sm:-mt-20 mb-8 sm:mb-12 lg:mb-16">
      {/* Full-Width Hero Section */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Image */}
        <img 
          src={PeerSupportImg} 
          alt="Support group discussion in a bright, supportive environment" 
          className="w-full h-full object-cover"
        />
        
        {/* Enhanced Dark Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40 hero-overlay"></div>
        
        {/* Content Overlay - Left-aligned with Enhanced Contrast */}
        <div className="absolute inset-0 flex items-center justify-start pt-16 sm:pt-20">
          <div className="max-w-2xl ml-4 sm:ml-8 lg:ml-16 xl:ml-20 mb-8 sm:mb-12 lg:mb-16 text-left text-white px-4 sm:px-6 lg:px-8">
            {/* Enhanced Background for Text Readability */}
            <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/20 shadow-2xl hero-glassmorphism hero-mobile-padding">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-white hero-text-shadow hero-mobile-text hero-tablet-text" 
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3)'
                  }}>
                Stronger Every Day.
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 md:mb-10 leading-relaxed text-white/95 max-w-3xl font-medium hero-text-shadow hero-mobile-subtitle hero-tablet-subtitle"
                 style={{
                   textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                 }}>
                Strength grows in circles, and everyone deserves one to lean on. Willow is our digital offering designed to build steady peer support, starting with the communities that carry the heaviest loads.
              </p>
              <Button 
                onClick={scrollToEnrollmentForm}
                size="lg"
                className="bg-[#3e64dd] hover:bg-[#2a4bba] text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl lg:text-2xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 w-full sm:w-auto border-2 border-white/20 hover:border-white/40 hero-button"
                aria-label="Get early access to Willow - Navigate to enrollment form"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Get early access to Willow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Resources Footer with Enhanced Glassmorphism and WCAG Compliance */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-black/40 border-t-2 border-white/30 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 shadow-2xl crisis-footer">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-white" />
                <span className="text-white text-base sm:text-lg lg:text-xl font-bold hero-text-shadow"
                      style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Need immediate support?
                </span>
              </div>
              <span className="text-white/90 text-sm sm:text-base lg:text-lg font-medium ml-8 sm:ml-0 hero-text-shadow"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                Available 24/7 for everyone
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 lg:gap-4">
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
                size="lg"
                className="bg-red-600/90 backdrop-blur-sm hover:bg-red-700/90 text-white text-sm sm:text-base lg:text-lg font-bold px-6 sm:px-8 py-4 sm:py-5 h-auto rounded-xl min-h-[50px] sm:min-h-[60px] border-2 border-white/40 hover:border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 crisis-button"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                Call 988
              </Button>
              <div className="flex gap-3 lg:gap-4">
                <Button 
                  onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                  size="lg"
                  className="bg-blue-600/80 backdrop-blur-sm hover:bg-blue-700/80 text-white text-sm sm:text-base lg:text-lg font-bold px-4 sm:px-6 py-4 sm:py-5 h-auto rounded-xl flex-1 min-h-[50px] sm:min-h-[60px] border-2 border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 crisis-button"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  Text 838255
                </Button>
                <Button 
                  onClick={() => trackResourceClick("chat", () => window.open("https://988lifeline.org/chat", "_blank"))}
                  size="lg"
                  className="bg-green-600/80 backdrop-blur-sm hover:bg-green-700/80 text-white text-sm sm:text-base lg:text-lg font-bold px-4 sm:px-6 py-4 sm:py-5 h-auto rounded-xl flex-1 min-h-[50px] sm:min-h-[60px] border-2 border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 crisis-button"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
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