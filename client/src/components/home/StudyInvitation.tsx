import { Button } from "@/components/ui/button";

export function StudyInvitation() {
  return (
    <section className="mb-12 bg-gradient-to-r from-[#141e2f] to-[#2a4bba] p-8 rounded-lg text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3">Help Build a Future Without Isolation.</h2>
        
        <p className="text-lg mb-6">
          We're conducting a research study for veterans and civilians overcoming substance use. 
          Your voice matters.
        </p>
        
        <Button 
          className="bg-white text-[#141e2f] hover:bg-gray-100"
          size="lg"
        >
          Learn More About the Study
        </Button>
      </div>
    </section>
  );
}