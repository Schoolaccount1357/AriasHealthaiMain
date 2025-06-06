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
import { CrisisResources } from "@/components/common/CrisisResources";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";

export default function Home() {
  // Track resource click function
  const trackResourceClick = async (type: string, action: () => void) => {
    try {
      await fetch('/api/resource/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
    } catch (error) {
      console.error('Failed to track resource click:', error);
    }
    action();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Crisis Banner at Top - All Screen Sizes */}
      <div className="bg-[#1e293b] border-l-4 border-[#3e64dd] p-3 sm:p-4 mx-4 sm:mx-6 mt-2 rounded-r-lg shadow-lg max-w-4xl">
        <div className="flex flex-col gap-3">
          {/* Header Section */}
          <div className="flex items-start">
            <Phone className="h-4 w-4 mr-2 text-[#3e64dd] flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-xs leading-tight">Need immediate help?</h3>
              <p className="text-white/80 text-xs leading-tight mt-0.5">Crisis support available 24/7</p>
            </div>
          </div>
          
          {/* United States Section */}
          <div className="border-t border-white/20 pt-2">
            <p className="text-white/90 text-xs sm:text-sm font-medium mb-2">In the United States</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
                size="sm"
                className="bg-[#3e64dd] hover:bg-[#2a4bba] text-xs sm:text-sm px-3 py-2 w-full sm:w-auto"
              >
                <Phone className="h-3 w-3 mr-1" />
                Call 988 - Press 1
              </Button>
              <Button 
                onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                size="sm"
                variant="outline"
                className="border-[#3e64dd] text-[#3e64dd] hover:bg-[#3e64dd]/10 text-xs sm:text-sm px-3 py-2 w-full sm:w-auto"
              >
                Text 838255
              </Button>
              <Button 
                onClick={() => trackResourceClick("chat", () => window.open("https://www.my.vavet.sites.va.gov/vclchat", "_blank"))}
                size="sm"
                variant="outline"
                className="border-[#3e64dd] text-[#3e64dd] hover:bg-[#3e64dd]/10 text-xs sm:text-sm px-3 py-2 w-full sm:w-auto"
              >
                <Globe className="h-3 w-3 mr-1" />
                Chat
              </Button>
            </div>
          </div>

          {/* International Section */}
          <div className="border-t border-white/20 pt-2">
            <p className="text-white/90 text-xs sm:text-sm font-medium mb-2">International</p>
            <Button 
              onClick={() => trackResourceClick("call", () => window.location.href = "tel:001-800-273-8255")}
              size="sm"
              variant="outline"
              className="border-[#3e64dd] text-[#3e64dd] hover:bg-[#3e64dd]/10 text-xs sm:text-sm px-3 py-2 w-full sm:w-auto"
            >
              <Phone className="h-3 w-3 mr-1" />
              Call 001-800-273-8255
            </Button>
          </div>
        </div>
      </div>
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-2 sm:py-8">
        <Hero />
        
        {/* Crisis resources removed from main content */}
        
        <AboutSUDS />
        <PlatformPreview />
        <section id="enrollment-form" className="scroll-mt-20 pt-4">
          <EnrollmentForm />
        </section>
        <TrustAndSecurity />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
}
