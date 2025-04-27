import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-foreground">AriasHealth.ai Terms and Conditions</h1>
          <p className="text-sm text-muted-foreground mb-6">Last Updated: January 2024</p>

          <div className="prose max-w-none text-sm sm:text-base">
            <p className="lead text-base sm:text-lg mb-6">
              Welcome to AriasHealth.ai! Thank you for visiting our early platform. These Terms and Conditions ("Terms") govern your use of our website, www.ariashealth.ai (the "Site"), operated by Arias Health Technologies, Inc. ("AriasHealth.ai," "we," "us," or "our").
            </p>
            <p className="mb-4">
              By accessing or using our Site, you agree to these Terms. If you do not agree, please do not use the Site.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">1. About AriasHealth.ai</h2>
            <p>
              AriasHealth.ai is currently in an early development stage. We are building a platform focused on peer support, wellness communities, and future services to help individuals connect and grow.
            </p>
            <p className="mb-4">
              The Site is for informational purposes only and is intended to help gather interest, feedback, and community input as we develop.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Privacy</h2>
            <p>
              We respect your privacy. Please review our Privacy Policy to learn how we collect, use, and protect your information.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">3. No Medical Advice</h2>
            <p>
              The information on this Site is for general informational purposes only. AriasHealth.ai does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for personal medical concerns.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Feedback</h2>
            <p>
              We welcome your feedback! By submitting comments, suggestions, or ideas to us at info@ariashealth.ai, you give us permission to use your feedback to help improve AriasHealth.ai without any obligation to you.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
            <p>
              All content on this Site — including text, images, branding, and design — is owned by AriasHealth.ai. You may not copy, reproduce, or use any part of the Site without our prior written consent.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              Your use of the Site is at your own risk. AriasHealth.ai is provided "as is" without warranties of any kind, either express or implied. We are not liable for any damages resulting from your use of or inability to use the Site.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">7. Changes</h2>
            <p>
              We may update or modify these Terms at any time. By continuing to use the Site after updates are posted, you accept the revised Terms.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have questions about these Terms or anything else related to AriasHealth.ai, you can reach us at:<br/>
              📧 info@ariashealth.ai
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}