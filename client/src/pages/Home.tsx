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

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top heading and description */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-gradient">Veteran Care Re-imagined</h1>
          <p className="mb-6 text-lg text-center max-w-4xl mx-auto">
            AriasHealth.ai leverages cutting-edge artificial intelligence to create a personalized mental health experience built specifically for veterans. Our platform provides peer-to-peer connection with those who truly understand your experiences.
          </p>
        </div>

        <Hero />
        
        {/* Crisis resources removed from main content */}
        
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
      
      <Footer />
    </div>
  );
}
