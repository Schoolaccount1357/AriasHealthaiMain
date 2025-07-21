import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";
import HeroImage from "@assets/AdobeStock_1437759002_1753077548766.jpeg";

export function Hero() {
  const { trackResourceClick } = useResourceTracking();

  const scrollToEnrollmentForm = () => {
    const enrollmentFormSection = document.getElementById('enrollment-form');
    if (enrollmentFormSection) {
      enrollmentFormSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-screen h-[72vh] sm:h-[77vh] lg:h-[82vh] -ml-4 sm:-ml-6 lg:-ml-8 xl:-ml-[calc((100vw-1280px)/2)] -mr-4 sm:-mr-6 lg:-mr-8 xl:-mr-[calc((100vw-1280px)/2)] -mt-16 sm:-mt-20 mb-0">
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
        
        {/* Content Overlay - Bottom Left for Desktop, Centered for Mobile */}
        <div className="absolute inset-0 flex items-end justify-center lg:items-end lg:justify-start pt-16 sm:pt-20 pb-32 lg:pb-20 xl:pb-24">
          <div className="max-w-xl lg:max-w-2xl ml-0 lg:ml-8 xl:ml-12 text-center lg:text-left text-white px-4 sm:px-6 lg:px-8">
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
                Strength grows within community circles, and everyone deserves one to lean on. Willow is our digital offering designed to build steady peer support, starting with the communities that carry the heaviest loads.
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


    </section>
  );
}