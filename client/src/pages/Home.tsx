import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProgramOverview } from "@/components/home/ProgramOverview";
import { SimpleEnrollmentForm } from "@/components/home/SimpleEnrollmentForm";
import { PlatformPreview } from "@/components/home/PlatformPreview";
import { MVPPreview } from "@/components/home/MVPPreview";

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

        {/* Spacing between hero and next section */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <AboutSUDS />
        </div>
        <PlatformPreview />

      {/* Challenges Veterans Face Section */}
      <section className="mb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#10066A] mb-4">The Challenges Veterans Face</h2>
            <div className="w-24 h-1 bg-[#10066A] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Many veterans face barriers to care especially in substance use recovery. Traditional services don't always meet them where they are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Limited Access Card */}
            <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#10066A] rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#10066A] mb-3">Limited Access</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Limited access to timely mental health support when veterans need it most
              </p>
            </div>

            {/* Peer Connection Card */}
            <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#10066A] rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#10066A] mb-3">Peer Connection</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Difficulty connecting with peers who truly understand their military experiences
              </p>
            </div>

            {/* Stigma Barriers Card */}
            <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#10066A] rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#10066A] mb-3">Stigma Barriers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Stigma around seeking help for substance use disorders and mental health
              </p>
            </div>

            {/* Privacy Concerns Card */}
            <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="bg-[#10066A] rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#10066A] mb-3">Privacy Concerns</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Concerns about confidentiality and privacy when seeking mental health services
              </p>
            </div>
          </div>

          {/* Solution Section */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#10066A] mb-6">How Peer Support Helps</h3>
            <div className="max-w-4xl mx-auto">
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#10066A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Reduces isolation through shared experiences</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#10066A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Provides practical strategies from those who understand</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#10066A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Creates accountability in recovery</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#10066A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Offers hope through seeing others' progress</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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