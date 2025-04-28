import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <h2>Last Updated: April 28, 2025</h2>
        
        <p className="text-lg mb-4">
          At AriasHealth.ai, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h3>
        
        <p><strong>Minimal Data Collection Principle:</strong> We adhere to data minimization principles and only collect information that is necessary to provide our services.</p>
        
        <p>We may collect the following types of information:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Waitlist Information:</strong> When you join our waitlist, we collect your email address.</li>
          <li><strong>Usage Data:</strong> We collect anonymized data about how you interact with our website, including resources accessed, pages visited, and features used.</li>
          <li><strong>Device Information:</strong> We collect information about the device you use to access our website, such as your IP address, browser type, and operating system. This data is anonymized and used only for security and statistical purposes.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h3>
        
        <p>We use your information only for specific, limited purposes:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>To provide and maintain our services</li>
          <li>To notify you about changes to our services</li>
          <li>To improve our website and services</li>
          <li>To respond to your inquiries and provide customer support</li>
          <li>To protect against fraud and unauthorized access</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">3. How We Protect Your Information</h3>
        
        <p>AriasHealth.ai implements robust security measures to protect your information:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li>All data transmitted between your browser and our servers is encrypted using HTTPS/TLS</li>
          <li>We employ industry-standard security protocols and practices</li>
          <li>We use secure database systems with restricted access</li>
          <li>We regularly review and update our security procedures</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">4. Information Sharing and Disclosure</h3>
        
        <p>We do not sell or rent your personal information to third parties. We may share your information only in the following limited circumstances:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Service Providers:</strong> We may share information with trusted service providers who assist us in operating our website and providing our services, subject to confidentiality agreements.</li>
          <li><strong>Legal Requirements:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities.</li>
          <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, privacy, safety, or property, or that of our users or others.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">5. Your Rights and Choices</h3>
        
        <p>You have several rights regarding your personal information:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Access:</strong> You can request access to your personal information that we hold.</li>
          <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
          <li><strong>Deletion:</strong> You can request that we delete your personal information.</li>
          <li><strong>Objection:</strong> You can object to the processing of your personal information.</li>
          <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, commonly used, and machine-readable format.</li>
        </ul>

        <p>To exercise any of these rights, please contact us at privacy@ariashealth.ai.</p>

        <h3 className="text-xl font-semibold mt-8 mb-4">6. Cookies and Tracking Technologies</h3>
        
        <p>We use cookies and similar tracking technologies to enhance your experience on our website:</p>
        
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly.</li>
          <li><strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website.</li>
        </ul>

        <p>You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.</p>

        <h3 className="text-xl font-semibold mt-8 mb-4">7. International Data Transfers</h3>
        
        <p>As our services are available globally, your information may be processed in countries where data protection laws may differ from those in your country. We take appropriate safeguards to ensure your information is protected in accordance with this Privacy Policy.</p>

        <h3 className="text-xl font-semibold mt-8 mb-4">8. Children's Privacy</h3>
        
        <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.</p>

        <h3 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h3>
        
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>

        <h3 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h3>
        
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        
        <p>Email: info@ariashealth.ai</p>
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