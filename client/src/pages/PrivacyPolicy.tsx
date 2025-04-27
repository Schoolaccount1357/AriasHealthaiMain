
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-foreground">AriasHealth.ai Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-6">Last Updated: January 2024</p>

          <div className="prose max-w-none text-sm sm:text-base">
            <p className="lead text-base sm:text-lg mb-6">
              Welcome to AriasHealth.ai! We're building a platform to help connect individuals through peer support and wellness-focused groups. This Privacy Policy explains how we collect and use your information as we grow.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p>Right now, we collect only the basic information you choose to share, such as:</p>
            <ul className="list-disc pl-5 space-y-1 my-3">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your interests or service affiliation (for matching into groups)</li>
              <li>Any feedback you choose to provide through surveys or forms</li>
            </ul>
            <p>We also collect general technical info (like device type and browser type) to help improve the site.</p>
            <p>We do not collect or store medical records or detailed health information at this time.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1 my-3">
              <li>Match you with peer groups based on shared interests</li>
              <li>Communicate updates, invitations, and opportunities to participate</li>
              <li>Improve our early platform and plan future services</li>
              <li>Understand general trends through anonymized, aggregate data</li>
            </ul>
            <p>We never sell your personal information to third parties.</p>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Data Security</h2>
            <p>
              We take privacy seriously and use reasonable measures to protect your information. That said, AriasHealth.ai is still in its early development phase, and no online system is 100% guaranteed secure.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Your Choices</h2>
            <p>
              You can ask us to update or delete your information at any time by contacting us at info@ariashealth.ai. We will remove your personally identifiable information if requested.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy as the platform grows. If we make major changes, we'll post an updated version here.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about how your information is handled, reach out anytime:<br/>
              📧 info@ariashealth.ai
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
