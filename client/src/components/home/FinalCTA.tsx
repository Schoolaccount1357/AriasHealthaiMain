import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Globe } from "lucide-react";
import { useResourceTracking } from "@/hooks/use-resource-tracking";

export function FinalCTA() {
  const { trackResourceClick } = useResourceTracking();
  
  return (
    <section className="mb-16 bg-[#141e2f] text-white p-10 rounded-lg">
      <div className="max-w-3xl mx-auto">
        {/* Crisis Resources Section */}
        <div className="mb-8 pb-6 border-b border-white/20">
          <div className="flex items-center justify-center mb-4">
            <Phone className="h-6 w-6 mr-3 text-[#3e64dd]" />
            <h3 className="text-lg font-semibold">Need immediate help?</h3>
          </div>
          <p className="text-center text-sm text-white/90 mb-4">
            If you're in crisis or having thoughts of suicide, speak with a trained counselor now.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
              className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300"
              size="sm"
            >
              <Phone className="h-3 w-3 mr-1" />
              Call 988 - Press 1
            </Button>
            <Button 
              onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
              className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300"
              size="sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Text 838255
            </Button>
            <Button 
              onClick={() => trackResourceClick("chat", () => window.open("https://www.veteranscrisisline.net/get-help/chat", "_blank"))}
              className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300"
              size="sm"
            >
              <Globe className="h-3 w-3 mr-1" />
              Chat Online
            </Button>
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="text-center">
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
          
          <div className="mt-8 pt-4 border-t border-white/20">
            <p className="text-sm text-white/70">
              AriasHealth.ai was incubated at Harvard University and MIT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}