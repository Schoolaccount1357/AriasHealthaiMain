import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-foreground">AriasHealth.ai Privacy Policy</h1>
          
          <div className="prose max-w-none text-sm sm:text-base">
            <p className="lead text-base sm:text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <p className="mb-6">
              Our Privacy Policy explains how AriasHealth.ai collects, uses, and discloses information about you to provide you with the best experience on our platform. The terms "AriasHealth.ai," "we," "us," and "our" refer to Arias Health Technologies, Inc. We use the terms "you," "your," and "user" to mean any person using the AriasHealth.ai services or participating in related activities. We are committed to safeguarding your privacy and ensuring that your personal information is protected.
            </p>
            
            <p className="mb-6">
              By using our service, you consent to the practices described in this Privacy Policy, to our Terms and Conditions, and to the additional notices outlined below.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">1.1. Directly Provided Information</h3>
            <p>
              We collect information that you voluntarily provide to us. This may occur when you fill out onboarding forms, select peer group interests, complete surveys, provide feedback, or otherwise communicate with us. Examples of collected information include:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3">
              <li>Name</li>
              <li>Email address</li>
              <li>Service affiliation (e.g., veteran status, caregiver status)</li>
              <li>Geographic region (e.g., city or state, not precise location)</li>
              <li>Interests, wellness goals, and preferences related to peer group matching</li>
              <li>Optional demographic data you choose to share (such as age range or self-identified health interests)</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">1.2. Automatically Collected Information</h3>
            <p>
              When you interact with AriasHealth.ai, we automatically collect certain data, such as:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3">
              <li>Browser type, device information, and language settings</li>
              <li>General location information (based on IP address, city-level only)</li>
              <li>Timestamps and interaction logs related to onboarding or survey responses</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">1.3. Communication Data</h3>
            <p>
              We may collect contact information and communication preferences when you sign up, join the waitlist, or interact with our team.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">2. Use of Collected Information</h2>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">2.1. Peer Group Creation and Service Improvement</h3>
            <p>
              We use collected information to:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3">
              <li>Suggest and build peer groups based on shared interests or wellness goals</li>
              <li>Better understand user needs for future platform development</li>
              <li>Offer customized updates and event suggestions that align with your preferences</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">2.2. Communication</h3>
            <p>
              We may contact you regarding:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3">
              <li>Service updates, group assignments, or new feature rollouts</li>
              <li>Invitations to participate in user feedback surveys</li>
              <li>Information relevant to your peer group interests</li>
              <li>Administrative notices or technical support communications</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">2.3. Data Research and Analysis</h3>
            <p>
              We may use aggregated and anonymized data (without personal identifiers) to:
            </p>
            <ul className="list-disc pl-5 space-y-1 my-3">
              <li>Analyze service trends</li>
              <li>Improve platform design and user experience</li>
              <li>Inform development of future features</li>
            </ul>
            <p className="italic">
              Note: Data used for analysis is de-identified to protect individual privacy.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">3. Data Sharing</h2>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">3.1. Peer Groups</h3>
            <p>
              If you choose to join a peer group through AriasHealth.ai, limited profile information (such as your name or selected interest categories) may be visible to other group members. We do not automatically share email addresses, phone numbers, or sensitive health information within peer groups.
            </p>
            <p className="italic mt-2">
              Important: Sharing personal information within peer groups is voluntary and at your own discretion.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">3.2. Service Providers</h3>
            <p>
              We may engage trusted third-party service providers to help us operate and improve our platform (e.g., survey tools, secure database services). These providers will only access information necessary to perform tasks on our behalf and are contractually obligated to maintain confidentiality and security standards.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">3.3. Legal Obligations</h3>
            <p>
              We may disclose your information if required to do so by law, such as in response to a court order, subpoena, or lawful government request.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">4. Data Security</h2>
            <p>
              We use reasonable and appropriate physical, administrative, and technical safeguards designed to protect your information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">5. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as otherwise required by law. You may request deletion of your personal information at any time by contacting us at info@ariashealth.ai.
            </p>
            <p className="mt-2">
              Aggregated, anonymized data may be retained indefinitely for research and service improvement purposes.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">6. Children's Privacy</h2>
            <p>
              Our services are intended for individuals 18 years and older. We do not knowingly collect personal information from individuals under the age of 18. If you become aware that a minor has provided us with personal information, please contact us at info@ariashealth.ai, and we will take steps to delete the information.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. Beta Disclaimer</h2>
            <p>
              AriasHealth.ai is currently in a beta testing phase. As such, features may change, be added, or be removed without prior notice. While we strive for quality and security, users acknowledge that the platform may contain bugs, errors, or interruptions. Your participation helps us improve the service, and we appreciate your understanding as we continue to develop.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">8. Medical Disclaimer</h2>
            <p>
              AriasHealth.ai is a peer support and community-building platform. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice because of something you have read or seen on AriasHealth.ai.
            </p>
            <p className="mt-2">
              Participation in AriasHealth.ai groups is voluntary, and users are responsible for their own wellbeing.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">9. User Responsibility</h2>
            <p>
              Users are solely responsible for their interactions with other users. AriasHealth.ai does not control and is not responsible for the actions of any users inside or outside the platform. We encourage all participants to exercise caution, set personal boundaries, and prioritize their safety.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">10. HIPAA Notice</h2>
            <p>
              AriasHealth.ai's current prelaunch website and early platform are not yet HIPAA-compliant. While we take privacy and security seriously, users should understand that the platform is still under development and should not submit sensitive personal health information at this stage.
            </p>
            <p className="mt-2">
              We are actively building the infrastructure necessary to support HIPAA-compliant operations for future versions of AriasHealth.ai. Enhanced security measures and data protection protocols will be implemented as we move toward active service iterations.
              We encourage users to wait until the fully secured platform is available before sharing any protected health information.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4">11. Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We encourage you to review this page periodically for the latest information. Your continued use of the service after changes are made constitutes acceptance of the revised Privacy Policy.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or your personal data, please contact us at:
            </p>
            <p className="mb-4">
              📧 info@ariashealth.ai
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}