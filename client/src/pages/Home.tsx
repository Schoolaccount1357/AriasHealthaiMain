import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProgramOverview } from "@/components/home/ProgramOverview";
import { EnrollmentForm } from "@/components/home/EnrollmentForm";
import { PlatformPreview } from "@/components/home/PlatformPreview";
import { AboutSUDS } from "@/components/home/AboutSUDS";
import { FAQSection } from "@/components/home/FAQSection";
import { TrustAndSecurity } from "@/components/home/TrustAndSecurity";
import { StudyInvitation } from "@/components/home/StudyInvitation";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { FinalCTA } from "@/components/home/FinalCTA";
import { useState, useEffect } from "react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";

export default function Home() {
  const [showFloatingHelp, setShowFloatingHelp] = useState(false);
  const { trackResourceClick } = useResourceTracking();

  // Show the floating help button after user has scrolled down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingHelp(true);
      } else {
        setShowFloatingHelp(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
        
        {/* Crisis resources removed from main content, only using floating button */}
        
        <KeyFeatures />
        <section id="enrollment-form" className="scroll-mt-20 pt-4">
          <EnrollmentForm />
        </section>
        <PlatformPreview />
        <AboutSUDS />
        <TrustAndSecurity />
        <FAQSection />
        <FinalCTA />
      </main>
      
      {/* Floating help button that appears after scroll, with usage tracking */}
      {showFloatingHelp && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 animate-fade-in">
          <button 
            onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
            className="bg-[#3e64dd] text-white p-3 rounded-full shadow-lg hover:bg-[#2a4bba] transition-colors"
            aria-label="Get immediate help - Call 988"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </button>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
