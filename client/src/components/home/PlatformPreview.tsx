import { PeerMatch } from "@/utils/types";
import { 
  PlayCircle, 
  Users, 
  Volume2, 
  Mic, 
  X, 
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PlatformPreview() {
  const peerMatches: PeerMatch[] = [
    {
      id: 1,
      name: "John D.",
      initial: "JD",
      branch: "Army Veteran",
      matchPercentage: 85,
      matchFactors: ["Post-Deployment", "Early Recovery", "Family Focus"]
    },
    {
      id: 2,
      name: "Maria S.",
      initial: "MS",
      branch: "Navy Veteran",
      matchPercentage: 79,
      matchFactors: ["Medical Background", "3+ Years Recovery", "Mentor"]
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Our Solution</h2>
      
      <p className="mb-6 text-muted-foreground">
        AriasHealth.ai uses AI to create safer spaces for real-time peer connection, anonymous reflection, and proactive support. No waitlists. No judgment.
      </p>
      
      <h3 className="text-xl font-semibold mb-4">Key Features</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Event-Based Group Video Support */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <PlayCircle className="h-5 w-5 mr-2 text-primary" />
            Event-Based Group Video Support
          </h3>
          <div className="bg-muted rounded-lg p-4 border border-border mb-4">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1499540633125-484965b60031?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80" 
                alt="Video chat interface with diverse veterans" 
                className="rounded-lg object-cover w-full h-48" 
              />
            </div>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="default" 
                size="icon" 
                className="bg-primary text-white rounded-full h-10 w-10"
              >
                <Volume2 className="h-5 w-5" />
              </Button>
              <Button 
                variant="default" 
                size="icon" 
                className="bg-primary text-white rounded-full h-10 w-10"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                className="rounded-full h-10 w-10"
              >
                <X className="h-5 w-5" />
              </Button>
              <Button 
                variant="default" 
                size="icon" 
                className="bg-primary text-white rounded-full h-10 w-10"
              >
                <Video className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p className="text-foreground">
            Connect face-to-face with peers in secure, HIPAA-compliant video sessions designed specifically for veterans dealing with substance use recovery.
          </p>
        </div>
        
        {/* AI-Powered Features */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            AI-Powered Support Systems
          </h3>
          <div className="bg-muted rounded-lg p-4 border border-border mb-4">
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2">Behavioral Pattern Recognition</h4>
              <p className="text-sm text-muted-foreground">AI technology identifies patterns in your interactions and provides personalized support recommendations.</p>
            </div>
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2">AI Moderation for Safer Conversations</h4>
              <p className="text-sm text-muted-foreground">Our platform ensures all interactions remain supportive and constructive with real-time AI moderation.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Anonymous Journaling & Reflection</h4>
              <p className="text-sm text-muted-foreground">Express yourself honestly with private journaling tools that provide insights and track your progress.</p>
            </div>
          </div>
          <p className="text-foreground">
            AriasHealth.ai combines advanced technology with human connection, creating a comprehensive support system for veterans in recovery.
          </p>
        </div>
      </div>
    </section>
  );
}
