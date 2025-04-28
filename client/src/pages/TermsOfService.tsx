import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <h2>Last Updated: April 28, 2025</h2>
        
        <p className="text-lg mb-4">
          Please read these Terms of Service ("Terms") carefully before using the AriasHealth.ai website and services operated by AriasHealth.ai.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h3>
        
        <p>
          By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h3>
        
        <p>
          AriasHealth.ai provides a platform designed to connect veterans with peer support through technology, resources, and community. Our services may include resource location, educational materials, and community support features.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">3. User Accounts and Registration</h3>
        
        <p>
          When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and for all activities that occur under your account.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">4. User Conduct</h3>
        
        <p>
          You agree not to use our service:
        </p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
          <li>To impersonate or attempt to impersonate AriasHealth.ai, an AriasHealth.ai employee, another user, or any other person</li>
          <li>To engage in any conduct that restricts or inhibits anyone's use of the service</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h3>
        
        <p>
          The service and its original content, features, and functionality are and will remain the exclusive property of AriasHealth.ai and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">6. Privacy Policy</h3>
        
        <p>
          Your use of the service is also subject to our Privacy Policy, which is incorporated herein by reference. Please review our 
          <Link href="/privacy-policy" className="underline mx-1">
            Privacy Policy
          </Link>
          to understand our practices regarding your personal information.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">7. Resource Information Disclaimer</h3>
        
        <p>
          AriasHealth.ai makes every effort to provide accurate and up-to-date information about veteran resources. However, we cannot guarantee the accuracy, completeness, or reliability of the information. Resources listed on our platform are for informational purposes only and do not constitute an endorsement or recommendation.
        </p>
        
        <p>
          You acknowledge that:
        </p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>Resource availability and details may change over time</li>
          <li>You should verify the information before seeking services from any listed resource</li>
          <li>AriasHealth.ai is not responsible for the quality, safety, or legality of any services provided by third-party resources listed on our platform</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">8. Medical Disclaimer</h3>
        
        <p>
          AriasHealth.ai is not a medical service provider. The information provided on our website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">9. Limitation of Liability</h3>
        
        <p>
          In no event shall AriasHealth.ai, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>Your access to or use of or inability to access or use the service</li>
          <li>Any conduct or content of any third party on the service</li>
          <li>Any content obtained from the service</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">10. Changes to Terms</h3>
        
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">11. Governing Law</h3>
        
        <p>
          These Terms shall be governed and construed in accordance with the laws of the United States and the State of Massachusetts, without regard to its conflict of law provisions.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">12. Contact Us</h3>
        
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        
        <p>
          Email: info@ariashealth.ai
        </p>
      </div>
      
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline">
          <Link href="/">Return to Homepage</Link>
        </Button>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}