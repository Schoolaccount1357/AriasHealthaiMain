
import { CheckCircle, Users, Shield, Heart } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Join Anonymously",
      description: "Sign up with just an email - no personal information required",
      icon: <Shield className="h-8 w-8 text-[#4a6b45]" />
    },
    {
      step: 2,
      title: "Connect with Peers",
      description: "Match with veterans who share similar experiences and challenges",
      icon: <Users className="h-8 w-8 text-[#4a6b45]" />
    },
    {
      step: 3,
      title: "Build Support Network",
      description: "Engage in moderated group discussions and one-on-one peer support",
      icon: <Heart className="h-8 w-8 text-[#4a6b45]" />
    },
    {
      step: 4,
      title: "Track Progress",
      description: "See your growth through AI-powered insights and peer feedback",
      icon: <CheckCircle className="h-8 w-8 text-[#4a6b45]" />
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How Willow Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, secure, and designed specifically for veterans seeking peer support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
              )}
              
              <div className="relative z-10 bg-white rounded-lg p-6 shadow-lg border-t-4 border-[#4a6b45]">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-semibold text-[#4a6b45]">STEP {step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-[#4a6b45] text-white px-6 py-3 rounded-lg inline-block">
            <p className="font-semibold">Privacy First • Veteran Focused • Always Free</p>
          </div>
        </div>
      </div>
    </section>
  );
}
