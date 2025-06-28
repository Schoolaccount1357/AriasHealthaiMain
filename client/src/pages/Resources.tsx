import { Link } from "wouter";
import { useState, useEffect } from "react";
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
import { CrisisResources } from "@/components/common/CrisisResources";
import { useResourceTracking } from "@/hooks/use-resource-tracking";

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
  const { trackResourceClick } = useResourceTracking();
  // Removed floating help button state and scroll listener
  
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
          name: "Veterans Crisis Line (Overseas)",
          description: "For veterans located outside the United States",
          phone: "001-800-273-8255 or DSN 118*",
          website: "https://www.veteranscrisisline.net/get-help/military-crisis-line",
          chat: true,
          text: "Text to 838255"
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
          website: "https://www.va.gov/health-care/health-needs-conditions/substance-use-problems/",
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
    },
    {
      title: "International Resources",
      icon: <Globe className="h-6 w-6 text-[#3e64dd]" />,
      resources: [
        {
          name: "Foreign Medical Program (FMP)",
          description: "VA program that provides healthcare benefits to veterans with service-connected conditions living or traveling abroad",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          phone: "1-877-345-8179"
        },
        {
          name: "Veterans Crisis Line (International)",
          description: "Support for veterans in crisis available worldwide",
          website: "https://www.veteranscrisisline.net/get-help/military-crisis-line",
          phone: "001-800-273-8255",
          text: "Text to 838255"
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
        <p className="mb-3">
          If you're in crisis or having thoughts of suicide, speak with a trained counselor now.
        </p>
        <div className="mb-5">
          <div className="bg-[#1b2c45] p-4 rounded-md mb-3">
            <h3 className="font-semibold text-lg mb-2">In the United States</h3>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:988")}
                className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10 flex items-center">
                  <Phone className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Call 988 - Press 1
                </span>
              </Button>
              <Button 
                onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Text 838255
                </span>
              </Button>
            </div>
          </div>
          
          <div className="bg-[#1b2c45] p-4 rounded-md">
            <h3 className="font-semibold text-lg mb-2">International</h3>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => trackResourceClick("call", () => window.location.href = "tel:0018002738255")}
                className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10 flex items-center">
                  <Phone className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Call 001-800-273-8255
                </span>
              </Button>
              <Button 
                onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
                size="lg"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Text to 838255
                </span>
              </Button>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => trackResourceClick("chat", () => window.open("https://www.my.vavet.sites.va.gov/vclchat", "_blank"))}
          className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98] w-full"
          size="lg"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
          <span className="relative z-10 flex items-center">
            <Globe className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
            Chat Online (Available Worldwide)
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resourceCategories.filter(category => category.title !== "International Resources").map((category, index) => (
          <Card key={index} className="glass-card hover:shadow-lg transition-shadow">
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
                      <p>
                        📞{' '}
                        <button 
                          onClick={() => {
                            const phoneNumber = resource.phone?.split(' ')[0].replace(/-/g, '');
                            trackResourceClick("call", () => window.location.href = `tel:${phoneNumber}`);
                          }}
                          className="text-[#3e64dd] hover:underline focus:outline-none"
                        >
                          {resource.phone}
                        </button>
                      </p>
                    )}
                    {'text' in resource && resource.text && (
                      <p>
                        ✉️{' '}
                        {typeof resource.text === 'string' ? (
                          <button 
                            onClick={() => {
                              const textNumber = resource.text?.toString().split(' ')[1] || "838255";
                              trackResourceClick("text", () => window.location.href = `sms:${textNumber}`);
                            }}
                            className="text-[#3e64dd] hover:underline focus:outline-none"
                          >
                            {resource.text}
                          </button>
                        ) : 'Text Available'}
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-[#3e64dd] group relative overflow-hidden"
                    onClick={() => {
                      // Track resource usage with a generic "website" type
                      trackResourceClick("website", () => window.open(resource.website, "_blank", "noopener,noreferrer"));
                    }}
                  >
                    <span className="inline-flex items-center">
                      <span className="relative z-10 inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                        Visit Website
                        <Globe className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3e64dd]/40 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </span>
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                asChild 
                variant="outline" 
                className="w-full group transition-all duration-300 relative overflow-hidden hover:border-[#3e64dd] hover:text-[#3e64dd]"
              >
                <Link href="/resource-locator" className="flex items-center justify-center">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#3e64dd]/0 via-[#3e64dd]/10 to-[#3e64dd]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    Find local resources
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* International Resources section - moved to bottom */}
      {resourceCategories.find(category => category.title === "International Resources") && (
        <div className="mt-16 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-[#3e64dd] to-[#10066A] bg-clip-text text-transparent">
              International Resources
            </span>
          </h2>
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-[#3e64dd]">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-[#3e64dd]" />
                <CardTitle>Support for Veterans Worldwide</CardTitle>
              </div>
              <CardDescription className="text-base mt-2">
                Resources and support services available for veterans living outside the United States
              </CardDescription>
            </CardHeader>
            <CardContent>
            {/* FMP Detailed Section */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-[#003366] flex items-center gap-2">
                <Globe className="h-6 w-6 text-[#3e64dd]" />
                Foreign Medical Program (FMP)
              </h3>
              <p className="mb-4">
                The FMP is a U.S. Department of Veterans Affairs program that provides healthcare benefits 
                for eligible veterans with service-connected conditions living or traveling abroad.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="font-bold mr-2">📞 U.S. Toll-Free:</span>
                  <button 
                    onClick={() => trackResourceClick("call", () => window.location.href = "tel:18773458179")}
                    className="text-[#3e64dd] hover:underline"
                  >
                    1-877-345-8179
                  </button>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">📞 International:</span>
                  <button 
                    onClick={() => trackResourceClick("call", () => window.location.href = "tel:+13033317590")}
                    className="text-[#3e64dd] hover:underline"
                  >
                    +1-303-331-7590
                  </button>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">📧 Email:</span>
                  <a 
                    href="mailto:vhacofmp@va.gov" 
                    className="text-[#3e64dd] hover:underline"
                    onClick={() => trackResourceClick("website", () => {})}
                  >
                    vhacofmp@va.gov
                  </a>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">📄 Enrollment Form:</span>
                  <a 
                    href="https://www.va.gov/vaforms/medical/pdf/VA%20Form%2010-7959f-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3e64dd] hover:underline"
                    onClick={() => trackResourceClick("website", () => {})}
                  >
                    VA Form 10-7959f-1 (PDF)
                  </a>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">🌐 Official Website:</span>
                  <a 
                    href="https://www.va.gov/health-care/foreign-medical-program/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3e64dd] hover:underline"
                    onClick={() => trackResourceClick("website", () => {})}
                  >
                    Visit FMP Site
                  </a>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-bold text-gray-700 mb-2">📬 Mailing Address:</h4>
                <p className="text-gray-600">
                  Foreign Medical Program<br />
                  VHA Office of Community Care<br />
                  PO Box 469061<br />
                  Denver, CO 80246-9061, USA
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Display only Veterans Crisis Line (International) */}
              <div className="border rounded-md p-4 hover:shadow-md transition-shadow bg-white/50 mt-6">
                <h3 className="font-semibold mb-1">Veterans Crisis Line (International)</h3>
                <CardDescription className="mb-2">Support for veterans in crisis available worldwide</CardDescription>
                <div className="text-sm space-y-1">
                  <p>
                    📞{' '}
                    <button 
                      onClick={() => trackResourceClick("call", () => window.location.href = "tel:0018002738255")}
                      className="text-[#3e64dd] hover:underline focus:outline-none"
                    >
                      001-800-273-8255
                    </button>
                  </p>
                  <p>
                    ✉️{' '}
                    <button 
                      onClick={() => trackResourceClick("text", () => window.location.href = "sms:838255")}
                      className="text-[#3e64dd] hover:underline focus:outline-none"
                    >
                      Text to 838255
                    </button>
                  </p>
                </div>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-[#3e64dd] group relative overflow-hidden mt-2"
                  onClick={() => trackResourceClick("website", () => window.open("https://www.veteranscrisisline.net/get-help/military-crisis-line", "_blank", "noopener,noreferrer"))}
                >
                  <span className="inline-flex items-center">
                    <span className="relative z-10 inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                      Visit Website
                      <Globe className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3e64dd]/40 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Button>
              </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                asChild 
                variant="outline" 
                className="w-full group transition-all duration-300 relative overflow-hidden hover:border-[#3e64dd] hover:text-[#3e64dd]"
              >
                <Link href="/resource-locator" className="flex items-center justify-center">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#3e64dd]/0 via-[#3e64dd]/10 to-[#3e64dd]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                  <span className="relative z-10 flex items-center justify-center">
                    Find Country-Specific Resources
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Disclaimer: This list is not exhaustive. Resources are provided for informational purposes only.
        </p>
        <Button 
          asChild 
          className="bg-[#3e64dd] hover:bg-[#2a4bba] transition-all duration-300 relative overflow-hidden group shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          <Link href="/resource-locator" className="flex items-center justify-center">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10 flex items-center justify-center">
              Find Resources in Your State and Country
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </Button>
      </div>
      
      {/* Floating help button removed as requested */}
    </MainLayout>
  );
}