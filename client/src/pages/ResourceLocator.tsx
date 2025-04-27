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
    "Alabama": {
      resources: [
        {
          name: "Birmingham VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "700 19th St S, Birmingham, AL 35233",
          phone: "(205) 933-8101",
          website: "https://www.birmingham.va.gov/",
          category: "VA"
        }
      ]
    },
    "Alaska": {
      resources: [
        {
          name: "Alaska VA Healthcare System",
          description: "Comprehensive healthcare services for Veterans",
          address: "1201 N Muldoon Rd, Anchorage, AK 99504",
          phone: "(907) 257-4700",
          website: "https://www.alaska.va.gov/",
          category: "VA"
        }
      ]
    },
    "Arizona": {
      resources: [
        {
          name: "Phoenix VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "650 E Indian School Rd, Phoenix, AZ 85012",
          phone: "(602) 277-5551",
          website: "https://www.phoenix.va.gov/",
          category: "VA"
        }
      ]
    },
    "Arkansas": {
      resources: [
        {
          name: "Central Arkansas Veterans Healthcare System",
          description: "Comprehensive healthcare services for Veterans",
          address: "4300 W 7th St, Little Rock, AR 72205",
          phone: "(501) 257-1000",
          website: "https://www.littlerock.va.gov/",
          category: "VA"
        }
      ]
    },
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
    "Colorado": {
      resources: [
        {
          name: "Rocky Mountain Regional VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "1700 N Wheeling St, Aurora, CO 80045",
          phone: "(303) 399-8020",
          website: "https://www.va.gov/eastern-colorado-health-care/",
          category: "VA"
        }
      ]
    },
    "Connecticut": {
      resources: [
        {
          name: "VA Connecticut Healthcare System",
          description: "Comprehensive healthcare services for Veterans",
          address: "950 Campbell Ave, West Haven, CT 06516",
          phone: "(203) 932-5711",
          website: "https://www.connecticut.va.gov/",
          category: "VA"
        }
      ]
    },
    "Delaware": {
      resources: [
        {
          name: "Wilmington VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "1601 Kirkwood Hwy, Wilmington, DE 19805",
          phone: "(302) 994-2511",
          website: "https://www.wilmington.va.gov/",
          category: "VA"
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
    "Georgia": {
      resources: [
        {
          name: "Atlanta VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "1670 Clairmont Rd, Decatur, GA 30033",
          phone: "(404) 321-6111",
          website: "https://www.atlanta.va.gov/",
          category: "VA"
        }
      ]
    },
    "Hawaii": {
      resources: [
        {
          name: "VA Pacific Islands Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "459 Patterson Rd, Honolulu, HI 96819",
          phone: "(808) 433-0600",
          website: "https://www.va.gov/pacific-islands-health-care/",
          category: "VA"
        }
      ]
    },
    "Idaho": {
      resources: [
        {
          name: "Boise VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "500 W Fort St, Boise, ID 83702",
          phone: "(208) 422-1000",
          website: "https://www.boise.va.gov/",
          category: "VA"
        }
      ]
    },
    "Illinois": {
      resources: [
        {
          name: "Jesse Brown VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "820 S Damen Ave, Chicago, IL 60612",
          phone: "(312) 569-8387",
          website: "https://www.jesse-brown.va.gov/",
          category: "VA"
        }
      ]
    },
    "Indiana": {
      resources: [
        {
          name: "Richard L. Roudebush VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "1481 W 10th St, Indianapolis, IN 46202",
          phone: "(317) 554-0000",
          website: "https://www.indianapolis.va.gov/",
          category: "VA"
        }
      ]
    },
    "Iowa": {
      resources: [
        {
          name: "Iowa City VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "601 Hwy 6 W, Iowa City, IA 52246",
          phone: "(319) 338-0581",
          website: "https://www.iowacity.va.gov/",
          category: "VA"
        }
      ]
    },
    "Kansas": {
      resources: [
        {
          name: "Colmery-O'Neil VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "2200 SW Gage Blvd, Topeka, KS 66622",
          phone: "(785) 350-3111",
          website: "https://www.topeka.va.gov/",
          category: "VA"
        }
      ]
    },
    "Kentucky": {
      resources: [
        {
          name: "Robley Rex VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "800 Zorn Ave, Louisville, KY 40206",
          phone: "(502) 287-4000",
          website: "https://www.louisville.va.gov/",
          category: "VA"
        }
      ]
    },
    "Louisiana": {
      resources: [
        {
          name: "Southeast Louisiana Veterans Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "2400 Canal St, New Orleans, LA 70119",
          phone: "(504) 507-2000",
          website: "https://www.neworleans.va.gov/",
          category: "VA"
        }
      ]
    },
    "Maine": {
      resources: [
        {
          name: "VA Maine Healthcare System",
          description: "Comprehensive healthcare services for Veterans",
          address: "1 VA Center, Augusta, ME 04330",
          phone: "(207) 623-8411",
          website: "https://www.maine.va.gov/",
          category: "VA"
        }
      ]
    },
    "Maryland": {
      resources: [
        {
          name: "Baltimore VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "10 N Greene St, Baltimore, MD 21201",
          phone: "(410) 605-7000",
          website: "https://www.maryland.va.gov/",
          category: "VA"
        }
      ]
    },
    "Massachusetts": {
      resources: [
        {
          name: "VA Boston Healthcare System",
          description: "Comprehensive healthcare services for Veterans",
          address: "150 S Huntington Ave, Boston, MA 02130",
          phone: "(857) 203-6000",
          website: "https://www.boston.va.gov/",
          category: "VA"
        }
      ]
    },
    "Michigan": {
      resources: [
        {
          name: "John D. Dingell VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "4646 John R St, Detroit, MI 48201",
          phone: "(313) 576-1000",
          website: "https://www.detroit.va.gov/",
          category: "VA"
        }
      ]
    },
    "Minnesota": {
      resources: [
        {
          name: "Minneapolis VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "1 Veterans Dr, Minneapolis, MN 55417",
          phone: "(612) 725-2000",
          website: "https://www.minneapolis.va.gov/",
          category: "VA"
        }
      ]
    },
    "Mississippi": {
      resources: [
        {
          name: "G.V. (Sonny) Montgomery VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "1500 E Woodrow Wilson Ave, Jackson, MS 39216",
          phone: "(601) 362-4471",
          website: "https://www.jackson.va.gov/",
          category: "VA"
        }
      ]
    },
    "Missouri": {
      resources: [
        {
          name: "Harry S. Truman Memorial Veterans' Hospital",
          description: "Comprehensive healthcare services for Veterans",
          address: "800 Hospital Dr, Columbia, MO 65201",
          phone: "(573) 814-6000",
          website: "https://www.columbiamo.va.gov/",
          category: "VA"
        }
      ]
    },
    "Montana": {
      resources: [
        {
          name: "Montana VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "3687 Veterans Dr, Fort Harrison, MT 59636",
          phone: "(406) 442-6410",
          website: "https://www.montana.va.gov/",
          category: "VA"
        }
      ]
    },
    "Nebraska": {
      resources: [
        {
          name: "VA Nebraska-Western Iowa Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "4101 Woolworth Ave, Omaha, NE 68105",
          phone: "(402) 346-8800",
          website: "https://www.nebraska.va.gov/",
          category: "VA"
        }
      ]
    },
    "Nevada": {
      resources: [
        {
          name: "VA Southern Nevada Healthcare System",
          description: "Comprehensive healthcare services for Veterans",
          address: "6900 N Pecos Rd, North Las Vegas, NV 89086",
          phone: "(702) 791-9000",
          website: "https://www.lasvegas.va.gov/",
          category: "VA"
        }
      ]
    },
    "New Hampshire": {
      resources: [
        {
          name: "Manchester VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "718 Smyth Rd, Manchester, NH 03104",
          phone: "(603) 624-4366",
          website: "https://www.manchester.va.gov/",
          category: "VA"
        }
      ]
    },
    "New Jersey": {
      resources: [
        {
          name: "VA New Jersey Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "385 Tremont Ave, East Orange, NJ 07018",
          phone: "(973) 676-1000",
          website: "https://www.newjersey.va.gov/",
          category: "VA"
        }
      ]
    },
    "New Mexico": {
      resources: [
        {
          name: "New Mexico VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "1501 San Pedro Dr SE, Albuquerque, NM 87108",
          phone: "(505) 265-1711",
          website: "https://www.albuquerque.va.gov/",
          category: "VA"
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
    },
    "North Carolina": {
      resources: [
        {
          name: "Durham VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "508 Fulton St, Durham, NC 27705",
          phone: "(919) 286-0411",
          website: "https://www.durham.va.gov/",
          category: "VA"
        }
      ]
    },
    "North Dakota": {
      resources: [
        {
          name: "Fargo VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "2101 Elm St, Fargo, ND 58102",
          phone: "(701) 232-3241",
          website: "https://www.fargo.va.gov/",
          category: "VA"
        }
      ]
    },
    "Ohio": {
      resources: [
        {
          name: "Louis Stokes Cleveland VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "10701 East Blvd, Cleveland, OH 44106",
          phone: "(216) 791-3800",
          website: "https://www.cleveland.va.gov/",
          category: "VA"
        }
      ]
    },
    "Oklahoma": {
      resources: [
        {
          name: "Oklahoma City VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "921 NE 13th St, Oklahoma City, OK 73104",
          phone: "(405) 456-1000",
          website: "https://www.oklahoma.va.gov/",
          category: "VA"
        }
      ]
    },
    "Oregon": {
      resources: [
        {
          name: "VA Portland Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "3710 SW US Veterans Hospital Rd, Portland, OR 97239",
          phone: "(503) 220-8262",
          website: "https://www.portland.va.gov/",
          category: "VA"
        }
      ]
    },
    "Pennsylvania": {
      resources: [
        {
          name: "Corporal Michael J. Crescenz VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "3900 Woodland Ave, Philadelphia, PA 19104",
          phone: "(215) 823-5800",
          website: "https://www.philadelphia.va.gov/",
          category: "VA"
        }
      ]
    },
    "Rhode Island": {
      resources: [
        {
          name: "Providence VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "830 Chalkstone Ave, Providence, RI 02908",
          phone: "(401) 273-7100",
          website: "https://www.providence.va.gov/",
          category: "VA"
        }
      ]
    },
    "South Carolina": {
      resources: [
        {
          name: "Ralph H. Johnson VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "109 Bee St, Charleston, SC 29401",
          phone: "(843) 577-5011",
          website: "https://www.charleston.va.gov/",
          category: "VA"
        }
      ]
    },
    "South Dakota": {
      resources: [
        {
          name: "Sioux Falls VA Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "2501 W 22nd St, Sioux Falls, SD 57105",
          phone: "(605) 336-3230",
          website: "https://www.siouxfalls.va.gov/",
          category: "VA"
        }
      ]
    },
    "Tennessee": {
      resources: [
        {
          name: "Tennessee Valley Healthcare System",
          description: "Comprehensive healthcare services for Veterans",
          address: "1310 24th Ave S, Nashville, TN 37212",
          phone: "(615) 327-4751",
          website: "https://www.tennesseevalley.va.gov/",
          category: "VA"
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
    "Utah": {
      resources: [
        {
          name: "VA Salt Lake City Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "500 Foothill Dr, Salt Lake City, UT 84148",
          phone: "(801) 582-1565",
          website: "https://www.saltlakecity.va.gov/",
          category: "VA"
        }
      ]
    },
    "Vermont": {
      resources: [
        {
          name: "White River Junction VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "215 N Main St, White River Junction, VT 05009",
          phone: "(802) 295-9363",
          website: "https://www.whiteriverjunction.va.gov/",
          category: "VA"
        }
      ]
    },
    "Virginia": {
      resources: [
        {
          name: "Hunter Holmes McGuire VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "1201 Broad Rock Blvd, Richmond, VA 23249",
          phone: "(804) 675-5000",
          website: "https://www.richmond.va.gov/",
          category: "VA"
        }
      ]
    },
    "Washington": {
      resources: [
        {
          name: "VA Puget Sound Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "1660 S Columbian Way, Seattle, WA 98108",
          phone: "(206) 762-1010",
          website: "https://www.pugetsound.va.gov/",
          category: "VA"
        }
      ]
    },
    "Washington DC": {
      resources: [
        {
          name: "Washington DC VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "50 Irving St NW, Washington, DC 20422",
          phone: "(202) 745-8000",
          website: "https://www.washingtondc.va.gov/",
          category: "VA"
        }
      ]
    },
    "West Virginia": {
      resources: [
        {
          name: "Huntington VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "1540 Spring Valley Dr, Huntington, WV 25704",
          phone: "(304) 429-6741",
          website: "https://www.huntington.va.gov/",
          category: "VA"
        }
      ]
    },
    "Wisconsin": {
      resources: [
        {
          name: "Clement J. Zablocki VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "5000 W National Ave, Milwaukee, WI 53295",
          phone: "(414) 384-2000",
          website: "https://www.milwaukee.va.gov/",
          category: "VA"
        }
      ]
    },
    "Wyoming": {
      resources: [
        {
          name: "Cheyenne VA Medical Center",
          description: "Comprehensive healthcare services for Veterans",
          address: "2360 E Pershing Blvd, Cheyenne, WY 82001",
          phone: "(307) 778-7550",
          website: "https://www.cheyenne.va.gov/",
          category: "VA"
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

      <div className="bg-[#141e2f] text-white p-4 sm:p-6 rounded-lg mb-6 sm:mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <Select
              value={selectedState}
              onValueChange={setSelectedState}
            >
              <SelectTrigger className="bg-[#1c2537] border-none text-white h-11 sm:h-10">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="max-h-[40vh] overflow-y-auto">
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
              className="bg-[#1c2537] border-none text-white placeholder:text-gray-400 h-11 sm:h-10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Search Radius</label>
            <Select
              value={searchRadius}
              onValueChange={setSearchRadius}
            >
              <SelectTrigger className="bg-[#1c2537] border-none text-white h-11 sm:h-10">
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
              <SelectTrigger className="bg-[#1c2537] border-none text-white h-11 sm:h-10">
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
          className="w-full mt-5 sm:mt-6 bg-[#3e64dd] hover:bg-[#2a4bba] py-6 sm:py-4"
          size="lg"
        >
          Search Resources
        </Button>
      </div>

      {selectedState && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Resources in {selectedState}</h2>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredResources.map((resource, index) => (
                <Card key={index} className="shadow-md overflow-hidden">
                  <CardHeader className="pb-2 pt-4 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-start sm:items-center flex-col sm:flex-row sm:gap-2">
                          <div className="mb-2 sm:mb-0">
                            {getCategoryIcon(resource.category)}
                          </div>
                          <CardTitle className="text-base sm:text-lg md:text-xl break-words">{resource.name}</CardTitle>
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center rounded-full bg-[#141e2f]/10 px-2 py-1 text-xs font-medium text-[#3e64dd]">
                            {resource.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 px-4 sm:px-6">
                    <CardDescription className="mb-4 text-sm sm:text-base">{resource.description}</CardDescription>
                    {resource.address && (
                      <div className="flex items-start gap-2 text-xs sm:text-sm mb-2">
                        <MapPin className="h-4 w-4 mt-0.5 text-[#3e64dd] flex-shrink-0" />
                        <span className="break-words">{resource.address}</span>
                      </div>
                    )}
                    {resource.phone && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Phone className="h-4 w-4 text-[#3e64dd] flex-shrink-0" />
                        <span>{resource.phone}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between gap-3 px-4 sm:px-6">
                    <Button 
                      asChild 
                      variant="outline"
                      className="w-full sm:w-auto justify-center text-[#3e64dd] border-[#3e64dd]/30 hover:bg-[#3e64dd]/10"
                    >
                      <a href={resource.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Button>
                    {resource.address && (
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full sm:w-auto justify-center"
                      >
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Get Directions
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
              <p className="text-base sm:text-lg text-gray-600">No resources found with the selected filters.</p>
              <p className="mt-2 text-sm sm:text-base">Try changing your search criteria or <Link href="/resources" className="text-[#3e64dd] hover:underline">browse all resources</Link>.</p>
            </div>
          )}
        </div>
      )}

      {!selectedState && (
        <div className="bg-gray-50 rounded-lg p-4 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Select a state to view resources</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Select a state below to view available local resources for veterans.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-h-[60vh] overflow-y-auto p-1">
            {Object.keys(stateData).map((state) => (
              <Button 
                key={state}
                variant="outline" 
                className="hover:bg-[#3e64dd]/10 hover:text-[#3e64dd] text-xs sm:text-sm px-1 sm:px-2"
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