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
          name: "VA Medical Center - Birmingham",
          description: "Primary VA healthcare facility in Alabama",
          address: "700 19th Street South, Birmingham, AL 35233",
          phone: "(205) 933-8101",
          website: "https://www.birmingham.va.gov/",
          category: "VA",
          zipCode: "35233"
        },
        {
          name: "Three Hots and A Cot",
          description: "Transitional housing for veterans",
          address: "2124 Old Montgomery Highway, Birmingham, AL 35216",
          phone: "(205) 377-3779",
          website: "https://cotsforvets.org",
          category: "Housing",
          zipCode: "35216"
        },
        {
          name: "Still Serving Veterans",
          description: "Employment assistance and career counseling",
          address: "626 Clinton Avenue W, Huntsville, AL 35801",
          phone: "(256) 883-7035",
          website: "https://ssv.org",
          category: "Employment",
          zipCode: "35801"
        },
        {
          name: "Veterans Recovery Program",
          description: "Substance abuse and mental health treatment",
          address: "1000 Medical Center Parkway, Birmingham, AL 35235",
          phone: "(205) 481-7223",
          website: "https://veteransrecovery.org",
          category: "Treatment",
          zipCode: "35235"
        },
        {
          name: "Alabama Veterans Crisis Center",
          description: "24/7 crisis intervention and support",
          address: "1721 University Boulevard, Birmingham, AL 35233",
          phone: "(205) 212-4000",
          website: "https://alvetscenter.org",
          category: "Crisis",
          zipCode: "35233"
        }
      ]
    },
    "Alaska": {
      resources: [
        {
          name: "Alaska VA Healthcare System",
          description: "VA healthcare services in Alaska",
          address: "1201 N Muldoon Road, Anchorage, AK 99504",
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
          description: "Comprehensive VA healthcare in Arizona",
          address: "650 E. Indian School Road, Phoenix, AZ 85012",
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
          description: "VA healthcare services in Arkansas",
          address: "4300 West 7th Street, Little Rock, AR 72205",
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
          category: "VA",
          zipCode: "94304"
        },
        {
          name: "New Directions for Veterans",
          description: "Transitional housing and substance abuse treatment",
          address: "11303 Wilshire Blvd, Los Angeles, CA 90073",
          phone: "(310) 914-4045",
          website: "https://ndvets.org",
          category: "Housing",
          zipCode: "90073"
        },
        {
          name: "Veterans Village of San Diego",
          description: "Comprehensive treatment program for veterans",
          address: "4141 Pacific Highway, San Diego, CA 92110",
          phone: "(619) 393-2000",
          website: "https://vvsd.net",
          category: "Treatment",
          zipCode: "92110"
        },
        {
          name: "Swords to Plowshares",
          description: "Employment training and job placement services",
          address: "1060 Howard St, San Francisco, CA 94103",
          phone: "(415) 252-4788",
          website: "https://www.swords-to-plowshares.org",
          category: "Employment",
          zipCode: "94103"
        },
        {
          name: "Veterans Resource Center - Sacramento",
          description: "Crisis intervention and support services",
          address: "1001 S Street, Sacramento, CA 95811",
          phone: "(916) 393-8387",
          website: "https://www.vetsresource.org",
          category: "Crisis",
          zipCode: "95811"
        }
      ]
    },
    "Colorado": {
      resources: [
        {
          name: "VA Eastern Colorado Health Care System",
          description: "VA healthcare services in Colorado",
          address: "1700 North Wheeling Street, Aurora, CO 80045",
          phone: "(303) 399-8020",
          website: "https://www.denver.va.gov/",
          category: "VA"
        }
      ]
    },
    "Connecticut": {
      resources: [
        {
          name: "VA Connecticut Healthcare System",
          description: "VA healthcare services in Connecticut",
          address: "950 Campbell Avenue, West Haven, CT 06516",
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
          description: "VA healthcare services in Delaware",
          address: "1601 Kirkwood Highway, Wilmington, DE 19805",
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
        }
      ]
    },
    "Georgia": {
      resources: [
        {
          name: "Atlanta VA Health Care System",
          description: "VA healthcare services in Georgia",
          address: "1670 Clairmont Road, Decatur, GA 30033",
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
          description: "VA healthcare services in Hawaii",
          address: "459 Patterson Road, Honolulu, HI 96819",
          phone: "(808) 433-0600",
          website: "https://www.hawaii.va.gov/",
          category: "VA"
        }
      ]
    },
    "Idaho": {
      resources: [
        {
          name: "Boise VA Medical Center",
          description: "VA healthcare services in Idaho",
          address: "500 West Fort Street, Boise, ID 83702",
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
          description: "VA healthcare services in Illinois",
          address: "820 South Damen Avenue, Chicago, IL 60612",
          phone: "(312) 569-8387",
          website: "https://www.chicago.va.gov/",
          category: "VA"
        }
      ]
    },
    "Indiana": {
      resources: [
        {
          name: "Richard L. Roudebush VA Medical Center",
          description: "VA healthcare services in Indiana",
          address: "1481 West 10th Street, Indianapolis, IN 46202",
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
          description: "VA healthcare services in Iowa",
          address: "601 Highway 6 West, Iowa City, IA 52246",
          phone: "(319) 338-0581",
          website: "https://www.iowacity.va.gov/",
          category: "VA"
        }
      ]
    },
    "Kansas": {
      resources: [
        {
          name: "Robert J. Dole VA Medical Center",
          description: "VA healthcare services in Kansas",
          address: "5500 East Kellogg, Wichita, KS 67218",
          phone: "(316) 685-2221",
          website: "https://www.wichita.va.gov/",
          category: "VA"
        }
      ]
    },
    "Kentucky": {
      resources: [
        {
          name: "Lexington VA Health Care System",
          description: "VA healthcare services in Kentucky",
          address: "1101 Veterans Drive, Lexington, KY 40502",
          phone: "(859) 233-4511",
          website: "https://www.lexington.va.gov/",
          category: "VA"
        }
      ]
    },
    "Louisiana": {
      resources: [
        {
          name: "Southeast Louisiana Veterans Health Care System",
          description: "VA healthcare services in Louisiana",
          address: "2400 Canal Street, New Orleans, LA 70119",
          phone: "(504) 568-0811",
          website: "https://www.neworleans.va.gov/",
          category: "VA"
        }
      ]
    },
    "Maine": {
      resources: [
        {
          name: "VA Maine Healthcare System",
          description: "VA healthcare services in Maine",
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
          name: "VA Maryland Health Care System",
          description: "VA healthcare services in Maryland",
          address: "10 North Greene Street, Baltimore, MD 21201",
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
          description: "VA healthcare services in Massachusetts",
          address: "150 South Huntington Avenue, Boston, MA 02130",
          phone: "(857) 364-4000",
          website: "https://www.boston.va.gov/",
          category: "VA"
        }
      ]
    },
    "Michigan": {
      resources: [
        {
          name: "John D. Dingell VA Medical Center",
          description: "VA healthcare services in Michigan",
          address: "4646 John R. Street, Detroit, MI 48201",
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
          description: "VA healthcare services in Minnesota",
          address: "1 Veterans Drive, Minneapolis, MN 55417",
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
          description: "VA healthcare services in Mississippi",
          address: "1500 East Woodrow Wilson Avenue, Jackson, MS 39216",
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
          description: "VA healthcare services in Missouri",
          address: "800 Hospital Drive, Columbia, MO 65201",
          phone: "(573) 814-6000",
          website: "https://www.columbiamo.va.gov/",
          category: "VA"
        }
      ]
    },
    "Montana": {
      resources: [
        {
          name: "VA Montana Health Care System",
          description: "VA healthcare services in Montana",
          address: "1900 Williams Street, Fort Harrison, MT 59636",
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
          description: "VA healthcare services in Nebraska",
          address: "4101 Woolworth Avenue, Omaha, NE 68105",
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
          description: "VA healthcare services in Nevada",
          address: "6900 North Pecos Road, North Las Vegas, NV 89086",
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
          description: "VA healthcare services in New Hampshire",
          address: "718 Smyth Road, Manchester, NH 03104",
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
          description: "VA healthcare services in New Jersey",
          address: "385 Tremont Avenue, East Orange, NJ 07018",
          phone: "(973) 676-1000",
          website: "https://www.newjersey.va.gov/",
          category: "VA"
        }
      ]
    },
    "New Mexico": {
      resources: [
        {
          name: "Raymond G. Murphy VA Medical Center",
          description: "VA healthcare services in New Mexico",
          address: "1501 San Pedro Drive SE, Albuquerque, NM 87108",
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
          description: "VA healthcare services in New York",
          address: "423 East 23rd Street, New York, NY 10010",
          phone: "(212) 686-7500",
          website: "https://www.nyharbor.va.gov/",
          category: "VA"
        }
      ]
    },
    "North Carolina": {
      resources: [
        {
          name: "Durham VA Medical Center",
          description: "VA healthcare services in North Carolina",
          address: "508 Fulton Street, Durham, NC 27705",
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
          description: "VA healthcare services in North Dakota",
          address: "2101 Elm Street North, Fargo, ND 58102",
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
          description: "VA healthcare services in Ohio",
          address: "10701 East Boulevard, Cleveland, OH 44106",
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
          description: "VA healthcare services in Oklahoma",
          address: "921 Northeast 13th Street, Oklahoma City, OK 73104",
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
          description: "VA healthcare services in Oregon",
          address: "3710 Southwest US Veterans Hospital Road, Portland, OR 97239",
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
          description: "VA healthcare services in Pennsylvania",
          address: "3900 Woodland Avenue, Philadelphia, PA 19104",
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
          description: "VA healthcare services in Rhode Island",
          address: "830 Chalkstone Avenue, Providence, RI 02908",
          phone: "(401) 273-7100",
          website: "https://www.providence.va.gov/",
          category: "VA"
        }
      ]
    },
    "South Carolina": {
      resources: [
        {
          name: "William Jennings Bryan Dorn VA Medical Center",
          description: "VA healthcare services in South Carolina",
          address: "6439 Garners Ferry Road, Columbia, SC 29209",
          phone: "(803) 776-4000",
          website: "https://www.columbia.va.gov/",
          category: "VA"
        }
      ]
    },
    "South Dakota": {
      resources: [
        {
          name: "Sioux Falls VA Health Care System",
          description: "VA healthcare services in South Dakota",
          address: "2501 West 22nd Street, Sioux Falls, SD 57105",
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
          description: "VA healthcare services in Tennessee",
          address: "1310 24th Avenue South, Nashville, TN 37212",
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
          description: "VA healthcare services in Texas",
          address: "2002 Holcombe Boulevard, Houston, TX 77030",
          phone: "(713) 791-1414",
          website: "https://www.houston.va.gov/",
          category: "VA"
        }
      ]
    },
    "Utah": {
      resources: [
        {
          name: "VA Salt Lake City Health Care System",
          description: "VA healthcare services in Utah",
          address: "500 Foothill Drive, Salt Lake City, UT 84148",
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
          description: "VA healthcare services in Vermont",
          address: "215 North Main Street, White River Junction, VT 05009",
          phone: "(802) 295-9363",
          website: "https://www.whiteriver.va.gov/",
          category: "VA"
        }
      ]
    },
    "Virginia": {
      resources: [
        {
          name: "Hunter Holmes McGuire VA Medical Center",
          description: "VA healthcare services in Virginia",
          address: "1201 Broad Rock Boulevard, Richmond, VA 23249",
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
          description: "VA healthcare services in Washington",
          address: "1660 South Columbian Way, Seattle, WA 98108",
          phone: "(206) 762-1010",
          website: "https://www.pugetsound.va.gov/",
          category: "VA"
        }
      ]
    },
    "West Virginia": {
      resources: [
        {
          name: "Huntington VA Medical Center",
          description: "VA healthcare services in West Virginia",
          address: "1540 Spring Valley Drive, Huntington, WV 25704",
          phone: "(304) 429-6741",
          website: "https://www.huntington.va.gov/",
          category: "VA"
        }
      ]
    },
    "Wisconsin": {
      resources: [
        {
          name: "William S. Middleton Memorial Veterans Hospital",
          description: "VA healthcare services in Wisconsin",
          address: "2500 Overlook Terrace, Madison, WI 53705",
          phone: "(608) 256-1901",
          website: "https://www.madison.va.gov/",
          category: "VA"
        }
      ]
    },
    "Wyoming": {
      resources: [
        {
          name: "Cheyenne VA Medical Center",
          description: "VA healthcare services in Wyoming",
          address: "2360 East Pershing Boulevard, Cheyenne, WY 82001",
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
          onClick={() => {
            if (selectedState) {
              const element = document.getElementById('resources-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Search Resources
        </Button>
      </div>

      {selectedState && (
        <div id="resources-section">
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
            {Object.entries(stateData).map(([state, data]) => (
              <Button 
                key={state}
                variant="outline" 
                className="w-full flex items-center justify-center py-4"
                onClick={() => setSelectedState(state)}
              >
                <span className="font-medium text-center">{state}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
}