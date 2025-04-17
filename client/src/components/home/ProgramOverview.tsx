import { ProgramStep } from "@/utils/types";

export function ProgramOverview() {
  const programSteps: ProgramStep[] = [
    {
      id: 1,
      title: "Complete the Pre-Enrollment Form",
      description: "Fill out our secure questionnaire to help us understand your background and needs."
    },
    {
      id: 2,
      title: "AI-Powered Peer Pairing",
      description: "AriasHealth.ai's advanced NLP algorithms match you with peers who share similar military experiences and substance use recovery paths."
    },
    {
      id: 3,
      title: "Connect Through Video & Chat",
      description: "Join secure group sessions or one-on-one conversations in our private platform designed for veterans."
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">How AriasHealth.ai Works</h2>
      
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
