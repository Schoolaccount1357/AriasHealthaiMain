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
    
      
        
          
            Trusted by Veterans, Backed by Research
          
          
            The support you deserve, built with the expertise you can trust
          
        
{/* The below code has a compilation error. Removing the extra </div> to make code runnable. */}
        <section className="py-8 bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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