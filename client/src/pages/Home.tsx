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
