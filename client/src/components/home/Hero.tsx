import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";
import PeerSupportImg from "@assets/AdobeStock_1254483208_1753072290086.jpeg";

export function Hero() {
  const { trackResourceClick } = useResourceTracking();

  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-screen h-screen -ml-4 sm:-ml-6 lg:-ml-8 xl:-ml-[calc((100vw-1280px)/2)] -mr-4 sm:-mr-6 lg:-mr-8 xl:-mr-[calc((100vw-1280px)/2)] -mt-16 sm:-mt-20 mb-0">
      {/* Full-Width Hero Section */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Image */}
        <img 
          src={PeerSupportImg} 
          alt="Support group discussion in a bright, supportive environment" 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        
        {/* Enhanced Dark Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40 hero-overlay"></div>
        
        {/* Content Overlay - Bottom Left for Desktop, Centered for Mobile */}
        <div className="absolute inset-0 flex items-center justify-center sm:items-center sm:justify-center lg:items-end lg:justify-start pt-16 sm:pt-20 pb-24 lg:pb-32 xl:pb-40">
          <div className="max-w-xl lg:max-w-2xl ml-0 sm:ml-0 lg:ml-16 xl:ml-20 text-center sm:text-center lg:text-left text-white px-4 sm:px-6 lg:px-8">
            {/* Enhanced Background for Text Readability */}
            <div className="backdrop-blur-sm bg-black/30 rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-white/20 shadow-2xl hero-glassmorphism hero-mobile-padding">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 leading-tight text-white hero-text-shadow hero-mobile-text hero-tablet-text" 
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,248,220,0.4)'
                  }}>
                Stronger Every Day.
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 leading-relaxed text-white/95 max-w-2xl font-medium hero-text-shadow hero-mobile-subtitle hero-tablet-subtitle"
                 style={{
                   textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                 }}>
                Strength grows in circles, and everyone deserves one to lean on. Willow is our digital offering designed to build steady peer support, starting with the communities that carry the heaviest loads.
              </p>
              <Button 
                onClick={scrollToEnrollmentForm}
                size="lg"
                className="bg-[#4a6b45] hover:bg-[#3a5336] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 w-full sm:w-auto border-2 border-white/20 hover:border-white/40 hero-button"
                aria-label="Get early access to Willow - Navigate to enrollment form"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  boxShadow: '0 0 20px rgba(74, 107, 69, 0.5), 0 0 40px rgba(74, 107, 69, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                Get early access to Willow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Resources Footer - Compact and Flush to Bottom */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-black/50 border-t border-white/20 px-3 sm:px-4 py-2 sm:py-3 shadow-xl crisis-footer">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            {/* Header */}
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              <span className="text-white text-xs sm:text-sm font-semibold hero-text-shadow"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                Need immediate support?
              </span>
              <span className="text-white/80 text-xs font-medium hidden sm:inline hero-text-shadow"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                24/7 for everyone
              </span>
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex gap-1 sm:gap-2">
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
                size="sm"
                className="bg-red-600/90 backdrop-blur-sm hover:bg-red-700/90 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 h-auto rounded-lg min-h-[32px] border border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 crisis-button"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <Phone className="h-3 w-3 mr-1" />
                Call 988
              </Button>
              <Button 
                onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                size="sm"
                className="bg-blue-600/80 backdrop-blur-sm hover:bg-blue-700/80 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 h-auto rounded-lg min-h-[32px] border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 crisis-button"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Text 838255
              </Button>
              <Button 
                onClick={() => trackResourceClick("chat", () => window.open("https://988lifeline.org/chat", "_blank"))}
                size="sm"
                className="bg-green-600/80 backdrop-blur-sm hover:bg-green-700/80 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-2 h-auto rounded-lg min-h-[32px] border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 crisis-button"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <Globe className="h-3 w-3 mr-1" />
                Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}