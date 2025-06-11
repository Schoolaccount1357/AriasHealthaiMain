import { ProgramStep } from "@/utils/types";

export function ProgramOverview() {
  const programSteps: ProgramStep[] = [
    {
      id: 1,
      title: "Complete Waitlist Form",
      description: "Fill out the simple form below with your basic information to reserve your spot for early access."
    },
    {
      id: 2,
      title: "Receive Confirmation",
      description: "You'll receive an email confirmation and updates about our launch. We'll notify you when the platform becomes available."
    },
    {
      id: 3,
      title: "Get Early Access",
      description: "Waitlist members will be the first to experience our AI-powered matching and veteran support community."
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">How to Sign Up</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {programSteps.map((step) => (
          <div key={step.id} className="glass-card p-6 rounded-lg">
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
