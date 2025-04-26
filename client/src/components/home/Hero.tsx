import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mb-12">
      <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Connected. Stay Strong.
            </h1>
            <p className="text-accent mb-6 text-lg">
              A new kind of support for veterans and civilians in recovery.
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
              src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Veterans supporting each other" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Emotional Banner */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg text-center text-white">
        <p className="text-xl font-medium">Combat loneliness. Prevent relapse. Build your community.</p>
      </div>
      
      {/* How It Works - Visual Diagram */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Match</h3>
            <p className="text-gray-600">Find peers who understand you.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-indigo-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Detect</h3>
            <p className="text-gray-600">Spot early warning signs.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p className="text-gray-600">Get real-time encouragement before crisis.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
