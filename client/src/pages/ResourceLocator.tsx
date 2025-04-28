import { useState, useEffect } from "react";
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
import { CrisisResources } from "@/components/common/CrisisResources";
import { useResourceTracking } from "@/hooks/use-resource-tracking";

interface StateResource {
  name: string;
  description: string;
  address?: string;
  phone?: string;
  website: string;
  category: "VA" | "Crisis" | "Treatment" | "Housing" | "Employment";
  zipCode?: string;
}

interface StateData {
  [state: string]: {
    resources: StateResource[];
  };
}

export default function ResourceLocator() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [zipCode, setZipCode] = useState<string>("");
  // Removed search radius state as it's no longer needed
  const [category, setCategory] = useState<string>("all");
  const { trackStateResourceClick, trackResourceClick, trackNavClick } = useResourceTracking();

  // Sample state data - in a real application, this would come from an API
  // Create an interface for the country data
  interface CountryData {
    [country: string]: {
      resources: StateResource[];
    };
  }
  
  // Sample international data with countries that have U.S. military veterans 
  const countryData: CountryData = {
    "Philippines": {
      resources: [
        {
          name: "Manila VA Outpatient Clinic",
          description: "The only full VA clinic outside U.S. territories - outpatient care for service-connected conditions",
          address: "1501 Roxas Boulevard, NOX3 Seafront Compound, Pasay City, PH 01302",
          phone: "+63 (2) 8550-3888",
          website: "https://www.va.gov/manila-philippines-health-care/",
          category: "VA"
        },
        {
          name: "Veterans Service Center - Manila",
          description: "Benefits assistance, claims processing, compensation, pension, and vocational rehabilitation",
          address: "1131 Roxas Boulevard, Ermita, Manila, 0930 Philippines",
          phone: "+63 (2) 8550-3888",
          website: "https://www.benefits.va.gov/manila/",
          category: "VA"
        },
        {
          name: "Philippine Crisis Support",
          description: "Mental health support, suicide prevention resources for veterans",
          address: "U.S. Embassy, 1201 Roxas Boulevard, Ermita, Manila, 1000 Philippines",
          phone: "+63 (2) 5301-2000",
          website: "https://ph.usembassy.gov/u-s-citizen-services/",
          category: "Crisis"
        }
      ]
    },
    "Germany": {
      resources: [
        {
          name: "Landstuhl Regional Medical Center",
          description: "The largest U.S. military hospital outside the United States",
          address: "Dr. Hitzelberger Straße, 66849 Landstuhl, Germany",
          phone: "+49 6371 9464 0",
          website: "https://landstuhl.tricare.mil/",
          category: "VA"
        },
        {
          name: "Veterans of Foreign Wars - Post 10810",
          description: "Support services for veterans and their families in Germany",
          address: "CMR 480 Box G.D., APO, AE 09128",
          phone: "+49 151 9048 81899",
          website: "https://www.vfw10810.org/",
          category: "Treatment"
        },
        {
          name: "American Medical Center - Landstuhl",
          description: "Primary care and referrals for mental health services",
          address: "66849 Landstuhl, Germany",
          phone: "+49 6371 9464 0",
          website: "https://landstuhl.tricare.mil/",
          category: "Treatment"
        },
        {
          name: "USO Kaiserslautern",
          description: "Transition assistance for veterans leaving military service",
          address: "Kleber Kaserne, Kaiserslautern, Germany",
          phone: "+49 61114 3541 5100",
          website: "https://europe.uso.org/kaiserslautern/",
          category: "Employment"
        },
        {
          name: "Veterans Crisis Support - Germany",
          description: "Crisis intervention services for veterans in Germany - call 988 and press 1 for assistance",
          address: "Ramstein Air Base, 66877 Ramstein-Miesenbach, Germany",
          phone: "+49 6371 47 7777",
          website: "https://www.veteranscrisisline.net/get-help/european-support",
          category: "Crisis"
        }
      ]
    },
    "Japan": {
      resources: [
        {
          name: "U.S. Naval Hospital Yokosuka",
          description: "Medical support for veterans in Japan",
          address: "United States Fleet Activities Yokosuka, Japan",
          phone: "+81 46 816 5600",
          website: "https://yokosuka.tricare.mil/",
          category: "VA"
        },
        {
          name: "Veterans of Foreign Wars - Post 1054",
          description: "Support for veterans in Japan",
          address: "Building 6002, Yokosuka Naval Base, Japan",
          phone: "+81 46 896 5801",
          website: "https://vfwpacific.org/di/vfw/v2/default.asp",
          category: "Housing"
        },
        {
          name: "Meguro Counseling Center - Tokyo",
          description: "Psychological counseling and medication guidance for veterans with PTSD, TBI, anxiety, depression",
          address: "Meguro, Tokyo, Japan",
          phone: "+81 3 5431 3096",
          website: "https://megurocounseling.com/",
          category: "Treatment"
        },
        {
          name: "USO Okinawa",
          description: "Support and resources for transitioning veterans",
          address: "Building 217, Kadena Air Base, Okinawa, Japan",
          phone: "+81 98 970 7788",
          website: "https://okinawa.uso.org/",
          category: "Employment"
        },
        {
          name: "Military Crisis Line - Japan",
          description: "Crisis support for veterans in Japan",
          address: "Yokota Air Base, Fussa, Tokyo, Japan",
          phone: "DSN: 118 or +81 3 4570 1110",
          website: "https://www.veteranscrisisline.net/get-help/military-crisis-line",
          category: "Crisis"
        }
      ]
    },
    "South Korea": {
      resources: [
        {
          name: "Brian D. Allgood Army Community Hospital",
          description: "Comprehensive medical care for active-duty, retirees, and families (formerly 121st Combat Support Hospital)",
          address: "USAG Yongsan, Seoul, South Korea",
          phone: "+82 2 7917 3155",
          website: "https://briandallgood.tricare.mil/",
          category: "VA"
        },
        {
          name: "Veterans of Foreign Wars - Post 10223",
          description: "Support and assistance with VA claims for veterans near Camp Humphreys",
          address: "Anjeong-ri, near Camp Humphreys, Pyeongtaek, South Korea",
          phone: "+82 31 691 9900",
          website: "https://www.vfw10223.org/",
          category: "Housing"
        },
        {
          name: "Army Substance Abuse Program (ASAP) - USAG Yongsan",
          description: "Substance abuse prevention, counseling, and rehabilitation services",
          address: "USAG Yongsan, Seoul, South Korea",
          phone: "+82 2 7913 3445",
          website: "https://crg.health.mil/",
          category: "Treatment"
        },
        {
          name: "Military OneSource - Camp Humphreys",
          description: "Employment assistance, resume building, job search support, and career counseling",
          address: "USAG Camp Humphreys, Pyeongtaek, South Korea",
          phone: "+82 31 690 7311",
          website: "https://www.militaryonesource.mil/",
          category: "Employment"
        },
        {
          name: "Crisis Response Team - USAG Humphreys",
          description: "Crisis intervention services and mental health emergency support",
          address: "USAG Camp Humphreys, Pyeongtaek, South Korea",
          phone: "+82 31 869 5911",
          website: "https://home.army.mil/humphreys/about/our-community/behavioral-health",
          category: "Crisis"
        }
      ]
    },
    "United Kingdom": {
      resources: [
        {
          name: "RAF Lakenheath Hospital (48th Medical Group)",
          description: "Medical care for U.S. military personnel, families, and eligible veterans stationed in the UK",
          address: "RAF Lakenheath, Brandon, Suffolk IP27 9PN, UK",
          phone: "+44 1638 528010",
          website: "https://www.lakenheath.af.mil/Resources/Clinic/",
          category: "VA"
        },
        {
          name: "Veterans UK",
          description: "Support on pensions, compensation, welfare, and housing for UK veterans",
          address: "Ministry of Defence, Norcross, Thornton-Cleveleys FY5 3WP, UK",
          phone: "+44 808 1914 218",
          website: "https://www.gov.uk/government/organisations/veterans-uk",
          category: "Housing"
        },
        {
          name: "Combat Stress",
          description: "Mental health services for veterans including treatment for PTSD, anxiety, and depression",
          address: "Tyrwhitt House, Oaklawn Road, Leatherhead KT22 0BX, UK",
          phone: "+44 800 138 1619",
          website: "https://combatstress.org.uk/",
          category: "Treatment"
        },
        {
          name: "The Poppy Factory",
          description: "Employment support for veterans with health conditions",
          address: "20 Petersham Road, Richmond TW10 6UR, UK",
          phone: "+44 20 8940 3305",
          website: "https://www.poppyfactory.org/",
          category: "Employment"
        },
        {
          name: "Veterans Crisis Line UK",
          description: "Crisis support for U.S. veterans residing in the UK",
          address: "RAF Croughton, Nr Brackley NN13 5NQ, UK",
          phone: "+44 20 3695 0097",
          website: "https://www.veteranscrisisline.net/get-help/european-support",
          category: "Crisis"
        },
        {
          name: "Op COURAGE",
          description: "NHS specialist service providing mental health support to veterans and service leavers",
          address: "Available across England",
          phone: "+44 0300 323 0117",
          website: "https://www.nhs.uk/nhs-services/armed-forces-community/mental-health/veterans-reservists/",
          category: "Treatment"
        },
        {
          name: "Togetherall",
          description: "Free, anonymous online community offering 24/7 mental health support for UK veterans",
          address: "London, UK",
          phone: "N/A - Online Service",
          website: "https://togetherall.com/en-gb/",
          category: "Crisis"
        },
        {
          name: "SSAFA - The Armed Forces Charity",
          description: "Practical, emotional, and financial support to veterans and their families",
          address: "Queen Elizabeth House, 4 St Dunstan's Hill, London, EC3R 8AD, UK",
          phone: "+44 800 260 6767",
          website: "https://www.ssafa.org.uk/",
          category: "Housing"
        },
        {
          name: "Forces Employment Charity",
          description: "Career advice, job placements, and training programs for veterans",
          address: "First Floor, 10 Victoria Street, London, SW1H 0NB, UK",
          phone: "+44 121 236 0058",
          website: "https://www.forcesemployment.org.uk/",
          category: "Employment"
        },
        {
          name: "Veterans' Gateway",
          description: "Single point of contact for veterans seeking advice and support 24/7",
          address: "Nationwide service, UK",
          phone: "+44 808 802 1212",
          website: "https://www.veteransgateway.org.uk/",
          category: "Crisis"
        }
      ]
    },
    "Italy": {
      resources: [
        {
          name: "U.S. Naval Hospital Naples",
          description: "Comprehensive medical care for active-duty service members, retirees, and their families",
          address: "Via Contrada Boscariello, Gricignano di Aversa (CE) 81030, Italy",
          phone: "+39 081 811 6000",
          website: "https://naples.tricare.mil/",
          category: "VA"
        },
        {
          name: "American Red Cross - Naples",
          description: "Emergency communication services, financial assistance, and referral services for veterans and families",
          address: "Village Forum Building, PSC 817 Box 27, FPO AE 09622, Naples, Italy",
          phone: "+39 081 568 4788",
          website: "https://www.redcross.org/local/overseas/italy.html",
          category: "Housing"
        },
        {
          name: "Behavioral Health Services - Aviano Air Base",
          description: "Mental health services including individual/group therapy, substance use education, and family counseling",
          address: "31st Medical Group, Aviano Air Base, Italy",
          phone: "+39 0434 30 5321",
          website: "https://aviano.tricare.mil/Health-Services/Mental-Health",
          category: "Treatment"
        },
        {
          name: "Transition Assistance Program - Naples",
          description: "Resources for transition to civilian life, employment assistance and veterans' benefits information",
          address: "Fleet and Family Support Center, Naval Support Activity Naples, Italy",
          phone: "+39 081 811 6372",
          website: "https://www.cnic.navy.mil/regions/cnreurafcent/installations/nsa_naples/ffr/support_services/career_support/transition_assistance.html",
          category: "Employment"
        },
        {
          name: "Military Crisis Line - Europe",
          description: "24/7 confidential support to veterans in crisis",
          address: "Accessible throughout Europe",
          phone: "00800 1273 8255 (TALK)",
          website: "https://www.veteranscrisisline.net/get-help/european-support",
          category: "Crisis"
        },
        {
          name: "U.S. Army Garrison (USAG) Italy - Vicenza",
          description: "Healthcare services including mental health resources, veteran healthcare, and family care options",
          address: "Caserma Ederle, Viale Della Pace, 36100 Vicenza, Italy",
          phone: "+39 0444 71 7114",
          website: "https://home.army.mil/italy/index.php/about/Garrison/directorate-health-services",
          category: "VA"
        },
        {
          name: "American University of Rome - Veterans Aid",
          description: "Educational benefits for U.S. veterans and families using Post-9/11 GI Bill, plus Veterans Club for community support",
          address: "Via Pietro Roselli 4, 00153 Rome, Italy",
          phone: "+39 06 5833 0919",
          website: "https://aur.edu/admissions/veterans",
          category: "Employment"
        },
        {
          name: "John Cabot University - Veteran Benefits",
          description: "VA educational and training benefit programs, assistance with enrollment certification and military transfer credits",
          address: "Via della Lungara 233, 00165 Rome, Italy",
          phone: "+39 06 681 9121",
          website: "https://www.johncabot.edu/admissions/veterans-benefits.aspx",
          category: "Employment"
        }
      ]
    },
    "Thailand": {
      resources: [
        {
          name: "U.S. Embassy Bangkok - Veterans Affairs",
          description: "Information on applying for VA benefits and assistance for U.S. veterans in Thailand",
          address: "95 Wireless Road, Lumpini, Pathumwan, Bangkok 10330, Thailand",
          phone: "+66 2 205 4000",
          website: "https://th.usembassy.gov/u-s-citizen-services/veterans-affairs/",
          category: "VA"
        },
        {
          name: "Joint U.S. Military Advisory Group Thailand (JUSMAGTHAI)",
          description: "General assistance with Department of Defense (DoD) matters for retired U.S. service members",
          address: "7 Sathorn Tai Road, Bangkok, Thailand",
          phone: "+66 2 287 1036",
          website: "https://myarmybenefits.us.army.mil/",
          category: "VA"
        },
        {
          name: "The Beekeeper House",
          description: "Specialized trauma and PTSD treatment using evidence-based therapies like EMDR, neurofeedback, and mindfulness",
          address: "Chiang Mai, Thailand",
          phone: "+66 62 436 3975",
          website: "https://beekeeperhouse.com/",
          category: "Treatment"
        },
        {
          name: "Bangkok Mental Health Hospital",
          description: "PTSD treatments including CBT, EMDR, group therapy, and mindfulness exercises",
          address: "Bangkok, Thailand",
          phone: "+66 2 136 3888",
          website: "https://bangkokmentalhealthhospital.com/",
          category: "Treatment"
        },
        {
          name: "Miracles Asia",
          description: "Residential programs for veterans dealing with PTSD and addiction, focusing on long-term recovery",
          address: "Phuket, Thailand",
          phone: "+66 98 317 1919",
          website: "https://miraclesasia.com/",
          category: "Treatment"
        },
        {
          name: "The Diamond Rehab Thailand",
          description: "Personalized PTSD and trauma treatment programs combining psychotherapy and holistic wellness practices",
          address: "Phuket, Thailand",
          phone: "+66 98 721 8529",
          website: "https://diamondrehabthailand.com/",
          category: "Treatment"
        },
        {
          name: "Veterans of Foreign Wars (VFW) Post 9951",
          description: "Assistance with VA benefits and claims in Bangkok",
          address: "Bangkok, Thailand",
          phone: "+66 81 889 0202",
          website: "https://vfw9951.org/",
          category: "Housing"
        },
        {
          name: "Veterans of Foreign Wars (VFW) Post 9876",
          description: "Offers 'buddy-buddy' program for peer support in Pattaya",
          address: "Pattaya, Thailand",
          phone: "+66 89 807 2335",
          website: "https://vfw9876.org/",
          category: "Crisis"
        },
        {
          name: "Veterans of Foreign Wars (VFW) Post 12074",
          description: "Community support and veteran assistance in Chiang Mai",
          address: "Chiang Mai, Thailand",
          phone: "+66 81 111 5956",
          website: "https://vfw12146.org/",
          category: "Housing"
        },
        {
          name: "American Legion Thailand Post TH01",
          description: "Assists veterans, spouses, and dependents with benefit questions and claims",
          address: "Bangkok, Thailand",
          phone: "+66 89 999 1570",
          website: "https://americanlegionthailand.com/",
          category: "Housing"
        },
        {
          name: "Veterans First Pattaya",
          description: "Supports veterans' mental health with personalized treatment plans addressing trauma and PTSD",
          address: "Pattaya, Thailand",
          phone: "+66 89 249 1646",
          website: "https://www.facebook.com/VeteransFirstPattaya/",
          category: "Crisis"
        },
        {
          name: "Horizon Rehab Center",
          description: "Hospital-affiliated residential and outpatient treatment for mental health and addiction recovery",
          address: "Bangkok, Thailand",
          phone: "+66 82 695 3494",
          website: "https://recovery.com/",
          category: "Treatment"
        },
        {
          name: "Manarom Hospital",
          description: "Comprehensive mental health services including counseling, psychotherapy, and group therapy",
          address: "Bangkok, Thailand",
          phone: "+66 2 282 0796",
          website: "https://www.manarom.com/",
          category: "Treatment"
        }
      ]
    },
    "Vietnam": {
      resources: [
        {
          name: "U.S. Embassy & Consulate Services - Vietnam",
          description: "Assistance with Veterans Affairs benefits, claims processing, and information on available services",
          address: "7 Lang Ha Street, Ba Dinh District, Hanoi, Vietnam",
          phone: "+84 24 3850 5000",
          website: "https://vn.usembassy.gov/",
          category: "VA"
        },
        {
          name: "U.S. Consulate General - Ho Chi Minh City",
          description: "Assistance with Veterans Affairs benefits and claims for veterans in southern Vietnam",
          address: "4 Le Duan Blvd, District 1, Ho Chi Minh City, Vietnam",
          phone: "+84 28 3520 4200",
          website: "https://vn.usembassy.gov/embassy-consulate/ho-chi-minh-city/",
          category: "VA"
        },
        {
          name: "Foreign Medical Program (FMP) - Vietnam",
          description: "Reimburses medical services related to VA-rated service-connected conditions",
          address: "N/A - U.S. based program",
          phone: "+1 833 930 0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "Treatment"
        },
        {
          name: "Family Medical Practice Vietnam",
          description: "Medical care, mental health services including PTSD counseling (FMP reimbursement eligible)",
          address: "Diamond Plaza, 34 Le Duan Blvd, District 1, Ho Chi Minh City, Vietnam",
          phone: "+84 28 3822 7848",
          website: "https://www.vietnammedicalpractice.com",
          category: "Treatment"
        },
        {
          name: "International SOS Vietnam",
          description: "Emergency medical services, specialist consultations, medical evacuations (FMP eligible)",
          address: "167A Nam Ky Khoi Nghia Street, District 3, Ho Chi Minh City, Vietnam",
          phone: "+84 28 3829 8520",
          website: "https://www.internationalsos.com/locations/asia-pacific/vietnam",
          category: "Crisis"
        },
        {
          name: "Veterans Crisis Line - International Access",
          description: "Confidential support for veterans in crisis and their families",
          address: "N/A - Call from anywhere",
          phone: "Dial 988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Australia": {
      resources: [
        {
          name: "U.S. Veterans Support - Sydney",
          description: "Assistance with FMP claims and medical referrals",
          address: "Martin Place, Sydney, NSW 2000, Australia",
          phone: "+61 2 9373 9200",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "Returned and Services League (RSL) Clubs",
          description: "Australian veterans clubs that welcome U.S. veterans",
          address: "Multiple locations throughout Australia",
          phone: "+61 2 9264 8188",
          website: "https://www.rslnsw.org.au/",
          category: "Crisis"
        },
        {
          name: "Veterans Mental Health Services - Melbourne",
          description: "Mental health services for veterans (FMP eligible)",
          address: "299 Swanston Street, Melbourne, VIC 3000, Australia",
          phone: "+61 3 9662 2911",
          website: "https://www.openarms.gov.au/",
          category: "Treatment"
        },
        {
          name: "U.S. Veterans Employment Network - Australia",
          description: "Job placement assistance for U.S. veterans in Australia",
          address: "Brisbane, QLD, Australia",
          phone: "+61 7 3305 1400",
          website: "https://www.usvets-australia.org/",
          category: "Employment"
        }
      ]
    },
    "New Zealand": {
      resources: [
        {
          name: "Auckland Veterans Support Center",
          description: "FMP claims assistance and medical referrals",
          address: "Queen Street, Auckland, New Zealand",
          phone: "+64 9 379 9779",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "Mental Health Services for Veterans - Wellington",
          description: "PTSD and mental health services for veterans",
          address: "Lambton Quay, Wellington, New Zealand",
          phone: "+64 4 801 5050",
          website: "https://www.mentalhealth.org.nz/",
          category: "Treatment"
        },
        {
          name: "Veterans Crisis Support - New Zealand",
          description: "Emergency support for veterans in crisis",
          address: "Auckland, New Zealand",
          phone: "+64 800 838 200",
          website: "https://www.veteranscrisisline.net/get-help/",
          category: "Crisis"
        }
      ]
    },
    "France": {
      resources: [
        {
          name: "Veterans Administration Support - Paris",
          description: "FMP claims assistance and referrals",
          address: "2 Avenue Gabriel, 75008 Paris, France",
          phone: "+33 1 43 12 22 22",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "American Hospital of Paris",
          description: "Medical services for U.S. veterans",
          address: "63 Boulevard Victor Hugo, 92200 Neuilly-sur-Seine, France",
          phone: "+33 1 46 41 25 25",
          website: "https://www.american-hospital.org/en/",
          category: "Treatment"
        },
        {
          name: "Veterans Mental Health Services - Paris",
          description: "PTSD and mental health support for veterans",
          address: "92 Boulevard du Montparnasse, 75014 Paris, France",
          phone: "+33 1 45 65 25 25",
          website: "https://www.american-hospital.org/en/",
          category: "Crisis"
        },
        {
          name: "U.S. Veterans Network - France",
          description: "Employment assistance for U.S. veterans",
          address: "Paris, France",
          phone: "+33 1 42 60 38 48",
          website: "https://www.americanlegion.fr/",
          category: "Employment"
        }
      ]
    },
    "Portugal": {
      resources: [
        {
          name: "U.S. Veterans Support - Lisbon",
          description: "FMP information and referrals",
          address: "Avenida das Forças Armadas, Lisbon, Portugal",
          phone: "+351 21 727 3300",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "American Veterans Services - Azores",
          description: "Support services for veterans in the Azores",
          address: "Lajes Field, Terceira Island, Azores, Portugal",
          phone: "+351 295 57 1037",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "Treatment"
        },
        {
          name: "Mental Health Center - Lisbon",
          description: "English-speaking mental health services",
          address: "Rua Castilho, Lisbon, Portugal",
          phone: "+351 21 353 0475",
          website: "https://www.lisbontherapy.com/",
          category: "Crisis"
        }
      ]
    },
    "Belgium": {
      resources: [
        {
          name: "Veterans Support Office - Brussels",
          description: "FMP assistance and NATO base connections",
          address: "Boulevard du Régent, Brussels, Belgium",
          phone: "+32 2 811 4000",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "SHAPE Healthcare Facility",
          description: "Medical services for eligible veterans",
          address: "SHAPE, 7010 Mons, Belgium",
          phone: "+32 65 44 5824",
          website: "https://tricare-overseas.com/",
          category: "Treatment"
        },
        {
          name: "Veterans Crisis Support - Belgium",
          description: "Crisis intervention for veterans",
          address: "Brussels, Belgium",
          phone: "+32 2 648 4000",
          website: "https://www.veteranscrisisline.net/get-help/european-support",
          category: "Crisis"
        },
        {
          name: "NATO Veterans Employment Assistance",
          description: "Employment opportunities through NATO connections",
          address: "SHAPE, Mons, Belgium",
          phone: "+32 65 44 3333",
          website: "https://www.natovetsjobs.com/",
          category: "Employment"
        }
      ]
    },
    "Greece": {
      resources: [
        {
          name: "Veterans Support - Athens",
          description: "FMP assistance and medical referrals",
          address: "Vassilissis Sofias Avenue, Athens, Greece",
          phone: "+30 210 721 2951",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "Athens Medical Center",
          description: "Medical services eligible for FMP reimbursement",
          address: "Kifisias Avenue, Athens, Greece",
          phone: "+30 210 686 7000",
          website: "https://www.iatriko.gr/en/",
          category: "Treatment"
        },
        {
          name: "Veterans Mental Health Support - Athens",
          description: "PTSD and mental health services",
          address: "Skoufa Street, Athens, Greece",
          phone: "+30 210 364 5104",
          website: "https://www.athenscounseling.com/",
          category: "Crisis"
        }
      ]
    },
    "Israel": {
      resources: [
        {
          name: "Veterans Support Services - Tel Aviv",
          description: "FMP assistance and medical referrals",
          address: "HaYarkon Street, Tel Aviv, Israel",
          phone: "+972 3 519 7575",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "American Medical Center - Jerusalem",
          description: "Medical services for U.S. veterans",
          address: "King David Street, Jerusalem, Israel",
          phone: "+972 2 625 8844",
          website: "https://www.terem.com/en/",
          category: "Treatment"
        },
        {
          name: "PTSD Treatment Center - Tel Aviv",
          description: "Specialized trauma treatment for veterans",
          address: "Weizmann Street, Tel Aviv, Israel",
          phone: "+972 3 697 3650",
          website: "https://www.traumacenter.org.il/",
          category: "Crisis"
        }
      ]
    },
    "United Arab Emirates": {
      resources: [
        {
          name: "U.S. Veterans Support - Dubai",
          description: "FMP assistance and medical referrals",
          address: "Sheikh Zayed Road, Dubai, UAE",
          phone: "+971 4 309 4000",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "American Hospital Dubai",
          description: "Medical services eligible for FMP reimbursement",
          address: "Oud Metha Road, Dubai, UAE",
          phone: "+971 4 377 6666",
          website: "https://www.ahdubai.com/",
          category: "Treatment"
        },
        {
          name: "Veterans Mental Health Services - Abu Dhabi",
          description: "Mental health support for veterans",
          address: "Al Bateen, Abu Dhabi, UAE",
          phone: "+971 2 666 8044",
          website: "https://www.amheldubai.ae/",
          category: "Crisis"
        },
        {
          name: "Veterans Employment Network - UAE",
          description: "Employment assistance in security and oil/gas sectors",
          address: "Dubai Internet City, Dubai, UAE",
          phone: "+971 4 391 1122",
          website: "https://www.veteransjobs-uae.com/",
          category: "Employment"
        }
      ]
    },
    "South Africa": {
      resources: [
        {
          name: "U.S. Veterans Support - Cape Town",
          description: "FMP assistance and medical referrals",
          address: "Adderley Street, Cape Town, South Africa",
          phone: "+27 21 702 7300",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "Mediclinic Cape Town",
          description: "Medical services eligible for FMP reimbursement",
          address: "21 Hof Street, Gardens, Cape Town, South Africa",
          phone: "+27 21 464 5500",
          website: "https://www.mediclinic.co.za/",
          category: "Treatment"
        },
        {
          name: "PTSD Treatment Center - Johannesburg",
          description: "Trauma and PTSD services for veterans",
          address: "Sandton, Johannesburg, South Africa",
          phone: "+27 11 884 4030",
          website: "https://www.psychotherapy.co.za/",
          category: "Crisis"
        }
      ]
    }
  };
  
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
          name: "Colonel Mary Louise Rasmuson Campus - Alaska VA Healthcare System",
          description: "Comprehensive primary care, mental health services, and programs for homeless veterans",
          address: "1201 North Muldoon Road, Anchorage, AK 99504-6104",
          phone: "888-353-7574",
          website: "https://www.va.gov/alaska-health-care/",
          category: "VA"
        },
        {
          name: "Joint Base Elmendorf-Richardson VA Medical Center",
          description: "Specialty care services, mental health care, and 24/7 emergency care",
          address: "5955 Zeamer Avenue, Joint Base Elmendorf-Richardson, AK 99506-3702",
          phone: "888-353-7574",
          website: "https://www.va.gov/alaska-health-care/locations/joint-base-elmendorf-richardson/",
          category: "VA"
        },
        {
          name: "Fairbanks VA Clinic",
          description: "Primary care, mental health care, audiology, and women's health services",
          address: "2555 Phillips Field Road, Fairbanks, AK 99709-3933",
          phone: "888-353-7574",
          website: "https://www.va.gov/alaska-health-care/locations/fairbanks-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Anchorage Vet Center",
          description: "Counseling and outreach services to veterans and their families",
          address: "4201 Tudor Centre Drive, Suite 115, Anchorage, AK 99508",
          phone: "907-563-6966",
          website: "https://www.va.gov/find-locations/facility/vc_0521V",
          category: "Crisis"
        },
        {
          name: "Alaska Office of Veterans Affairs",
          description: "Information on healthcare benefits, eligibility and services for Alaska veterans",
          address: "1111 West 8th Street, Juneau, AK 99801",
          phone: "907-465-2151",
          website: "https://veterans.alaska.gov/",
          category: "Employment"
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
          category: "VA",
          zipCode: "85012"
        },
        {
          name: "U.S.VETS - Phoenix",
          description: "Transitional housing and permanent housing assistance",
          address: "3507 N. Central Ave, Phoenix, AZ 85012",
          phone: "(602) 305-8585",
          website: "https://usvets.org/locations/phoenix/",
          category: "Housing",
          zipCode: "85012"
        },
        {
          name: "Arizona Veterans StandDown Alliance",
          description: "Employment and job training services",
          address: "1125 W. Jackson Street, Phoenix, AZ 85007",
          phone: "(602) 340-9393",
          website: "https://arizonastanddown.org",
          category: "Employment",
          zipCode: "85007"
        },
        {
          name: "Southwest Behavioral Health Services",
          description: "Mental health and substance abuse treatment",
          address: "3450 N. 3rd Street, Phoenix, AZ 85012",
          phone: "(602) 265-8338",
          website: "https://www.sbhservices.org/",
          category: "Treatment",
          zipCode: "85012"
        },
        {
          name: "Arizona Coalition for Military Families",
          description: "Crisis intervention and support services",
          address: "2929 N Central Ave, Phoenix, AZ 85012",
          phone: "(602) 753-8802",
          website: "https://arizonacoalition.org/",
          category: "Crisis",
          zipCode: "85012"
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
          category: "VA",
          zipCode: "72205"
        },
        {
          name: "St. Francis House Veterans Program",
          description: "Transitional housing and support services",
          address: "2701 S Elm St, Little Rock, AR 72204",
          phone: "(501) 664-5036",
          website: "https://stfrancisministries.org",
          category: "Housing",
          zipCode: "72204"
        },
        {
          name: "Arkansas Veterans Industries",
          description: "Employment and job training for veterans",
          address: "2200 Fort Roots Drive, North Little Rock, AR 72114",
          phone: "(501) 257-3288",
          website: "https://arkansasveterans.org",
          category: "Employment",
          zipCode: "72114"
        },
        {
          name: "Veterans Recovery Center",
          description: "Mental health and substance abuse treatment",
          address: "1000 Main Street, Little Rock, AR 72201",
          phone: "(501) 372-4361",
          website: "https://vrcarkansas.org",
          category: "Treatment",
          zipCode: "72201"
        },
        {
          name: "Arkansas Veterans Crisis Line",
          description: "24/7 crisis support and intervention",
          address: "1200 John Barrow Rd, Little Rock, AR 72205",
          phone: "(800) 273-8255",
          website: "https://arkansasveteranscrisis.org",
          category: "Crisis",
          zipCode: "72205"
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
          category: "VA",
          zipCode: "80045"
        },
        {
          name: "Colorado Veterans Resource Coalition",
          description: "Housing assistance and support services",
          address: "400 W. Bijou Street, Colorado Springs, CO 80905",
          phone: "(719) 477-2560",
          website: "https://cvrc.org",
          category: "Housing",
          zipCode: "80905"
        },
        {
          name: "Denver Vet Center",
          description: "Mental health and counseling services",
          address: "7465 E. 1st Ave, Suite B, Denver, CO 80230",
          phone: "(303) 326-0645",
          website: "https://www.va.gov/denver-vet-center/",
          category: "Treatment",
          zipCode: "80230"
        },
        {
          name: "Veterans Crisis Line Colorado",
          description: "24/7 crisis support and suicide prevention",
          address: "1055 Clermont Street, Denver, CO 80220",
          phone: "(800) 273-8255",
          website: "https://www.veteranscrisisline.net",
          category: "Crisis",
          zipCode: "80220"
        },
        {
          name: "Colorado Veterans Job Connect",
          description: "Employment services and job training",
          address: "1515 Arapahoe Street, Denver, CO 80202",
          phone: "(303) 318-8850",
          website: "https://cdle.colorado.gov/vets",
          category: "Employment",
          zipCode: "80202"
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
          category: "VA",
          zipCode: "06516"
        },
        {
          name: "Columbus House Veterans Program",
          description: "Transitional housing and support services for veterans",
          address: "586 Ella T Grasso Boulevard, New Haven, CT 06519",
          phone: "(203) 401-4400",
          website: "https://www.columbushouse.org/programs/veterans",
          category: "Housing",
          zipCode: "06519"
        },
        {
          name: "CT Veterans Job Program",
          description: "Employment assistance and job training",
          address: "25 Sigourney Street, Hartford, CT 06106",
          phone: "(860) 263-6000",
          website: "https://www.ctdol.state.ct.us/veterans/default.htm",
          category: "Employment",
          zipCode: "06106"
        },
        {
          name: "Veterans Recovery Center - CT",
          description: "Substance abuse and mental health treatment",
          address: "287 W Main St, New Britain, CT 06052",
          phone: "(860) 224-7885",
          website: "https://www.wheelerhealth.org/services/veterans-services/",
          category: "Treatment",
          zipCode: "06052"
        },
        {
          name: "CT Veterans Crisis Support",
          description: "24/7 crisis intervention and support",
          address: "1 Long Wharf Drive, New Haven, CT 06511",
          phone: "(800) 273-8255",
          website: "https://www.211ct.org/search/veterans",
          category: "Crisis",
          zipCode: "06511"
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
          category: "VA",
          zipCode: "19805"
        },
        {
          name: "Veterans Outreach Center",
          description: "Housing assistance and support services",
          address: "802 West Street, Wilmington, DE 19801",
          phone: "(302) 777-1800",
          website: "https://delawareveterans.org",
          category: "Housing",
          zipCode: "19801"
        },
        {
          name: "Delaware Veterans Job Bank",
          description: "Employment services and job training",
          address: "4425 North Market Street, Wilmington, DE 19802",
          phone: "(302) 761-8200",
          website: "https://labor.delaware.gov/divisions/employment-training/veterans-services/",
          category: "Employment",
          zipCode: "19802"
        },
        {
          name: "Delaware Veterans Treatment Center",
          description: "Mental health and substance abuse treatment",
          address: "500 West 10th Street, Wilmington, DE 19801",
          phone: "(302) 655-3261",
          website: "https://www.delawarevetcenter.org",
          category: "Treatment",
          zipCode: "19801"
        },
        {
          name: "Delaware Veterans Crisis Line",
          description: "24/7 crisis support and intervention",
          address: "1901 North DuPont Highway, New Castle, DE 19720",
          phone: "(800) 273-8255",
          website: "https://veterans.delaware.gov/crisis",
          category: "Crisis",
          zipCode: "19720"
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

  // Get resources based on whether domestic or international is selected
  const filteredResources = isInternational
    ? (selectedCountry 
        ? countryData[selectedCountry]?.resources.filter(
            resource => category === "all" || resource.category === category
          ) || []
        : [])
    : (selectedState
        ? stateData[selectedState]?.resources.filter(
            resource => category === "all" || resource.category === category
          ) || []
        : []);

  return (
    <MainLayout>
      <PageHeader
        title="Find Local Support Resources"
        description="Connect with veteran support services in your area. Select your state or enter your ZIP code to find resources near you."
      />

      <div className="bg-[#141e2f] text-white p-4 sm:p-6 rounded-lg mb-6 sm:mb-10">
        {/* Toggle between US and International */}
        <div className="flex items-center justify-start gap-4 mb-6">
          <Button
            variant={!isInternational ? "default" : "outline"}
            onClick={() => {
              trackNavClick({ navType: "toggle", value: "United States" });
              setIsInternational(false);
              setSelectedState("");
              setSelectedCountry("");
            }}
            className={`rounded-full px-6 font-medium ${!isInternational ? 'bg-[#3e64dd] hover:bg-[#2a4bba] text-white' : 'text-[#3e64dd] border-[#3e64dd] hover:bg-[#3e64dd]/10'}`}
          >
            United States
          </Button>
          <Button
            variant={isInternational ? "default" : "outline"}
            onClick={() => {
              trackNavClick({ navType: "toggle", value: "International" });
              setIsInternational(true);
              setSelectedState("");
              setSelectedCountry("");
            }}
            className={`rounded-full px-6 font-medium ${isInternational ? 'bg-[#3e64dd] hover:bg-[#2a4bba] text-white' : 'text-[#3e64dd] border-[#3e64dd] hover:bg-[#3e64dd]/10'}`}
          >
            International
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4">
          {isInternational ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Select
                value={selectedCountry}
                onValueChange={(value) => {
                  trackNavClick({ navType: "country_select", value });
                  setSelectedCountry(value);
                }}
              >
                <SelectTrigger className="bg-[#1c2537] border-none text-white h-11 sm:h-10">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-[40vh] overflow-y-auto">
                  {Object.keys(countryData).map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Select
                value={selectedState}
                onValueChange={(value) => {
                  trackNavClick({ navType: "state_select", value });
                  setSelectedState(value);
                }}
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
          )}

          {!isInternational && (
            <>
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

              {/* Search radius component has been removed */}
            </>
          )}

          <div className={`space-y-2 ${isInternational ? 'sm:col-span-3 lg:col-span-3' : ''}`}>
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
            if (selectedState || selectedCountry) {
              const element = document.getElementById('resources-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Search Resources
        </Button>
      </div>

      {(selectedState || selectedCountry) && (
        <div id="resources-section">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Resources in {isInternational ? selectedCountry : selectedState}
          </h2>

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
                      variant="outline"
                      className="w-full sm:w-auto justify-center text-[#3e64dd] border-[#3e64dd]/30 hover:bg-[#3e64dd]/10"
                      onClick={() => {
                        // Track based on whether we're looking at a state or country
                        if (isInternational) {
                          trackStateResourceClick({
                            state: selectedCountry, // Use country as the "state" for tracking
                            resourceName: resource.name,
                            category: resource.category
                          }, () => {
                            window.open(resource.website, "_blank", "noopener,noreferrer");
                          });
                        } else {
                          trackStateResourceClick({
                            state: selectedState,
                            resourceName: resource.name,
                            category: resource.category
                          }, () => {
                            window.open(resource.website, "_blank", "noopener,noreferrer");
                          });
                        }
                      }}
                    >
                      Visit Website
                    </Button>
                    {resource.address && (
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto justify-center"
                        onClick={() => {
                          // Track based on whether we're looking at a state or country
                          if (isInternational) {
                            trackStateResourceClick({
                              state: selectedCountry, // Use country as the "state" for tracking
                              resourceName: resource.name,
                              category: resource.category
                            }, () => {
                              window.open(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address || '')}`,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            });
                          } else {
                            trackStateResourceClick({
                              state: selectedState,
                              resourceName: resource.name,
                              category: resource.category
                            }, () => {
                              window.open(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address || '')}`,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            });
                          }
                        }}
                      >
                        Get Directions
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

      {/* Crisis resources section removed for now since international emergency numbers aren't available yet */}
      
      {!selectedState && !selectedCountry && (
        <div className="bg-gray-50 rounded-lg p-4 sm:p-8 text-center">
          {isInternational ? (
            <>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Select a country to view international resources</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Find resources for U.S. veterans living overseas in these countries.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-h-[60vh] overflow-y-auto p-1">
                {Object.entries(countryData).map(([country, data]) => (
                  <Button 
                    key={country}
                    variant="outline" 
                    className="w-full flex items-center justify-center py-4 border-[#3e64dd]/30 text-[#3e64dd] hover:bg-[#3e64dd]/10 hover:text-[#3e64dd] hover:border-[#3e64dd]"
                    onClick={() => {
                      trackNavClick({ navType: "country_select", value: country });
                      setSelectedCountry(country);
                    }}
                  >
                    <span className="font-medium text-center">{country}</span>
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Select a state to view resources</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Select a state below to view available local resources for veterans.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-h-[60vh] overflow-y-auto p-1">
                {Object.entries(stateData).map(([state, data]) => (
                  <Button 
                    key={state}
                    variant="outline" 
                    className="w-full flex items-center justify-center py-4 border-[#3e64dd]/30 text-[#3e64dd] hover:bg-[#3e64dd]/10 hover:text-[#3e64dd] hover:border-[#3e64dd]"
                    onClick={() => {
                      trackNavClick({ navType: "state_select", value: state });
                      setSelectedState(state);
                    }}
                  >
                    <span className="font-medium text-center">{state}</span>
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      
      {/* We've moved the crisis resources section above the state/country selectors */}
      
      {/* Floating help button removed since emergency numbers are location-dependent */}
    </MainLayout>
  );
}