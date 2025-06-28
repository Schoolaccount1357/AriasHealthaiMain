import { 
  Heart, 
  Users, 
  Shield,
  Brain,
  UserCog,
  BookOpen,
  PenTool,
  MapPin,
  MessageCircle,
  Activity,
  BarChart3,
  Lock,
  HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PlatformPreview() {
  const supportFeatures = [
    {
      name: "Behavioral Signal Recognition",
      description: "Gently gauges conversational tone to identify when users could use a helping hand",
      type: "recognition"
    },
    {
      name: "Real-Time Peer Support",
      description: "Peer-to-Peer moderated chat connections with fellow veterans",
      type: "chat"
    },
    {
      name: "Intelligent Predictive Analytics",
      description: "Uses smart insights to gently guide users toward support when it matters most",
      type: "analytics"
    },
    {
      name: "Data Privacy & Security",
      description: "Lets you and your peers share freely, with privacy taken care of behind the scenes",
      type: "security"
    },
    {
      name: "Guided Moderation & Intervention",
      description: "Offers caring human support, stepping in when it really matters",
      type: "moderation"
    },
    {
      name: "Extended Care Continuity",
      description: "Helps you stay connected to support, even between your care appointments",
      type: "continuity"
    }
  ];

  return (
    <section className="mb-12 mt-6">
      <h3 className="text-xl font-semibold mb-4">Willow Platform Features</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mental Health Support Resources */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-primary" />
            Willow Platform Features
          </h3>
          <div className="bg-muted rounded-lg p-4 border border-border mb-4">
            <div className="space-y-4">
              {supportFeatures.map((feature, index) => (
                <div key={index} className="flex items-center p-3 bg-white rounded shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-medium text-sm mr-3">
                    {feature.type === 'recognition' ? <Activity className="h-4 w-4" /> :
                     feature.type === 'chat' ? <MessageCircle className="h-4 w-4" /> :
                     feature.type === 'analytics' ? <BarChart3 className="h-4 w-4" /> :
                     feature.type === 'security' ? <Lock className="h-4 w-4" /> :
                     feature.type === 'moderation' ? <Users className="h-4 w-4" /> :
                     <HeartHandshake className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{feature.name}</h4>
                    </div>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-foreground">
            Comprehensive tools designed to support your mental wellness journey with habit tracking, mindfulness reminders, and personal reflection.
          </p>
        </div>
        
        {/* Privacy-First Approach */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Privacy-First Mental Health Support
          </h3>
          <div className="bg-muted rounded-lg p-4 border border-border mb-4">
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2 flex items-center">
                <UserCog className="h-4 w-4 mr-2 text-primary" />
                Privacy-First Access
              </h4>
              <p className="text-sm text-muted-foreground">Connect and explore support without providing personal information or login credentials</p>
            </div>
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-primary" />
                Trauma-Informed Design
              </h4>
              <p className="text-sm text-muted-foreground">Built around deep insights into military experiences and veteran mental health needs</p>
            </div>
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-primary" />
                Curated Veteran Resources
              </h4>
              <p className="text-sm text-muted-foreground">Offers vetted tools and referrals from leading veteran-focused organizations</p>
            </div>
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                Community-Led Insight
              </h4>
              <p className="text-sm text-muted-foreground">Shaped by lived service and family perspectives within the veteran community</p>
            </div>
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2 flex items-center">
                <HeartHandshake className="h-4 w-4 mr-2 text-primary" />
                Guided Oversight
              </h4>
              <p className="text-sm text-muted-foreground">Conversations are supported by experienced peers and military caregivers when needed</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-primary" />
                Inclusive Anonymity
              </h4>
              <p className="text-sm text-muted-foreground">Empowers honest sharing without revealing identity, fostering open peer connections</p>
            </div>
          </div>
          <p className="text-foreground">
            Built to support the well-being of veterans, informed by their lived experiences.
          </p>
        </div>
      </div>
    </section>
  );
}