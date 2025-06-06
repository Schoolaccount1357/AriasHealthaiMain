import { Link } from "wouter";
import { SecurityFeature } from "@/utils/types";
import { Shield, CheckCircle } from "lucide-react";

export function TrustAndSecurity() {
  const securityFeatures: SecurityFeature[] = [
    { id: 1, label: "HIPAA Compliance" },
    { id: 2, label: "Data Encryption" },
    { id: 3, label: "Anonymous Options" },
    { id: 4, label: "24/7 Moderation" }
  ];

  return (
    <section className="mb-12 bg-blue-100 p-6 rounded-lg border border-blue-200">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
          <div className="flex justify-center">
            <Shield className="h-24 w-24 text-emerald-700" />
          </div>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#030C54" }}>Your Trust & Security Matter</h2>
          <p className="mb-4" style={{ color: "#030C54" }}>We understand the sensitive nature of substance use recovery. Our platform features:</p>
          <div className="grid grid-cols-2 gap-2">
            {securityFeatures.map((feature) => (
              <div key={feature.id} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-700 mr-2 mt-0.5" />
                <span className="text-sm" style={{ color: "#030C54" }}>{feature.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link 
              href="/privacy-policy" 
              className="text-blue-700 hover:text-blue-800 font-medium text-sm"
            >
              View our Privacy Policy
            </Link> | 
            <Link 
              href="/terms-of-service" 
              className="text-blue-700 hover:text-blue-800 font-medium text-sm ml-1"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
