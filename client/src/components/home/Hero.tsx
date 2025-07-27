import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";
import HeroImage from "@assets/AdobeStock_1079982482_1753584922406.jpeg";

export function Hero() {
  const { trackResourceClick } = useResourceTracking();

  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-screen h-[85vh] sm:h-[80vh] md:h-[84vh] -ml-4 sm:-ml-6 lg:-ml-8 xl:-ml-[calc((100vw-1280px)/2)] -mr-4 sm:-mr-6 lg:-mr-8 xl:-mr-[calc((100vw-1280px)/2)] -mt-16 sm:-mt-20 mb-0">
      {/* Full-Width Hero Section */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Background Image */}
        <img
          src={HeroImage}
          alt="Supporting veterans through peer connection"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'right center' }}
        />
        
        {/* Enhanced Dark Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40 hero-overlay"></div>
        
        {/* Content Overlay - Optimized for Mobile */}
        <div className="absolute inset-0 flex items-center justify-center lg:items-end lg:justify-start pt-20 sm:pt-16 pb-24 sm:pb-28 lg:pb-20 xl:pb-24">
          <div className="max-w-sm sm:max-w-lg lg:max-w-2xl ml-0 lg:ml-8 xl:ml-12 text-center lg:text-left text-white px-3 sm:px-6 lg:px-8 w-full">
            {/* Compact Text Container */}
            <div className="backdrop-blur-sm bg-black/15 rounded-xl p-3 sm:p-4 md:p-5 shadow-xl mx-2 sm:mx-0 max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight text-white" 
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,248,220,0.4)'
                  }}>
                Stronger Every Day.
              </h1>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 leading-relaxed text-white/95 font-medium"
                 style={{
                   textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                 }}>
                Strength grows within community circles, and everyone deserves one to lean on. Willow is our digital offering designed to build steady peer support, starting with the communities that carry the heaviest loads.
              </p>
              <Button 
                onClick={scrollToEnrollmentForm}
                size="default"
                className="bg-slate-600/80 hover:bg-slate-700/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto min-h-[48px] sm:min-h-[52px]"
                aria-label="Get early access to Willow - Navigate to enrollment form"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  boxShadow: '0 0 15px rgba(100, 116, 139, 0.3), 0 0 30px rgba(100, 116, 139, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                Get early access to Willow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Resources Footer - Bottom of Hero */}
      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-black/60 rounded-xl mx-3 sm:mx-6 lg:mx-8 mb-2 sm:mb-0 px-4 sm:px-5 py-3 sm:py-4 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* Header */}
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="text-white text-sm sm:text-base font-semibold"
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