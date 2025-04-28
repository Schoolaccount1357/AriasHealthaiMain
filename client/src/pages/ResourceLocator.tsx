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
          description: "The only full-service VA clinic outside U.S. territories, offering primary care, mental health services, and assistance with FMP",
          address: "1501 Roxas Boulevard, NOX3 Seafront Compound, Pasay City, PH 01302",
          phone: "+63 (02) 8550-3888 / U.S. Line: 808-433-5254",
          website: "https://www.va.gov/manila-philippines-health-care/",
          category: "VA"
        },
        {
          name: "Veterans Service Center - Manila",
          description: "Benefits assistance, claims processing, compensation, pension, and vocational rehabilitation",
          address: "1131 Roxas Boulevard, Ermita, Manila, 0930 Philippines",
          phone: "Toll-Free (Philippines): #MyVA (#6982)",
          website: "https://www.benefits.va.gov/manila/",
          category: "VA"
        },
        {
          name: "Foreign Medical Program (FMP) - Philippines",
          description: "Provides healthcare benefits to veterans with VA-rated, service-connected conditions residing in the Philippines",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or U.S./Canada Toll-Free: 877-345-8179",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "Philippine Crisis Support",
          description: "Mental health support, suicide prevention resources for veterans",
          address: "U.S. Embassy, 1201 Roxas Boulevard, Ermita, Manila, 1000 Philippines",
          phone: "+63 (2) 5301-2000",
          website: "https://ph.usembassy.gov/u-s-citizen-services/",
          category: "Crisis"
        },
        {
          name: "Veterans Crisis Line (International Access)",
          description: "24/7 support for veterans, service members, and their families, even if not enrolled in VA benefits",
          address: "Nationwide service",
          phone: "Pacific Region: 844-702-5493 or DSN 988",
          website: "https://www.veteranscrisisline.net/",
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
          name: "Foreign Medical Program (FMP) - Germany",
          description: "Provides healthcare benefits to veterans with VA-rated, service-connected conditions residing in Germany",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or Germany Toll-Free: 0800-1800-011",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
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
          name: "Veterans Crisis Line - Europe",
          description: "24/7 crisis intervention services for veterans in Germany and Europe",
          address: "Ramstein Air Base, 66877 Ramstein-Miesenbach, Germany",
          phone: "Europe: 844-702-5495 or DSN 988",
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
          name: "Foreign Medical Program (FMP) - Japan",
          description: "Provides healthcare benefits to veterans with VA-rated, service-connected conditions residing in Japan",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Japan Toll-Free: 00531-13-0871",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
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
          name: "Veterans Crisis Line - Pacific",
          description: "24/7 support for veterans, service members, and their families in crisis",
          address: "Accessible throughout Japan",
          phone: "Pacific Region: 844-702-5493 or DSN 988",
          website: "https://www.veteranscrisisline.net/get-help/",
          category: "Crisis"
        }
      ]
    },
    "South Korea": {
      resources: [
        {
          name: "Brian D. Allgood Army Community Hospital",
          description: "Comprehensive medical care for active-duty, retirees, and families (formerly 121st Combat Support Hospital)",
          address: "USAG Humphreys, Pyeongtaek, South Korea",
          phone: "+82 2 7917 3155",
          website: "https://briandallgood.tricare.mil/",
          category: "VA"
        },
        {
          name: "Foreign Medical Program (FMP) - South Korea",
          description: "Provides healthcare benefits to veterans with VA-rated, service-connected conditions residing in South Korea",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or U.S./Canada Toll-Free: 877-345-8179",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
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
          name: "Army Substance Abuse Program (ASAP) - USAG Humphreys",
          description: "Substance abuse prevention, counseling, and rehabilitation services",
          address: "USAG Humphreys, Pyeongtaek, South Korea",
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
          name: "Veterans Crisis Line - Pacific",
          description: "24/7 support for veterans, service members, and their families in crisis",
          address: "Accessible throughout South Korea",
          phone: "Pacific Region: 844-702-5493 or DSN 988",
          website: "https://www.veteranscrisisline.net/get-help/",
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
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "+1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
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
          name: "U.S. Consulate General - Sydney",
          description: "Consular services including assistance with Federal Benefits Unit (FBU) claims and medical referrals",
          address: "Level 10, MLC Centre, 19-29 Martin Place, Sydney, NSW 2000, Australia",
          phone: "+61 2 9373 9200",
          website: "https://au.usembassy.gov/embassy-consulates/sydney/",
          category: "VA"
        },
        {
          name: "Returned and Services League (RSL) Clubs",
          description: "Support services, camaraderie, and community engagement for veterans including U.S. veterans",
          address: "Multiple locations throughout Australia",
          phone: "+61 2 9264 8188",
          website: "https://www.rslnational.org/",
          category: "Housing"
        },
        {
          name: "Veterans Mental Health Services - Melbourne",
          description: "Mental health services for veterans eligible under the Foreign Medical Program (FMP)",
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
          website: "https://www.dva.gov.au/civilian-life/finding-employment-after-service",
          category: "Employment"
        },
        {
          name: "Open Arms - Veterans & Families Counselling",
          description: "Free and confidential counselling and support services (U.S. veterans may inquire about eligibility)",
          address: "Multiple locations across Australia",
          phone: "+61 1800 011 046",
          website: "https://www.openarms.gov.au/",
          category: "Treatment"
        },
        {
          name: "Soldier On Australia",
          description: "Mental health support, employment assistance, and social connection activities for all veterans including those from allied nations",
          address: "Multiple locations across Australia",
          phone: "+61 1300 620 380",
          website: "https://soldieron.org.au/",
          category: "Crisis"
        },
        {
          name: "Veteran Employment Program",
          description: "Australian Government initiative supporting veterans transitioning to civilian employment",
          address: "Canberra, ACT, Australia",
          phone: "+61 1800 555 254",
          website: "https://veteransemployment.gov.au/",
          category: "Employment"
        },
        {
          name: "RSL Veterans' Employment Program",
          description: "Employment support including resume development and job placement assistance for all veterans residing in Australia",
          address: "Multiple RSL locations across Australia",
          phone: "+61 2 9264 8188",
          website: "https://rslnsw.org.au/veterans-services/employment/",
          category: "Employment"
        }
      ]
    },
    "New Zealand": {
      resources: [
        {
          name: "Foreign Medical Program (FMP) - New Zealand",
          description: "Provides healthcare benefits to U.S. veterans with VA-rated, service-connected conditions residing in New Zealand",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or Australia Toll-Free: 1-800-354-965",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "Veterans' Affairs New Zealand (VANZ)",
          description: "Provides support to New Zealand veterans, including health, rehabilitation, and financial assistance",
          address: "Wellington, New Zealand",
          phone: "NZ: 0800 483 8372 | Australia: 1800 483 837 | International: +64 4 495 2070",
          website: "https://www.veteransaffairs.mil.nz/",
          category: "VA"
        },
        {
          name: "Mental Health Services for Veterans - Wellington",
          description: "Offers mental health and PTSD treatment services for veterans",
          address: "Lambton Quay, Wellington, New Zealand",
          phone: "+64 4 801 5050",
          website: "https://www.mentalhealth.org.nz/",
          category: "Treatment"
        },
        {
          name: "Wellington Hospital Mental Health Services",
          description: "Provides comprehensive mental health services, including inpatient care for veterans",
          address: "Riddiford Street, Newtown, Wellington 6021, New Zealand",
          phone: "+64 4 385 5999",
          website: "https://www.ccdhb.org.nz/our-services/mental-health-addiction-and-intellectual-disability-service/",
          category: "Treatment"
        },
        {
          name: "Royal New Zealand Returned and Services' Association (RSA)",
          description: "Offers support to veterans and their families, including advocacy, welfare services, and community engagement",
          address: "National Office, Wellington, New Zealand",
          phone: "+64 4 384 7994",
          website: "https://www.rsa.org.nz/",
          category: "Employment"
        },
        {
          name: "Veterans Crisis Support - Lifeline Aotearoa",
          description: "24/7 crisis support and suicide prevention services for veterans",
          address: "National service, New Zealand",
          phone: "0800 543 354",
          website: "https://www.lifeline.org.nz/",
          category: "Crisis"
        },
        {
          name: "Samaritans New Zealand",
          description: "Confidential support for anyone in emotional distress or suicidal crisis",
          address: "National service, New Zealand",
          phone: "0800 726 666",
          website: "https://www.samaritans.org.nz/",
          category: "Crisis"
        },
        {
          name: "Need to Talk - New Zealand",
          description: "Free call or text service for mental health support",
          address: "National service, New Zealand",
          phone: "1737 (call or text)",
          website: "https://1737.org.nz/",
          category: "Crisis"
        },
        {
          name: "NZDF4U Support Line",
          description: "Confidential support line for New Zealand Defence Force personnel and veterans",
          address: "National service, New Zealand",
          phone: "0800 693 348",
          website: "https://www.nzdf.mil.nz/nzdf/health-and-wellbeing/",
          category: "Crisis"
        }
      ]
    },
    "France": {
      resources: [
        {
          name: "Foreign Medical Program (FMP) - France",
          description: "Provides healthcare benefits to U.S. veterans with VA-rated, service-connected conditions residing in France",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or Germany Toll-Free: 0800-1800-011",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        },
        {
          name: "American Hospital of Paris",
          description: "Private, not-for-profit hospital established in 1906, recognized by U.S. Congress and the French government with dual accreditation",
          address: "63 Boulevard Victor Hugo, 92200 Neuilly-sur-Seine, France",
          phone: "+33 1 46 41 25 25",
          website: "https://www.american-hospital.org/en/",
          category: "Treatment"
        },
        {
          name: "Sainte-Anne Hospital Center",
          description: "Specializes in psychiatry, neurology, neurosurgery, neuroimaging, and addiction for comprehensive mental health services",
          address: "1 Rue Cabanis, 75014 Paris, France",
          phone: "+33 1 45 65 81 00",
          website: "http://www.ch-sainte-anne.fr/",
          category: "Treatment"
        },
        {
          name: "Medical and Psychological Emergency Units (CUMP)",
          description: "Immediate assistance for veterans affected by traumatic events such as natural disasters or terrorist attacks",
          address: "Various locations throughout France",
          phone: "Emergency: 15 (SAMU)",
          website: "https://www.gouvernement.fr/risques",
          category: "Treatment"
        },
        {
          name: "Suicide Écoute",
          description: "24/7 free, compassionate, and confidential support by phone for individuals in crisis",
          address: "Paris, France",
          phone: "+33 1 45 39 40 00",
          website: "https://www.suicide-ecoute.fr/",
          category: "Crisis"
        },
        {
          name: "3114 – National Suicide Prevention Number",
          description: "France's national suicide prevention hotline, offering free and confidential support 24/7",
          address: "Nationwide service, France",
          phone: "3114",
          website: "https://3114.fr/",
          category: "Crisis"
        },
        {
          name: "U.S. Veterans Network - France",
          description: "Employment assistance for U.S. veterans residing in France",
          address: "Paris, France",
          phone: "+33 1 42 60 38 48",
          website: "https://www.legion.org/veteransbenefits/employment",
          category: "Employment"
        }
      ]
    },
    "Portugal": {
      resources: [
        {
          name: "U.S. Embassy Lisbon",
          description: "Provides assistance with information related to the Foreign Medical Program (FMP) and other consular services for U.S. veterans",
          address: "Avenida das Forças Armadas 1600-081 Lisbon, Portugal",
          phone: "+351 21 727 3300",
          website: "https://pt.usembassy.gov/",
          category: "VA"
        },
        {
          name: "Lajes Field - Terceira Island, Azores",
          description: "U.S. military base with medical facilities and various support services potentially accessible to veterans",
          address: "Lajes Field, Azores, Portugal",
          phone: "+351 295 57 1115",
          website: "https://www.facebook.com/LajesField/",
          category: "Treatment"
        },
        {
          name: "U.S. Embassy Medical Referrals",
          description: "Referrals to appropriate English-speaking medical and mental health services in Portugal",
          address: "Avenida das Forças Armadas 1600-081 Lisbon, Portugal",
          phone: "+351 21 727 3300",
          website: "https://pt.usembassy.gov/u-s-citizen-services/",
          category: "Treatment"
        },
        {
          name: "Hospital da Luz",
          description: "Major private hospital with English-speaking providers that may accept FMP reimbursement",
          address: "Avenida Lusíada 100, 1500-650 Lisbon, Portugal",
          phone: "+351 21 710 4400",
          website: "https://www.hospitaldaluz.pt/en/",
          category: "Treatment"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in Portugal",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        }
      ]
    },
    "Belgium": {
      resources: [
        {
          name: "U.S. Embassy Brussels",
          description: "Provides assistance with FMP-related inquiries and other consular services for veterans",
          address: "Regentlaan 27 Boulevard du Régent, B-1000 Brussels, Belgium",
          phone: "+32 2 811 4000",
          website: "https://be.usembassy.gov/",
          category: "VA"
        },
        {
          name: "SHAPE Healthcare Facility",
          description: "Offers outpatient services including family practice, pediatrics, optometry, dental, and behavioral health",
          address: "Building 401, Avenue d'Oslo, 7010 Mons, Belgium",
          phone: "+32 65 44 5824",
          website: "https://mhs-europe.tricare.mil/SHAPE",
          category: "Treatment"
        },
        {
          name: "Community Help Service (CHS) - Brussels",
          description: "Provides confidential, English-speaking mental health support and crisis intervention services",
          address: "Brussels, Belgium",
          phone: "+32 2 648 40 14",
          website: "https://www.chsbelgium.org/",
          category: "Crisis"
        },
        {
          name: "NATO Employment Opportunities",
          description: "Employment opportunities through NATO connections for veterans",
          address: "SHAPE Human Resources Office, Mons, Belgium",
          phone: "+32 65 44 3333",
          website: "https://www.nato.int/careers",
          category: "Employment"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in Belgium",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or Germany Toll-Free: 0800-1800-011",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
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
          name: "U.S. Embassy Branch Office - Tel Aviv",
          description: "Provides assistance to veterans, including information on the Foreign Medical Program (FMP) and medical referrals",
          address: "71 HaYarkon Street, Tel Aviv 6343229, Israel",
          phone: "+972 3 519 7575",
          website: "https://il.usembassy.gov/u-s-citizen-services/veterans-affairs/",
          category: "VA"
        },
        {
          name: "Tel Aviv University - National PTSD Clinic",
          description: "Specialized trauma treatment for veterans and civilians, launched in January 2024",
          address: "Tel Aviv University, Tel Aviv, Israel",
          phone: "+972 3 640 8111",
          website: "https://english.tau.ac.il/",
          category: "Treatment"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in Israel",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        }
      ]
    },
    "United Arab Emirates": {
      resources: [
        {
          name: "U.S. Embassy - Abu Dhabi",
          description: "Provides assistance to veterans with FMP information and consular services",
          address: "P.O. Box 4009, Abu Dhabi, UAE",
          phone: "+971 2 414 2200",
          website: "https://ae.usembassy.gov/u-s-citizen-services/",
          category: "VA"
        },
        {
          name: "American Hospital Dubai",
          description: "Medical services eligible for FMP reimbursement, recognized for high standards of care",
          address: "19th Street, Oud Metha, Dubai, UAE",
          phone: "+971 4 377 6666",
          website: "https://www.ahdubai.com/",
          category: "Treatment"
        },
        {
          name: "Aspris Wellbeing Centre - Abu Dhabi",
          description: "Provides mental health support services, including for veterans",
          address: "Al Bateen, Abu Dhabi, UAE",
          phone: "+971 2 651 8111",
          website: "https://www.asprismentalhealth.ae/",
          category: "Crisis"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in UAE",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        }
      ]
    },
    "South Africa": {
      resources: [
        {
          name: "U.S. Embassy - Pretoria",
          description: "Provides FMP assistance and medical referrals for U.S. veterans in South Africa",
          address: "877 Pretorius Street, Arcadia, Pretoria, 0083, South Africa",
          phone: "+27 12 431 4000",
          website: "https://za.usembassy.gov/u-s-citizen-services/",
          category: "VA"
        },
        {
          name: "Mediclinic Cape Town",
          description: "Medical services eligible for FMP reimbursement",
          address: "21 Hof Street, Oranjezicht, Cape Town, 8001, South Africa",
          phone: "+27 21 464 5500",
          website: "https://www.mediclinic.co.za/",
          category: "Treatment"
        },
        {
          name: "Recovery Direct - Johannesburg",
          description: "Specializes in trauma and PTSD services for veterans",
          address: "Sandton, Johannesburg, South Africa",
          phone: "+27 11 884 4030",
          website: "https://www.recoverydirect.net/",
          category: "Crisis"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in South Africa",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
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
        },
        {
          name: "Bay Pines VA Healthcare System",
          description: "Comprehensive healthcare services including primary care, mental health, and specialty care",
          address: "10000 Bay Pines Blvd, Bay Pines, FL 33744",
          phone: "(727) 398-6661",
          website: "https://www.va.gov/bay-pines-health-care/",
          category: "VA"
        },
        {
          name: "Bruce W. Carter VA Medical Center",
          description: "Full-service healthcare facility offering primary care, specialty services, and mental health",
          address: "1201 NW 16th Street, Miami, FL 33125",
          phone: "(305) 575-7000",
          website: "https://www.va.gov/miami-health-care/",
          category: "VA"
        },
        {
          name: "Malcom Randall VA Medical Center",
          description: "Comprehensive medical care including surgery, mental health, and specialty services",
          address: "1601 SW Archer Road, Gainesville, FL 32608",
          phone: "(352) 376-1611",
          website: "https://www.northflorida.va.gov/locations/gainesville.asp",
          category: "VA"
        },
        {
          name: "Lake City VA Medical Center",
          description: "Medical care for veterans including primary care, specialty care, and mental health services",
          address: "619 South Marion Avenue, Lake City, FL 32025",
          phone: "(386) 755-3016",
          website: "https://www.northflorida.va.gov/locations/lakecity.asp",
          category: "VA"
        },
        {
          name: "Orlando VA Medical Center",
          description: "State-of-the-art healthcare facility providing primary care, specialty services, and mental health",
          address: "13800 Veterans Way, Orlando, FL 32827",
          phone: "(407) 631-1000",
          website: "https://www.orlando.va.gov/",
          category: "VA"
        },
        {
          name: "West Palm Beach VA Medical Center",
          description: "Comprehensive healthcare services including primary care, specialty care, and mental health",
          address: "7305 N. Military Trail, West Palm Beach, FL 33410",
          phone: "(561) 422-8262",
          website: "https://www.westpalmbeach.va.gov/",
          category: "VA"
        },
        {
          name: "Florida Veterans Support Line",
          description: "24/7 confidential support and resource referrals from trained specialists, many of whom are veterans",
          address: "Statewide service",
          phone: "1-844-MyFLVet (1-844-693-5838)",
          website: "https://www.myflfamilies.com/service-programs/mental-health/florida-veterans-support-line/",
          category: "Crisis"
        },
        {
          name: "Home Base Florida",
          description: "Clinical care, wellness, and support for veterans and families dealing with PTSD and traumatic brain injury",
          address: "3050 Horseshoe Drive N, Naples, FL 34104",
          phone: "(239) 338-8389",
          website: "https://homebase.org/florida/",
          category: "Treatment"
        },
        {
          name: "HUD-VASH Program Florida",
          description: "Combines HUD housing vouchers with VA supportive services to assist homeless veterans",
          address: "Multiple locations throughout Florida",
          phone: "Contact local VA Medical Center",
          website: "https://www.va.gov/homeless/hud-vash.asp",
          category: "Housing"
        },
        {
          name: "Volunteers of America Florida",
          description: "Transitional housing and support services for veterans dealing with homelessness, mental health, and substance abuse",
          address: "1771 N. Semoran Blvd, Suite A, Orlando, FL 32807",
          phone: "(407) 273-6686",
          website: "https://www.voaflorida.org/veterans/",
          category: "Housing"
        },
        {
          name: "Florida Department of Veterans' Affairs (FDVA)",
          description: "State agency providing benefits assistance, employment services, and connecting veterans to resources",
          address: "11351 Ulmerton Road, Suite 311, Largo, FL 33778",
          phone: "(727) 518-3202",
          website: "https://www.floridavets.org/",
          category: "Employment"
        },
        {
          name: "Wounded Warrior Project - Jacksonville",
          description: "Programs for wounded veterans including employment assistance, mental health, and transition support",
          address: "4899 Belfort Road, Suite 300, Jacksonville, FL 32256",
          phone: "(904) 296-7350",
          website: "https://www.woundedwarriorproject.org/",
          category: "Employment"
        },
        {
          name: "Clearwater Vet Center",
          description: "Counseling services for combat veterans and families including PTSD treatment and bereavement counseling",
          address: "29259 US Hwy 19 North, Clearwater, FL 33761",
          phone: "(727) 549-3600",
          website: "https://www.va.gov/find-locations/facility/vc_0525V",
          category: "Treatment"
        }
      ]
    },
    "Georgia": {
      resources: [
        {
          name: "Atlanta VA Medical Center",
          description: "Comprehensive care including primary, specialty, and mental health services",
          address: "1670 Clairmont Road, Decatur, GA 30033",
          phone: "(404) 321-6111",
          website: "https://www.va.gov/atlanta-health-care/",
          category: "VA"
        },
        {
          name: "Charlie Norwood VA Medical Center",
          description: "Wide range of health, support, and facility services for Veterans in northeast Georgia and western South Carolina",
          address: "950 15th Street, Augusta, GA 30904",
          phone: "(706) 733-0188",
          website: "https://www.va.gov/augusta-health-care/",
          category: "VA"
        },
        {
          name: "Carl Vinson VA Medical Center",
          description: "Health, support, and facility services for Veterans in central and southern Georgia",
          address: "1826 Veterans Blvd, Dublin, GA 31021",
          phone: "(478) 272-1210",
          website: "https://www.va.gov/dublin-health-care/",
          category: "VA"
        },
        {
          name: "Albany VA Clinic",
          description: "Primary care, mental health services, and specialty care for veterans",
          address: "526 West Broad Avenue, Albany, GA 31701",
          phone: "(229) 446-9000",
          website: "https://www.va.gov/dublin-health-care/locations/albany-va-clinic/",
          category: "VA"
        },
        {
          name: "Athens VA Clinic",
          description: "Primary care, mental health services, and specialty care for veterans",
          address: "9249 Highway 29 N, Athens, GA 30601",
          phone: "(706) 227-4534",
          website: "https://www.va.gov/atlanta-health-care/locations/athens-va-clinic/",
          category: "VA"
        },
        {
          name: "Brunswick VA Clinic",
          description: "Primary care, mental health services, and specialty care for veterans",
          address: "1111 Glynco Parkway, Brunswick, GA 31525",
          phone: "(912) 261-2355",
          website: "https://www.va.gov/charleston-health-care/locations/brunswick-va-clinic/",
          category: "VA"
        },
        {
          name: "Atlanta Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "1440 Dutch Valley Place, Suite 1100, Atlanta, GA 30324",
          phone: "(404) 347-7264",
          website: "https://www.va.gov/find-locations/facility/vc_0221V",
          category: "Treatment"
        },
        {
          name: "Augusta Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "2050 Walton Way, Suite 100, Augusta, GA 30904",
          phone: "(706) 729-5762",
          website: "https://www.va.gov/find-locations/facility/vc_0204V",
          category: "Treatment"
        },
        {
          name: "Columbus Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "1824 Victory Drive, Columbus, GA 31901",
          phone: "(706) 257-7308",
          website: "https://www.va.gov/find-locations/facility/vc_0203V",
          category: "Treatment"
        },
        {
          name: "Georgia War Veterans Nursing Home",
          description: "Skilled nursing care facility managed by the Georgia Department of Veterans Service",
          address: "1101 15th Street, Augusta, GA 30901",
          phone: "(706) 721-2531",
          website: "https://veterans.georgia.gov/georgia-war-veterans-nursing-homes",
          category: "Housing"
        },
        {
          name: "Georgia Department of Veterans Service",
          description: "Assists veterans with claims, benefits, and other services through numerous field offices across Georgia",
          address: "Floyd Veterans Memorial Building, 2 M.L.K. Jr. Drive SE, Atlanta, GA 30334",
          phone: "(404) 656-2300",
          website: "https://veterans.georgia.gov/",
          category: "Employment"
        }
      ]
    },
    "Hawaii": {
      resources: [
        {
          name: "Spark M. Matsunaga VA Medical Center",
          description: "Primary and specialty care, mental health services, PTSD treatment, geriatrics, suicide prevention, and more",
          address: "459 Patterson Road, Honolulu, HI 96819",
          phone: "(808) 433-0600",
          website: "https://www.va.gov/pacific-islands-health-care/",
          category: "VA"
        },
        {
          name: "Daniel K. Akaka VA Clinic",
          description: "Multispecialty outpatient care including primary care, women's health, mental health, geriatrics, dentistry, and pharmacy",
          address: "91-1051 Franklin D. Roosevelt Avenue, Kapolei, HI 96707",
          phone: "(800) 214-1306",
          website: "https://www.va.gov/pacific-islands-health-care/locations/daniel-k-akaka-department-of-veterans-affairs-outpatient-clinic/",
          category: "VA"
        },
        {
          name: "Hilo Community-Based Outpatient Clinic",
          description: "Primary care and mental health services for veterans",
          address: "1285 Waianuenue Avenue, Suite 211, Hilo, HI 96720",
          phone: "(808) 935-3781",
          website: "https://www.va.gov/pacific-islands-health-care/locations/hilo-community-based-outpatient-clinic/",
          category: "VA"
        },
        {
          name: "Kailua-Kona Community-Based Outpatient Clinic",
          description: "Primary care and mental health services for veterans",
          address: "35-377 Hualalai Road, Kailua-Kona, HI 96740",
          phone: "(808) 329-0774",
          website: "https://www.va.gov/pacific-islands-health-care/locations/kailua-kona-community-based-outpatient-clinic/",
          category: "VA"
        },
        {
          name: "Maui Community-Based Outpatient Clinic",
          description: "Primary care and mental health services for veterans",
          address: "203 Ho'ohana Street, Suite 303, Kahului, HI 96732",
          phone: "(808) 871-2454",
          website: "https://www.va.gov/pacific-islands-health-care/locations/maui-community-based-outpatient-clinic/",
          category: "VA"
        },
        {
          name: "Kauai Community-Based Outpatient Clinic",
          description: "Primary care and mental health services for veterans",
          address: "4485 Pahe'e Street, Suite 150, Lihue, HI 96766",
          phone: "(808) 246-0497",
          website: "https://www.va.gov/pacific-islands-health-care/locations/kauai-community-based-outpatient-clinic/",
          category: "VA"
        },
        {
          name: "National Center for PTSD – Pacific Islands Division",
          description: "Specialized care for PTSD and related mental health conditions",
          address: "3375 Koapaka Street, Suite I-560, Honolulu, HI 96819",
          phone: "(808) 566-1546",
          website: "https://www.ptsd.va.gov/about/divisions/pacific/index.asp",
          category: "Treatment"
        },
        {
          name: "Honolulu Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "1680 Kapiolani Blvd., Suite F-3, Honolulu, HI 96814",
          phone: "(808) 973-8387",
          website: "https://www.va.gov/find-locations/facility/vc_0237V",
          category: "Treatment"
        },
        {
          name: "Hilo Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "70 Lanihuli Street, Suite 102, Hilo, HI 96720",
          phone: "(808) 969-3833",
          website: "https://www.va.gov/find-locations/facility/vc_0228V",
          category: "Treatment"
        },
        {
          name: "Kona Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "73-4976 Kamanu Street, Kailua-Kona, HI 96740",
          phone: "(808) 329-0574",
          website: "https://www.va.gov/find-locations/facility/vc_0543V",
          category: "Treatment"
        },
        {
          name: "Maui Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "157 Ma'a Street, Kahului, HI 96732",
          phone: "(808) 242-8557",
          website: "https://www.va.gov/find-locations/facility/vc_0233V",
          category: "Treatment"
        },
        {
          name: "Kauai Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "4485 Pahe'e Street, Suite 101, Lihue, HI 96766",
          phone: "(808) 246-1163",
          website: "https://www.va.gov/find-locations/facility/vc_0224V",
          category: "Treatment"
        },
        {
          name: "West Oahu Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "91-1051 Franklin D. Roosevelt Avenue, Kapolei, HI 96707",
          phone: "(808) 674-2414",
          website: "https://www.va.gov/find-locations/facility/vc_0217V",
          category: "Treatment"
        },
        {
          name: "Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Nationwide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        },
        {
          name: "U.S. VETS – Barber's Point",
          description: "Transitional and permanent housing, employment assistance, and counseling for homeless and at-risk veterans",
          address: "91-1039 Shangrila Street, Kapolei, HI 96707",
          phone: "(808) 672-2977",
          website: "https://www.usvetsinc.org/hawaii/",
          category: "Housing"
        },
        {
          name: "Hawaii Public Housing Authority – VASH Program",
          description: "Rental assistance vouchers for homeless veterans with VA case management and clinical services",
          address: "1002 North School Street, Honolulu, HI 96817",
          phone: "(808) 832-4692",
          website: "https://hpha.hawaii.gov/federally_funded_programs/",
          category: "Housing"
        },
        {
          name: "Hawaii Department of Labor – Veterans Program",
          description: "Employment and training services including job search assistance, resume writing, and interview preparation",
          address: "830 Punchbowl Street, Room 329, Honolulu, HI 96813",
          phone: "(808) 586-8841",
          website: "https://labor.hawaii.gov/jobs/vets/",
          category: "Employment"
        },
        {
          name: "U.S. VETS – Employment Services",
          description: "Job readiness workshops, vocational training, and job placement assistance for veterans",
          address: "91-1039 Shangrila Street, Kapolei, HI 96707",
          phone: "(808) 672-2977",
          website: "https://www.usvetsinc.org/hawaii/",
          category: "Employment"
        },
        {
          name: "Hawaii State Office of Veterans Services",
          description: "Assistance with education benefits, GI Bill, scholarships and tuition assistance programs",
          address: "459 Patterson Road, E-Wing, Room 1-A103, Honolulu, HI 96819",
          phone: "(808) 433-0420",
          website: "https://dod.hawaii.gov/ovs/",
          category: "Employment"
        },
        {
          name: "Legal Aid Society of Hawaii – Veterans Project",
          description: "Free legal assistance to veterans on VA benefits, housing, family law, and consumer rights",
          address: "924 Bethel Street, Honolulu, HI 96813",
          phone: "(808) 536-4302",
          website: "https://www.legalaidhawaii.org/veterans-project.html",
          category: "Treatment"
        }
      ]
    },
    "Idaho": {
      resources: [
        {
          name: "Boise VA Medical Center",
          description: "Primary and specialty care, mental health services, surgery, pain management, social work, vision care, and more",
          address: "500 West Fort Street, Boise, ID 83702",
          phone: "(208) 422-1000",
          website: "https://www.va.gov/boise-health-care/",
          category: "VA"
        },
        {
          name: "Caldwell VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "713 Haystack Way, Caldwell, ID 83605",
          phone: "(208) 454-4820",
          website: "https://www.va.gov/boise-health-care/locations/caldwell-va-clinic/",
          category: "VA"
        },
        {
          name: "Coeur d'Alene VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "915 W. Ironwood Dr., Suite 101, Coeur d'Alene, ID 83814",
          phone: "(208) 665-1711",
          website: "https://www.va.gov/boise-health-care/locations/coeur-dalene-va-clinic/",
          category: "VA"
        },
        {
          name: "Idaho Falls VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "640 S. Woodruff Ave., Idaho Falls, ID 83401",
          phone: "(208) 522-2922",
          website: "https://www.va.gov/boise-health-care/locations/idaho-falls-va-clinic/",
          category: "VA"
        },
        {
          name: "Twin Falls VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "260 2nd Ave. E., Twin Falls, ID 83301",
          phone: "(208) 732-0959",
          website: "https://www.va.gov/boise-health-care/locations/twin-falls-va-clinic/",
          category: "VA"
        },
        {
          name: "Boise Vet Center",
          description: "Counseling, PTSD treatment, substance abuse programs, and other mental health services",
          address: "2424 Bank Dr., Boise, ID 83705",
          phone: "(208) 342-3612",
          website: "https://www.va.gov/find-locations/facility/vc_0507V",
          category: "Treatment"
        },
        {
          name: "East Idaho Vet Center",
          description: "Counseling, PTSD treatment, substance abuse programs, and other mental health services",
          address: "1555 Pocatello Creek Rd., Suite C, Pocatello, ID 83201",
          phone: "(208) 232-0316",
          website: "https://www.va.gov/find-locations/facility/vc_0548V",
          category: "Treatment"
        },
        {
          name: "Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Nationwide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        },
        {
          name: "Boise Veterans Home",
          description: "State veterans home providing skilled nursing care for Idaho veterans",
          address: "320 Collins Rd., Boise, ID 83702",
          phone: "(208) 780-1600",
          website: "https://veterans.idaho.gov/veterans-homes/",
          category: "Housing"
        },
        {
          name: "Lewiston Veterans Home",
          description: "State veterans home providing skilled nursing care for Idaho veterans",
          address: "821 21st Ave., Lewiston, ID 83501",
          phone: "(208) 750-3600",
          website: "https://veterans.idaho.gov/veterans-homes/",
          category: "Housing"
        },
        {
          name: "Pocatello Veterans Home",
          description: "State veterans home providing skilled nursing care for Idaho veterans",
          address: "1957 Alvin Ricken Dr., Pocatello, ID 83201",
          phone: "(208) 235-7800",
          website: "https://veterans.idaho.gov/veterans-homes/",
          category: "Housing"
        },
        {
          name: "Idaho Division of Veterans Services Employment Services",
          description: "Assistance with job training, employment accommodations, and job placement",
          address: "351 Collins Road, Boise, ID 83702",
          phone: "(208) 780-1300",
          website: "https://veterans.idaho.gov/benefits-and-services/",
          category: "Employment"
        },
        {
          name: "Idaho Legal Aid Services - Veterans",
          description: "Legal assistance to veterans on issues such as benefits, housing, and family law",
          address: "1447 S. Tyrell Lane, Boise, ID 83706",
          phone: "(208) 746-7541",
          website: "https://www.idaholegalaid.org/node/2232/veterans-issues",
          category: "Treatment"
        },
        {
          name: "Idaho Veterans Chamber of Commerce",
          description: "Support in education, housing, entrepreneurship, workforce management, family, and wellness services",
          address: "Boise, ID",
          phone: "(208) 917-5612",
          website: "https://idahoveteranschamber.org/",
          category: "Employment"
        }
      ]
    },
    "Illinois": {
      resources: [
        {
          name: "Jesse Brown VA Medical Center",
          description: "Comprehensive care including primary, specialty, and mental health services",
          address: "820 South Damen Avenue, Chicago, IL 60612",
          phone: "(312) 569-8387",
          website: "https://www.va.gov/chicago-health-care/",
          category: "VA"
        },
        {
          name: "Edward Hines Jr. VA Hospital",
          description: "Primary, extended, and specialty care to Veteran patients in the Chicago area",
          address: "5000 South 5th Avenue, Hines, IL 60141",
          phone: "(708) 202-8387",
          website: "https://www.va.gov/hines-health-care/",
          category: "VA"
        },
        {
          name: "VA Illiana Health Care System",
          description: "Health, support, and facility services for Veterans at multiple locations serving a 30-county area",
          address: "1900 East Main Street, Danville, IL 61832",
          phone: "(217) 554-3000",
          website: "https://www.va.gov/illiana-health-care/",
          category: "VA"
        },
        {
          name: "Captain James A. Lovell Federal Health Care Center",
          description: "Fully integrated federal health care facility serving both Veterans and active-duty service members",
          address: "3001 Green Bay Road, North Chicago, IL 60064",
          phone: "(847) 688-1900",
          website: "https://www.va.gov/lovell-federal-health-care-va/",
          category: "VA"
        },
        {
          name: "Aurora VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "161 S. Lincolnway, Suite 200, North Aurora, IL 60542",
          phone: "(630) 859-2504",
          website: "https://www.va.gov/hines-health-care/locations/aurora-va-clinic/",
          category: "VA"
        },
        {
          name: "Bloomington VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "207 Hamilton Road, Bloomington, IL 61704",
          phone: "(309) 663-6574",
          website: "https://www.va.gov/illiana-health-care/locations/bloomington-va-clinic/",
          category: "VA"
        },
        {
          name: "Carbondale VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "1130 East Walnut Street, Carbondale, IL 62901",
          phone: "(618) 351-1031",
          website: "https://www.va.gov/marion-health-care/locations/carbondale-va-clinic/",
          category: "VA"
        },
        {
          name: "Chicago Heights Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "1600 S. Halsted Street, Chicago Heights, IL 60411",
          phone: "(708) 754-0340",
          website: "https://www.va.gov/find-locations/facility/vc_0227V",
          category: "Treatment"
        },
        {
          name: "Evanston Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "1901 Howard Street, Evanston, IL 60202",
          phone: "(847) 332-1019",
          website: "https://www.va.gov/find-locations/facility/vc_0215V",
          category: "Treatment"
        },
        {
          name: "Oak Park Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "155 S. Oak Park Avenue, Oak Park, IL 60302",
          phone: "(708) 383-3225",
          website: "https://www.va.gov/find-locations/facility/vc_0223V",
          category: "Treatment"
        },
        {
          name: "Illinois Veterans' Home at Anna",
          description: "Long-term skilled nursing care for Illinois veterans",
          address: "792 North Main Street, Anna, IL 62906",
          phone: "(618) 833-6302",
          website: "https://www2.illinois.gov/veterans/facilities/Pages/anna.aspx",
          category: "Housing"
        },
        {
          name: "Illinois Veterans' Home at LaSalle",
          description: "Long-term skilled nursing care for Illinois veterans",
          address: "1015 O'Conor Avenue, LaSalle, IL 61301",
          phone: "(815) 223-0303",
          website: "https://www2.illinois.gov/veterans/facilities/Pages/lasalle.aspx",
          category: "Housing"
        },
        {
          name: "Illinois Veterans' Home at Manteno",
          description: "Long-term skilled nursing care for Illinois veterans",
          address: "1 Veterans Drive, Manteno, IL 60950",
          phone: "(815) 468-6581",
          website: "https://www2.illinois.gov/veterans/facilities/Pages/manteno.aspx",
          category: "Housing"
        },
        {
          name: "Illinois Veterans' Home at Quincy",
          description: "Long-term skilled nursing care for Illinois veterans",
          address: "1707 North 12th Street, Quincy, IL 62301",
          phone: "(217) 222-8641",
          website: "https://www2.illinois.gov/veterans/facilities/Pages/quincy.aspx",
          category: "Housing"
        },
        {
          name: "Illinois Department of Veterans' Affairs",
          description: "Assists Veterans and their families in navigating federal, state, and local resources and benefits",
          address: "833 South Spring Street, Springfield, IL 62704",
          phone: "(217) 782-6641",
          website: "https://www2.illinois.gov/veterans/",
          category: "Employment"
        }
      ]
    },
    "Indiana": {
      resources: [
        {
          name: "Richard L. Roudebush VA Medical Center",
          description: "Primary VA healthcare facility in Indianapolis",
          address: "1481 W. 10th Street, Indianapolis, IN 46202",
          phone: "(317) 554-0000",
          website: "https://www.va.gov/indiana-health-care/locations/richard-l-roudebush-va-medical-center/",
          category: "VA"
        },
        {
          name: "VA Northern Indiana Health Care System – Fort Wayne Campus",
          description: "Comprehensive healthcare services for veterans in northern Indiana",
          address: "2121 Lake Ave, Fort Wayne, IN 46805",
          phone: "(260) 426-5431",
          website: "https://www.va.gov/northern-indiana-health-care/locations/fort-wayne-va-medical-center/",
          category: "VA"
        },
        {
          name: "VA Northern Indiana Health Care System – Marion Campus",
          description: "Medical, surgical, and mental health services for veterans",
          address: "1700 E. 38th Street, Marion, IN 46953",
          phone: "(765) 674-3321",
          website: "https://www.va.gov/northern-indiana-health-care/locations/marion-va-medical-center/",
          category: "VA"
        },
        {
          name: "Adam Benjamin Jr. Outpatient Clinic",
          description: "Community-based outpatient care for veterans in Crown Point area",
          address: "9330 Broadway, Crown Point, IN 46307",
          phone: "(219) 662-5000",
          website: "https://www.va.gov/northern-indiana-health-care/locations/crown-point-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Bloomington VA Clinic",
          description: "Primary care and mental health services",
          address: "455 S. Landmark Avenue, Bloomington, IN 47403",
          phone: "(812) 336-5723",
          website: "https://www.va.gov/indiana-health-care/locations/bloomington-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Hoosier Veterans Assistance Foundation",
          description: "Transitional housing and support services for homeless veterans",
          address: "964 N. Pennsylvania St., Indianapolis, IN 46204",
          phone: "(317) 951-0688",
          website: "https://hvafofindiana.org/",
          category: "Housing"
        },
        {
          name: "INVET's Veteran Employment Program",
          description: "Career counseling, job placement, and employment assistance",
          address: "777 N. Meridian St., Indianapolis, IN 46204",
          phone: "(844) 480-0009",
          website: "https://www.in.gov/dva/veteran-services/employment/",
          category: "Employment"
        },
        {
          name: "Indiana Veterans Crisis Response Team",
          description: "24/7 crisis intervention and emergency mental health support",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Iowa": {
      resources: [
        {
          name: "Iowa City VA Medical Center",
          description: "Comprehensive medical, surgical, and mental health services for veterans in eastern Iowa",
          address: "601 Highway 6 West, Iowa City, IA 52246",
          phone: "(319) 338-0581",
          website: "https://www.va.gov/iowa-city-health-care/locations/iowa-city-va-medical-center/",
          category: "VA"
        },
        {
          name: "Des Moines VA Medical Center",
          description: "Primary and specialty care services for veterans in central Iowa",
          address: "3600 30th Street, Des Moines, IA 50310",
          phone: "(515) 699-5999",
          website: "https://www.va.gov/central-iowa-health-care/locations/des-moines-va-medical-center/",
          category: "VA"
        },
        {
          name: "Cedar Rapids VA Clinic",
          description: "Primary care and mental health services for veterans in the Cedar Rapids area",
          address: "2230 Wiley Blvd SW, Cedar Rapids, IA 52404",
          phone: "(319) 369-3500",
          website: "https://www.va.gov/iowa-city-health-care/locations/cedar-rapids-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Waterloo VA Clinic",
          description: "Primary care, mental health, and specialty services",
          address: "1515 Black Hawk Village Dr, Waterloo, IA 50702",
          phone: "(319) 272-2323",
          website: "https://www.va.gov/iowa-city-health-care/locations/waterloo-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Iowa Veterans Home",
          description: "Long-term care and residential services for Iowa veterans",
          address: "1301 Summit St, Marshalltown, IA 50158",
          phone: "(641) 752-1501",
          website: "https://ivh.iowa.gov/",
          category: "Housing"
        },
        {
          name: "Iowa Workforce Development Veterans Services",
          description: "Employment and training services specifically for veterans",
          address: "1000 E Grand Ave, Des Moines, IA 50319",
          phone: "(515) 281-5387",
          website: "https://www.iowaworkforcedevelopment.gov/veteran-services",
          category: "Employment"
        },
        {
          name: "Iowa Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Kansas": {
      resources: [
        {
          name: "Robert J. Dole VA Medical Center",
          description: "Comprehensive healthcare services for veterans in southern Kansas",
          address: "5500 East Kellogg Drive, Wichita, KS 67218",
          phone: "(316) 685-2221",
          website: "https://www.va.gov/eastern-kansas-health-care/locations/robert-j-dole-va-medical-center/",
          category: "VA"
        },
        {
          name: "Colmery-O'Neil VA Medical Center",
          description: "Full-service medical center offering primary care, specialty care, and mental health services",
          address: "2200 SW Gage Blvd, Topeka, KS 66622",
          phone: "(785) 350-3111",
          website: "https://www.va.gov/eastern-kansas-health-care/locations/colmery-oneil-va-medical-center/",
          category: "VA"
        },
        {
          name: "Dwight D. Eisenhower VA Medical Center",
          description: "Comprehensive medical services for veterans in northeast Kansas",
          address: "4101 S. 4th Street, Leavenworth, KS 66048",
          phone: "(913) 682-2000",
          website: "https://www.va.gov/eastern-kansas-health-care/locations/dwight-d-eisenhower-va-medical-center/",
          category: "VA"
        },
        {
          name: "Dodge City VA Clinic",
          description: "Primary care and mental health services for rural veterans",
          address: "400 W. Frontview, Suite 1, Dodge City, KS 67801",
          phone: "(620) 225-9049",
          website: "https://www.va.gov/eastern-kansas-health-care/locations/dodge-city-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Hays VA Clinic",
          description: "Primary care and telehealth services for rural veterans",
          address: "207-B E 7th Street, Hays, KS 67601",
          phone: "(785) 625-8700",
          website: "https://www.va.gov/wichita-health-care/locations/hays-community-based-outpatient-clinic/",
          category: "Treatment"
        },
        {
          name: "Kansas Commission on Veterans Affairs Office",
          description: "State agency providing benefits assistance and support services",
          address: "700 SW Jackson St., Suite 1004, Topeka, KS 66603",
          phone: "(785) 296-3976",
          website: "https://kcva.ks.gov/",
          category: "Employment"
        },
        {
          name: "Kansas Soldiers' Home",
          description: "Long-term care and housing for eligible Kansas veterans",
          address: "15810 Fort Dodge Rd., Fort Dodge, KS 67843",
          phone: "(620) 227-2121",
          website: "https://kcva.ks.gov/veteran-homes/fort-dodge-home",
          category: "Housing"
        },
        {
          name: "Kansas Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Kentucky": {
      resources: [
        {
          name: "Lexington VA Health Care System",
          description: "Comprehensive medical, surgical, and mental health services for Kentucky veterans",
          address: "1101 Veterans Drive, Lexington, KY 40502",
          phone: "(859) 233-4511",
          website: "https://www.va.gov/lexington-health-care/",
          category: "VA"
        },
        {
          name: "Robley Rex VA Medical Center",
          description: "Full-service medical center serving veterans in Louisville and surrounding areas",
          address: "800 Zorn Avenue, Louisville, KY 40206",
          phone: "(502) 287-4000",
          website: "https://www.va.gov/louisville-health-care/",
          category: "VA"
        },
        {
          name: "Bowling Green VA Clinic",
          description: "Primary care, mental health, and telehealth services",
          address: "1830 Destiny Lane, Bowling Green, KY 42104",
          phone: "(270) 782-0120",
          website: "https://www.va.gov/tennessee-valley-health-care/locations/bowling-green-community-based-outpatient-clinic/",
          category: "Treatment"
        },
        {
          name: "Owensboro VA Clinic",
          description: "Primary care and mental health services for veterans",
          address: "3400 New Hartford Road, Owensboro, KY 42303",
          phone: "(270) 684-5034",
          website: "https://www.va.gov/louisville-health-care/locations/owensboro-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Hazard VA Clinic",
          description: "Primary care and mental health services for rural veterans in eastern Kentucky",
          address: "210 Black Gold Blvd., Hazard, KY 41701",
          phone: "(606) 436-2350",
          website: "https://www.va.gov/lexington-health-care/locations/hazard-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Kentucky Department of Veterans Affairs",
          description: "State agency providing benefits assistance and support services",
          address: "1111 Louisville Road, Frankfort, KY 40601",
          phone: "(502) 564-9203",
          website: "https://veterans.ky.gov/",
          category: "Employment"
        },
        {
          name: "Thomson-Hood Veterans Center",
          description: "State veterans nursing home providing long-term care",
          address: "100 Veterans Drive, Wilmore, KY 40390",
          phone: "(859) 858-2814",
          website: "https://veterans.ky.gov/nursinghomes/Pages/thomson-hood.aspx",
          category: "Housing"
        },
        {
          name: "Kentucky Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Louisiana": {
      resources: [
        {
          name: "Southeast Louisiana Veterans Health Care System",
          description: "Comprehensive healthcare services for veterans in New Orleans and surrounding areas",
          address: "2400 Canal Street, New Orleans, LA 70119",
          phone: "(504) 568-0811",
          website: "https://www.va.gov/southeast-louisiana-health-care/",
          category: "VA"
        },
        {
          name: "Overton Brooks VA Medical Center",
          description: "Full-service medical center serving veterans in northwest Louisiana",
          address: "510 East Stoner Avenue, Shreveport, LA 71101",
          phone: "(318) 221-8411",
          website: "https://www.va.gov/shreveport-health-care/",
          category: "VA"
        },
        {
          name: "Alexandria VA Medical Center",
          description: "Comprehensive healthcare services for central Louisiana veterans",
          address: "2495 Shreveport Highway, Pineville, LA 71360",
          phone: "(318) 473-0010",
          website: "https://www.va.gov/alexandria-health-care/",
          category: "VA"
        },
        {
          name: "Baton Rouge VA Clinic",
          description: "Primary care, mental health, and specialty services",
          address: "7968 Essen Park Avenue, Baton Rouge, LA 70809",
          phone: "(225) 761-3400",
          website: "https://www.va.gov/southeast-louisiana-health-care/locations/baton-rouge-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Lafayette VA Clinic",
          description: "Primary care and mental health services for veterans in Acadiana region",
          address: "2100 Jefferson Street, Lafayette, LA 70501",
          phone: "(337) 262-0870",
          website: "https://www.va.gov/alexandria-health-care/locations/lafayette-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Houma VA Clinic",
          description: "Primary care and mental health services for veterans in bayou region",
          address: "1750 Martin Luther King Jr. Blvd., Houma, LA 70360",
          phone: "(985) 851-0188",
          website: "https://www.va.gov/southeast-louisiana-health-care/locations/houma-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Louisiana Department of Veterans Affairs",
          description: "State agency providing veterans benefits assistance and services",
          address: "1885 Wooddale Blvd., Baton Rouge, LA 70806",
          phone: "(225) 219-5000",
          website: "https://vetaffairs.la.gov/",
          category: "Employment"
        },
        {
          name: "Louisiana Veterans Home",
          description: "Long-term care and nursing home services for Louisiana veterans",
          address: "4739 Highway 10, Jackson, LA 70748",
          phone: "(225) 634-5265",
          website: "https://vetaffairs.la.gov/benefit/veteran-homes/",
          category: "Housing"
        },
        {
          name: "Louisiana Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Maine": {
      resources: [
        {
          name: "Togus VA Medical Center",
          description: "Comprehensive medical care, including emergency services, mental health care, and specialty services",
          address: "1 VA Center, Augusta, ME 04330",
          phone: "(207) 623-8411",
          website: "https://www.va.gov/maine-health-care/",
          category: "VA"
        },
        {
          name: "Bangor VA Clinic",
          description: "Primary care, mental health, and specialty services for veterans in northern Maine",
          address: "35 State Hospital Drive, Bangor, ME 04401",
          phone: "(207) 561-3600",
          website: "https://www.va.gov/maine-health-care/locations/bangor-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Portland VA Clinic",
          description: "Comprehensive outpatient services for veterans in southern Maine",
          address: "144 Fore Street, Portland, ME 04101",
          phone: "(207) 623-8411 x7490",
          website: "https://www.va.gov/maine-health-care/locations/portland-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Lewiston VA Clinic",
          description: "Primary care and mental health services for veterans in central Maine",
          address: "15 Challenger Drive, Lewiston, ME 04240",
          phone: "(207) 330-2700",
          website: "https://www.va.gov/maine-health-care/locations/lewiston-auburn-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Caribou VA Clinic",
          description: "Primary care and telehealth services for rural veterans in northern Maine",
          address: "163 Van Buren Road, Suite 6, Caribou, ME 04736",
          phone: "(207) 493-3800",
          website: "https://www.va.gov/maine-health-care/locations/caribou-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Bangor Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "207 Parkway S., Suite 2, Brewer, ME 04412",
          phone: "(207) 947-3391",
          website: "https://www.va.gov/find-locations/facility/vc_0524V",
          category: "Treatment"
        },
        {
          name: "Veterans Inc. Housing Program",
          description: "Transitional and permanent housing assistance for homeless veterans",
          address: "393 Main Street, Saco, ME 04072",
          phone: "(800) 482-2565",
          website: "https://www.veteransinc.org/services/housing-programs/",
          category: "Housing"
        },
        {
          name: "Maine Bureau of Veterans' Services",
          description: "State agency providing benefits assistance, emergency financial aid, and employment support",
          address: "117 State House Station, Augusta, ME 04330",
          phone: "(207) 430-6035",
          website: "https://www.maine.gov/veterans/",
          category: "Employment"
        },
        {
          name: "Maine Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Maryland": {
      resources: [
        {
          name: "Baltimore VA Medical Center",
          description: "Comprehensive healthcare services including primary care, specialty services, and emergency care",
          address: "10 North Greene Street, Baltimore, MD 21201",
          phone: "(410) 605-7000",
          website: "https://www.va.gov/maryland-health-care/locations/baltimore-va-medical-center/",
          category: "VA"
        },
        {
          name: "Perry Point VA Medical Center",
          description: "Primary care and specialty health services, including mental health care, audiology, and dental services",
          address: "Perry Point, MD 21902",
          phone: "(410) 642-2411",
          website: "https://www.va.gov/maryland-health-care/locations/perry-point-va-medical-center/",
          category: "VA"
        },
        {
          name: "Loch Raven VA Medical Center",
          description: "Rehabilitation and extended care services for Maryland veterans",
          address: "3900 Loch Raven Boulevard, Baltimore, MD 21218",
          phone: "(410) 605-7000",
          website: "https://www.va.gov/maryland-health-care/locations/loch-raven-va-medical-center/",
          category: "VA"
        },
        {
          name: "Glen Burnie VA Outpatient Clinic",
          description: "Primary care, mental health, and specialty services for veterans in Anne Arundel County",
          address: "808 Landmark Drive, Suite 128, Glen Burnie, MD 21061",
          phone: "(410) 590-4140",
          website: "https://www.va.gov/maryland-health-care/locations/glen-burnie-va-outpatient-clinic/",
          category: "Treatment"
        },
        {
          name: "Cambridge VA Outpatient Clinic",
          description: "Primary care and mental health services for veterans on Maryland's Eastern Shore",
          address: "830 Chesapeake Drive, Cambridge, MD 21613",
          phone: "(410) 228-6243",
          website: "https://www.va.gov/maryland-health-care/locations/cambridge-va-outpatient-clinic/",
          category: "Treatment"
        },
        {
          name: "Fort Meade VA Outpatient Clinic",
          description: "Primary care and mental health services for veterans in central Maryland",
          address: "2479 5th Street, Fort Meade, MD 20755",
          phone: "(410) 305-5300",
          website: "https://www.va.gov/maryland-health-care/locations/fort-meade-va-outpatient-clinic/",
          category: "Treatment"
        },
        {
          name: "Baltimore Vet Center",
          description: "Readjustment counseling and outreach services for combat veterans and their families",
          address: "1777 Reisterstown Road, Suite 199, Baltimore, MD 21208",
          phone: "(410) 764-9400",
          website: "https://www.va.gov/find-locations/facility/vc_0407V",
          category: "Treatment"
        },
        {
          name: "Maryland Center for Veterans Education and Training (MCVET)",
          description: "Comprehensive housing, substance abuse treatment, and employment services for homeless veterans",
          address: "301 N. High Street, Baltimore, MD 21202",
          phone: "(410) 576-9626",
          website: "http://www.mcvet.org/",
          category: "Housing"
        },
        {
          name: "Maryland Department of Veterans Affairs",
          description: "State agency providing advocacy and assistance with benefits, employment, and education",
          address: "16 Francis Street, Annapolis, MD 21401",
          phone: "(410) 260-3838",
          website: "https://veterans.maryland.gov/",
          category: "Employment"
        },
        {
          name: "Maryland Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Massachusetts": {
      resources: [
        {
          name: "Jamaica Plain VA Medical Center",
          description: "Comprehensive healthcare services including primary care, specialty care, and mental health services",
          address: "150 South Huntington Avenue, Boston, MA 02130",
          phone: "(857) 364-4000",
          website: "https://www.va.gov/boston-health-care/locations/jamaica-plain-campus/",
          category: "VA"
        },
        {
          name: "West Roxbury VA Medical Center",
          description: "Surgical, inpatient, and critical care services for Massachusetts veterans",
          address: "1400 VFW Parkway, West Roxbury, MA 02132",
          phone: "(857) 364-4000",
          website: "https://www.va.gov/boston-health-care/locations/west-roxbury-campus/",
          category: "VA"
        },
        {
          name: "Brockton VA Medical Center",
          description: "Mental health, long-term care, and primary care services",
          address: "940 Belmont Street, Brockton, MA 02301",
          phone: "(508) 583-4500",
          website: "https://www.va.gov/boston-health-care/locations/brockton-campus/",
          category: "VA"
        },
        {
          name: "Edith Nourse Rogers Memorial Veterans Hospital",
          description: "Comprehensive medical care, including mental health services and long-term care",
          address: "200 Springs Road, Bedford, MA 01730",
          phone: "(781) 687-2000",
          website: "https://www.va.gov/bedford-health-care/",
          category: "VA"
        },
        {
          name: "Edward P. Boland VA Medical Center",
          description: "Primary and specialty care, rehabilitation programs, and mental health services for western Massachusetts veterans",
          address: "421 North Main Street, Leeds, MA 01053",
          phone: "(413) 584-4040",
          website: "https://www.va.gov/central-western-massachusetts-health-care/locations/northampton-va-medical-center/",
          category: "VA"
        },
        {
          name: "Boston Vet Center",
          description: "Readjustment counseling and outreach services for combat veterans and their families",
          address: "7 Drydock Avenue, Suite 2070, Boston, MA 02210",
          phone: "(857) 203-6461",
          website: "https://www.va.gov/find-locations/facility/vc_0606V",
          category: "Treatment"
        },
        {
          name: "Lowell VA Clinic",
          description: "Primary care and mental health services for veterans in northern Massachusetts",
          address: "130 Marshall Road, Lowell, MA 01852",
          phone: "(978) 671-9000",
          website: "https://www.va.gov/bedford-health-care/locations/lowell-va-clinic/",
          category: "Treatment"
        },
        {
          name: "New England Center and Home for Veterans",
          description: "Transitional and permanent housing, clinical support, and employment services for homeless and at-risk veterans",
          address: "17 Court Street, Boston, MA 02108",
          phone: "(617) 371-1800",
          website: "https://www.nechv.org/",
          category: "Housing"
        },
        {
          name: "Massachusetts Department of Veterans' Services",
          description: "State agency connecting veterans to benefits, employment, and education opportunities",
          address: "600 Washington Street, 7th Floor, Boston, MA 02111",
          phone: "(617) 210-5480",
          website: "https://www.mass.gov/orgs/massachusetts-department-of-veterans-services",
          category: "Employment"
        },
        {
          name: "Massachusetts Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Michigan": {
      resources: [
        {
          name: "John D. Dingell VA Medical Center",
          description: "Comprehensive medical care including acute medical, surgical, psychiatric, neurological, and dermatological inpatient care",
          address: "4646 John R. Street, Detroit, MI 48201",
          phone: "(313) 576-1000",
          website: "https://www.va.gov/detroit-health-care/",
          category: "VA"
        },
        {
          name: "Battle Creek VA Medical Center",
          description: "Comprehensive healthcare services including mental health, primary care, and specialty services",
          address: "5500 Armstrong Road, Battle Creek, MI 49037",
          phone: "(269) 966-5600",
          website: "https://www.va.gov/battle-creek-health-care/",
          category: "VA"
        },
        {
          name: "Ann Arbor VA Medical Center",
          description: "Tertiary care, specialty services, research and education for Michigan veterans",
          address: "2215 Fuller Road, Ann Arbor, MI 48105",
          phone: "(734) 769-7100",
          website: "https://www.va.gov/ann-arbor-health-care/",
          category: "VA"
        },
        {
          name: "Oscar G. Johnson VA Medical Center",
          description: "Primary care and specialty services for veterans in Michigan's Upper Peninsula",
          address: "325 East H Street, Iron Mountain, MI 49801",
          phone: "(906) 774-3300",
          website: "https://www.va.gov/iron-mountain-health-care/",
          category: "VA"
        },
        {
          name: "Grand Rapids VA Clinic",
          description: "Primary care, mental health, and specialty services for West Michigan veterans",
          address: "3019 Coit Avenue NE, Grand Rapids, MI 49505",
          phone: "(616) 365-9575",
          website: "https://www.va.gov/battle-creek-health-care/locations/grand-rapids-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Detroit Vet Center",
          description: "Readjustment counseling services for combat veterans and their families",
          address: "4161 Cass Avenue, Detroit, MI 48201",
          phone: "(313) 831-6509",
          website: "https://www.va.gov/find-locations/facility/vc_0310V",
          category: "Treatment"
        },
        {
          name: "Volunteers of America Michigan Veterans Housing Program",
          description: "Transitional housing and supportive services for homeless veterans",
          address: "430 N. Larch Street, Lansing, MI 48912",
          phone: "(517) 484-4414",
          website: "https://www.voami.org/veterans-services",
          category: "Housing"
        },
        {
          name: "Michigan Veterans Affairs Agency",
          description: "Connects veterans and their families with benefits, employment services, and resources",
          address: "222 Washington Square North, Lansing, MI 48933",
          phone: "(800) 642-4838",
          website: "https://www.michigan.gov/mvaa",
          category: "Employment"
        },
        {
          name: "Michigan Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Minnesota": {
      resources: [
        {
          name: "Minneapolis VA Health Care System",
          description: "Full range of services including primary care, specialty care, and mental health services",
          address: "1 Veterans Drive, Minneapolis, MN 55417",
          phone: "(612) 725-2000",
          website: "https://www.va.gov/minneapolis-health-care/",
          category: "VA"
        },
        {
          name: "St. Cloud VA Health Care System",
          description: "Primary care, mental health services, and select specialty care for central Minnesota veterans",
          address: "4801 Veterans Drive, St. Cloud, MN 56303",
          phone: "(320) 252-1670",
          website: "https://www.va.gov/st-cloud-health-care/",
          category: "VA"
        },
        {
          name: "Rochester VA Clinic",
          description: "Primary care and mental health services for veterans in southeastern Minnesota",
          address: "3000 55th Street NW, Rochester, MN 55901",
          phone: "(507) 252-0885",
          website: "https://www.va.gov/minneapolis-health-care/locations/rochester-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Maplewood VA Clinic",
          description: "Primary care, mental health, and specialty services for Twin Cities veterans",
          address: "2785 White Bear Avenue North, Suite 210, Maplewood, MN 55109",
          phone: "(651) 290-3040",
          website: "https://www.va.gov/minneapolis-health-care/locations/maplewood-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Duluth VA Clinic",
          description: "Primary care and specialty services for veterans in northern Minnesota",
          address: "3520 Tower Avenue, Superior, WI 54880",
          phone: "(715) 398-2400", 
          website: "https://www.va.gov/minneapolis-health-care/locations/twin-ports-va-clinic/",
          category: "Treatment"
        },
        {
          name: "St. Paul Vet Center",
          description: "Readjustment counseling and outreach services for combat veterans and their families",
          address: "550 County Road D, Suite 10, New Brighton, MN 55112",
          phone: "(651) 644-4022",
          website: "https://www.va.gov/find-locations/facility/vc_0643V",
          category: "Treatment"
        },
        {
          name: "Minnesota Assistance Council for Veterans (MACV)",
          description: "Housing assistance, supportive services, and employment help for homeless veterans",
          address: "1000 University Avenue West, Suite 150, St. Paul, MN 55104",
          phone: "(833) 222-6228",
          website: "https://www.mac-v.org/",
          category: "Housing"
        },
        {
          name: "Minnesota Department of Veterans Affairs",
          description: "State agency providing benefits assistance, education resources, and employment support",
          address: "20 West 12th Street, St. Paul, MN 55155",
          phone: "(651) 296-2562",
          website: "https://mn.gov/mdva/",
          category: "Employment"
        },
        {
          name: "Minnesota Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Mississippi": {
      resources: [
        {
          name: "G.V. (Sonny) Montgomery VA Medical Center",
          description: "Comprehensive medical services including primary care, specialty care, mental health services, and more",
          address: "1500 East Woodrow Wilson Avenue, Jackson, MS 39216",
          phone: "(601) 362-4471",
          website: "https://www.va.gov/jackson-health-care/",
          category: "VA"
        },
        {
          name: "Gulf Coast Veterans Health Care System",
          description: "Comprehensive healthcare services for veterans living in coastal Mississippi",
          address: "400 Veterans Avenue, Biloxi, MS 39531",
          phone: "(228) 523-5000",
          website: "https://www.va.gov/gulf-coast-health-care/locations/biloxi-va-medical-center/",
          category: "VA"
        },
        {
          name: "Kosciusko VA Clinic",
          description: "Primary care and mental health services for veterans in central Mississippi",
          address: "332 Highway 12 West, Kosciusko, MS 39090",
          phone: "(601) 362-4471 x5800",
          website: "https://www.va.gov/jackson-health-care/locations/kosciusko-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Meridian VA Clinic",
          description: "Primary care, mental health, and telehealth services for eastern Mississippi veterans",
          address: "2103 13th Street, Meridian, MS 39301",
          phone: "(601) 482-3275",
          website: "https://www.va.gov/jackson-health-care/locations/meridian-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Greenville VA Clinic",
          description: "Primary care and mental health services for veterans in the Mississippi Delta",
          address: "1502 South Colorado Street, Greenville, MS 38703",
          phone: "(662) 332-9872",
          website: "https://www.va.gov/jackson-health-care/locations/greenville-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Jackson Vet Center",
          description: "Readjustment counseling and outreach services for combat veterans and their families",
          address: "1755 Lelia Drive, Suite 104, Jackson, MS 39216",
          phone: "(601) 965-5477",
          website: "https://www.va.gov/find-locations/facility/vc_0734V",
          category: "Treatment"
        },
        {
          name: "Mississippi State Veterans Homes",
          description: "Long-term care facilities specifically for Mississippi veterans",
          address: "Multiple locations across Mississippi",
          phone: "(601) 576-4850",
          website: "https://www.msva.ms.gov/state-veterans-homes",
          category: "Housing"
        },
        {
          name: "Mississippi Department of Veterans Affairs",
          description: "State agency providing benefits assistance, education support, and employment resources",
          address: "P.O. Box 5947, Pearl, MS 39288",
          phone: "(601) 576-4850",
          website: "https://www.msva.ms.gov/",
          category: "Employment"
        },
        {
          name: "Mississippi Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Missouri": {
      resources: [
        {
          name: "Harry S. Truman Memorial Veterans' Hospital",
          description: "Primary care and specialty health services including audiology, mental health care, cardiology, surgery, dentistry, neurology, and orthopedics",
          address: "800 Hospital Drive, Columbia, MO 65201",
          phone: "(573) 814-6000",
          website: "https://www.va.gov/columbia-missouri-health-care/",
          category: "VA"
        },
        {
          name: "Kansas City VA Medical Center",
          description: "Comprehensive healthcare services including primary care, specialty care, and mental health services",
          address: "4801 E. Linwood Boulevard, Kansas City, MO 64128",
          phone: "(816) 861-4700",
          website: "https://www.va.gov/kansas-city-health-care/",
          category: "VA"
        },
        {
          name: "St. Louis VA Health Care System - John Cochran Division",
          description: "Primary, specialty, and ambulatory care services, including surgery and specialized outpatient services",
          address: "915 North Grand Boulevard, St. Louis, MO 63106",
          phone: "(314) 652-4100",
          website: "https://www.va.gov/st-louis-health-care/locations/john-cochran-division/",
          category: "VA"
        },
        {
          name: "St. Louis VA Health Care System - Jefferson Barracks Division",
          description: "Mental health, geriatric, rehabilitation, and long-term care services",
          address: "1 Jefferson Barracks Drive, St. Louis, MO 63125",
          phone: "(314) 652-4100",
          website: "https://www.va.gov/st-louis-health-care/locations/jefferson-barracks-division/",
          category: "VA"
        },
        {
          name: "Gene Taylor VA Clinic",
          description: "Primary care and mental health services for veterans in southwest Missouri",
          address: "600 North Main Street, Mt. Vernon, MO 65712",
          phone: "(417) 466-4000",
          website: "https://www.va.gov/fayetteville-arkansas-health-care/locations/gene-taylor-community-based-outpatient-clinic/",
          category: "Treatment"
        },
        {
          name: "Columbia Vet Center",
          description: "Readjustment counseling services for combat veterans and their families",
          address: "4040 Rangeline Street, Suite 105, Columbia, MO 65202",
          phone: "(573) 814-6206",
          website: "https://www.va.gov/find-locations/facility/vc_0704V",
          category: "Treatment"
        },
        {
          name: "St. Louis Veterans Home",
          description: "Long-term skilled nursing care for Missouri veterans",
          address: "10600 Lewis & Clark Boulevard, St. Louis, MO 63136",
          phone: "(314) 340-6389",
          website: "https://mvc.dps.mo.gov/homes/stlouis.php",
          category: "Housing"
        },
        {
          name: "Missouri Veterans Commission",
          description: "State agency providing benefits assistance, employment support, and education resources",
          address: "205 Jefferson Street, 12th Floor, Jefferson City, MO 65101",
          phone: "(573) 751-3779",
          website: "https://mvc.dps.mo.gov/",
          category: "Employment"
        },
        {
          name: "Missouri Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        }
      ]
    },
    "Montana": {
      resources: [
        {
          name: "Fort Harrison VA Medical Center",
          description: "Comprehensive range of health services including primary care, mental health services, and specialty care",
          address: "3687 Veterans Drive, Fort Harrison, MT 59636",
          phone: "(406) 442-6410",
          website: "https://www.va.gov/montana-health-care/",
          category: "VA"
        },
        {
          name: "Benjamin Charles Steele VA Clinic",
          description: "Primary care, mental health services, and specialty care for veterans in eastern Montana",
          address: "1766 Majestic Lane, Billings, MT 59102",
          phone: "(406) 373-3500",
          website: "https://www.va.gov/montana-health-care/locations/benjamin-charles-steele-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Anaconda VA Clinic",
          description: "Primary care and telehealth services for veterans in southwestern Montana",
          address: "118 E. 7th Street, Anaconda, MT 59711",
          phone: "(406) 496-3000",
          website: "https://www.va.gov/montana-health-care/locations/anaconda-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Bozeman VA Clinic",
          description: "Primary care and mental health services for veterans in the Gallatin Valley",
          address: "300 North Willson Avenue, Suite 703G, Bozeman, MT 59715",
          phone: "(406) 582-5300",
          website: "https://www.va.gov/montana-health-care/locations/bozeman-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Great Falls VA Clinic",
          description: "Primary care, mental health, and select specialty services for central Montana veterans",
          address: "1417 9th Street South, Suite 200, Great Falls, MT 59405",
          phone: "(406) 791-3200",
          website: "https://www.va.gov/montana-health-care/locations/great-falls-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Missoula VA Clinic",
          description: "Primary care and mental health services for western Montana veterans",
          address: "2687 Palmer Street, Suite C, Missoula, MT 59808",
          phone: "(406) 829-5400",
          website: "https://www.va.gov/montana-health-care/locations/david-j-thatcher-va-clinic/",
          category: "Treatment"
        },
        {
          name: "Montana Veterans' Home",
          description: "Long-term care facility for Montana veterans",
          address: "400 Veterans Drive, Columbia Falls, MT 59912",
          phone: "(406) 892-3256",
          website: "https://dphhs.mt.gov/sltc/homelivingoptions/montanaveteranshomes/index",
          category: "Housing"
        },
        {
          name: "Montana Veterans Affairs Division",
          description: "State agency providing benefits assistance, employment services, and education support",
          address: "1956 Mt. Majo Street, Fort Harrison, MT 59636",
          phone: "(406) 324-3740",
          website: "https://montanadma.org/montana-veterans-affairs",
          category: "Employment"
        },
        {
          name: "Montana Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
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
          description: "Comprehensive medical services including primary and specialty care, mental health services, rehabilitation, caregiver support, and resources for homeless veterans",
          address: "3710 Southwest US Veterans Hospital Road, Portland, OR 97239",
          phone: "(503) 220-8262",
          website: "https://www.portland.va.gov/",
          category: "VA"
        },
        {
          name: "Oregon Department of Veterans' Affairs (ODVA)",
          description: "Benefits assistance, healthcare navigation, education and employment resources, financial assistance programs, and housing support",
          address: "700 Summer St NE, Salem, OR 97301",
          phone: "(800) 692-9666",
          website: "https://www.oregon.gov/odva/",
          category: "Employment"
        },
        {
          name: "Vet Centers in Oregon",
          description: "Community-based counseling centers offering individual and group therapy for veterans and their families",
          address: "Multiple locations throughout Oregon",
          phone: "(877) 927-8387",
          website: "https://www.va.gov/find-locations/?facilityType=vet_center&state=OR",
          category: "Crisis"
        },
        {
          name: "Portland VA Research Foundation (PVARF)",
          description: "Supports medical research and education activities for veterans healthcare improvement",
          address: "3710 SW US Veterans Hospital Rd, Portland, OR 97239",
          phone: "(503) 220-8262 ext. 56937",
          website: "https://www.pvarf.org/",
          category: "Treatment"
        },
        {
          name: "Center to Improve Veteran Involvement in Care (CIVIC)",
          description: "Conducts research to empower veterans in managing their health and healthcare",
          address: "3710 SW US Veterans Hospital Rd, Portland, OR 97239",
          phone: "(503) 220-8262",
          website: "https://www.portland.va.gov/research/civic/",
          category: "Treatment"
        },
        {
          name: "Veteran Readiness and Employment (VR&E) Program - Oregon",
          description: "Assists veterans with service-connected disabilities in preparing for, finding, and maintaining suitable employment",
          address: "100 SW Main Street, Floor 2, Portland, OR 97204",
          phone: "(800) 827-1000",
          website: "https://www.va.gov/careers-employment/vocational-rehabilitation/",
          category: "Employment"
        },
        {
          name: "Oregon Veterans' Emergency Financial Assistance Program",
          description: "Financial assistance program for veterans with urgent needs related to housing, utilities, and other emergency situations",
          address: "700 Summer St NE, Salem, OR 97301",
          phone: "(800) 692-9666",
          website: "https://www.oregon.gov/odva/Services/Pages/Emergency-Assistance.aspx",
          category: "Housing"
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
          description: "Primary and specialty care, mental health, PTSD treatment, rehabilitation, palliative care, and more",
          address: "2501 W 22nd St, Sioux Falls, SD 57105",
          phone: "(605) 336-3230",
          website: "https://www.va.gov/sioux-falls-health-care/",
          category: "VA"
        },
        {
          name: "VA Black Hills Health Care System - Fort Meade",
          description: "Comprehensive medical and mental health services, including PTSD care and substance use treatment",
          address: "113 Comanche Rd, Fort Meade, SD 57741",
          phone: "(605) 347-2511",
          website: "https://www.va.gov/black-hills-health-care/locations/fort-meade-va-medical-center/",
          category: "VA"
        },
        {
          name: "VA Black Hills Health Care System - Hot Springs",
          description: "Comprehensive medical services and residential rehabilitation programs",
          address: "500 N 5th St, Hot Springs, SD 57747",
          phone: "(605) 745-2000",
          website: "https://www.va.gov/black-hills-health-care/locations/hot-springs-va-medical-center/",
          category: "VA"
        },
        {
          name: "Sioux Falls Vet Center",
          description: "Confidential counseling for combat veterans and families, PTSD treatment, and military sexual trauma counseling",
          address: "3800 S Kiwanis Ave, Suite 100, Sioux Falls, SD 57105",
          phone: "(605) 330-4552",
          website: "https://www.va.gov/find-locations/facility/vc_0631V",
          category: "Treatment"
        },
        {
          name: "Rapid City Vet Center",
          description: "Confidential counseling for combat veterans and families, bereavement counseling, and trauma treatment",
          address: "621 6th St, Suite 101, Rapid City, SD 57701",
          phone: "(605) 348-0077",
          website: "https://www.va.gov/find-locations/facility/vc_0632V",
          category: "Treatment"
        },
        {
          name: "Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Nationwide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        },
        {
          name: "South Dakota Veterans Cemetery",
          description: "State-operated cemetery offering burial services for veterans and eligible family members",
          address: "Sioux Falls, SD",
          phone: "(605) 336-3230",
          website: "https://vetaffairs.sd.gov/veteranscemetery/default.aspx",
          category: "Housing"
        },
        {
          name: "Black Hills National Cemetery",
          description: "Federally operated cemetery providing burial services for veterans and eligible family members",
          address: "Sturgis, SD",
          phone: "(605) 347-3830",
          website: "https://www.cem.va.gov/cems/nchp/blackhills.asp",
          category: "Housing"
        },
        {
          name: "University of South Dakota - Veterans' Services",
          description: "Assists veterans and families with applying for and receiving education benefits, including GI Bill support",
          address: "414 E Clark St, Vermillion, SD 57069",
          phone: "(605) 677-5331",
          website: "https://www.usd.edu/veterans",
          category: "Employment"
        },
        {
          name: "Veteran Readiness and Employment (VR&E) Program",
          description: "Vocational counseling, training, and job placement assistance for veterans with service-connected disabilities",
          address: "910 5th St, Suite 105, Rapid City, SD 57701",
          phone: "(605) 341-8165",
          website: "https://www.benefits.va.gov/vocrehab/",
          category: "Employment"
        },
        {
          name: "South Dakota Department of Veterans Affairs",
          description: "Assistance with benefits claims, education, and employment resources for veterans",
          address: "425 E Capitol Ave, Pierre, SD 57501",
          phone: "(605) 773-3269",
          website: "https://vetaffairs.sd.gov/",
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