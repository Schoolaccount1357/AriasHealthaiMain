import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="mb-16 bg-[#141e2f] text-white p-10 rounded-lg text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          You don't have to do this alone. Find your people. Stay connected.
        </h2>
        
        <Button 
          asChild
          className="bg-[#3e64dd] text-white hover:bg-[#2a4bba] transition-colors"
          size="lg"
        >
          <Link href="#enrollment-form">
            Join the Waitlist
          </Link>
        </Button>
      </div>
    </section>
  );
}