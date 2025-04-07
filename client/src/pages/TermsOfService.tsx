import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="lead text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Veterans Connect platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). 
              If you do not agree to these Terms, please do not use the Platform.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">2. Platform Description</h2>
            <p>
              Veterans Connect is a digital platform designed to connect veterans who are experiencing or have experienced 
              Substance Use Disorders (SUDS). The Platform uses AI/ML technology to match veterans with peers who may have 
              similar experiences or complementary recovery journeys.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">3. Eligibility</h2>
            <p>
              The Platform is intended for use by veterans of the United States Armed Forces who are at least 18 years of age. 
              By using the Platform, you represent and warrant that you meet these eligibility requirements.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">4. User Accounts</h2>
            <p>
              To access certain features of the Platform, you may be required to create an account. You are responsible for 
              maintaining the confidentiality of your account credentials and for all activities that occur under your account. 
              You agree to provide accurate and complete information when creating your account and to update your information as needed.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Use the Platform in any way that violates applicable laws or regulations</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Share false or misleading information</li>
              <li>Attempt to access other users' accounts or personal information without authorization</li>
              <li>Interfere with the proper functioning of the Platform</li>
              <li>Share or distribute illegal content or materials</li>
              <li>Use the Platform for any commercial purposes without our express consent</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">6. Crisis Support Disclaimer</h2>
            <p>
              The Platform is not designed for crisis situations and should not be used as a substitute for emergency medical 
              or mental health services. If you are experiencing a crisis or emergency situation, please contact the Veterans 
              Crisis Line at 1-800-273-8255 and Press 1, text 838255, or call 911 immediately.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            <p>
              All content and materials available on the Platform, including but not limited to text, graphics, logos, 
              button icons, images, audio clips, data compilations, and software, are the property of Veterans Connect or 
              its licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">8. Privacy</h2>
            <p>
              Your use of the Platform is also governed by our Privacy Policy, which is incorporated by reference into these Terms. 
              Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">9. Disclaimer of Warranties</h2>
            <p>
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. 
              TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, 
              INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL VETERANS CONNECT OR ITS OFFICERS, DIRECTORS, 
              EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES 
              ARISING OUT OF OR IN ANY WAY CONNECTED WITH YOUR USE OF THE PLATFORM.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Veterans Connect and its officers, directors, employees, 
              and agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees 
              (including reasonable attorneys' fees) arising from or relating to your use of the Platform or violation of these Terms.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">12. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting 
              the revised Terms on the Platform. Your continued use of the Platform after the posting of revised Terms 
              constitutes your acceptance of the changes.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States and the laws 
              of the District of Columbia, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">14. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul className="list-none pl-0 space-y-1 mb-4">
              <li>Email: legal@veteransconnect.org</li>
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
