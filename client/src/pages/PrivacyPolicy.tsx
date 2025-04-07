import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="lead text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              Veterans Connect ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, date of birth, gender,
                and other information you provide in the enrollment form.
              </li>
              <li>
                <strong>Military Service Information:</strong> Branch of service, rank, years of service, and deployment history.
              </li>
              <li>
                <strong>Health Information:</strong> Information related to substance use disorders, treatment history,
                mental health conditions, and recovery status that you choose to provide.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our platform, including login times,
                features used, and connections made.
              </li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Provide and maintain our platform services</li>
              <li>Match you with appropriate peer support connections</li>
              <li>Improve and personalize your experience</li>
              <li>Communicate with you about the platform and support services</li>
              <li>Ensure the security and integrity of our services</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">4. HIPAA Compliance</h2>
            <p>
              We are committed to maintaining the privacy and security of your health information in accordance with the
              Health Insurance Portability and Accountability Act (HIPAA). Any protected health information (PHI) you share
              with us is handled according to HIPAA standards and regulations.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">5. How We Protect Your Information</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information,
              including:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>End-to-end encryption for all communications</li>
              <li>Secure data storage with access controls</li>
              <li>Regular security assessments and testing</li>
              <li>Staff training on privacy and security practices</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">6. Sharing Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties except in the
              following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>When required by law or to protect our rights</li>
              <li>With your consent for the purpose of establishing peer support connections</li>
              <li>With service providers who assist us in operating our platform (all of whom are bound by confidentiality agreements)</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none pl-0 space-y-1 mb-4">
              <li>Email: privacy@veteransconnect.org</li>
              <li>Phone: 1-800-555-VETS (8387)</li>
              <li>Mail: 123 Veterans Way, Washington, DC 20001</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
