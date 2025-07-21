import { Brain, ShieldCheck, Users, Activity } from "lucide-react";

export function KeyFeatures() {
  const features = [
    {
      title: "AI-Driven Peer Matching",
      description: "Our algorithms connect you with peers who share similar experiences, fostering meaningful relationships.",
      icon: <Brain className="h-10 w-10 text-[#10066A]" />
    },
    {
      title: "Predictive Relapse Detection",
      description: "Advanced AI helps identify early warning signs before they become serious problems.",
      icon: <Activity className="h-10 w-10 text-[#10066A]" />
    },
    {
      title: "Real-Time Peer Support Tools",
      description: "Connect through secure video, chat, and messaging when you need support most.",
      icon: <Users className="h-10 w-10 text-[#10066A]" />
    },
    {
      title: "Privacy First - HIPAA Compliant",
      description: "Enterprise-grade security keeps your information protected and confidential.",
      icon: <ShieldCheck className="h-10 w-10 text-[#10066A]" />
    }
  ];

  return (
    <section className="mb-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="relative backdrop-blur-lg bg-white/20 border border-white/30 p-6 rounded-xl flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:bg-white/25"
          >
            <div className="bg-[#3e64dd]/80 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 border border-white/30">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#10066A]">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}