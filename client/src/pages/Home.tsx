import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProgramOverview } from "@/components/home/ProgramOverview";
import { SimpleEnrollmentForm } from "@/components/home/SimpleEnrollmentForm";
import { PlatformPreview } from "@/components/home/PlatformPreview";
import { MVPPreview } from "@/components/home/MVPPreview";


import { FAQSection } from "@/components/home/FAQSection";
import { TrustAndSecurity } from "@/components/home/TrustAndSecurity";
import { StudyInvitation } from "@/components/home/StudyInvitation";
import { KeyFeatures } from "@/components/home/KeyFeatures";
import { FinalCTA } from "@/components/home/FinalCTA";
import { CrisisResources } from "@/components/common/CrisisResources";
import { Button } from "@/components/ui/button";
import { Phone, Globe, HeartHandshake } from "lucide-react";

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

        {/* Crisis Support Section - Below Hero */}
        <section className="mt-4 sm:mt-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                <span className="text-red-800 text-sm sm:text-base font-semibold">
                  Need immediate support?
                </span>
                <span className="text-red-700 text-xs sm:text-sm font-medium">
                  24/7 for everyone
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3">
                <Button 
                  onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Call 988
                </Button>
                <Button 
                  onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Text 838255
                </Button>
                <Button 
                  onClick={() => trackResourceClick("chat", () => window.open("https://988lifeline.org/chat", "_blank"))}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Chat
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Peer Support Information Section */}
        <section className="mt-8 sm:mt-12 lg:mt-16 mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-lg">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 mb-6 leading-relaxed font-medium">
                At AriasHealth.ai, we believe that combining AI technology with peer-to-peer connection creates a powerful support system that meets veterans exactly where they are in their recovery journey.
              </p>
              
              <div className="bg-white rounded-lg p-6 shadow-inner">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <HeartHandshake className="h-6 w-6 text-[#4a6b45] mr-3" />
                  How Peer Support Helps:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#4a6b45] mr-3 mt-1">•</span>
                    <span className="text-base sm:text-lg">Reduces feelings of isolation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4a6b45] mr-3 mt-1">•</span>
                    <span className="text-base sm:text-lg">Provides practical advice from those with similar experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4a6b45] mr-3 mt-1">•</span>
                    <span className="text-base sm:text-lg">Creates accountability in recovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4a6b45] mr-3 mt-1">•</span>
                    <span className="text-base sm:text-lg">Offers hope through seeing others' progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <PlatformPreview />



        <section id="enrollment-form" className="scroll-mt-20 pt-4">
          <SimpleEnrollmentForm />
        </section>
        <TrustAndSecurity />
      </main>

      {/* FAQ Section - Positioned before footer */}
      <div className="bg-gradient-to-b from-background to-muted/30 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}