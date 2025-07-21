
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
    <>
      {/* Inclusive Crisis Support Banner */}
      <div className="w-full bg-red-50 border-b border-red-200 text-red-800 text-center py-3 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <span className="font-medium">In crisis?</span> Call <strong>988</strong> (USA) or visit{" "}
          <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
            988lifeline.org
          </a>{" "}
          for free, confidential emotional support — for anyone, anytime.
        </div>
      </div>

      <section className="relative">
        {/* Full-bleed Hero Section */}
        <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-slate-50 via-white to-gray-100 relative overflow-hidden">
          
          {/* Left Content Container */}
          <div className="z-10 w-full md:w-1/2 px-6 sm:px-12 lg:px-20 py-16 md:py-32 flex flex-col justify-center min-h-screen md:min-h-0">
            <div className="max-w-2xl" role="main" aria-labelledby="hero-heading">
              <h1 
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
              >
                You are not alone.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-lg">
                Everyone deserves a circle to lean on. Willow is our digital offering to build steady peer support, starting with the communities that carry the heaviest loads.
              </p>

              <Button 
                onClick={scrollToEnrollmentForm}
                className="bg-[#3e64dd] hover:bg-[#2a4bba] text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                size="lg"
                aria-label="Get early access to Willow - Navigate to enrollment form"
              >
                Get early access to Willow
              </Button>
            </div>
          </div>

          {/* Right Visual Container */}
          <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen mt-8 md:mt-0">
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={PeerSupportImg} 
                alt="Supportive group discussion showing people connecting and supporting each other" 
                className="w-full h-full object-cover object-center scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-slate-900/40 via-slate-900/20 to-transparent"></div>
              
              {/* Optional: Floating elements for visual interest */}
              <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#3e64dd] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Building connections</p>
                      <p className="text-xs text-gray-600">Peer-to-peer support that works</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Crisis Support Resources */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1e293b] border-t border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Header */}
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-[#3e64dd] opacity-80" />
                <span className="text-white/90 text-sm font-medium">Need immediate professional help?</span>
                <span className="text-white/60 text-xs ml-2 hidden sm:inline">24/7 crisis support available</span>
              </div>

              {/* Crisis Resources */}
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
                  onClick={() => trackResourceClick("chat", () => window.open("https://988lifeline.org/chat", "_blank"))}
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
    </>
  );
}
