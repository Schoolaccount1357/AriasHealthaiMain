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
      <h2 className="text-2xl font-bold mb-6 text-foreground">Platform Preview</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Video Chat Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <PlayCircle className="h-5 w-5 mr-2 text-primary" />
            Secure Video Chat
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
            Connect face-to-face with peers in a secure, HIPAA-compliant video environment designed specifically for veterans.
          </p>
        </div>
        
        {/* AI Matching Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            AI-Powered Matching
          </h3>
          <div className="bg-muted rounded-lg p-4 border border-border mb-4">
            {peerMatches.map((peer, index) => (
              <div key={peer.id} className={index > 0 ? "mt-4" : ""}>
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium mr-3">
                    {peer.initial}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{peer.name}</div>
                    <div className="text-xs text-muted-foreground">{peer.branch} • {peer.matchPercentage}% Match</div>
                  </div>
                  <Button variant="default" size="sm" className="text-sm">
                    Connect
                  </Button>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium mb-1">Matching Factors:</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {peer.matchFactors.map((factor, idx) => (
                      <Badge key={idx} variant="outline" className="bg-accent/20 text-secondary border-0 text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-foreground">
            Our proprietary matching algorithm connects you with peers who understand your specific experiences and recovery needs.
          </p>
        </div>
      </div>
    </section>
  );
}
