import { ProgramStep } from "@/utils/types";

export function ProgramOverview() {
  const programSteps: ProgramStep[] = [
    {
      id: 1,
      title: "Join the Waitlist",
      description: "Sign up to be among the first to access AriasHealth.ai when we launch. No commitment required."
    },
    {
      id: 2,
      title: "Built For Veterans",
      description: "Our platform is designed specifically for veterans transitioning out of service, recovering from trauma, or seeking supportive community."
    },
    {
      id: 3,
      title: "Privacy Commitment",
      description: "Your data is protected with enterprise-grade security and HIPAA-compliant practices. Your privacy is our priority."
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">How to Sign Up</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {programSteps.map((step) => (
          <div key={step.id} className="bg-white p-6 rounded-lg shadow">
            <div className="rounded-full bg-accent w-12 h-12 flex items-center justify-center mb-4">
              <span className="text-white font-bold">{step.id}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
