import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mb-12">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mental Health, Reimagined for Veterans
            </h1>
            <p className="text-accent mb-6">
              AI-powered, peer-driven support to help Veterans feel seen, heard, and connected, with a special focus on substance use recovery.
            </p>
            <Button 
              asChild
              className="bg-white text-primary hover:bg-neutral-100 transition-colors"
              size="lg"
            >
              <Link href="#enrollment-form">
                Join the Waitlist
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 bg-secondary">
            <img 
              src="https://images.unsplash.com/photo-1609270460988-54ad6427f899?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Modern day veterans" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
