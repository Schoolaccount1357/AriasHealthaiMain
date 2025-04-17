import { PeerMatch } from "@/utils/types";
import { 
  PlayCircle, 
  Users, 
  Volume2, 
  Mic, 
  X, 
  Video,
  Brain,
  Shield,
  UserCog
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
      matchPercentage: 92,
      matchFactors: ["Combat Experience", "PTSD Management", "Peer Support"]
    },
    {
      id: 2,
      name: "Maria S.",
      initial: "MS",
      branch: "Navy Veteran",
      matchPercentage: 87,
      matchFactors: ["Medical Background", "Depression Recovery", "Family Support"]
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Mental Health, Reimagined for Veterans</h2>
      
      <p className="mb-6 text-muted-foreground">
        AriasHealth.ai leverages cutting-edge artificial intelligence to create a personalized mental health experience built specifically for veterans. Our platform provides peer-to-peer connection with those who truly understand your experiences.
      </p>
      
      <h3 className="text-xl font-semibold mb-4">Platform Features</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Peer Support Video Platform */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <PlayCircle className="h-5 w-5 mr-2 text-primary" />
            AI-Powered Peer Matching
          </h3>
          <div className="bg-muted rounded-lg p-4 border border-border mb-4">
            <div className="space-y-4">
              {peerMatches.map(peer => (
                <div key={peer.id} className="flex items-center p-3 bg-white rounded shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm mr-3">
                    {peer.initial}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{peer.name}</h4>
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
                        {peer.matchPercentage}% Match
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{peer.branch}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {peer.matchFactors.map((factor, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-foreground">
            Our proprietary matching algorithm connects you with peers who share similar military experiences and mental health journeys, creating meaningful connections.
          </p>
        </div>
        
        {/* AI-Powered Features */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            Personalized Mental Health Support
          </h3>
          <div className="bg-muted rounded-lg p-4 border border-border mb-4">
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2 flex items-center">
                <UserCog className="h-4 w-4 mr-2 text-primary" />
                Tailored Therapeutic Approach
              </h4>
              <p className="text-sm text-muted-foreground">Our AI analyzes communication patterns to identify emotional states and recommend personalized coping strategies.</p>
            </div>
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                Secure Group Support Sessions
              </h4>
              <p className="text-sm text-muted-foreground">Join moderated group sessions with other veterans who understand your unique challenges and experiences.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-primary" />
                Military-Specific Privacy Controls
              </h4>
              <p className="text-sm text-muted-foreground">Our platform is built with military-grade security to ensure your mental health journey remains private and protected.</p>
            </div>
          </div>
          <p className="text-foreground">
            AriasHealth.ai combines advanced technology with human connection, creating a comprehensive mental health support system designed specifically for veterans.
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-4">Coming soon - join our waitlist to be the first to experience the future of veteran mental health support</p>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800">
          Join the Waitlist
        </Button>
      </div>
    </section>
  );
}
