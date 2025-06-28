import { 
  Heart, 
  Users, 
  Shield,
  Brain,
  UserCog,
  BookOpen,
  PenTool,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PlatformPreview() {
  const supportFeatures = [
    {
      name: "Mindfulness Habit Tracker",
      description: "Track your daily mindfulness practices and build healthy habits",
      type: "tracker"
    },
    {
      name: "Coping Skill Reminders",
      description: "Personalized reminders for coping strategies and techniques",
      type: "reminders"
    },
    {
      name: "Relapse Triggers",
      description: "Identify and track personal triggers for better awareness",
      type: "triggers"
    },
    {
      name: "Willow Diary",
      description: "Private journal for thoughts, progress, and reflections",
      type: "diary"
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
                    {feature.type === 'tracker' ? <Heart className="h-4 w-4" /> : 
                     feature.type === 'reminders' ? <Brain className="h-4 w-4" /> : 
                     feature.type === 'triggers' ? <Shield className="h-4 w-4" /> :
                     <PenTool className="h-4 w-4" />}
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
                Anonymous Access
              </h4>
              <p className="text-sm text-muted-foreground">Access resources and support without requiring personal identification or login credentials.</p>
            </div>
            <div className="mb-4 border-b pb-3">
              <h4 className="font-medium mb-2 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-primary" />
                Trauma-Informed Design
              </h4>
              <p className="text-sm text-muted-foreground">Interface designed with understanding of military trauma and veteran-specific mental health needs.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                Veteran-Focused Resources
              </h4>
              <p className="text-sm text-muted-foreground">Curated resources from trusted organizations like VA, SAMHSA, and established veteran support nonprofits.</p>
            </div>
          </div>
          <p className="text-foreground">
            Built by veterans, for veterans, with deep understanding of military culture and mental health challenges.
          </p>
        </div>
      </div>
    </section>
  );
}