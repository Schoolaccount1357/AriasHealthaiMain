import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Building, Shield } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/ui/PageHeader";

interface StateResource {
  name: string;
  description: string;
  address?: string;
  phone?: string;
  website: string;
  category: "VA" | "Crisis" | "Treatment" | "Housing" | "Employment";
}

interface StateData {
  [state: string]: {
    resources: StateResource[];
  };
}

export default function ResourceLocator() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [searchRadius, setSearchRadius] = useState<string>("25");
  const [category, setCategory] = useState<string>("all");

  // Sample state data - in a real application, this would come from an API
  const stateData: StateData = {
    "California": {
      resources: [
        {
          name: "VA Palo Alto Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "3801 Miranda Ave, Palo Alto, CA 94304",
          phone: "(650) 493-5000",
          website: "https://www.paloalto.va.gov/",
          category: "VA"
        },
        {
          name: "Veterans Village of San Diego",
          description: "Substance use recovery and housing for Veterans",
          address: "4141 Pacific Highway, San Diego, CA 92110",
          phone: "(619) 393-2000",
          website: "https://vvsd.net/",
          category: "Treatment"
        },
        {
          name: "Swords to Plowshares",
          description: "Veteran services organization that provides wrap-around care",
          address: "1060 Howard Street, San Francisco, CA 94103",
          phone: "(415) 252-4788",
          website: "https://www.swords-to-plowshares.org/",
          category: "Employment"
        }
      ]
    },
    "Texas": {
      resources: [
        {
          name: "Michael E. DeBakey VA Medical Center",
          description: "Comprehensive healthcare for Veterans",
          address: "2002 Holcombe Blvd, Houston, TX 77030",
          phone: "(713) 791-1414",
          website: "https://www.houston.va.gov/",
          category: "VA"
        },
        {
          name: "Endeavors - San Antonio",
          description: "Veteran Wellness Center offering mental health services",
          address: "6363 De Zavala Rd, San Antonio, TX 78249",
          phone: "(210) 431-6466",
          website: "https://endeavors.org/",
          category: "Treatment"
        },
        {
          name: "Austin Veterans One Stop Resource Center",
          description: "Multiple resources and services for veterans in one location",
          address: "1921 Cedar Bend Dr #A-110, Austin, TX 78758",
          phone: "(512) 469-9366",
          website: "https://www.austinvets.org/",
          category: "Employment"
        }
      ]
    },
    "Florida": {
      resources: [
        {
          name: "James A. Haley Veterans' Hospital",
          description: "Comprehensive healthcare services for Veterans",
          address: "13000 Bruce B. Downs Blvd, Tampa, FL 33612",
          phone: "(813) 972-2000",
          website: "https://www.tampa.va.gov/",
          category: "VA"
        },
        {
          name: "Veterans Recovery Resources",
          description: "Substance use and mental health treatment for Veterans",
          address: "1156 Springhill Ave, Mobile, FL 36604",
          phone: "(866) 648-7334",
          website: "https://veteransrecoveryresources.org/",
          category: "Treatment"
        },
        {
          name: "Crisis Center of Tampa Bay",
          description: "Crisis support services",
          phone: "(813) 964-1964",
          website: "https://www.crisiscenter.com/",
          category: "Crisis"
        }
      ]
    },
    "New York": {
      resources: [
        {
          name: "VA NY Harbor Healthcare System",
          description: "Comprehensive healthcare services for Veterans",
          address: "423 E. 23rd Street, New York, NY 10010",
          phone: "(212) 686-7500",
          website: "https://www.va.gov/new-york-harbor-health-care/",
          category: "VA"
        },
        {
          name: "Services for the UnderServed (SUS)",
          description: "Housing and mental health services for Veterans",
          address: "463 7th Ave, 17th Floor, New York, NY 10018",
          phone: "(212) 633-6900",
          website: "https://sus.org/",
          category: "Housing"
        }
      ]
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "VA":
        return <Building className="h-5 w-5 text-[#3e64dd]" />;
      case "Crisis":
        return <Phone className="h-5 w-5 text-[#3e64dd]" />;
      case "Housing":
        return <Building className="h-5 w-5 text-[#3e64dd]" />;
      case "Employment":
        return <Shield className="h-5 w-5 text-[#3e64dd]" />;
      case "Treatment":
        return <Building className="h-5 w-5 text-[#3e64dd]" />;
      default:
        return <MapPin className="h-5 w-5 text-[#3e64dd]" />;
    }
  };

  const filteredResources = selectedState
    ? stateData[selectedState]?.resources.filter(
        resource => category === "all" || resource.category === category
      ) || []
    : [];

  return (
    <MainLayout>
      <PageHeader
        title="Find Local Support Resources"
        description="Connect with veteran support services in your area. Select your state or enter your ZIP code to find resources near you."
      />

      <div className="bg-[#141e2f] text-white p-6 rounded-lg mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <Select
              value={selectedState}
              onValueChange={setSelectedState}
            >
              <SelectTrigger className="bg-[#1c2537] border-none text-white">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(stateData).map(state => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ZIP Code</label>
            <Input
              type="text"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="bg-[#1c2537] border-none text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Search Radius (miles)</label>
            <Select
              value={searchRadius}
              onValueChange={setSearchRadius}
            >
              <SelectTrigger className="bg-[#1c2537] border-none text-white">
                <SelectValue placeholder="Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 miles</SelectItem>
                <SelectItem value="25">25 miles</SelectItem>
                <SelectItem value="50">50 miles</SelectItem>
                <SelectItem value="100">100 miles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Resource Type</label>
            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger className="bg-[#1c2537] border-none text-white">
                <SelectValue placeholder="Resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="VA">VA Facilities</SelectItem>
                <SelectItem value="Crisis">Crisis Support</SelectItem>
                <SelectItem value="Treatment">Treatment Programs</SelectItem>
                <SelectItem value="Housing">Housing Services</SelectItem>
                <SelectItem value="Employment">Employment Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          className="w-full mt-6 bg-[#3e64dd] hover:bg-[#2a4bba]"
          size="lg"
        >
          Search Resources
        </Button>
      </div>

      {selectedState && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Resources in {selectedState}</h2>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => (
                <Card key={index} className="shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(resource.category)}
                          <CardTitle className="text-xl">{resource.name}</CardTitle>
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center rounded-full bg-[#141e2f]/10 px-2 py-1 text-xs font-medium text-[#3e64dd]">
                            {resource.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <CardDescription className="mb-4">{resource.description}</CardDescription>
                    {resource.address && (
                      <div className="flex items-start gap-2 text-sm mb-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-[#3e64dd]" />
                        <span>{resource.address}</span>
                      </div>
                    )}
                    {resource.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-[#3e64dd]" />
                        <span>{resource.phone}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex justify-between w-full">
                      <Button 
                        asChild 
                        variant="link" 
                        className="p-0 h-auto text-[#3e64dd]"
                      >
                        <a href={resource.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </Button>
                      {resource.address && (
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm"
                        >
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Directions
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">No resources found with the selected filters.</p>
              <p className="mt-2">Try changing your search criteria or <Link href="/resources" className="text-[#3e64dd] hover:underline">browse all resources</Link>.</p>
            </div>
          )}
        </div>
      )}

      {!selectedState && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Select a state to view resources</h3>
          <p className="text-gray-600 mb-6">Once you select a state, we'll show you available local resources for veterans.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Object.keys(stateData).map((state) => (
              <Button 
                key={state}
                variant="outline" 
                className="hover:bg-[#3e64dd]/10 hover:text-[#3e64dd]"
                onClick={() => setSelectedState(state)}
              >
                {state}
              </Button>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
}