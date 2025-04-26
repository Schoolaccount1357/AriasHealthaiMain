import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Globe, 
  BookOpen, 
  PanelLeftOpen, 
  HeartHandshake, 
  Building2, 
  Activity 
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";

interface Resource {
  name: string;
  description: string;
  website: string;
  phone?: string;
  chat?: boolean;
  text?: string | boolean;
}

interface ResourceCategory {
  title: string;
  icon: JSX.Element;
  resources: Resource[];
}

export default function Resources() {
  const resourceCategories = [
    {
      title: "Crisis Support",
      icon: <Phone className="h-6 w-6 text-[#3e64dd]" />,
      resources: [
        {
          name: "Veterans Crisis Line",
          description: "24/7 confidential crisis support for veterans and their loved ones",
          phone: "1-800-273-8255 and Press 1",
          website: "https://www.veteranscrisisline.net",
          chat: true,
          text: "Text 838255"
        },
        {
          name: "SAMHSA National Helpline",
          description: "Treatment referral and information service for individuals facing mental health or substance use disorders",
          phone: "1-800-662-4357",
          website: "https://www.samhsa.gov/find-help/national-helpline",
          chat: false,
          text: false
        }
      ]
    },
    {
      title: "Substance Use Treatment",
      icon: <Activity className="h-6 w-6 text-[#3e64dd]" />,
      resources: [
        {
          name: "VA Substance Use Disorder Program",
          description: "Treatment and support for Veterans with substance use issues",
          phone: "1-800-827-1000",
          website: "https://www.va.gov/health/substance-use-disorder/",
          chat: false
        },
        {
          name: "SMART Recovery",
          description: "Self-Management And Recovery Training - alternative to 12-step programs",
          website: "https://www.smartrecovery.org/",
          chat: true
        }
      ]
    },
    {
      title: "Peer Support Groups",
      icon: <HeartHandshake className="h-6 w-6 text-[#3e64dd]" />,
      resources: [
        {
          name: "Wounded Warrior Project",
          description: "Programs and services to meet needs of wounded veterans",
          phone: "1-888-997-2586",
          website: "https://www.woundedwarriorproject.org"
        },
        {
          name: "Make the Connection",
          description: "Veterans sharing real stories of strength and recovery",
          website: "https://www.maketheconnection.net"
        }
      ]
    },
    {
      title: "VA Programs & Benefits",
      icon: <Building2 className="h-6 w-6 text-[#3e64dd]" />,
      resources: [
        {
          name: "VA Health Care",
          description: "Health care services for eligible Veterans",
          phone: "1-877-222-8387",
          website: "https://www.va.gov/health/"
        },
        {
          name: "Mental Health Services",
          description: "Mental health services offered through VA",
          website: "https://www.mentalhealth.va.gov"
        }
      ]
    },
    {
      title: "Educational Resources",
      icon: <BookOpen className="h-6 w-6 text-[#3e64dd]" />,
      resources: [
        {
          name: "PTSD: National Center for PTSD",
          description: "Information about PTSD and treatments",
          website: "https://www.ptsd.va.gov"
        },
        {
          name: "National Institute on Drug Abuse",
          description: "Science-based information on drug use and addiction",
          website: "https://www.drugabuse.gov"
        }
      ]
    },
    {
      title: "Online Communities",
      icon: <Globe className="h-6 w-6 text-[#3e64dd]" />,
      resources: [
        {
          name: "Rally Point",
          description: "Social network connecting service members, veterans and their families",
          website: "https://www.rallypoint.com"
        },
        {
          name: "Veterans Peer Connection",
          description: "Online peer support community for veterans",
          website: "https://www.veteranspeersupport.org"
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Veteran Support Resources"
        description="We've compiled trusted resources to support your journey. If you're in crisis, please call the Veterans Crisis Line at 1-800-273-8255 and Press 1."
      />

      <div className="mb-10 bg-[#141e2f] text-white p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <PanelLeftOpen className="h-8 w-8 mr-3 text-[#3e64dd]" />
          <h2 className="text-2xl font-semibold">Need immediate help?</h2>
        </div>
        <p className="mb-5">
          If you're in crisis or having thoughts of suicide, speak with a trained counselor now.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-[#3e64dd] hover:bg-[#2a4bba]"
            size="lg"
          >
            Call 988 - Press 1
          </Button>
          <Button 
            className="bg-[#3e64dd] hover:bg-[#2a4bba]"
            size="lg"
          >
            Text 838255
          </Button>
          <Button 
            className="bg-[#3e64dd] hover:bg-[#2a4bba]"
            size="lg"
          >
            Chat Online
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resourceCategories.map((category, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                {category.icon}
                <CardTitle>{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {category.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className="border-b pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold mb-1">{resource.name}</h3>
                  <CardDescription className="mb-2">{resource.description}</CardDescription>
                  <div className="text-sm space-y-1">
                    {resource.phone && (
                      <p>📞 {resource.phone}</p>
                    )}
                    {'text' in resource && resource.text && (
                      <p>✉️ {typeof resource.text === 'string' ? resource.text : 'Text Available'}</p>
                    )}
                  </div>
                  <Button 
                    asChild 
                    variant="link" 
                    className="p-0 h-auto text-[#3e64dd]"
                  >
                    <a href={resource.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                asChild 
                variant="outline" 
                className="w-full"
              >
                <Link href="/resource-locator">
                  Find local resources
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Disclaimer: This list is not exhaustive. Resources are provided for informational purposes only.
        </p>
        <Button 
          asChild 
          className="bg-[#3e64dd] hover:bg-[#2a4bba]"
        >
          <Link href="/resource-locator">
            Find Resources in Your State
          </Link>
        </Button>
      </div>
    </MainLayout>
  );
}