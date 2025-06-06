import { Link } from "wouter";
import { SecurityFeature } from "@/utils/types";
import { Shield, CheckCircle, Lock, Eye, UserCheck, Clock } from "lucide-react";

export function TrustAndSecurity() {
  const securityFeatures: SecurityFeature[] = [
    { id: 1, label: "HIPAA Compliance", icon: <UserCheck className="h-5 w-5" /> },
    { id: 2, label: "End-to-End Encryption", icon: <Lock className="h-5 w-5" /> },
    { id: 3, label: "Anonymous Options", icon: <Eye className="h-5 w-5" /> },
    { id: 4, label: "24/7 Moderation", icon: <Clock className="h-5 w-5" /> }
  ];

  return (
    <section className="mt-12 mb-12 relative overflow-hidden">
      {/* Background with gradient and subtle pattern */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#334155] p-8 rounded-xl border border-[#3e64dd]/20 shadow-2xl">
        {/* Subtle glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3e64dd]/5 via-transparent to-[#3e64dd]/5 rounded-xl"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3e64dd]/10 rounded-full blur-3xl -translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center">
          {/* Enhanced shield icon section */}
          <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
            <div className="flex justify-center relative">
              <div className="relative">
                <div className="absolute inset-0 bg-[#3e64dd]/20 rounded-full blur-xl scale-150"></div>
                <div className="relative bg-gradient-to-br from-[#3e64dd] to-[#2a4bba] p-6 rounded-full shadow-lg">
                  <Shield className="h-16 w-16 text-white drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content section */}
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Your Trust & Security Matter
            </h2>
            <p className="mb-6 text-white/90 text-lg leading-relaxed">
              We understand the sensitive nature of substance use recovery. Your privacy and safety are our highest priorities.
            </p>
            
            {/* Enhanced feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {securityFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-[#3e64dd] mr-3 bg-white/20 p-2 rounded-full">
                    {feature.icon}
                  </div>
                  <span className="text-white font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
            
            {/* Enhanced links */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link 
                href="/privacy-policy" 
                className="inline-flex items-center text-[#3e64dd] hover:text-white font-medium transition-colors duration-300 bg-white/10 hover:bg-[#3e64dd]/20 px-4 py-2 rounded-lg border border-[#3e64dd]/30"
              >
                <Lock className="h-4 w-4 mr-2" />
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="inline-flex items-center text-[#3e64dd] hover:text-white font-medium transition-colors duration-300 bg-white/10 hover:bg-[#3e64dd]/20 px-4 py-2 rounded-lg border border-[#3e64dd]/30"
              >
                <Shield className="h-4 w-4 mr-2" />
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
