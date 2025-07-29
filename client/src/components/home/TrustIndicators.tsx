
import { Shield, Award, Users, Lock, Heart, GraduationCap } from "lucide-react";

export function TrustIndicators() {
  const indicators = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Harvard & MIT Backed",
      description: "Developed through research at leading universities"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Veteran-Led Team",
      description: "Built by veterans, for veterans and their families"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy Protected",
      description: "Anonymous participation with enterprise-grade security"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Trauma-Informed",
      description: "Designed with military mental health expertise"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Always Free",
      description: "No cost barriers to accessing peer support"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Evidence-Based",
      description: "Grounded in peer support research and best practices"
    }
  ];

  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trusted by Veterans, Backed by Research
          </h2>
          <p className="text-gray-600">
            The support you deserve, built with the expertise you can trust
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-[#4a6b45] mb-3 flex justify-center">
                {indicator.icon}
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mb-1">
                {indicator.title}
              </h3>
              <p className="text-xs text-gray-600">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
