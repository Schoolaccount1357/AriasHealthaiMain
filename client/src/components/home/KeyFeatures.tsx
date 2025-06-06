import { Brain, ShieldCheck, Users, Activity } from "lucide-react";

export function KeyFeatures() {
  const features = [
    {
      title: "AI-Driven Peer Matching",
      description: "Our algorithms connect you with peers who share similar experiences, fostering meaningful relationships.",
      icon: <Brain className="h-10 w-10 text-primary" />
    },
    {
      title: "Predictive Relapse Detection",
      description: "Advanced AI helps identify early warning signs before they become serious problems.",
      icon: <Activity className="h-10 w-10 text-primary" />
    },
    {
      title: "Real-Time Peer Support Tools",
      description: "Connect through secure video, chat, and messaging when you need support most.",
      icon: <Users className="h-10 w-10 text-primary" />
    },
    {
      title: "Privacy First - HIPAA Compliant",
      description: "Enterprise-grade security keeps your information protected and confidential.",
      icon: <ShieldCheck className="h-10 w-10 text-primary" />
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Key Features</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-card p-6 rounded-lg shadow-md border-t-4 border-primary flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}