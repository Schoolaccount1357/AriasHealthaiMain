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
  targetAudience: "veteran" | "public";
}

interface StateData {
  [state: string]: {
    veteranResources: StateResource[];
    publicResources: StateResource[];
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
      veteranResources: StateResource[];
      publicResources: StateResource[];
    };
  }
  
  // Sample international data with countries that have U.S. military veterans 
  const countryData: CountryData = {
    "Philippines": {
      veteranResources: [
        {
          name: "Manila VA Outpatient Clinic",
          description: "The only full-service VA clinic outside U.S. territories, offering primary care, mental health services, and assistance with FMP",
          address: "1501 Roxas Boulevard, NOX3 Seafront Compound, Pasay City, PH 01302",
          phone: "+63 (02) 8550-3888 / U.S. Line: 808-433-5254",
          website: "https://www.va.gov/manila-philippines-health-care/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Service Center - Manila",
          description: "Benefits assistance, claims processing, compensation, pension, and vocational rehabilitation",
          address: "1131 Roxas Boulevard, Ermita, Manila, 0930 Philippines",
          phone: "Toll-Free (Philippines): #MyVA (#6982)",
          website: "https://www.benefits.va.gov/manila/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program (FMP) - Philippines",
          description: "Provides healthcare benefits to veterans with VA-rated, service-connected conditions residing in the Philippines",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or U.S./Canada Toll-Free: 877-345-8179",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line (International Access)",
          description: "24/7 support for veterans, service members, and their families, even if not enrolled in VA benefits",
          address: "Nationwide service",
          phone: "Pacific Region: 844-702-5493 or DSN 988",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Philippine Department of Health Mental Health Services",
          description: "National mental health programs and crisis intervention services available to all residents",
          address: "Building 1, San Lazaro Compound, Rizal Avenue, Sta. Cruz, Manila 1003",
          phone: "+63 (02) 8651-7800",
          website: "https://doh.gov.ph/mental-health",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "National Center for Mental Health",
          description: "Premier psychiatric facility providing comprehensive mental health services to the general public",
          address: "Nueve de Febrero St, Mauway, Mandaluyong, 1550 Metro Manila",
          phone: "+63 (02) 8531-9001",
          website: "https://ncmh.gov.ph/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Philippine General Hospital Department of Psychiatry",
          description: "Public hospital psychiatric services available to all Filipino citizens and residents",
          address: "Taft Avenue, Ermita, Manila, 1000 Metro Manila",
          phone: "+63 (02) 8548-8100",
          website: "https://www.pgh.gov.ph/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Department of Social Welfare and Development (DSWD)",
          description: "Social services, housing assistance, and employment programs for all citizens",
          address: "Constitution Hills, Batasan Complex, Quezon City 1126",
          phone: "+63 (02) 8931-8101",
          website: "https://www.dswd.gov.ph/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Germany": {
      veteranResources: [
        {
          name: "Landstuhl Regional Medical Center",
          description: "The largest U.S. military hospital outside the United States",
          address: "Dr. Hitzelberger Straße, 66849 Landstuhl, Germany",
          phone: "+49 6371 9464 0",
          website: "https://landstuhl.tricare.mil/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program (FMP) - Germany",
          description: "Provides healthcare benefits to veterans with VA-rated, service-connected conditions residing in Germany",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or Germany Toll-Free: 0800-1800-011",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Veterans of Foreign Wars - Post 10810",
          description: "Support services for veterans and their families in Germany",
          address: "CMR 480 Box G.D., APO, AE 09128",
          phone: "+49 151 9048 81899",
          website: "https://www.vfw10810.org/",
          category: "Treatment",
          targetAudience: "veteran"
        },
        {
          name: "American Medical Center - Landstuhl",
          description: "Primary care and referrals for mental health services",
          address: "66849 Landstuhl, Germany",
          phone: "+49 6371 9464 0",
          website: "https://landstuhl.tricare.mil/",
          category: "Treatment",
          targetAudience: "veteran"
        },
        {
          name: "USO Kaiserslautern",
          description: "Transition assistance for veterans leaving military service",
          address: "Kleber Kaserne, Kaiserslautern, Germany",
          phone: "+49 61114 3541 5100",
          website: "https://europe.uso.org/kaiserslautern/",
          category: "Employment",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line - Europe",
          description: "24/7 crisis intervention services for veterans in Germany and Europe",
          address: "Ramstein Air Base, 66877 Ramstein-Miesenbach, Germany",
          phone: "Europe: 844-702-5495 or DSN 988",
          website: "https://www.veteranscrisisline.net/get-help/european-support",
          category: "Crisis",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Telefonseelsorge - German Crisis Line",
          description: "Free 24/7 crisis counseling service available to all residents of Germany",
          address: "Nationwide Service",
          phone: "0800 111 0 111 or 0800 111 0 222",
          website: "https://www.telefonseelsorge.de/",
          category: "Crisis",
          targetAudience: "public"
        }
      ]
    },
    "Japan": {
      veteranResources: [
        {
          name: "U.S. Naval Hospital Yokosuka",
          description: "Medical support for veterans in Japan",
          address: "United States Fleet Activities Yokosuka, Japan",
          phone: "+81 46 816 5600",
          website: "https://yokosuka.tricare.mil/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program (FMP) - Japan",
          description: "Provides healthcare benefits to veterans with VA-rated, service-connected conditions residing in Japan",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Japan Toll-Free: 00531-13-0871",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Veterans of Foreign Wars - Post 1054",
          description: "Support for veterans in Japan",
          address: "Building 6002, Yokosuka Naval Base, Japan",
          phone: "+81 46 896 5801",
          website: "https://vfwpacific.org/di/vfw/v2/default.asp",
          category: "Housing",
          targetAudience: "veteran"
        },
        {
          name: "Meguro Counseling Center - Tokyo",
          description: "Psychological counseling and medication guidance for veterans with PTSD, TBI, anxiety, depression",
          address: "Meguro, Tokyo, Japan",
          phone: "+81 3 5431 3096",
          website: "https://megurocounseling.com/",
          category: "Treatment",
          targetAudience: "veteran"
        },
        {
          name: "USO Okinawa",
          description: "Support and resources for transitioning veterans",
          address: "Building 217, Kadena Air Base, Okinawa, Japan",
          phone: "+81 98 970 7788",
          website: "https://okinawa.uso.org/",
          category: "Employment",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line - Pacific",
          description: "24/7 support for veterans, service members, and their families in crisis",
          address: "Accessible throughout Japan",
          phone: "Pacific Region: 844-702-5493 or DSN 988",
          website: "https://www.veteranscrisisline.net/get-help/",
          category: "Crisis",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "TELL Japan - Mental Health Support",
          description: "English-language mental health counseling and crisis support available to all residents",
          address: "Tokyo, Japan",
          phone: "+81 3 5774 0992",
          website: "https://telljp.com/",
          category: "Crisis",
          targetAudience: "public"
        }
      ]
    },
    "South Korea": {
      veteranResources: [
        {
          name: "Brian D. Allgood Army Community Hospital",
          description: "Comprehensive medical care for active-duty, retirees, and families (formerly 121st Combat Support Hospital)",
          address: "USAG Humphreys, Pyeongtaek, South Korea",
          phone: "+82 2 7917 3155",
          website: "https://briandallgood.tricare.mil/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program (FMP) - South Korea",
          description: "Provides healthcare benefits to veterans with VA-rated, service-connected conditions residing in South Korea",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or U.S./Canada Toll-Free: 877-345-8179",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Veterans of Foreign Wars - Post 10223",
          description: "Support and assistance with VA claims for veterans near Camp Humphreys",
          address: "Anjeong-ri, near Camp Humphreys, Pyeongtaek, South Korea",
          phone: "+82 31 691 9900",
          website: "https://www.vfw10223.org/",
          category: "Housing",
          targetAudience: "veteran"
        },
        {
          name: "Army Substance Abuse Program (ASAP) - USAG Humphreys",
          description: "Substance abuse prevention, counseling, and rehabilitation services",
          address: "USAG Humphreys, Pyeongtaek, South Korea",
          phone: "+82 2 7913 3445",
          website: "https://crg.health.mil/",
          category: "Treatment",
          targetAudience: "veteran"
        },
        {
          name: "Military OneSource - Camp Humphreys",
          description: "Employment assistance, resume building, job search support, and career counseling",
          address: "USAG Camp Humphreys, Pyeongtaek, South Korea",
          phone: "+82 31 690 7311",
          website: "https://www.militaryonesource.mil/",
          category: "Employment",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line - Pacific",
          description: "24/7 support for veterans, service members, and their families in crisis",
          address: "Accessible throughout South Korea",
          phone: "Pacific Region: 844-702-5493 or DSN 988",
          website: "https://www.veteranscrisisline.net/get-help/",
          category: "Crisis",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Korea Mental Health Helpline",
          description: "24/7 mental health support line available to all residents of South Korea",
          address: "Nationwide Service",
          phone: "1393",
          website: "https://www.moh.go.kr/eng/",
          category: "Crisis",
          targetAudience: "public"
        }
      ]
    },
    "United Kingdom": {
      veteranResources: [
        {
          name: "RAF Lakenheath Hospital (48th Medical Group)",
          description: "Medical care for U.S. military personnel, families, and eligible veterans stationed in the UK",
          address: "RAF Lakenheath, Brandon, Suffolk IP27 9PN, UK",
          phone: "+44 1638 528010",
          website: "https://www.lakenheath.af.mil/Resources/Clinic/",
          category: "VA",
          targetAudience: "veteran"
        },
        {
          name: "Veterans UK",
          description: "Support on pensions, compensation, welfare, and housing for UK veterans",
          address: "Ministry of Defence, Norcross, Thornton-Cleveleys FY5 3WP, UK",
          phone: "+44 808 1914 218",
          website: "https://www.gov.uk/government/organisations/veterans-uk",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Combat Stress",
          description: "Mental health services for veterans including treatment for PTSD, anxiety, and depression",
          address: "Tyrwhitt House, Oaklawn Road, Leatherhead KT22 0BX, UK",
          phone: "+44 800 138 1619",
          website: "https://combatstress.org.uk/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "The Poppy Factory",
          description: "Employment support for veterans with health conditions",
          address: "20 Petersham Road, Richmond TW10 6UR, UK",
          phone: "+44 20 8940 3305",
          website: "https://www.poppyfactory.org/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line UK",
          description: "Crisis support for U.S. veterans residing in the UK",
          address: "RAF Croughton, Nr Brackley NN13 5NQ, UK",
          phone: "+44 20 3695 0097",
          website: "https://www.veteranscrisisline.net/get-help/european-support",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Op COURAGE",
          description: "NHS specialist service providing mental health support to veterans and service leavers",
          address: "Available across England",
          phone: "+44 0300 323 0117",
          website: "https://www.nhs.uk/nhs-services/armed-forces-community/mental-health/veterans-reservists/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Togetherall",
          description: "Free, anonymous online community offering 24/7 mental health support for UK veterans",
          address: "London, UK",
          phone: "N/A - Online Service",
          website: "https://togetherall.com/en-gb/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "SSAFA - The Armed Forces Charity",
          description: "Practical, emotional, and financial support to veterans and their families",
          address: "Queen Elizabeth House, 4 St Dunstan's Hill, London, EC3R 8AD, UK",
          phone: "+44 800 260 6767",
          website: "https://www.ssafa.org.uk/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Forces Employment Charity",
          description: "Career advice, job placements, and training programs for veterans",
          address: "First Floor, 10 Victoria Street, London, SW1H 0NB, UK",
          phone: "+44 121 236 0058",
          website: "https://www.forcesemployment.org.uk/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans' Gateway",
          description: "Single point of contact for veterans seeking advice and support 24/7",
          address: "Nationwide service, UK",
          phone: "+44 808 802 1212",
          website: "https://www.veteransgateway.org.uk/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "NHS Mental Health Services",
          description: "National Health Service mental health support and crisis services for all UK residents",
          address: "Available nationwide through NHS Trusts",
          phone: "111 (NHS 111)",
          website: "https://www.nhs.uk/mental-health/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Samaritans UK Crisis Line",
          description: "24/7 confidential emotional support for anyone experiencing distress or despair",
          address: "Nationwide Service",
          phone: "116 123",
          website: "https://www.samaritans.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Jobcentre Plus",
          description: "UK government employment services including job search assistance and benefits",
          address: "Available at locations nationwide",
          phone: "0800 169 0310",
          website: "https://www.gov.uk/contact-jobcentre-plus",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Citizens Advice Housing",
          description: "Free housing advice and support for UK residents facing housing issues",
          address: "Available at local Citizens Advice offices",
          phone: "0800 144 8848",
          website: "https://www.citizensadvice.org.uk/housing/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Italy": {
      veteranResources: [
        {
          name: "U.S. Naval Hospital Naples",
          description: "Comprehensive medical care for active-duty service members, retirees, and their families",
          address: "Via Contrada Boscariello, Gricignano di Aversa (CE) 81030, Italy",
          phone: "+39 081 811 6000",
          website: "https://naples.tricare.mil/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "American Red Cross - Naples",
          description: "Emergency communication services, financial assistance, and referral services for veterans and families",
          address: "Village Forum Building, PSC 817 Box 27, FPO AE 09622, Naples, Italy",
          phone: "+39 081 568 4788",
          website: "https://www.redcross.org/local/overseas/italy.html",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Behavioral Health Services - Aviano Air Base",
          description: "Mental health services including individual/group therapy, substance use education, and family counseling",
          address: "31st Medical Group, Aviano Air Base, Italy",
          phone: "+39 0434 30 5321",
          website: "https://aviano.tricare.mil/Health-Services/Mental-Health",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Transition Assistance Program - Naples",
          description: "Resources for transition to civilian life, employment assistance and veterans' benefits information",
          address: "Fleet and Family Support Center, Naval Support Activity Naples, Italy",
          phone: "+39 081 811 6372",
          website: "https://www.cnic.navy.mil/regions/cnreurafcent/installations/nsa_naples/ffr/support_services/career_support/transition_assistance.html",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Military Crisis Line - Europe",
          description: "24/7 confidential support to veterans in crisis",
          address: "Accessible throughout Europe",
          phone: "00800 1273 8255 (TALK)",
          website: "https://www.veteranscrisisline.net/get-help/european-support",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "U.S. Army Garrison (USAG) Italy - Vicenza",
          description: "Healthcare services including mental health resources, veteran healthcare, and family care options",
          address: "Caserma Ederle, Viale Della Pace, 36100 Vicenza, Italy",
          phone: "+39 0444 71 7114",
          website: "https://home.army.mil/italy/index.php/about/Garrison/directorate-health-services",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "American University of Rome - Veterans Aid",
          description: "Educational benefits for U.S. veterans and families using Post-9/11 GI Bill, plus Veterans Club for community support",
          address: "Via Pietro Roselli 4, 00153 Rome, Italy",
          phone: "+39 06 5833 0919",
          website: "https://aur.edu/admissions/veterans",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "John Cabot University - Veteran Benefits",
          description: "VA educational and training benefit programs, assistance with enrollment certification and military transfer credits",
          address: "Via della Lungara 233, 00165 Rome, Italy",
          phone: "+39 06 681 9121",
          website: "https://www.johncabot.edu/admissions/veterans-benefits.aspx",
          category: "Employment"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Servizio Sanitario Nazionale - Salute Mentale",
          description: "National Health Service mental health services for all Italian residents",
          address: "Available through local ASL health authorities",
          phone: "1500 (Health Ministry)",
          website: "https://www.salute.gov.it/portale/saluteMentale/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Telefono Amico Italia",
          description: "24/7 emotional support and crisis intervention services",
          address: "Nationwide Service",
          phone: "02 2327 2327",
          website: "https://www.telefonoamico.it/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Centri per l'Impiego",
          description: "Public employment centers providing job placement and training services",
          address: "Available in all Italian regions",
          phone: "Contact local centers",
          website: "https://www.anpal.gov.it/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Ministero delle Infrastrutture - Casa Italia",
          description: "National housing programs and assistance for Italian residents",
          address: "Via Nomentana 2, Rome",
          phone: "06 4412 1",
          website: "https://www.mit.gov.it/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Thailand": {
      veteranResources: [
        {
          name: "U.S. Embassy Bangkok - Veterans Affairs",
          description: "Information on applying for VA benefits and assistance for U.S. veterans in Thailand",
          address: "95 Wireless Road, Lumpini, Pathumwan, Bangkok 10330, Thailand",
          phone: "+66 2 205 4000",
          website: "https://th.usembassy.gov/u-s-citizen-services/veterans-affairs/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Joint U.S. Military Advisory Group Thailand (JUSMAGTHAI)",
          description: "General assistance with Department of Defense (DoD) matters for retired U.S. service members",
          address: "7 Sathorn Tai Road, Bangkok, Thailand",
          phone: "+66 2 287 1036",
          website: "https://myarmybenefits.us.army.mil/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "The Beekeeper House",
          description: "Specialized trauma and PTSD treatment using evidence-based therapies like EMDR, neurofeedback, and mindfulness",
          address: "Chiang Mai, Thailand",
          phone: "+66 62 436 3975",
          website: "https://beekeeperhouse.com/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Bangkok Mental Health Hospital",
          description: "PTSD treatments including CBT, EMDR, group therapy, and mindfulness exercises",
          address: "Bangkok, Thailand",
          phone: "+66 2 136 3888",
          website: "https://bangkokmentalhealthhospital.com/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Miracles Asia",
          description: "Residential programs for veterans dealing with PTSD and addiction, focusing on long-term recovery",
          address: "Phuket, Thailand",
          phone: "+66 98 317 1919",
          website: "https://miraclesasia.com/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "The Diamond Rehab Thailand",
          description: "Personalized PTSD and trauma treatment programs combining psychotherapy and holistic wellness practices",
          address: "Phuket, Thailand",
          phone: "+66 98 721 8529",
          website: "https://diamondrehabthailand.com/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans of Foreign Wars (VFW) Post 9951",
          description: "Assistance with VA benefits and claims in Bangkok",
          address: "Bangkok, Thailand",
          phone: "+66 81 889 0202",
          website: "https://vfw9951.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans of Foreign Wars (VFW) Post 9876",
          description: "Offers 'buddy-buddy' program for peer support in Pattaya",
          address: "Pattaya, Thailand",
          phone: "+66 89 807 2335",
          website: "https://vfw9876.org/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans of Foreign Wars (VFW) Post 12074",
          description: "Community support and veteran assistance in Chiang Mai",
          address: "Chiang Mai, Thailand",
          phone: "+66 81 111 5956",
          website: "https://vfw12146.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "American Legion Thailand Post TH01",
          description: "Assists veterans, spouses, and dependents with benefit questions and claims",
          address: "Bangkok, Thailand",
          phone: "+66 89 999 1570",
          website: "https://americanlegionthailand.com/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans First Pattaya",
          description: "Supports veterans' mental health with personalized treatment plans addressing trauma and PTSD",
          address: "Pattaya, Thailand",
          phone: "+66 89 249 1646",
          website: "https://www.facebook.com/VeteransFirstPattaya/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Horizon Rehab Center",
          description: "Hospital-affiliated residential and outpatient treatment for mental health and addiction recovery",
          address: "Bangkok, Thailand",
          phone: "+66 82 695 3494",
          website: "https://recovery.com/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Manarom Hospital",
          description: "Comprehensive mental health services including counseling, psychotherapy, and group therapy",
          address: "Bangkok, Thailand",
          phone: "+66 2 282 0796",
          website: "https://www.manarom.com/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Department of Mental Health Thailand",
          description: "National mental health services and crisis support for Thai residents",
          address: "88/20 Tiwanond Road, Nonthaburi 11000",
          phone: "1323 (Mental Health Hotline)",
          website: "https://www.dmh.go.th/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Thailand Mental Health Crisis Line",
          description: "24/7 mental health crisis support and counseling services",
          address: "Nationwide Service",
          phone: "1323",
          website: "https://www.dmh.go.th/service/view.asp?id=147",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Department of Employment Thailand",
          description: "Government employment services and job placement assistance",
          address: "Mitmaitri Road, Din Daeng, Bangkok 10400",
          phone: "1694",
          website: "https://www.doe.go.th/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "National Housing Authority",
          description: "Government housing programs and affordable housing initiatives",
          address: "61 Chaeng Watthana Road, Bangkok 10210",
          phone: "02 142 5000",
          website: "https://www.nha.co.th/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Vietnam": {
      veteranResources: [
        {
          name: "U.S. Embassy & Consulate Services - Vietnam",
          description: "Assistance with Veterans Affairs benefits, claims processing, and information on available services",
          address: "7 Lang Ha Street, Ba Dinh District, Hanoi, Vietnam",
          phone: "+84 24 3850 5000",
          website: "https://vn.usembassy.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "U.S. Consulate General - Ho Chi Minh City",
          description: "Assistance with Veterans Affairs benefits and claims for veterans in southern Vietnam",
          address: "4 Le Duan Blvd, District 1, Ho Chi Minh City, Vietnam",
          phone: "+84 28 3520 4200",
          website: "https://vn.usembassy.gov/embassy-consulate/ho-chi-minh-city/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program (FMP) - Vietnam",
          description: "Reimburses medical services related to VA-rated service-connected conditions",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "+1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Family Medical Practice Vietnam",
          description: "Medical care, mental health services including PTSD counseling (FMP reimbursement eligible)",
          address: "Diamond Plaza, 34 Le Duan Blvd, District 1, Ho Chi Minh City, Vietnam",
          phone: "+84 28 3822 7848",
          website: "https://www.vietnammedicalpractice.com",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "International SOS Vietnam",
          description: "Emergency medical services, specialist consultations, medical evacuations (FMP eligible)",
          address: "167A Nam Ky Khoi Nghia Street, District 3, Ho Chi Minh City, Vietnam",
          phone: "+84 28 3829 8520",
          website: "https://www.internationalsos.com/locations/asia-pacific/vietnam",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line - International Access",
          description: "Confidential support for veterans in crisis and their families",
          address: "N/A - Call from anywhere",
          phone: "Dial 988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Ministry of Health - Mental Health Department",
          description: "National mental health services for Vietnamese residents",
          address: "138A Giảng Võ, Ba Đình, Hà Nội",
          phone: "024 3826 9167",
          website: "https://moh.gov.vn/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Vietnam Mental Health Crisis Line",
          description: "Crisis support and mental health counseling services",
          address: "Nationwide Service",
          phone: "1900 0167",
          website: "https://moh.gov.vn/hoat-dong-cua-lanh-dao-bo",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Ministry of Labour - Employment Services",
          description: "Government employment services and vocational training programs",
          address: "12 Ngô Quyền, Hoàn Kiếm, Hà Nội",
          phone: "024 3825 6191",
          website: "https://molisa.gov.vn/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Ministry of Construction - Housing Programs",
          description: "National housing development and assistance programs",
          address: "37 Lê Đại Hành, Hai Bà Trưng, Hà Nội",
          phone: "024 3822 3079",
          website: "https://moc.gov.vn/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Australia": {
      veteranResources: [
        {
          name: "U.S. Consulate General - Sydney",
          description: "Consular services including assistance with Federal Benefits Unit (FBU) claims and medical referrals",
          address: "Level 10, MLC Centre, 19-29 Martin Place, Sydney, NSW 2000, Australia",
          phone: "+61 2 9373 9200",
          website: "https://au.usembassy.gov/embassy-consulates/sydney/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Returned and Services League (RSL) Clubs",
          description: "Support services, camaraderie, and community engagement for veterans including U.S. veterans",
          address: "Multiple locations throughout Australia",
          phone: "+61 2 9264 8188",
          website: "https://www.rslnational.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Mental Health Services - Melbourne",
          description: "Mental health services for veterans eligible under the Foreign Medical Program (FMP)",
          address: "299 Swanston Street, Melbourne, VIC 3000, Australia",
          phone: "+61 3 9662 2911",
          website: "https://www.openarms.gov.au/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "U.S. Veterans Employment Network - Australia",
          description: "Job placement assistance for U.S. veterans in Australia",
          address: "Brisbane, QLD, Australia",
          phone: "+61 7 3305 1400",
          website: "https://www.dva.gov.au/civilian-life/finding-employment-after-service",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Open Arms - Veterans & Families Counselling",
          description: "Free and confidential counselling and support services (U.S. veterans may inquire about eligibility)",
          address: "Multiple locations across Australia",
          phone: "+61 1800 011 046",
          website: "https://www.openarms.gov.au/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Soldier On Australia",
          description: "Mental health support, employment assistance, and social connection activities for all veterans including those from allied nations",
          address: "Multiple locations across Australia",
          phone: "+61 1300 620 380",
          website: "https://soldieron.org.au/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veteran Employment Program",
          description: "Australian Government initiative supporting veterans transitioning to civilian employment",
          address: "Canberra, ACT, Australia",
          phone: "+61 1800 555 254",
          website: "https://veteransemployment.gov.au/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "RSL Veterans' Employment Program",
          description: "Employment support including resume development and job placement assistance for all veterans residing in Australia",
          address: "Multiple RSL locations across Australia",
          phone: "+61 2 9264 8188",
          website: "https://rslnsw.org.au/veterans-services/employment/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Beyond Blue",
          description: "National mental health organization providing support and information",
          address: "Nationwide Service",
          phone: "1300 22 4636",
          website: "https://www.beyondblue.org.au/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Lifeline Australia",
          description: "24/7 crisis support and suicide prevention services",
          address: "Nationwide Service",
          phone: "13 11 14",
          website: "https://www.lifeline.org.au/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Centrelink - Services Australia",
          description: "Government employment services and job search assistance",
          address: "Available at service centers nationwide",
          phone: "132 850",
          website: "https://www.servicesaustralia.gov.au/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Australian Government Housing",
          description: "National housing assistance and affordable housing programs",
          address: "Available through state housing authorities",
          phone: "Contact local housing authority",
          website: "https://www.dss.gov.au/housing-support",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "New Zealand": {
      veteranResources: [
        {
          name: "Foreign Medical Program (FMP) - New Zealand",
          description: "Provides healthcare benefits to U.S. veterans with VA-rated, service-connected conditions residing in New Zealand",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or Australia Toll-Free: 1-800-354-965",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans' Affairs New Zealand (VANZ)",
          description: "Provides support to New Zealand veterans, including health, rehabilitation, and financial assistance",
          address: "Wellington, New Zealand",
          phone: "NZ: 0800 483 8372 | Australia: 1800 483 837 | International: +64 4 495 2070",
          website: "https://www.veteransaffairs.mil.nz/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Mental Health Services for Veterans - Wellington",
          description: "Offers mental health and PTSD treatment services for veterans",
          address: "Lambton Quay, Wellington, New Zealand",
          phone: "+64 4 801 5050",
          website: "https://www.mentalhealth.org.nz/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Wellington Hospital Mental Health Services",
          description: "Provides comprehensive mental health services, including inpatient care for veterans",
          address: "Riddiford Street, Newtown, Wellington 6021, New Zealand",
          phone: "+64 4 385 5999",
          website: "https://www.ccdhb.org.nz/our-services/mental-health-addiction-and-intellectual-disability-service/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Royal New Zealand Returned and Services' Association (RSA)",
          description: "Offers support to veterans and their families, including advocacy, welfare services, and community engagement",
          address: "National Office, Wellington, New Zealand",
          phone: "+64 4 384 7994",
          website: "https://www.rsa.org.nz/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Support - Lifeline Aotearoa",
          description: "24/7 crisis support and suicide prevention services for veterans",
          address: "National service, New Zealand",
          phone: "0800 543 354",
          website: "https://www.lifeline.org.nz/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Samaritans New Zealand",
          description: "Confidential support for anyone in emotional distress or suicidal crisis",
          address: "National service, New Zealand",
          phone: "0800 726 666",
          website: "https://www.samaritans.org.nz/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Need to Talk - New Zealand",
          description: "Free call or text service for mental health support",
          address: "National service, New Zealand",
          phone: "1737 (call or text)",
          website: "https://1737.org.nz/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "NZDF4U Support Line",
          description: "Confidential support line for New Zealand Defence Force personnel and veterans",
          address: "National service, New Zealand",
          phone: "0800 693 348",
          website: "https://www.nzdf.mil.nz/nzdf/health-and-wellbeing/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Mental Health Foundation of New Zealand",
          description: "National mental health support and resources for all residents",
          address: "Building F, 74 Taharoto Road, Takapuna, Auckland",
          phone: "09 623 4812",
          website: "https://www.mentalhealth.org.nz/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "1737 Need to Talk?",
          description: "24/7 free call, text, or webchat mental health support",
          address: "Nationwide Service",
          phone: "1737",
          website: "https://1737.org.nz/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Work and Income New Zealand",
          description: "Government employment services and job placement assistance",
          address: "Available at service centers nationwide",
          phone: "0800 559 009",
          website: "https://www.workandincome.govt.nz/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Kāinga Ora - Homes and Communities",
          description: "Government housing agency providing affordable housing solutions",
          address: "Level 1, 55 Fanshawe Street, Auckland",
          phone: "0800 801 601",
          website: "https://kaingaora.govt.nz/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "France": {
      veteranResources: [
        {
          name: "Foreign Medical Program (FMP) - France",
          description: "Provides healthcare benefits to U.S. veterans with VA-rated, service-connected conditions residing in France",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or Germany Toll-Free: 0800-1800-011",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "American Hospital of Paris",
          description: "Private, not-for-profit hospital established in 1906, recognized by U.S. Congress and the French government with dual accreditation",
          address: "63 Boulevard Victor Hugo, 92200 Neuilly-sur-Seine, France",
          phone: "+33 1 46 41 25 25",
          website: "https://www.american-hospital.org/en/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Sainte-Anne Hospital Center",
          description: "Specializes in psychiatry, neurology, neurosurgery, neuroimaging, and addiction for comprehensive mental health services",
          address: "1 Rue Cabanis, 75014 Paris, France",
          phone: "+33 1 45 65 81 00",
          website: "http://www.ch-sainte-anne.fr/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Medical and Psychological Emergency Units (CUMP)",
          description: "Immediate assistance for veterans affected by traumatic events such as natural disasters or terrorist attacks",
          address: "Various locations throughout France",
          phone: "Emergency: 15 (SAMU)",
          website: "https://www.gouvernement.fr/risques",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Suicide Écoute",
          description: "24/7 free, compassionate, and confidential support by phone for individuals in crisis",
          address: "Paris, France",
          phone: "+33 1 45 39 40 00",
          website: "https://www.suicide-ecoute.fr/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "3114 – National Suicide Prevention Number",
          description: "France's national suicide prevention hotline, offering free and confidential support 24/7",
          address: "Nationwide service, France",
          phone: "3114",
          website: "https://3114.fr/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "U.S. Veterans Network - France",
          description: "Employment assistance for U.S. veterans residing in France",
          address: "Paris, France",
          phone: "+33 1 42 60 38 48",
          website: "https://www.legion.org/veteransbenefits/employment",
          category: "Employment"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Santé Publique France - Santé Mentale",
          description: "National public health agency mental health services",
          address: "12 rue du Val d'Osne, 94415 Saint-Maurice",
          phone: "01 41 79 67 00",
          website: "https://www.santepubliquefrance.fr/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "SOS Amitié",
          description: "24/7 emotional support and crisis intervention hotline",
          address: "Nationwide Service",
          phone: "09 72 39 40 50",
          website: "https://www.sos-amitie.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Pôle Emploi",
          description: "National employment agency providing job search and training services",
          address: "Available at agencies nationwide",
          phone: "3949",
          website: "https://www.pole-emploi.fr/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Action Logement",
          description: "National housing assistance and affordable housing programs",
          address: "Available through regional offices",
          phone: "0 805 69 00 59",
          website: "https://www.actionlogement.fr/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Portugal": {
      veteranResources: [
        {
          name: "U.S. Embassy Lisbon",
          description: "Provides assistance with information related to the Foreign Medical Program (FMP) and other consular services for U.S. veterans",
          address: "Avenida das Forças Armadas 1600-081 Lisbon, Portugal",
          phone: "+351 21 727 3300",
          website: "https://pt.usembassy.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Lajes Field - Terceira Island, Azores",
          description: "U.S. military base with medical facilities and various support services potentially accessible to veterans",
          address: "Lajes Field, Azores, Portugal",
          phone: "+351 295 57 1115",
          website: "https://www.facebook.com/LajesField/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "U.S. Embassy Medical Referrals",
          description: "Referrals to appropriate English-speaking medical and mental health services in Portugal",
          address: "Avenida das Forças Armadas 1600-081 Lisbon, Portugal",
          phone: "+351 21 727 3300",
          website: "https://pt.usembassy.gov/u-s-citizen-services/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hospital da Luz",
          description: "Major private hospital with English-speaking providers that may accept FMP reimbursement",
          address: "Avenida Lusíada 100, 1500-650 Lisbon, Portugal",
          phone: "+351 21 710 4400",
          website: "https://www.hospitaldaluz.pt/en/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in Portugal",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Serviço Nacional de Saúde - Saúde Mental",
          description: "National Health Service mental health services for Portuguese residents",
          address: "Available through health centers nationwide",
          phone: "808 24 24 24 (SNS 24)",
          website: "https://www.sns.gov.pt/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "SOS Voz Amiga",
          description: "24/7 emotional support and crisis counseling services",
          address: "Nationwide Service",
          phone: "213 544 545",
          website: "https://www.sosvozamiga.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Instituto do Emprego e Formação Profissional",
          description: "National employment and vocational training institute",
          address: "Available at job centers nationwide",
          phone: "707 474 747",
          website: "https://www.iefp.pt/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Instituto da Habitação e da Reabilitação Urbana",
          description: "National housing institute providing housing assistance programs",
          address: "Av. de Berlim 15, 1800-031 Lisboa",
          phone: "218 221 100",
          website: "https://www.portaldahabitacao.pt/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Belgium": {
      veteranResources: [
        {
          name: "U.S. Embassy Brussels",
          description: "Provides assistance with FMP-related inquiries and other consular services for veterans",
          address: "Regentlaan 27 Boulevard du Régent, B-1000 Brussels, Belgium",
          phone: "+32 2 811 4000",
          website: "https://be.usembassy.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "SHAPE Healthcare Facility",
          description: "Offers outpatient services including family practice, pediatrics, optometry, dental, and behavioral health",
          address: "Building 401, Avenue d'Oslo, 7010 Mons, Belgium",
          phone: "+32 65 44 5824",
          website: "https://mhs-europe.tricare.mil/SHAPE",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Community Help Service (CHS) - Brussels",
          description: "Provides confidential, English-speaking mental health support and crisis intervention services",
          address: "Brussels, Belgium",
          phone: "+32 2 648 40 14",
          website: "https://www.chsbelgium.org/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "NATO Employment Opportunities",
          description: "Employment opportunities through NATO connections for veterans",
          address: "SHAPE Human Resources Office, Mons, Belgium",
          phone: "+32 65 44 3333",
          website: "https://www.nato.int/careers",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in Belgium",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816 or Germany Toll-Free: 0800-1800-011",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ]
    },
    "Greece": {
      veteranResources: [
        {
          name: "Veterans Support - Athens",
          description: "FMP assistance and medical referrals",
          address: "Vassilissis Sofias Avenue, Athens, Greece",
          phone: "+30 210 721 2951",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Athens Medical Center",
          description: "Medical services eligible for FMP reimbursement",
          address: "Kifisias Avenue, Athens, Greece",
          phone: "+30 210 686 7000",
          website: "https://www.iatriko.gr/en/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Mental Health Support - Athens",
          description: "PTSD and mental health services",
          address: "Skoufa Street, Athens, Greece",
          phone: "+30 210 364 5104",
          website: "https://www.athenscounseling.com/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ]
    },
    "Israel": {
      veteranResources: [
        {
          name: "U.S. Embassy Branch Office - Tel Aviv",
          description: "Provides assistance to veterans, including information on the Foreign Medical Program (FMP) and medical referrals",
          address: "71 HaYarkon Street, Tel Aviv 6343229, Israel",
          phone: "+972 3 519 7575",
          website: "https://il.usembassy.gov/u-s-citizen-services/veterans-affairs/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Tel Aviv University - National PTSD Clinic",
          description: "Specialized trauma treatment for veterans and civilians, launched in January 2024",
          address: "Tel Aviv University, Tel Aviv, Israel",
          phone: "+972 3 640 8111",
          website: "https://english.tau.ac.il/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in Israel",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Ministry of Health - Mental Health Services",
          description: "National mental health services for Israeli residents",
          address: "39 Yirmiyahu Street, Jerusalem",
          phone: "*5400",
          website: "https://www.health.gov.il/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "ERAN - Crisis Support",
          description: "24/7 emotional crisis support and suicide prevention hotline",
          address: "Nationwide Service",
          phone: "1201",
          website: "https://www.eran.org.il/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Ministry of Labor - Employment Service",
          description: "National employment services and job placement assistance",
          address: "Available at employment bureaus nationwide",
          phone: "*6050",
          website: "https://www.gov.il/he/departments/ministry_of_labor_social_affairs_and_social_services",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Ministry of Housing - Public Housing",
          description: "National housing assistance and affordable housing programs",
          address: "8 Bank of Israel Street, Jerusalem",
          phone: "*9080",
          website: "https://www.gov.il/he/departments/ministry_of_construction_and_housing",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "United Arab Emirates": {
      veteranResources: [
        {
          name: "U.S. Embassy - Abu Dhabi",
          description: "Provides assistance to veterans with FMP information and consular services",
          address: "P.O. Box 4009, Abu Dhabi, UAE",
          phone: "+971 2 414 2200",
          website: "https://ae.usembassy.gov/u-s-citizen-services/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "American Hospital Dubai",
          description: "Medical services eligible for FMP reimbursement, recognized for high standards of care",
          address: "19th Street, Oud Metha, Dubai, UAE",
          phone: "+971 4 377 6666",
          website: "https://www.ahdubai.com/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Aspris Wellbeing Centre - Abu Dhabi",
          description: "Provides mental health support services, including for veterans",
          address: "Al Bateen, Abu Dhabi, UAE",
          phone: "+971 2 651 8111",
          website: "https://www.asprismentalhealth.ae/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in UAE",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "UAE Ministry of Health - Mental Health Services",
          description: "National mental health services for UAE residents",
          address: "Available through health centers nationwide",
          phone: "800 1717",
          website: "https://www.mohap.gov.ae/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "UAE Mental Health Crisis Line",
          description: "24/7 mental health crisis support services",
          address: "Nationwide Service",
          phone: "800 4673",
          website: "https://www.mohap.gov.ae/en/services/mental-health-services",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Ministry of Human Resources - Employment Services",
          description: "National employment services and career development programs",
          address: "Available at Tasheel centers nationwide",
          phone: "600 590000",
          website: "https://www.mohre.gov.ae/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Mohammed bin Rashid Housing Programme",
          description: "Housing assistance and affordable housing programs for citizens",
          address: "Available through Dubai Municipality",
          phone: "800 9090",
          website: "https://www.dm.gov.ae/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "South Africa": {
      veteranResources: [
        {
          name: "U.S. Embassy - Pretoria",
          description: "Provides FMP assistance and medical referrals for U.S. veterans in South Africa",
          address: "877 Pretorius Street, Arcadia, Pretoria, 0083, South Africa",
          phone: "+27 12 431 4000",
          website: "https://za.usembassy.gov/u-s-citizen-services/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Mediclinic Cape Town",
          description: "Medical services eligible for FMP reimbursement",
          address: "21 Hof Street, Oranjezicht, Cape Town, 8001, South Africa",
          phone: "+27 21 464 5500",
          website: "https://www.mediclinic.co.za/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Recovery Direct - Johannesburg",
          description: "Specializes in trauma and PTSD services for veterans",
          address: "Sandton, Johannesburg, South Africa",
          phone: "+27 11 884 4030",
          website: "https://www.recoverydirect.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Foreign Medical Program Support",
          description: "Assistance with VA-rated, service-connected conditions for veterans residing in South Africa",
          address: "PO Box 200, Spring City, PA 19475, USA",
          phone: "Main: +1-833-930-0816",
          website: "https://www.va.gov/health-care/foreign-medical-program/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ]
    }
  };
  
  const stateData: StateData = {
    "Alabama": {
      veteranResources: [
        {
          name: "VA Medical Center - Birmingham",
          description: "313-bed VA healthcare facility located at University of Alabama at Birmingham",
          address: "700 19th St S, Birmingham, AL 35233",
          phone: "(205) 933-8101",
          website: "https://www.va.gov/birmingham-health-care/",
          category: "VA",
          zipCode: "35233",
          targetAudience: "veteran"
        },
        {
          name: "Three Hots and A Cot",
          description: "Transitional housing for veterans",
          address: "2124 Old Montgomery Highway, Birmingham, AL 35216",
          phone: "(205) 377-3779",
          website: "https://cotsforvets.org",
          category: "Housing",
          zipCode: "35216",
          targetAudience: "veteran"
        },
        {
          name: "Still Serving Veterans",
          description: "Employment assistance and career counseling",
          address: "626 Clinton Avenue W, Huntsville, AL 35801",
          phone: "(256) 883-7035",
          website: "https://ssv.org",
          category: "Employment",
          zipCode: "35801",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Recovery Program",
          description: "Substance abuse and mental health treatment",
          address: "1000 Medical Center Parkway, Birmingham, AL 35235",
          phone: "(205) 481-7223",
          website: "https://veteransrecovery.org",
          category: "Treatment",
          zipCode: "35235",
          targetAudience: "veteran"
        },
        {
          name: "Alabama Veterans Crisis Center",
          description: "24/7 crisis intervention and support",
          address: "1721 University Boulevard, Birmingham, AL 35233",
          phone: "(205) 212-4000",
          website: "https://alvetscenter.org",
          category: "Crisis",
          zipCode: "35233",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Alabama Department of Mental Health",
          description: "State mental health services for all residents including crisis intervention and counseling",
          address: "100 North Union Street, Montgomery, AL 36130",
          phone: "(334) 242-3454",
          website: "https://mh.alabama.gov/",
          category: "Treatment",
          zipCode: "36130",
          targetAudience: "public"
        },
        {
          name: "Alabama Crisis Center",
          description: "24/7 crisis hotline and support services for all Alabama residents",
          address: "Crisis Hotline - Statewide",
          phone: "211 or 1-800-273-8255",
          website: "https://alabamacrisis.org/",
          category: "Crisis",
          zipCode: "35233",
          targetAudience: "public"
        },
        {
          name: "Alabama Department of Labor - Career Centers",
          description: "State employment services including job training and placement assistance",
          address: "649 Monroe Street, Montgomery, AL 36131",
          phone: "(334) 242-8003",
          website: "https://www.labor.alabama.gov/",
          category: "Employment",
          zipCode: "36131",
          targetAudience: "public"
        }
      ]
    },
    "Alaska": {
      veteranResources: [
        {
          name: "Colonel Mary Louise Rasmuson Campus - Alaska VA Healthcare System",
          description: "Comprehensive primary care, mental health services, and programs for homeless veterans",
          address: "1201 North Muldoon Road, Anchorage, AK 99504-6104",
          phone: "888-353-7574",
          website: "https://www.va.gov/alaska-health-care/",
          category: "VA",
          zipCode: "99504",
          targetAudience: "veteran"
        },
        {
          name: "Joint Base Elmendorf-Richardson VA Medical Center",
          description: "Specialty care services, mental health care, and 24/7 emergency care",
          address: "5955 Zeamer Avenue, Joint Base Elmendorf-Richardson, AK 99506-3702",
          phone: "888-353-7574",
          website: "https://www.va.gov/alaska-health-care/locations/joint-base-elmendorf-richardson/",
          category: "VA",
          zipCode: "99506",
          targetAudience: "veteran"
        },
        {
          name: "Fairbanks VA Clinic",
          description: "Primary care, mental health care, audiology, and women's health services",
          address: "2555 Phillips Field Road, Fairbanks, AK 99709-3933",
          phone: "888-353-7574",
          website: "https://www.va.gov/alaska-health-care/locations/fairbanks-va-clinic/",
          category: "Treatment",
          zipCode: "99709",
          targetAudience: "veteran"
        },
        {
          name: "Anchorage Vet Center",
          description: "Counseling and outreach services to veterans and their families",
          address: "4201 Tudor Centre Drive, Suite 115, Anchorage, AK 99508",
          phone: "907-563-6966",
          website: "https://www.va.gov/find-locations/facility/vc_0521V",
          category: "Crisis",
          zipCode: "99508",
          targetAudience: "veteran"
        },
        {
          name: "Alaska Office of Veterans Affairs",
          description: "Information on healthcare benefits, eligibility and services for Alaska veterans",
          address: "1111 West 8th Street, Juneau, AK 99801",
          phone: "907-465-2151",
          website: "https://veterans.alaska.gov/",
          category: "Employment",
          zipCode: "99801",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Alaska Department of Health - Mental Health Services",
          description: "State mental health services for all Alaska residents",
          address: "350 Main St, Juneau, AK 99801",
          phone: "(907) 465-3370",
          website: "https://dhss.alaska.gov/dbh/Pages/default.aspx",
          category: "Treatment",
          zipCode: "99801",
          targetAudience: "public"
        },
        {
          name: "Alaska Crisis Line",
          description: "24/7 crisis support for all Alaska residents",
          address: "Statewide Service",
          phone: "1-877-266-4357",
          website: "https://alaskacrisisline.org/",
          category: "Crisis",
          zipCode: "99501",
          targetAudience: "public"
        }
      ]
    },
    "Arizona": {
      veteranResources: [
        {
          name: "Phoenix VA Health Care System",
          description: "Comprehensive VA healthcare in Arizona",
          address: "650 E. Indian School Road, Phoenix, AZ 85012",
          phone: "(602) 277-5551",
          website: "https://www.va.gov/phoenix-health-care/",
          category: "VA",
          zipCode: "85012",
          targetAudience: "veteran"
        },
        {
          name: "U.S.VETS - Phoenix",
          description: "Transitional housing and permanent housing assistance",
          address: "3507 N. Central Ave, Phoenix, AZ 85012",
          phone: "(602) 305-8585",
          website: "https://usvets.org/locations/phoenix/",
          category: "Housing",
          zipCode: "85012",
          targetAudience: "veteran"
        },
        {
          name: "Arizona Veterans StandDown Alliance",
          description: "Employment and job training services",
          address: "1125 W. Jackson Street, Phoenix, AZ 85007",
          phone: "(602) 340-9393",
          website: "https://arizonastanddown.org",
          category: "Employment",
          zipCode: "85007",
          targetAudience: "veteran"
        },
        {
          name: "Arizona Coalition for Military Families",
          description: "Crisis intervention and support services",
          address: "2929 N Central Ave, Phoenix, AZ 85012",
          phone: "(602) 753-8802",
          website: "https://arizonacoalition.org/",
          category: "Crisis",
          zipCode: "85012",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Arizona Department of Health Services - Mental Health",
          description: "State mental health services for all Arizona residents",
          address: "150 N 18th Ave, Phoenix, AZ 85007",
          phone: "(602) 542-1025",
          website: "https://www.azdhs.gov/behavioral-health-services/",
          category: "Treatment",
          zipCode: "85007",
          targetAudience: "public"
        },
        {
          name: "Arizona Crisis Response Network",
          description: "24/7 crisis support for all Arizona residents",
          address: "Statewide Service",
          phone: "1-844-746-2648",
          website: "https://www.azcrisisresponse.org/",
          category: "Crisis",
          zipCode: "85012",
          targetAudience: "public"
        }
      ]
    },
    "Arkansas": {
      veteranResources: [
        {
          name: "Central Arkansas Veterans Healthcare System",
          description: "VA healthcare services in Arkansas",
          address: "4300 West 7th Street, Little Rock, AR 72205",
          phone: "(501) 257-1000",
          website: "https://www.va.gov/central-arkansas-health-care/",
          category: "VA",
          zipCode: "72205",
          targetAudience: "veteran"
        },

        {
          name: "Arkansas Veterans Industries",
          description: "Employment and job training for veterans",
          address: "2200 Fort Roots Drive, North Little Rock, AR 72114",
          phone: "(501) 257-3288",
          website: "https://arkansasveterans.org",
          category: "Employment",
          zipCode: "72114",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Recovery Center",
          description: "Mental health and substance abuse treatment",
          address: "1000 Main Street, Little Rock, AR 72201",
          phone: "(501) 372-4361",
          website: "https://vrcarkansas.org",
          category: "Treatment",
          zipCode: "72201",
          targetAudience: "veteran"
        },
        {
          name: "Arkansas Veterans Crisis Line",
          description: "24/7 crisis support and intervention",
          address: "1200 John Barrow Rd, Little Rock, AR 72205",
          phone: "(800) 273-8255",
          website: "https://arkansasveteranscrisis.org",
          category: "Crisis",
          zipCode: "72205",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Arkansas Department of Human Services - Mental Health",
          description: "State mental health services for all Arkansas residents",
          address: "305 S Main St, Little Rock, AR 72201",
          phone: "(501) 682-1001",
          website: "https://humanservices.arkansas.gov/about-dhs/division-of-behavioral-health-services/",
          category: "Treatment",
          zipCode: "72201",
          targetAudience: "public"
        }
      ]
    },
    "California": {
      veteranResources: [
        {
          name: "VA Palo Alto Health Care System",
          description: "Comprehensive healthcare services for Veterans",
          address: "3801 Miranda Ave, Palo Alto, CA 94304",
          phone: "(650) 493-5000",
          website: "https://www.paloalto.va.gov/",
          category: "VA",
          zipCode: "94304",
          targetAudience: "veteran"
        },
        {
          name: "New Directions for Veterans",
          description: "Transitional housing and substance abuse treatment",
          address: "11303 Wilshire Blvd, Los Angeles, CA 90073",
          phone: "(310) 914-4045",
          website: "https://ndvets.org",
          category: "Housing",
          zipCode: "90073",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Village of San Diego",
          description: "Comprehensive treatment program for veterans",
          address: "4141 Pacific Highway, San Diego, CA 92110",
          phone: "(619) 393-2000",
          website: "https://vvsd.net",
          category: "Treatment",
          zipCode: "92110",
          targetAudience: "veteran"
        },
        {
          name: "Swords to Plowshares",
          description: "Employment training and job placement services",
          address: "1060 Howard St, San Francisco, CA 94103",
          phone: "(415) 252-4788",
          website: "https://www.swords-to-plowshares.org",
          category: "Employment",
          zipCode: "94103",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Resource Center - Sacramento",
          description: "Crisis intervention and support services",
          address: "1001 S Street, Sacramento, CA 95811",
          phone: "(916) 393-8387",
          website: "https://www.vetsresource.org",
          category: "Crisis",
          zipCode: "95811",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "California Department of Public Health - Mental Health Services",
          description: "State-funded mental health services for all residents including crisis intervention and substance abuse treatment",
          address: "1615 Capitol Ave, Sacramento, CA 95814",
          phone: "(916) 558-1784",
          website: "https://www.cdph.ca.gov/Programs/CID/DMH/Pages/Mental-Health-Services.aspx",
          category: "Treatment",
          zipCode: "95814",
          targetAudience: "public"
        },
        {
          name: "California Crisis Support Services",
          description: "Statewide crisis hotline and support services for mental health emergencies available to all residents",
          address: "Statewide Service",
          phone: "1-855-845-7415",
          website: "https://www.dhcs.ca.gov/services/MH/Pages/CrisisServices.aspx",
          category: "Crisis",
          zipCode: "90210",
          targetAudience: "public"
        },
        {
          name: "CalJOBS - California Employment Development Department",
          description: "State employment services including job training and placement assistance for all residents",
          address: "800 Capitol Mall, Sacramento, CA 95814",
          phone: "(916) 654-8210",
          website: "https://www.caljobs.ca.gov/",
          category: "Employment",
          zipCode: "95814",
          targetAudience: "public"
        },
        {
          name: "California Housing Finance Agency",
          description: "State housing assistance programs for low-income residents including emergency housing",
          address: "500 Capitol Mall, Suite 1400, Sacramento, CA 95814",
          phone: "(916) 326-8000",
          website: "https://www.calhfa.ca.gov/",
          category: "Housing",
          zipCode: "95814",
          targetAudience: "public"
        }
      ]
    },
    "Colorado": {
      veteranResources: [
        {
          name: "VA Eastern Colorado Health Care System",
          description: "VA healthcare services in Colorado",
          address: "1700 North Wheeling Street, Aurora, CO 80045",
          phone: "(303) 399-8020",
          website: "https://www.va.gov/eastern-colorado-health-care/",
          category: "VA",
          zipCode: "80045",
          targetAudience: "veteran"
        },
        {
          name: "Colorado Veterans Resource Coalition",
          description: "Housing assistance and support services",
          address: "400 W. Bijou Street, Colorado Springs, CO 80905",
          phone: "(719) 477-2560",
          website: "https://cvrc.org",
          category: "Housing",
          zipCode: "80905",
          targetAudience: "veteran"
        },
        {
          name: "Denver Vet Center",
          description: "Mental health and counseling services",
          address: "7465 E. 1st Ave, Suite B, Denver, CO 80230",
          phone: "(303) 326-0645",
          website: "https://www.va.gov/denver-vet-center/",
          category: "Treatment",
          zipCode: "80230",
          targetAudience: "veteran"
        },
        {
          name: "Colorado Veterans Job Connect",
          description: "Employment services and job training",
          address: "1515 Arapahoe Street, Denver, CO 80202",
          phone: "(303) 318-8850",
          website: "https://cdle.colorado.gov/vets",
          category: "Employment",
          zipCode: "80202",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Colorado Department of Human Services - Mental Health",
          description: "State mental health services for all Colorado residents",
          address: "1575 Sherman St, Denver, CO 80203",
          phone: "(303) 866-7400",
          website: "https://www.colorado.gov/cdhs/behavioral-health",
          category: "Treatment",
          zipCode: "80203",
          targetAudience: "public"
        },
        {
          name: "Colorado Crisis Services",
          description: "24/7 crisis support for all Colorado residents",
          address: "Statewide Service",
          phone: "1-844-493-8255",
          website: "https://coloradocrisisservices.org/",
          category: "Crisis",
          zipCode: "80220",
          targetAudience: "public"
        }
      ]
    },
    "Connecticut": {
      veteranResources: [
        {
          name: "VA Connecticut Healthcare System",
          description: "VA healthcare services in Connecticut",
          address: "950 Campbell Avenue, West Haven, CT 06516",
          phone: "(203) 932-5711",
          website: "https://www.va.gov/connecticut-health-care/",
          category: "VA",
          zipCode: "06516",
          targetAudience: "veteran"
        },
        {
          name: "Columbus House Veterans Program",
          description: "Transitional housing and support services for veterans",
          address: "586 Ella T Grasso Boulevard, New Haven, CT 06519",
          phone: "(203) 401-4400",
          website: "https://www.columbushouse.org/programs/veterans",
          category: "Housing",
          zipCode: "06519",
          targetAudience: "veteran"
        },
        {
          name: "CT Veterans Job Program",
          description: "Employment assistance and job training",
          address: "25 Sigourney Street, Hartford, CT 06106",
          phone: "(860) 263-6000",
          website: "https://www.ctdol.state.ct.us/veterans/default.htm",
          category: "Employment",
          zipCode: "06106",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Recovery Center - CT",
          description: "Substance abuse and mental health treatment",
          address: "287 W Main St, New Britain, CT 06052",
          phone: "(860) 224-7885",
          website: "https://www.wheelerhealth.org/services/veterans-services/",
          category: "Treatment",
          zipCode: "06052",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Connecticut Department of Mental Health - Community Services",
          description: "State mental health services for all Connecticut residents",
          address: "410 Capitol Ave, Hartford, CT 06134",
          phone: "(860) 418-7000",
          website: "https://portal.ct.gov/DMHAS",
          category: "Treatment",
          zipCode: "06134",
          targetAudience: "public"
        }
      ]
    },
    "Delaware": {
      veteranResources: [
        {
          name: "Wilmington VA Medical Center",
          description: "VA healthcare services in Delaware",
          address: "1601 Kirkwood Highway, Wilmington, DE 19805",
          phone: "(302) 994-2511",
          website: "https://www.va.gov/wilmington-health-care/",
          category: "VA",
          zipCode: "19805",
          targetAudience: "veteran"
        },
        {
          name: "Veterans Outreach Center",
          description: "Housing assistance and support services",
          address: "802 West Street, Wilmington, DE 19801",
          phone: "(302) 777-1800",
          website: "https://delawareveterans.org",
          category: "Housing",
          zipCode: "19801",
          targetAudience: "veteran"
        },
        {
          name: "Delaware Veterans Job Bank",
          description: "Employment services and job training",
          address: "4425 North Market Street, Wilmington, DE 19802",
          phone: "(302) 761-8200",
          website: "https://labor.delaware.gov/divisions/employment-training/veterans-services/",
          category: "Employment",
          zipCode: "19802",
          targetAudience: "veteran"
        },
        {
          name: "Delaware Veterans Treatment Center",
          description: "Mental health and substance abuse treatment",
          address: "500 West 10th Street, Wilmington, DE 19801",
          phone: "(302) 655-3261",
          website: "https://www.delawarevetcenter.org",
          category: "Treatment",
          zipCode: "19801",
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Delaware Department of Health - Mental Health Services",
          description: "State mental health services for all Delaware residents",
          address: "417 Federal St, Dover, DE 19901",
          phone: "(302) 255-9040",
          website: "https://dhss.delaware.gov/dhss/dsamh/",
          category: "Treatment",
          zipCode: "19901",
          targetAudience: "public"
        }
      ]
    },
    "Florida": {
      veteranResources: [
        {
          name: "James A. Haley Veterans' Hospital",
          description: "Comprehensive healthcare services for Veterans",
          address: "13000 Bruce B. Downs Blvd, Tampa, FL 33612",
          phone: "(813) 972-2000",
          website: "https://www.va.gov/tampa-health-care/",
          category: "VA",
          zipCode: "33612",
          targetAudience: "veteran"
        },
        {
          name: "Bay Pines VA Healthcare System",
          description: "Comprehensive healthcare services including primary care, mental health, and specialty care",
          address: "10000 Bay Pines Blvd, Bay Pines, FL 33744",
          phone: "(727) 398-6661",
          website: "https://www.va.gov/bay-pines-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Bruce W. Carter VA Medical Center",
          description: "Full-service healthcare facility offering primary care, specialty services, and mental health",
          address: "1201 NW 16th Street, Miami, FL 33125",
          phone: "(305) 575-7000",
          website: "https://www.va.gov/miami-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Malcom Randall VA Medical Center",
          description: "Comprehensive medical care including surgery, mental health, and specialty services",
          address: "1601 SW Archer Road, Gainesville, FL 32608",
          phone: "(352) 376-1611",
          website: "https://www.northflorida.va.gov/locations/gainesville.asp",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Lake City VA Medical Center",
          description: "Medical care for veterans including primary care, specialty care, and mental health services",
          address: "619 South Marion Avenue, Lake City, FL 32025",
          phone: "(386) 755-3016",
          website: "https://www.northflorida.va.gov/locations/lakecity.asp",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Orlando VA Medical Center",
          description: "State-of-the-art healthcare facility providing primary care, specialty services, and mental health",
          address: "13800 Veterans Way, Orlando, FL 32827",
          phone: "(407) 631-1000",
          website: "https://www.va.gov/orlando-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "West Palm Beach VA Medical Center",
          description: "Comprehensive healthcare services including primary care, specialty care, and mental health",
          address: "7305 N. Military Trail, West Palm Beach, FL 33410",
          phone: "(561) 422-8262",
          website: "https://www.va.gov/west-palm-beach-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Florida Veterans Support Line",
          description: "24/7 confidential support and resource referrals from trained specialists, many of whom are veterans",
          address: "Statewide service",
          phone: "1-844-MyFLVet (1-844-693-5838)",
          website: "https://www.myflfamilies.com/service-programs/mental-health/florida-veterans-support-line/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Home Base Florida",
          description: "Clinical care, wellness, and support for veterans and families dealing with PTSD and traumatic brain injury",
          address: "3050 Horseshoe Drive N, Naples, FL 34104",
          phone: "(239) 338-8389",
          website: "https://homebase.org/florida/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "HUD-VASH Program Florida",
          description: "Combines HUD housing vouchers with VA supportive services to assist homeless veterans",
          address: "Multiple locations throughout Florida",
          phone: "Contact local VA Medical Center",
          website: "https://www.va.gov/homeless/hud-vash.asp",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Volunteers of America Florida",
          description: "Transitional housing and support services for veterans dealing with homelessness, mental health, and substance abuse",
          address: "1771 N. Semoran Blvd, Suite A, Orlando, FL 32807",
          phone: "(407) 273-6686",
          website: "https://www.voaflorida.org/veterans/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Florida Department of Veterans' Affairs (FDVA)",
          description: "State agency providing benefits assistance, employment services, and connecting veterans to resources",
          address: "11351 Ulmerton Road, Suite 311, Largo, FL 33778",
          phone: "(727) 518-3202",
          website: "https://www.floridavets.org/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Wounded Warrior Project - Jacksonville",
          description: "Programs for wounded veterans including employment assistance, mental health, and transition support",
          address: "4899 Belfort Road, Suite 300, Jacksonville, FL 32256",
          phone: "(904) 296-7350",
          website: "https://www.woundedwarriorproject.org/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Clearwater Vet Center",
          description: "Counseling services for combat veterans and families including PTSD treatment and bereavement counseling",
          address: "29259 US Hwy 19 North, Clearwater, FL 33761",
          phone: "(727) 549-3600",
          website: "https://www.va.gov/find-locations/facility/vc_0525V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Florida Department of Children and Families - Mental Health Services",
          description: "State mental health services including crisis intervention, substance abuse treatment, and community mental health programs for all residents",
          address: "1317 Winewood Blvd, Tallahassee, FL 32399",
          phone: "(850) 717-4000",
          website: "https://www.myflfamilies.com/service-programs/mental-health/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Florida Crisis & Access Line",
          description: "24/7 statewide crisis hotline providing immediate mental health support and resource navigation for all residents",
          address: "Statewide Service",
          phone: "1-866-762-2237",
          website: "https://www.flcrisisline.org/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "CareerSource Florida",
          description: "State employment services including job training, career counseling, and workforce development programs for all residents",
          address: "107 E Madison St, Suite 300, Tallahassee, FL 32399",
          phone: "(850) 921-1119",
          website: "https://www.careersourceflorida.com/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Florida Housing Finance Corporation",
          description: "State housing assistance programs including affordable housing, emergency rental assistance, and homeownership programs",
          address: "227 N Bronough St, Tallahassee, FL 32301",
          phone: "(850) 488-4197",
          website: "https://www.floridahousing.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Florida Department of Children and Families - Mental Health",
          description: "State mental health services and crisis intervention for all Florida residents",
          address: "1317 Winewood Blvd, Tallahassee, FL 32399",
          phone: "(850) 717-4000",
          website: "https://www.myflfamilies.com/service-programs/mental-health/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Florida Crisis & Access Line",
          description: "24/7 statewide crisis hotline providing immediate mental health support for all residents",
          address: "Statewide Service",
          phone: "1-866-762-2237",
          website: "https://www.flcrisisline.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "CareerSource Florida",
          description: "State employment services including job training and workforce development for all residents",
          address: "107 E Madison St, Suite 300, Tallahassee, FL 32399",
          phone: "(850) 921-1119",
          website: "https://www.careersourceflorida.com/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Florida Housing Finance Corporation",
          description: "State housing assistance programs including affordable housing and emergency rental assistance",
          address: "227 N Bronough St, Tallahassee, FL 32301",
          phone: "(850) 488-4197",
          website: "https://www.floridahousing.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Georgia": {
      veteranResources: [
        {
          name: "Atlanta VA Medical Center",
          description: "Comprehensive care including primary, specialty, and mental health services",
          address: "1670 Clairmont Road, Decatur, GA 30033",
          phone: "(404) 321-6111",
          website: "https://www.va.gov/atlanta-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Charlie Norwood VA Medical Center",
          description: "Wide range of health, support, and facility services for Veterans in northeast Georgia and western South Carolina",
          address: "950 15th Street, Augusta, GA 30904",
          phone: "(706) 733-0188",
          website: "https://www.va.gov/augusta-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Carl Vinson VA Medical Center",
          description: "Health, support, and facility services for Veterans in central and southern Georgia",
          address: "1826 Veterans Blvd, Dublin, GA 31021",
          phone: "(478) 272-1210",
          website: "https://www.va.gov/dublin-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Albany VA Clinic",
          description: "Primary care, mental health services, and specialty care for veterans",
          address: "526 West Broad Avenue, Albany, GA 31701",
          phone: "(229) 446-9000",
          website: "https://www.va.gov/dublin-health-care/locations/albany-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Athens VA Clinic",
          description: "Primary care, mental health services, and specialty care for veterans",
          address: "9249 Highway 29 N, Athens, GA 30601",
          phone: "(706) 227-4534",
          website: "https://www.va.gov/atlanta-health-care/locations/athens-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Brunswick VA Clinic",
          description: "Primary care, mental health services, and specialty care for veterans",
          address: "1111 Glynco Parkway, Brunswick, GA 31525",
          phone: "(912) 261-2355",
          website: "https://www.va.gov/charleston-health-care/locations/brunswick-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Atlanta Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "1440 Dutch Valley Place, Suite 1100, Atlanta, GA 30324",
          phone: "(404) 347-7264",
          website: "https://www.va.gov/find-locations/facility/vc_0221V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Augusta Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "2050 Walton Way, Suite 100, Augusta, GA 30904",
          phone: "(706) 729-5762",
          website: "https://www.va.gov/find-locations/facility/vc_0204V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Columbus Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "1824 Victory Drive, Columbus, GA 31901",
          phone: "(706) 257-7308",
          website: "https://www.va.gov/find-locations/facility/vc_0203V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Georgia War Veterans Nursing Home",
          description: "Skilled nursing care facility managed by the Georgia Department of Veterans Service",
          address: "1101 15th Street, Augusta, GA 30901",
          phone: "(706) 721-2531",
          website: "https://veterans.georgia.gov/georgia-war-veterans-nursing-homes",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Georgia Department of Veterans Service",
          description: "Assists veterans with claims, benefits, and other services through numerous field offices across Georgia",
          address: "Floyd Veterans Memorial Building, 2 M.L.K. Jr. Drive SE, Atlanta, GA 30334",
          phone: "(404) 656-2300",
          website: "https://veterans.georgia.gov/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Georgia Department of Behavioral Health and Developmental Disabilities",
          description: "State mental health and addiction services for all Georgia residents",
          address: "2 Peachtree Street NW, Atlanta, GA 30303",
          phone: "(404) 657-2252",
          website: "https://dbhdd.georgia.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Georgia Crisis & Access Line",
          description: "24/7 statewide crisis support and mental health services navigation",
          address: "Statewide Service",
          phone: "1-800-715-4225",
          website: "https://georgiacollaborative.com/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Georgia Department of Labor - WorkSource Georgia",
          description: "State employment services including job training and career development for all residents",
          address: "148 Andrew Young International Blvd NE, Atlanta, GA 30303",
          phone: "(404) 232-3500",
          website: "https://www.dol.state.ga.us/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Georgia Department of Community Affairs - Housing",
          description: "State housing assistance including affordable housing and emergency rental programs",
          address: "60 Executive Park South NE, Atlanta, GA 30329",
          phone: "(404) 679-4840",
          website: "https://www.dca.ga.gov/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Hawaii": {
      veteranResources: [
        {
          name: "Spark M. Matsunaga VA Medical Center",
          description: "Primary and specialty care, mental health services, PTSD treatment, geriatrics, suicide prevention, and more",
          address: "459 Patterson Road, Honolulu, HI 96819",
          phone: "(808) 433-0600",
          website: "https://www.va.gov/pacific-islands-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Daniel K. Akaka VA Clinic",
          description: "Multispecialty outpatient care including primary care, women's health, mental health, geriatrics, dentistry, and pharmacy",
          address: "91-1051 Franklin D. Roosevelt Avenue, Kapolei, HI 96707",
          phone: "(800) 214-1306",
          website: "https://www.va.gov/pacific-islands-health-care/locations/daniel-k-akaka-department-of-veterans-affairs-outpatient-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hilo Community-Based Outpatient Clinic",
          description: "Primary care and mental health services for veterans",
          address: "1285 Waianuenue Avenue, Suite 211, Hilo, HI 96720",
          phone: "(808) 935-3781",
          website: "https://www.va.gov/pacific-islands-health-care/locations/hilo-community-based-outpatient-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kailua-Kona Community-Based Outpatient Clinic",
          description: "Primary care and mental health services for veterans",
          address: "35-377 Hualalai Road, Kailua-Kona, HI 96740",
          phone: "(808) 329-0774",
          website: "https://www.va.gov/pacific-islands-health-care/locations/kailua-kona-community-based-outpatient-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Maui Community-Based Outpatient Clinic",
          description: "Primary care and mental health services for veterans",
          address: "203 Ho'ohana Street, Suite 303, Kahului, HI 96732",
          phone: "(808) 871-2454",
          website: "https://www.va.gov/pacific-islands-health-care/locations/maui-community-based-outpatient-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kauai Community-Based Outpatient Clinic",
          description: "Primary care and mental health services for veterans",
          address: "4485 Pahe'e Street, Suite 150, Lihue, HI 96766",
          phone: "(808) 246-0497",
          website: "https://www.va.gov/pacific-islands-health-care/locations/kauai-community-based-outpatient-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "National Center for PTSD – Pacific Islands Division",
          description: "Specialized care for PTSD and related mental health conditions",
          address: "3375 Koapaka Street, Suite I-560, Honolulu, HI 96819",
          phone: "(808) 566-1546",
          website: "https://www.ptsd.va.gov/about/divisions/pacific/index.asp",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Honolulu Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "1680 Kapiolani Blvd., Suite F-3, Honolulu, HI 96814",
          phone: "(808) 973-8387",
          website: "https://www.va.gov/find-locations/facility/vc_0237V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hilo Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "70 Lanihuli Street, Suite 102, Hilo, HI 96720",
          phone: "(808) 969-3833",
          website: "https://www.va.gov/find-locations/facility/vc_0228V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kona Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "73-4976 Kamanu Street, Kailua-Kona, HI 96740",
          phone: "(808) 329-0574",
          website: "https://www.va.gov/find-locations/facility/vc_0543V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Maui Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "157 Ma'a Street, Kahului, HI 96732",
          phone: "(808) 242-8557",
          website: "https://www.va.gov/find-locations/facility/vc_0233V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kauai Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "4485 Pahe'e Street, Suite 101, Lihue, HI 96766",
          phone: "(808) 246-1163",
          website: "https://www.va.gov/find-locations/facility/vc_0224V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "West Oahu Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "91-1051 Franklin D. Roosevelt Avenue, Kapolei, HI 96707",
          phone: "(808) 674-2414",
          website: "https://www.va.gov/find-locations/facility/vc_0217V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Nationwide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "U.S. VETS – Barber's Point",
          description: "Transitional and permanent housing, employment assistance, and counseling for homeless and at-risk veterans",
          address: "91-1039 Shangrila Street, Kapolei, HI 96707",
          phone: "(808) 672-2977",
          website: "https://www.usvetsinc.org/hawaii/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hawaii Public Housing Authority – VASH Program",
          description: "Rental assistance vouchers for homeless veterans with VA case management and clinical services",
          address: "1002 North School Street, Honolulu, HI 96817",
          phone: "(808) 832-4692",
          website: "https://hpha.hawaii.gov/federally_funded_programs/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hawaii Department of Labor – Veterans Program",
          description: "Employment and training services including job search assistance, resume writing, and interview preparation",
          address: "830 Punchbowl Street, Room 329, Honolulu, HI 96813",
          phone: "(808) 586-8841",
          website: "https://labor.hawaii.gov/jobs/vets/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "U.S. VETS – Employment Services",
          description: "Job readiness workshops, vocational training, and job placement assistance for veterans",
          address: "91-1039 Shangrila Street, Kapolei, HI 96707",
          phone: "(808) 672-2977",
          website: "https://www.usvetsinc.org/hawaii/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hawaii State Office of Veterans Services",
          description: "Assistance with education benefits, GI Bill, scholarships and tuition assistance programs",
          address: "459 Patterson Road, E-Wing, Room 1-A103, Honolulu, HI 96819",
          phone: "(808) 433-0420",
          website: "https://dod.hawaii.gov/ovs/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Legal Aid Society of Hawaii – Veterans Project",
          description: "Free legal assistance to veterans on VA benefits, housing, family law, and consumer rights",
          address: "924 Bethel Street, Honolulu, HI 96813",
          phone: "(808) 536-4302",
          website: "https://www.legalaidhawaii.org/veterans-project.html",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Hawaii Department of Health - Behavioral Health Administration",
          description: "State mental health and substance abuse services for all Hawaii residents",
          address: "3627 Kilauea Avenue, Honolulu, HI 96816",
          phone: "(808) 733-9333",
          website: "https://health.hawaii.gov/substance-abuse/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Hawaii Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-753-6879",
          website: "https://www.crisislinehawaii.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Hawaii Department of Labor - Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "830 Punchbowl Street, Honolulu, HI 96813",
          phone: "(808) 586-8700",
          website: "https://labor.hawaii.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Hawaii Housing Finance and Development Corporation",
          description: "State housing assistance programs including affordable housing and rental assistance",
          address: "677 Queen Street, Suite 300, Honolulu, HI 96813",
          phone: "(808) 587-0597",
          website: "https://dbedt.hawaii.gov/hhfdc/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Idaho": {
      veteranResources: [
        {
          name: "Boise VA Medical Center",
          description: "Primary and specialty care, mental health services, surgery, pain management, social work, vision care, and more",
          address: "500 West Fort Street, Boise, ID 83702",
          phone: "(208) 422-1000",
          website: "https://www.va.gov/boise-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Caldwell VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "713 Haystack Way, Caldwell, ID 83605",
          phone: "(208) 454-4820",
          website: "https://www.va.gov/boise-health-care/locations/caldwell-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Coeur d'Alene VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "915 W. Ironwood Dr., Suite 101, Coeur d'Alene, ID 83814",
          phone: "(208) 665-1711",
          website: "https://www.va.gov/boise-health-care/locations/coeur-dalene-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Idaho Falls VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "640 S. Woodruff Ave., Idaho Falls, ID 83401",
          phone: "(208) 522-2922",
          website: "https://www.va.gov/boise-health-care/locations/idaho-falls-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Twin Falls VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "260 2nd Ave. E., Twin Falls, ID 83301",
          phone: "(208) 732-0959",
          website: "https://www.va.gov/boise-health-care/locations/twin-falls-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Boise Vet Center",
          description: "Counseling, PTSD treatment, substance abuse programs, and other mental health services",
          address: "2424 Bank Dr., Boise, ID 83705",
          phone: "(208) 342-3612",
          website: "https://www.va.gov/find-locations/facility/vc_0507V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "East Idaho Vet Center",
          description: "Counseling, PTSD treatment, substance abuse programs, and other mental health services",
          address: "1555 Pocatello Creek Rd., Suite C, Pocatello, ID 83201",
          phone: "(208) 232-0316",
          website: "https://www.va.gov/find-locations/facility/vc_0548V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Nationwide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Boise Veterans Home",
          description: "State veterans home providing skilled nursing care for Idaho veterans",
          address: "320 Collins Rd., Boise, ID 83702",
          phone: "(208) 780-1600",
          website: "https://veterans.idaho.gov/veterans-homes/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Lewiston Veterans Home",
          description: "State veterans home providing skilled nursing care for Idaho veterans",
          address: "821 21st Ave., Lewiston, ID 83501",
          phone: "(208) 750-3600",
          website: "https://veterans.idaho.gov/veterans-homes/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Pocatello Veterans Home",
          description: "State veterans home providing skilled nursing care for Idaho veterans",
          address: "1957 Alvin Ricken Dr., Pocatello, ID 83201",
          phone: "(208) 235-7800",
          website: "https://veterans.idaho.gov/veterans-homes/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Idaho Division of Veterans Services Employment Services",
          description: "Assistance with job training, employment accommodations, and job placement",
          address: "351 Collins Road, Boise, ID 83702",
          phone: "(208) 780-1300",
          website: "https://veterans.idaho.gov/benefits-and-services/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Idaho Legal Aid Services - Veterans",
          description: "Legal assistance to veterans on issues such as benefits, housing, and family law",
          address: "1447 S. Tyrell Lane, Boise, ID 83706",
          phone: "(208) 746-7541",
          website: "https://www.idaholegalaid.org/node/2232/veterans-issues",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Idaho Veterans Chamber of Commerce",
          description: "Support in education, housing, entrepreneurship, workforce management, family, and wellness services",
          address: "Boise, ID",
          phone: "(208) 917-5612",
          website: "https://idahoveteranschamber.org/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Idaho Department of Health and Welfare - Behavioral Health",
          description: "State mental health and substance abuse services for all Idaho residents",
          address: "450 W State Street, Boise, ID 83702",
          phone: "(208) 334-5500",
          website: "https://healthandwelfare.idaho.gov/services-programs/behavioral-health",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Idaho Crisis & Suicide Hotline",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-855-552-4377",
          website: "https://idahosuicideprevention.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Idaho Department of Labor - Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "317 W Main Street, Boise, ID 83735",
          phone: "(208) 332-3570",
          website: "https://www.labor.idaho.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Idaho Housing and Finance Association",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "565 W Myrtle Street, Boise, ID 83702",
          phone: "(208) 331-4700",
          website: "https://www.idahohousing.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Illinois": {
      veteranResources: [
        {
          name: "Jesse Brown VA Medical Center",
          description: "Comprehensive care including primary, specialty, and mental health services",
          address: "820 South Damen Avenue, Chicago, IL 60612",
          phone: "(312) 569-8387",
          website: "https://www.va.gov/chicago-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Edward Hines Jr. VA Hospital",
          description: "Primary, extended, and specialty care to Veteran patients in the Chicago area",
          address: "5000 South 5th Avenue, Hines, IL 60141",
          phone: "(708) 202-8387",
          website: "https://www.va.gov/hines-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "VA Illiana Health Care System",
          description: "Health, support, and facility services for Veterans at multiple locations serving a 30-county area",
          address: "1900 East Main Street, Danville, IL 61832",
          phone: "(217) 554-3000",
          website: "https://www.va.gov/illiana-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Captain James A. Lovell Federal Health Care Center",
          description: "Fully integrated federal health care facility serving both Veterans and active-duty service members",
          address: "3001 Green Bay Road, North Chicago, IL 60064",
          phone: "(847) 688-1900",
          website: "https://www.va.gov/lovell-federal-health-care-va/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Aurora VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "161 S. Lincolnway, Suite 200, North Aurora, IL 60542",
          phone: "(630) 859-2504",
          website: "https://www.va.gov/hines-health-care/locations/aurora-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Bloomington VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "207 Hamilton Road, Bloomington, IL 61704",
          phone: "(309) 663-6574",
          website: "https://www.va.gov/illiana-health-care/locations/bloomington-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Carbondale VA Clinic",
          description: "Community-Based Outpatient Clinic offering primary care and mental health services",
          address: "1130 East Walnut Street, Carbondale, IL 62901",
          phone: "(618) 351-1031",
          website: "https://www.va.gov/marion-health-care/locations/carbondale-va-clinic/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Chicago Heights Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "1600 S. Halsted Street, Chicago Heights, IL 60411",
          phone: "(708) 754-0340",
          website: "https://www.va.gov/find-locations/facility/vc_0227V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Evanston Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "1901 Howard Street, Evanston, IL 60202",
          phone: "(847) 332-1019",
          website: "https://www.va.gov/find-locations/facility/vc_0215V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Oak Park Vet Center",
          description: "Readjustment counseling and outreach services to Veterans and their families",
          address: "155 S. Oak Park Avenue, Oak Park, IL 60302",
          phone: "(708) 383-3225",
          website: "https://www.va.gov/find-locations/facility/vc_0223V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Illinois Veterans' Home at Anna",
          description: "Long-term skilled nursing care for Illinois veterans",
          address: "792 North Main Street, Anna, IL 62906",
          phone: "(618) 833-6302",
          website: "https://www2.illinois.gov/veterans/facilities/Pages/anna.aspx",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Illinois Veterans' Home at LaSalle",
          description: "Long-term skilled nursing care for Illinois veterans",
          address: "1015 O'Conor Avenue, LaSalle, IL 61301",
          phone: "(815) 223-0303",
          website: "https://www2.illinois.gov/veterans/facilities/Pages/lasalle.aspx",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Illinois Veterans' Home at Manteno",
          description: "Long-term skilled nursing care for Illinois veterans",
          address: "1 Veterans Drive, Manteno, IL 60950",
          phone: "(815) 468-6581",
          website: "https://www2.illinois.gov/veterans/facilities/Pages/manteno.aspx",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Illinois Veterans' Home at Quincy",
          description: "Long-term skilled nursing care for Illinois veterans",
          address: "1707 North 12th Street, Quincy, IL 62301",
          phone: "(217) 222-8641",
          website: "https://www2.illinois.gov/veterans/facilities/Pages/quincy.aspx",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Illinois Department of Veterans' Affairs",
          description: "Assists Veterans and their families in navigating federal, state, and local resources and benefits",
          address: "833 South Spring Street, Springfield, IL 62704",
          phone: "(217) 782-6641",
          website: "https://www2.illinois.gov/veterans/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Illinois Department of Human Services - Mental Health",
          description: "State mental health and substance abuse services for all Illinois residents",
          address: "100 W Randolph Street, Chicago, IL 60601",
          phone: "(217) 782-1200",
          website: "https://www.dhs.state.il.us/page.aspx?item=29737",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Illinois Warm Line",
          description: "24/7 peer support and crisis intervention services for all residents",
          address: "Statewide Service",
          phone: "1-866-359-7953",
          website: "https://www.illinois.gov/hfs/MedicalPrograms/HCBS/ILWarmLine/Pages/default.aspx",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Illinois Department of Commerce and Economic Opportunity - Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "100 W Randolph Street, Chicago, IL 60601",
          phone: "(312) 814-7179",
          website: "https://www2.illinois.gov/dceo/Pages/default.aspx",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Illinois Housing Development Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "111 E Wacker Drive, Chicago, IL 60601",
          phone: "(312) 836-5200",
          website: "https://www.ihda.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Indiana": {
      veteranResources: [
        {
          name: "Richard L. Roudebush VA Medical Center",
          description: "Primary VA healthcare facility in Indianapolis",
          address: "1481 W. 10th Street, Indianapolis, IN 46202",
          phone: "(317) 554-0000",
          website: "https://www.va.gov/indiana-health-care/locations/richard-l-roudebush-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "VA Northern Indiana Health Care System – Fort Wayne Campus",
          description: "Comprehensive healthcare services for veterans in northern Indiana",
          address: "2121 Lake Ave, Fort Wayne, IN 46805",
          phone: "(260) 426-5431",
          website: "https://www.va.gov/northern-indiana-health-care/locations/fort-wayne-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "VA Northern Indiana Health Care System – Marion Campus",
          description: "Medical, surgical, and mental health services for veterans",
          address: "1700 E. 38th Street, Marion, IN 46953",
          phone: "(765) 674-3321",
          website: "https://www.va.gov/northern-indiana-health-care/locations/marion-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Adam Benjamin Jr. Outpatient Clinic",
          description: "Community-based outpatient care for veterans in Crown Point area",
          address: "9330 Broadway, Crown Point, IN 46307",
          phone: "(219) 662-5000",
          website: "https://www.va.gov/northern-indiana-health-care/locations/crown-point-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Bloomington VA Clinic",
          description: "Primary care and mental health services",
          address: "455 S. Landmark Avenue, Bloomington, IN 47403",
          phone: "(812) 336-5723",
          website: "https://www.va.gov/indiana-health-care/locations/bloomington-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hoosier Veterans Assistance Foundation",
          description: "Transitional housing and support services for homeless veterans",
          address: "964 N. Pennsylvania St., Indianapolis, IN 46204",
          phone: "(317) 951-0688",
          website: "https://hvafofindiana.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "INVET's Veteran Employment Program",
          description: "Career counseling, job placement, and employment assistance",
          address: "777 N. Meridian St., Indianapolis, IN 46204",
          phone: "(844) 480-0009",
          website: "https://www.in.gov/dva/veteran-services/employment/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Indiana Veterans Crisis Response Team",
          description: "24/7 crisis intervention and emergency mental health support",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Indiana Family and Social Services Administration - Mental Health",
          description: "State mental health and substance abuse services for all Indiana residents",
          address: "402 W Washington Street, Indianapolis, IN 46204",
          phone: "(317) 234-3700",
          website: "https://www.in.gov/fssa/dmha/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Indiana Crisis Hotline",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.in.gov/fssa/dmha/mental-health-services/crisis-services/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Indiana Department of Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "10 N Senate Ave, Indianapolis, IN 46204",
          phone: "(317) 232-7670",
          website: "https://www.in.gov/dwd/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Indiana Housing and Community Development Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "30 S Meridian Street, Indianapolis, IN 46204",
          phone: "(317) 232-7777",
          website: "https://www.in.gov/ihcda/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Iowa": {
      veteranResources: [
        {
          name: "Iowa City VA Medical Center",
          description: "Comprehensive medical, surgical, and mental health services for veterans in eastern Iowa",
          address: "601 Highway 6 West, Iowa City, IA 52246",
          phone: "(319) 338-0581",
          website: "https://www.va.gov/iowa-city-health-care/locations/iowa-city-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Des Moines VA Medical Center",
          description: "Primary and specialty care services for veterans in central Iowa",
          address: "3600 30th Street, Des Moines, IA 50310",
          phone: "(515) 699-5999",
          website: "https://www.va.gov/central-iowa-health-care/locations/des-moines-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Cedar Rapids VA Clinic",
          description: "Primary care and mental health services for veterans in the Cedar Rapids area",
          address: "2230 Wiley Blvd SW, Cedar Rapids, IA 52404",
          phone: "(319) 369-3500",
          website: "https://www.va.gov/iowa-city-health-care/locations/cedar-rapids-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Waterloo VA Clinic",
          description: "Primary care, mental health, and specialty services",
          address: "1515 Black Hawk Village Dr, Waterloo, IA 50702",
          phone: "(319) 272-2323",
          website: "https://www.va.gov/iowa-city-health-care/locations/waterloo-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Iowa Veterans Home",
          description: "Long-term care and residential services for Iowa veterans",
          address: "1301 Summit St, Marshalltown, IA 50158",
          phone: "(641) 752-1501",
          website: "https://ivh.iowa.gov/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Iowa Workforce Development Veterans Services",
          description: "Employment and training services specifically for veterans",
          address: "1000 E Grand Ave, Des Moines, IA 50319",
          phone: "(515) 281-5387",
          website: "https://www.iowaworkforcedevelopment.gov/veteran-services",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Iowa Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Iowa Department of Human Services - Mental Health",
          description: "State mental health and substance abuse services for all Iowa residents",
          address: "1305 E Walnut Street, Des Moines, IA 50319",
          phone: "(515) 281-5087",
          website: "https://dhs.iowa.gov/mental-health-substance-abuse",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Iowa Crisis Chat and Text Line",
          description: "24/7 statewide crisis support via chat, text, and phone",
          address: "Statewide Service",
          phone: "1-855-325-4296",
          website: "https://yourlifeiowa.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "IowaWORKS - Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "1000 E Grand Ave, Des Moines, IA 50319",
          phone: "(515) 281-5387",
          website: "https://www.iowaworkforcedevelopment.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Iowa Finance Authority - Housing Programs",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "1963 Bell Avenue, Des Moines, IA 50315",
          phone: "(515) 725-4900",
          website: "https://www.iowafinanceauthority.gov/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Kansas": {
      veteranResources: [
        {
          name: "Robert J. Dole VA Medical Center",
          description: "Comprehensive healthcare services for veterans in southern Kansas",
          address: "5500 East Kellogg Drive, Wichita, KS 67218",
          phone: "(316) 685-2221",
          website: "https://www.va.gov/eastern-kansas-health-care/locations/robert-j-dole-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Colmery-O'Neil VA Medical Center",
          description: "Full-service medical center offering primary care, specialty care, and mental health services",
          address: "2200 SW Gage Blvd, Topeka, KS 66622",
          phone: "(785) 350-3111",
          website: "https://www.va.gov/eastern-kansas-health-care/locations/colmery-oneil-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Dwight D. Eisenhower VA Medical Center",
          description: "Comprehensive medical services for veterans in northeast Kansas",
          address: "4101 S. 4th Street, Leavenworth, KS 66048",
          phone: "(913) 682-2000",
          website: "https://www.va.gov/eastern-kansas-health-care/locations/dwight-d-eisenhower-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Dodge City VA Clinic",
          description: "Primary care and mental health services for rural veterans",
          address: "400 W. Frontview, Suite 1, Dodge City, KS 67801",
          phone: "(620) 225-9049",
          website: "https://www.va.gov/eastern-kansas-health-care/locations/dodge-city-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hays VA Clinic",
          description: "Primary care and telehealth services for rural veterans",
          address: "207-B E 7th Street, Hays, KS 67601",
          phone: "(785) 625-8700",
          website: "https://www.va.gov/wichita-health-care/locations/hays-community-based-outpatient-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kansas Commission on Veterans Affairs Office",
          description: "State agency providing benefits assistance and support services",
          address: "700 SW Jackson St., Suite 1004, Topeka, KS 66603",
          phone: "(785) 296-3976",
          website: "https://kcva.ks.gov/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kansas Soldiers' Home",
          description: "Long-term care and housing for eligible Kansas veterans",
          address: "15810 Fort Dodge Rd., Fort Dodge, KS 67843",
          phone: "(620) 227-2121",
          website: "https://kcva.ks.gov/veteran-homes/fort-dodge-home",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kansas Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Kansas Department for Aging and Disability Services - Mental Health",
          description: "State mental health and substance abuse services for all Kansas residents",
          address: "503 S Kansas Ave, Topeka, KS 66603",
          phone: "(785) 296-3271",
          website: "https://www.kdads.ks.gov/behavioral-health",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Kansas Crisis Hotline",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.kansascrisishotline.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Kansas Department of Commerce - Workforce Services",
          description: "State employment services including job training and career assistance for all residents",
          address: "1000 SW Jackson Street, Topeka, KS 66612",
          phone: "(785) 296-5298",
          website: "https://www.kansascommerce.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Kansas Housing Resources Corporation",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "611 S Kansas Ave, Topeka, KS 66603",
          phone: "(785) 217-2001",
          website: "https://www.kshousingcorp.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Kentucky": {
      veteranResources: [
        {
          name: "Lexington VA Health Care System",
          description: "Comprehensive medical, surgical, and mental health services for Kentucky veterans",
          address: "1101 Veterans Drive, Lexington, KY 40502",
          phone: "(859) 233-4511",
          website: "https://www.va.gov/lexington-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Robley Rex VA Medical Center",
          description: "Full-service medical center serving veterans in Louisville and surrounding areas",
          address: "800 Zorn Avenue, Louisville, KY 40206",
          phone: "(502) 287-4000",
          website: "https://www.va.gov/louisville-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Bowling Green VA Clinic",
          description: "Primary care, mental health, and telehealth services",
          address: "1830 Destiny Lane, Bowling Green, KY 42104",
          phone: "(270) 782-0120",
          website: "https://www.va.gov/tennessee-valley-health-care/locations/bowling-green-community-based-outpatient-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Owensboro VA Clinic",
          description: "Primary care and mental health services for veterans",
          address: "3400 New Hartford Road, Owensboro, KY 42303",
          phone: "(270) 684-5034",
          website: "https://www.va.gov/louisville-health-care/locations/owensboro-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Hazard VA Clinic",
          description: "Primary care and mental health services for rural veterans in eastern Kentucky",
          address: "210 Black Gold Blvd., Hazard, KY 41701",
          phone: "(606) 436-2350",
          website: "https://www.va.gov/lexington-health-care/locations/hazard-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kentucky Department of Veterans Affairs",
          description: "State agency providing benefits assistance and support services",
          address: "1111 Louisville Road, Frankfort, KY 40601",
          phone: "(502) 564-9203",
          website: "https://veterans.ky.gov/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Thomson-Hood Veterans Center",
          description: "State veterans nursing home providing long-term care",
          address: "100 Veterans Drive, Wilmore, KY 40390",
          phone: "(859) 858-2814",
          website: "https://veterans.ky.gov/nursinghomes/Pages/thomson-hood.aspx",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kentucky Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Kentucky Department for Behavioral Health - Mental Health Services",
          description: "State mental health and substance abuse services for all Kentucky residents",
          address: "275 E Main Street, Frankfort, KY 40621",
          phone: "(502) 564-4527",
          website: "https://dbhdid.ky.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Kentucky Crisis and Information Hotline",
          description: "24/7 statewide crisis support and mental health information",
          address: "Statewide Service",
          phone: "1-800-372-2273",
          website: "https://www.kentuckystatepolice.org/crisis-intervention/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Kentucky Career Center - Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "275 E Main Street, Frankfort, KY 40621",
          phone: "(502) 564-7456",
          website: "https://kcc.ky.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Kentucky Housing Corporation",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "1231 Louisville Road, Frankfort, KY 40601",
          phone: "(502) 564-7630",
          website: "https://www.kyhousing.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Louisiana": {
      veteranResources: [
        {
          name: "Southeast Louisiana Veterans Health Care System",
          description: "Comprehensive healthcare services for veterans in New Orleans and surrounding areas",
          address: "2400 Canal Street, New Orleans, LA 70119",
          phone: "(504) 568-0811",
          website: "https://www.va.gov/southeast-louisiana-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Overton Brooks VA Medical Center",
          description: "Full-service medical center serving veterans in northwest Louisiana",
          address: "510 East Stoner Avenue, Shreveport, LA 71101",
          phone: "(318) 221-8411",
          website: "https://www.va.gov/shreveport-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Alexandria VA Medical Center",
          description: "Comprehensive healthcare services for central Louisiana veterans",
          address: "2495 Shreveport Highway, Pineville, LA 71360",
          phone: "(318) 473-0010",
          website: "https://www.va.gov/alexandria-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Baton Rouge VA Clinic",
          description: "Primary care, mental health, and specialty services",
          address: "7968 Essen Park Avenue, Baton Rouge, LA 70809",
          phone: "(225) 761-3400",
          website: "https://www.va.gov/southeast-louisiana-health-care/locations/baton-rouge-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Lafayette VA Clinic",
          description: "Primary care and mental health services for veterans in Acadiana region",
          address: "2100 Jefferson Street, Lafayette, LA 70501",
          phone: "(337) 262-0870",
          website: "https://www.va.gov/alexandria-health-care/locations/lafayette-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Houma VA Clinic",
          description: "Primary care and mental health services for veterans in bayou region",
          address: "1750 Martin Luther King Jr. Blvd., Houma, LA 70360",
          phone: "(985) 851-0188",
          website: "https://www.va.gov/southeast-louisiana-health-care/locations/houma-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Louisiana Department of Veterans Affairs",
          description: "State agency providing veterans benefits assistance and services",
          address: "1885 Wooddale Blvd., Baton Rouge, LA 70806",
          phone: "(225) 219-5000",
          website: "https://vetaffairs.la.gov/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Louisiana Veterans Home",
          description: "Long-term care and nursing home services for Louisiana veterans",
          address: "4739 Highway 10, Jackson, LA 70748",
          phone: "(225) 634-5265",
          website: "https://vetaffairs.la.gov/benefit/veteran-homes/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Louisiana Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Louisiana Department of Health - Office of Behavioral Health",
          description: "State mental health and substance abuse services for all Louisiana residents",
          address: "628 N 4th Street, Baton Rouge, LA 70802",
          phone: "(225) 342-9500",
          website: "https://ldh.la.gov/page/78",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Louisiana Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://louisianacrisislline.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Louisiana Workforce Commission",
          description: "State employment services including job training and career assistance for all residents",
          address: "1001 N 23rd Street, Baton Rouge, LA 70802",
          phone: "(225) 342-3111",
          website: "https://www.laworks.net/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Louisiana Housing Finance Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "2415 Quail Dr, Baton Rouge, LA 70808",
          phone: "(225) 763-8700",
          website: "https://www.lhfa.state.la.us/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Maine": {
      veteranResources: [
        {
          name: "Togus VA Medical Center",
          description: "Comprehensive medical care, including emergency services, mental health care, and specialty services",
          address: "1 VA Center, Augusta, ME 04330",
          phone: "(207) 623-8411",
          website: "https://www.va.gov/maine-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Bangor VA Clinic",
          description: "Primary care, mental health, and specialty services for veterans in northern Maine",
          address: "35 State Hospital Drive, Bangor, ME 04401",
          phone: "(207) 561-3600",
          website: "https://www.va.gov/maine-health-care/locations/bangor-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Portland VA Clinic",
          description: "Comprehensive outpatient services for veterans in southern Maine",
          address: "144 Fore Street, Portland, ME 04101",
          phone: "(207) 623-8411 x7490",
          website: "https://www.va.gov/maine-health-care/locations/portland-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Lewiston VA Clinic",
          description: "Primary care and mental health services for veterans in central Maine",
          address: "15 Challenger Drive, Lewiston, ME 04240",
          phone: "(207) 330-2700",
          website: "https://www.va.gov/maine-health-care/locations/lewiston-auburn-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Caribou VA Clinic",
          description: "Primary care and telehealth services for rural veterans in northern Maine",
          address: "163 Van Buren Road, Suite 6, Caribou, ME 04736",
          phone: "(207) 493-3800",
          website: "https://www.va.gov/maine-health-care/locations/caribou-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Bangor Vet Center",
          description: "Readjustment counseling and outreach services for veterans and their families",
          address: "207 Parkway S., Suite 2, Brewer, ME 04412",
          phone: "(207) 947-3391",
          website: "https://www.va.gov/find-locations/facility/vc_0524V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Inc. Housing Program",
          description: "Transitional and permanent housing assistance for homeless veterans",
          address: "393 Main Street, Saco, ME 04072",
          phone: "(800) 482-2565",
          website: "https://www.veteransinc.org/services/housing-programs/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Maine Bureau of Veterans' Services",
          description: "State agency providing benefits assistance, emergency financial aid, and employment support",
          address: "117 State House Station, Augusta, ME 04330",
          phone: "(207) 430-6035",
          website: "https://www.maine.gov/veterans/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Maine Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Maine Department of Health and Human Services - Behavioral Health",
          description: "State mental health and substance abuse services for all Maine residents",
          address: "11 State House Station, Augusta, ME 04333",
          phone: "(207) 287-2595",
          website: "https://www.maine.gov/dhhs/samhs/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Maine Crisis Hotline",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-888-568-1112",
          website: "https://www.crisistextline.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Maine Department of Labor - CareerCenter",
          description: "State employment services including job training and career assistance for all residents",
          address: "54 State House Station, Augusta, ME 04333",
          phone: "(207) 623-7900",
          website: "https://www.maine.gov/labor/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Maine State Housing Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "353 Water Street, Augusta, ME 04330",
          phone: "(207) 626-4600",
          website: "https://www.mainehousing.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Maryland": {
      veteranResources: [
        {
          name: "Baltimore VA Medical Center",
          description: "Comprehensive healthcare services including primary care, specialty services, and emergency care",
          address: "10 North Greene Street, Baltimore, MD 21201",
          phone: "(410) 605-7000",
          website: "https://www.va.gov/maryland-health-care/locations/baltimore-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Perry Point VA Medical Center",
          description: "Primary care and specialty health services, including mental health care, audiology, and dental services",
          address: "Perry Point, MD 21902",
          phone: "(410) 642-2411",
          website: "https://www.va.gov/maryland-health-care/locations/perry-point-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Loch Raven VA Medical Center",
          description: "Rehabilitation and extended care services for Maryland veterans",
          address: "3900 Loch Raven Boulevard, Baltimore, MD 21218",
          phone: "(410) 605-7000",
          website: "https://www.va.gov/maryland-health-care/locations/loch-raven-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Glen Burnie VA Outpatient Clinic",
          description: "Primary care, mental health, and specialty services for veterans in Anne Arundel County",
          address: "808 Landmark Drive, Suite 128, Glen Burnie, MD 21061",
          phone: "(410) 590-4140",
          website: "https://www.va.gov/maryland-health-care/locations/glen-burnie-va-outpatient-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Cambridge VA Outpatient Clinic",
          description: "Primary care and mental health services for veterans on Maryland's Eastern Shore",
          address: "830 Chesapeake Drive, Cambridge, MD 21613",
          phone: "(410) 228-6243",
          website: "https://www.va.gov/maryland-health-care/locations/cambridge-va-outpatient-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Fort Meade VA Outpatient Clinic",
          description: "Primary care and mental health services for veterans in central Maryland",
          address: "2479 5th Street, Fort Meade, MD 20755",
          phone: "(410) 305-5300",
          website: "https://www.va.gov/maryland-health-care/locations/fort-meade-va-outpatient-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Baltimore Vet Center",
          description: "Readjustment counseling and outreach services for combat veterans and their families",
          address: "1777 Reisterstown Road, Suite 199, Baltimore, MD 21208",
          phone: "(410) 764-9400",
          website: "https://www.va.gov/find-locations/facility/vc_0407V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Maryland Center for Veterans Education and Training (MCVET)",
          description: "Comprehensive housing, substance abuse treatment, and employment services for homeless veterans",
          address: "301 N. High Street, Baltimore, MD 21202",
          phone: "(410) 576-9626",
          website: "http://www.mcvet.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Maryland Department of Veterans Affairs",
          description: "State agency providing advocacy and assistance with benefits, employment, and education",
          address: "16 Francis Street, Annapolis, MD 21401",
          phone: "(410) 260-3838",
          website: "https://veterans.maryland.gov/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Maryland Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Maryland Department of Health - Behavioral Health Administration",
          description: "State mental health and substance abuse services for all Maryland residents",
          address: "55 Wade Avenue, Catonsville, MD 21228",
          phone: "(410) 402-8300",
          website: "https://bha.health.maryland.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Maryland Crisis Hotline",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "211",
          website: "https://www.211md.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Maryland Department of Labor - Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "1100 N Eutaw Street, Baltimore, MD 21201",
          phone: "(410) 767-2173",
          website: "https://www.dllr.state.md.us/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Maryland Department of Housing and Community Development",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "7800 Harkins Road, Lanham, MD 20706",
          phone: "(301) 429-7400",
          website: "https://dhcd.maryland.gov/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Massachusetts": {
      veteranResources: [
        {
          name: "Jamaica Plain VA Medical Center",
          description: "Comprehensive healthcare services including primary care, specialty care, and mental health services",
          address: "150 South Huntington Avenue, Boston, MA 02130",
          phone: "(857) 364-4000",
          website: "https://www.va.gov/boston-health-care/locations/jamaica-plain-campus/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "West Roxbury VA Medical Center",
          description: "Surgical, inpatient, and critical care services for Massachusetts veterans",
          address: "1400 VFW Parkway, West Roxbury, MA 02132",
          phone: "(857) 364-4000",
          website: "https://www.va.gov/boston-health-care/locations/west-roxbury-campus/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Brockton VA Medical Center",
          description: "Mental health, long-term care, and primary care services",
          address: "940 Belmont Street, Brockton, MA 02301",
          phone: "(508) 583-4500",
          website: "https://www.va.gov/boston-health-care/locations/brockton-campus/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Edith Nourse Rogers Memorial Veterans Hospital",
          description: "Comprehensive medical care, including mental health services and long-term care",
          address: "200 Springs Road, Bedford, MA 01730",
          phone: "(781) 687-2000",
          website: "https://www.va.gov/bedford-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Edward P. Boland VA Medical Center",
          description: "Primary and specialty care, rehabilitation programs, and mental health services for western Massachusetts veterans",
          address: "421 North Main Street, Leeds, MA 01053",
          phone: "(413) 584-4040",
          website: "https://www.va.gov/central-western-massachusetts-health-care/locations/northampton-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Boston Vet Center",
          description: "Readjustment counseling and outreach services for combat veterans and their families",
          address: "7 Drydock Avenue, Suite 2070, Boston, MA 02210",
          phone: "(857) 203-6461",
          website: "https://www.va.gov/find-locations/facility/vc_0606V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Lowell VA Clinic",
          description: "Primary care and mental health services for veterans in northern Massachusetts",
          address: "130 Marshall Road, Lowell, MA 01852",
          phone: "(978) 671-9000",
          website: "https://www.va.gov/bedford-health-care/locations/lowell-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "New England Center and Home for Veterans",
          description: "Transitional and permanent housing, clinical support, and employment services for homeless and at-risk veterans",
          address: "17 Court Street, Boston, MA 02108",
          phone: "(617) 371-1800",
          website: "https://www.nechv.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Massachusetts Department of Veterans' Services",
          description: "State agency connecting veterans to benefits, employment, and education opportunities",
          address: "600 Washington Street, 7th Floor, Boston, MA 02111",
          phone: "(617) 210-5480",
          website: "https://www.mass.gov/orgs/massachusetts-department-of-veterans-services",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Massachusetts Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Massachusetts Department of Mental Health",
          description: "State mental health services and support for all Massachusetts residents",
          address: "25 Staniford Street, Boston, MA 02114",
          phone: "(617) 626-8000",
          website: "https://www.mass.gov/orgs/department-of-mental-health",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Massachusetts Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-877-382-1609",
          website: "https://www.mass.gov/service-details/massachusetts-crisis-resources",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "MassHire Department of Career Services",
          description: "State employment services including job training and career assistance for all residents",
          address: "19 Staniford Street, Boston, MA 02114",
          phone: "(617) 626-5300",
          website: "https://www.mass.gov/orgs/department-of-career-services",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Massachusetts Housing Partnership",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "160 Federal Street, Boston, MA 02110",
          phone: "(617) 854-1000",
          website: "https://www.mhp.net/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Michigan": {
      veteranResources: [
        {
          name: "John D. Dingell VA Medical Center",
          description: "Comprehensive medical care including acute medical, surgical, psychiatric, neurological, and dermatological inpatient care",
          address: "4646 John R. Street, Detroit, MI 48201",
          phone: "(313) 576-1000",
          website: "https://www.va.gov/detroit-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Battle Creek VA Medical Center",
          description: "Comprehensive healthcare services including mental health, primary care, and specialty services",
          address: "5500 Armstrong Road, Battle Creek, MI 49037",
          phone: "(269) 966-5600",
          website: "https://www.va.gov/battle-creek-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Ann Arbor VA Medical Center",
          description: "Tertiary care, specialty services, research and education for Michigan veterans",
          address: "2215 Fuller Road, Ann Arbor, MI 48105",
          phone: "(734) 769-7100",
          website: "https://www.va.gov/ann-arbor-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Oscar G. Johnson VA Medical Center",
          description: "Primary care and specialty services for veterans in Michigan's Upper Peninsula",
          address: "325 East H Street, Iron Mountain, MI 49801",
          phone: "(906) 774-3300",
          website: "https://www.va.gov/iron-mountain-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Grand Rapids VA Clinic",
          description: "Primary care, mental health, and specialty services for West Michigan veterans",
          address: "3019 Coit Avenue NE, Grand Rapids, MI 49505",
          phone: "(616) 365-9575",
          website: "https://www.va.gov/battle-creek-health-care/locations/grand-rapids-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Detroit Vet Center",
          description: "Readjustment counseling services for combat veterans and their families",
          address: "4161 Cass Avenue, Detroit, MI 48201",
          phone: "(313) 831-6509",
          website: "https://www.va.gov/find-locations/facility/vc_0310V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Volunteers of America Michigan Veterans Housing Program",
          description: "Transitional housing and supportive services for homeless veterans",
          address: "430 N. Larch Street, Lansing, MI 48912",
          phone: "(517) 484-4414",
          website: "https://www.voami.org/veterans-services",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Michigan Veterans Affairs Agency",
          description: "Connects veterans and their families with benefits, employment services, and resources",
          address: "222 Washington Square North, Lansing, MI 48933",
          phone: "(800) 642-4838",
          website: "https://www.michigan.gov/mvaa",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Michigan Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Michigan Department of Health and Human Services - Behavioral Health",
          description: "State mental health and substance abuse services for all Michigan residents",
          address: "333 S Grand Ave, Lansing, MI 48933",
          phone: "(517) 241-1970",
          website: "https://www.michigan.gov/mdhhs/inside-mdhhs/bureaus-offices/behavioral-developmental-health-services",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Michigan Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://michigan.gov/mdhhs/adult-child-services/mentalhealth/crisis",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Michigan Works! - Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "201 N Washington Square, Lansing, MI 48913",
          phone: "(517) 335-5858",
          website: "https://www.michiganworks.org/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Michigan State Housing Development Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "735 E Michigan Ave, Lansing, MI 48912",
          phone: "(517) 373-8370",
          website: "https://www.michigan.gov/mshda",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Minnesota": {
      veteranResources: [
        {
          name: "Minneapolis VA Health Care System",
          description: "Full range of services including primary care, specialty care, and mental health services",
          address: "1 Veterans Drive, Minneapolis, MN 55417",
          phone: "(612) 725-2000",
          website: "https://www.va.gov/minneapolis-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "St. Cloud VA Health Care System",
          description: "Primary care, mental health services, and select specialty care for central Minnesota veterans",
          address: "4801 Veterans Drive, St. Cloud, MN 56303",
          phone: "(320) 252-1670",
          website: "https://www.va.gov/st-cloud-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Rochester VA Clinic",
          description: "Primary care and mental health services for veterans in southeastern Minnesota",
          address: "3000 55th Street NW, Rochester, MN 55901",
          phone: "(507) 252-0885",
          website: "https://www.va.gov/minneapolis-health-care/locations/rochester-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Maplewood VA Clinic",
          description: "Primary care, mental health, and specialty services for Twin Cities veterans",
          address: "2785 White Bear Avenue North, Suite 210, Maplewood, MN 55109",
          phone: "(651) 290-3040",
          website: "https://www.va.gov/minneapolis-health-care/locations/maplewood-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Duluth VA Clinic",
          description: "Primary care and specialty services for veterans in northern Minnesota",
          address: "3520 Tower Avenue, Superior, WI 54880",
          phone: "(715) 398-2400", 
          website: "https://www.va.gov/minneapolis-health-care/locations/twin-ports-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "St. Paul Vet Center",
          description: "Readjustment counseling and outreach services for combat veterans and their families",
          address: "550 County Road D, Suite 10, New Brighton, MN 55112",
          phone: "(651) 644-4022",
          website: "https://www.va.gov/find-locations/facility/vc_0643V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Minnesota Assistance Council for Veterans (MACV)",
          description: "Housing assistance, supportive services, and employment help for homeless veterans",
          address: "1000 University Avenue West, Suite 150, St. Paul, MN 55104",
          phone: "(833) 222-6228",
          website: "https://www.mac-v.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Minnesota Department of Veterans Affairs",
          description: "State agency providing benefits assistance, education resources, and employment support",
          address: "20 West 12th Street, St. Paul, MN 55155",
          phone: "(651) 296-2562",
          website: "https://mn.gov/mdva/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Minnesota Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Minnesota Department of Human Services - Behavioral Health",
          description: "State mental health and substance abuse services for all Minnesota residents",
          address: "444 Lafayette Road N, Saint Paul, MN 55155",
          phone: "(651) 431-2000",
          website: "https://mn.gov/dhs/general-public/about-dhs/behavioral-health/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Minnesota Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://mn.gov/dhs/general-public/about-dhs/behavioral-health/crisis-services/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Minnesota Department of Employment and Economic Development - WorkForce Centers",
          description: "State employment services including job training and career assistance for all residents",
          address: "1st National Bank Building, 332 Minnesota Street, Saint Paul, MN 55101",
          phone: "(651) 259-7114",
          website: "https://mn.gov/deed/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Minnesota Housing Finance Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "400 Sibley Street, Saint Paul, MN 55101",
          phone: "(651) 296-7608",
          website: "https://www.mnhousing.gov/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Mississippi": {
      veteranResources: [
        {
          name: "G.V. (Sonny) Montgomery VA Medical Center",
          description: "Comprehensive medical services including primary care, specialty care, mental health services, and more",
          address: "1500 East Woodrow Wilson Avenue, Jackson, MS 39216",
          phone: "(601) 362-4471",
          website: "https://www.va.gov/jackson-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Gulf Coast Veterans Health Care System",
          description: "Comprehensive healthcare services for veterans living in coastal Mississippi",
          address: "400 Veterans Avenue, Biloxi, MS 39531",
          phone: "(228) 523-5000",
          website: "https://www.va.gov/gulf-coast-health-care/locations/biloxi-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kosciusko VA Clinic",
          description: "Primary care and mental health services for veterans in central Mississippi",
          address: "332 Highway 12 West, Kosciusko, MS 39090",
          phone: "(601) 362-4471 x5800",
          website: "https://www.va.gov/jackson-health-care/locations/kosciusko-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Meridian VA Clinic",
          description: "Primary care, mental health, and telehealth services for eastern Mississippi veterans",
          address: "2103 13th Street, Meridian, MS 39301",
          phone: "(601) 482-3275",
          website: "https://www.va.gov/jackson-health-care/locations/meridian-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Greenville VA Clinic",
          description: "Primary care and mental health services for veterans in the Mississippi Delta",
          address: "1502 South Colorado Street, Greenville, MS 38703",
          phone: "(662) 332-9872",
          website: "https://www.va.gov/jackson-health-care/locations/greenville-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Jackson Vet Center",
          description: "Readjustment counseling and outreach services for combat veterans and their families",
          address: "1755 Lelia Drive, Suite 104, Jackson, MS 39216",
          phone: "(601) 965-5477",
          website: "https://www.va.gov/find-locations/facility/vc_0734V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Mississippi State Veterans Homes",
          description: "Long-term care facilities specifically for Mississippi veterans",
          address: "Multiple locations across Mississippi",
          phone: "(601) 576-4850",
          website: "https://www.msva.ms.gov/state-veterans-homes",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Mississippi Department of Veterans Affairs",
          description: "State agency providing benefits assistance, education support, and employment resources",
          address: "P.O. Box 5947, Pearl, MS 39288",
          phone: "(601) 576-4850",
          website: "https://www.msva.ms.gov/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Mississippi Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Mississippi Department of Mental Health",
          description: "State mental health and substance abuse services for all Mississippi residents",
          address: "1101 Robert E Lee Building, Jackson, MS 39201",
          phone: "(601) 359-1288",
          website: "https://www.dmh.ms.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Mississippi Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-877-210-8513",
          website: "https://www.dmh.ms.gov/crisis-services/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Mississippi Department of Employment Security - WIN Job Centers",
          description: "State employment services including job training and career assistance for all residents",
          address: "1235 Echelon Parkway, Jackson, MS 39213",
          phone: "(601) 321-6000",
          website: "https://mdes.ms.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Mississippi Home Corporation",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "735 Riverside Drive, Jackson, MS 39202",
          phone: "(601) 718-4642",
          website: "https://www.mshc.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Missouri": {
      veteranResources: [
        {
          name: "Harry S. Truman Memorial Veterans' Hospital",
          description: "Primary care and specialty health services including audiology, mental health care, cardiology, surgery, dentistry, neurology, and orthopedics",
          address: "800 Hospital Drive, Columbia, MO 65201",
          phone: "(573) 814-6000",
          website: "https://www.va.gov/columbia-missouri-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Kansas City VA Medical Center",
          description: "Comprehensive healthcare services including primary care, specialty care, and mental health services",
          address: "4801 E. Linwood Boulevard, Kansas City, MO 64128",
          phone: "(816) 861-4700",
          website: "https://www.va.gov/kansas-city-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "St. Louis VA Health Care System - John Cochran Division",
          description: "Primary, specialty, and ambulatory care services, including surgery and specialized outpatient services",
          address: "915 North Grand Boulevard, St. Louis, MO 63106",
          phone: "(314) 652-4100",
          website: "https://www.va.gov/st-louis-health-care/locations/john-cochran-division/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "St. Louis VA Health Care System - Jefferson Barracks Division",
          description: "Mental health, geriatric, rehabilitation, and long-term care services",
          address: "1 Jefferson Barracks Drive, St. Louis, MO 63125",
          phone: "(314) 652-4100",
          website: "https://www.va.gov/st-louis-health-care/locations/jefferson-barracks-division/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Gene Taylor VA Clinic",
          description: "Primary care and mental health services for veterans in southwest Missouri",
          address: "600 North Main Street, Mt. Vernon, MO 65712",
          phone: "(417) 466-4000",
          website: "https://www.va.gov/fayetteville-arkansas-health-care/locations/gene-taylor-community-based-outpatient-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Columbia Vet Center",
          description: "Readjustment counseling services for combat veterans and their families",
          address: "4040 Rangeline Street, Suite 105, Columbia, MO 65202",
          phone: "(573) 814-6206",
          website: "https://www.va.gov/find-locations/facility/vc_0704V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "St. Louis Veterans Home",
          description: "Long-term skilled nursing care for Missouri veterans",
          address: "10600 Lewis & Clark Boulevard, St. Louis, MO 63136",
          phone: "(314) 340-6389",
          website: "https://mvc.dps.mo.gov/homes/stlouis.php",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Missouri Veterans Commission",
          description: "State agency providing benefits assistance, employment support, and education resources",
          address: "205 Jefferson Street, 12th Floor, Jefferson City, MO 65101",
          phone: "(573) 751-3779",
          website: "https://mvc.dps.mo.gov/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Missouri Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Missouri Department of Mental Health",
          description: "State mental health and substance abuse services for all Missouri residents",
          address: "1706 E Elm Street, Jefferson City, MO 65102",
          phone: "(573) 751-4122",
          website: "https://dmh.missouri.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Missouri Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://dmh.missouri.gov/mental-health/mental-health-crisis-services",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Missouri Job Centers - Department of Higher Education and Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "3420 N Ten Mile Dr, Jefferson City, MO 65109",
          phone: "(573) 751-3349",
          website: "https://jobs.mo.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Missouri Housing Development Commission",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "3435 Broadway, Kansas City, MO 64111",
          phone: "(816) 759-6600",
          website: "https://www.mhdc.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Montana": {
      veteranResources: [
        {
          name: "Fort Harrison VA Medical Center",
          description: "Comprehensive range of health services including primary care, mental health services, and specialty care",
          address: "3687 Veterans Drive, Fort Harrison, MT 59636",
          phone: "(406) 442-6410",
          website: "https://www.va.gov/montana-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Benjamin Charles Steele VA Clinic",
          description: "Primary care, mental health services, and specialty care for veterans in eastern Montana",
          address: "1766 Majestic Lane, Billings, MT 59102",
          phone: "(406) 373-3500",
          website: "https://www.va.gov/montana-health-care/locations/benjamin-charles-steele-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Anaconda VA Clinic",
          description: "Primary care and telehealth services for veterans in southwestern Montana",
          address: "118 E. 7th Street, Anaconda, MT 59711",
          phone: "(406) 496-3000",
          website: "https://www.va.gov/montana-health-care/locations/anaconda-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Bozeman VA Clinic",
          description: "Primary care and mental health services for veterans in the Gallatin Valley",
          address: "300 North Willson Avenue, Suite 703G, Bozeman, MT 59715",
          phone: "(406) 582-5300",
          website: "https://www.va.gov/montana-health-care/locations/bozeman-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Great Falls VA Clinic",
          description: "Primary care, mental health, and select specialty services for central Montana veterans",
          address: "1417 9th Street South, Suite 200, Great Falls, MT 59405",
          phone: "(406) 791-3200",
          website: "https://www.va.gov/montana-health-care/locations/great-falls-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Missoula VA Clinic",
          description: "Primary care and mental health services for western Montana veterans",
          address: "2687 Palmer Street, Suite C, Missoula, MT 59808",
          phone: "(406) 829-5400",
          website: "https://www.va.gov/montana-health-care/locations/david-j-thatcher-va-clinic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Montana Veterans' Home",
          description: "Long-term care facility for Montana veterans",
          address: "400 Veterans Drive, Columbia Falls, MT 59912",
          phone: "(406) 892-3256",
          website: "https://dphhs.mt.gov/sltc/homelivingoptions/montanaveteranshomes/index",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Montana Veterans Affairs Division",
          description: "State agency providing benefits assistance, employment services, and education support",
          address: "1956 Mt. Majo Street, Fort Harrison, MT 59636",
          phone: "(406) 324-3740",
          website: "https://montanadma.org/montana-veterans-affairs",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Montana Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Statewide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Montana Department of Public Health and Human Services - Behavioral Health",
          description: "State mental health and substance abuse services for all Montana residents",
          address: "111 N Sanders Street, Helena, MT 59604",
          phone: "(406) 444-3964",
          website: "https://dphhs.mt.gov/amdd",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Montana Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://dphhs.mt.gov/suicideprevention/Crisis",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Montana Department of Labor & Industry - Job Service",
          description: "State employment services including job training and career assistance for all residents",
          address: "1315 Lockey Avenue, Helena, MT 59601",
          phone: "(406) 444-4100",
          website: "https://montanaworks.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Montana Board of Housing",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "301 S Park Ave, Helena, MT 59601",
          phone: "(406) 841-2840",
          website: "https://housing.mt.gov/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Nebraska": {
      veteranResources: [
        {
          name: "VA Nebraska-Western Iowa Health Care System",
          description: "VA healthcare services in Nebraska",
          address: "4101 Woolworth Avenue, Omaha, NE 68105",
          phone: "(402) 346-8800",
          website: "https://www.nebraska.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Nebraska Department of Health and Human Services - Behavioral Health",
          description: "State mental health and substance abuse services for all Nebraska residents",
          address: "301 Centennial Mall South, Lincoln, NE 68509",
          phone: "(402) 471-3121",
          website: "https://dhhs.ne.gov/Pages/Behavioral-Health.aspx",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Nebraska Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://dhhs.ne.gov/Pages/Behavioral-Health-Crisis-Services.aspx",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Nebraska Department of Labor - NEworks",
          description: "State employment services including job training and career assistance for all residents",
          address: "550 S 16th Street, Lincoln, NE 68508",
          phone: "(402) 471-9000",
          website: "https://dol.nebraska.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Nebraska Investment Finance Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "1230 O Street, Lincoln, NE 68508",
          phone: "(402) 434-3900",
          website: "https://www.nifa.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Nevada": {
      veteranResources: [
        {
          name: "VA Southern Nevada Healthcare System",
          description: "VA healthcare services in Nevada",
          address: "6900 North Pecos Road, North Las Vegas, NV 89086",
          phone: "(702) 791-9000",
          website: "https://www.lasvegas.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Nevada Department of Health and Human Services - Behavioral Health",
          description: "State mental health and substance abuse services for all Nevada residents",
          address: "4126 Technology Way, Carson City, NV 89706",
          phone: "(775) 684-5943",
          website: "https://dhhs.nv.gov/Programs/Behavioral/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Nevada Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://dhhs.nv.gov/Programs/Behavioral/Crisis/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Nevada Department of Employment, Training and Rehabilitation - Nevada JobConnect",
          description: "State employment services including job training and career assistance for all residents",
          address: "2800 E St. Louis Ave, Las Vegas, NV 89104",
          phone: "(702) 486-0100",
          website: "https://detr.nv.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Nevada Housing Division",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "1535 Old Hot Springs Road, Carson City, NV 89706",
          phone: "(775) 687-2040",
          website: "https://housing.nv.gov/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "New Hampshire": {
      veteranResources: [
        {
          name: "Manchester VA Medical Center",
          description: "VA healthcare services in New Hampshire",
          address: "718 Smyth Road, Manchester, NH 03104",
          phone: "(603) 624-4366",
          website: "https://www.manchester.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "New Hampshire Department of Health and Human Services - Bureau of Mental Health Services",
          description: "State mental health and substance abuse services for all New Hampshire residents",
          address: "105 Pleasant Street, Concord, NH 03301",
          phone: "(603) 271-5000",
          website: "https://www.dhhs.nh.gov/programs-services/mental-health-substance-use",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "New Hampshire Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.dhhs.nh.gov/programs-services/mental-health-substance-use/crisis-services",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "New Hampshire Employment Security - NH Works",
          description: "State employment services including job training and career assistance for all residents",
          address: "45 South Fruit Street, Concord, NH 03301",
          phone: "(603) 224-3311",
          website: "https://www.nhes.nh.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "New Hampshire Housing Finance Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "32 Constitution Drive, Bedford, NH 03110",
          phone: "(603) 472-8623",
          website: "https://www.nhhfa.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "New Jersey": {
      veteranResources: [
        {
          name: "VA New Jersey Health Care System",
          description: "VA healthcare services in New Jersey",
          address: "385 Tremont Avenue, East Orange, NJ 07018",
          phone: "(973) 676-1000",
          website: "https://www.newjersey.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "New Jersey Department of Human Services - Division of Mental Health and Addiction Services",
          description: "State mental health and substance abuse services for all New Jersey residents",
          address: "222 South Warren Street, Trenton, NJ 08608",
          phone: "(609) 777-0702",
          website: "https://www.nj.gov/humanservices/dmhas/home/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "New Jersey Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "211",
          website: "https://nj211.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "New Jersey Department of Labor and Workforce Development - One-Stop Career Centers",
          description: "State employment services including job training and career assistance for all residents",
          address: "1 John Fitch Plaza, Trenton, NJ 08625",
          phone: "(609) 659-9045",
          website: "https://www.nj.gov/labor/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "New Jersey Housing and Mortgage Finance Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "637 South Clinton Avenue, Trenton, NJ 08611",
          phone: "(609) 278-7400",
          website: "https://www.njhmfa.gov/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "New Mexico": {
      veteranResources: [
        {
          name: "Raymond G. Murphy VA Medical Center",
          description: "VA healthcare services in New Mexico",
          address: "1501 San Pedro Drive SE, Albuquerque, NM 87108",
          phone: "(505) 265-1711",
          website: "https://www.albuquerque.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "New Mexico Department of Health - Behavioral Health Services",
          description: "State mental health and substance abuse services for all New Mexico residents",
          address: "1190 St. Francis Drive, Santa Fe, NM 87505",
          phone: "(505) 827-2658",
          website: "https://www.nmhealth.org/about/behsu/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "New Mexico Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-855-662-7474",
          website: "https://www.nmcrisisline.com/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "New Mexico Department of Workforce Solutions",
          description: "State employment services including job training and career assistance for all residents",
          address: "401 Broadway Blvd NE, Albuquerque, NM 87103",
          phone: "(505) 841-8405",
          website: "https://www.dws.state.nm.us/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "New Mexico Mortgage Finance Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "344 Fourth Street SW, Albuquerque, NM 87102",
          phone: "(505) 843-6880",
          website: "https://www.housingnm.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "New York": {
      veteranResources: [
        {
          name: "VA NY Harbor Healthcare System",
          description: "VA healthcare services in New York",
          address: "423 East 23rd Street, New York, NY 10010",
          phone: "(212) 686-7500",
          website: "https://www.nyharbor.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "New York State Office of Mental Health",
          description: "State mental health services and support for all New York residents",
          address: "44 Holland Avenue, Albany, NY 12229",
          phone: "(518) 474-4403",
          website: "https://omh.ny.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "New York State Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://omh.ny.gov/omhweb/crisis_services/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "New York State Department of Labor - Career Centers",
          description: "State employment services including job training and career assistance for all residents",
          address: "Building 12, State Office Campus, Albany, NY 12240",
          phone: "(518) 457-9000",
          website: "https://dol.ny.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "New York State Homes and Community Renewal",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "25 Beaver Street, New York, NY 10004",
          phone: "(212) 480-7300",
          website: "https://hcr.ny.gov/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "North Carolina": {
      veteranResources: [
        {
          name: "Durham VA Medical Center",
          description: "VA healthcare services in North Carolina",
          address: "508 Fulton Street, Durham, NC 27705",
          phone: "(919) 286-0411",
          website: "https://www.durham.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "North Carolina Department of Health and Human Services - Division of Mental Health",
          description: "State mental health and substance abuse services for all North Carolina residents",
          address: "2001 Mail Service Center, Raleigh, NC 27699",
          phone: "(919) 733-7011",
          website: "https://www.ncdhhs.gov/divisions/mental-health-developmental-disabilities-and-substance-use-services",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "North Carolina Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.ncdhhs.gov/divisions/mental-health-developmental-disabilities-and-substance-use-services/mental-health/crisis-services",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "North Carolina Department of Commerce - NCWorks",
          description: "State employment services including job training and career assistance for all residents",
          address: "301 N Wilmington Street, Raleigh, NC 27601",
          phone: "(919) 814-4600",
          website: "https://www.nccommerce.com/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "North Carolina Housing Finance Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "3508 Bush Street, Raleigh, NC 27609",
          phone: "(919) 877-5700",
          website: "https://www.nchfa.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "North Dakota": {
      veteranResources: [
        {
          name: "Fargo VA Health Care System",
          description: "VA healthcare services in North Dakota",
          address: "2101 Elm Street North, Fargo, ND 58102",
          phone: "(701) 232-3241",
          website: "https://www.fargo.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "North Dakota Department of Human Services - Behavioral Health",
          description: "State mental health and substance abuse services for all North Dakota residents",
          address: "1237 W Divide Avenue, Bismarck, ND 58501",
          phone: "(701) 328-8920",
          website: "https://www.nd.gov/dhs/services/mentalhealth/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "North Dakota Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.nd.gov/dhs/services/mentalhealth/crisis.html",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Job Service North Dakota",
          description: "State employment services including job training and career assistance for all residents",
          address: "1000 E Divide Avenue, Bismarck, ND 58501",
          phone: "(701) 328-5000",
          website: "https://www.jobsnd.com/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "North Dakota Housing Finance Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "2624 Vermont Avenue, Bismarck, ND 58503",
          phone: "(701) 328-8080",
          website: "https://www.ndhfa.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Ohio": {
      veteranResources: [
        {
          name: "Louis Stokes Cleveland VA Medical Center",
          description: "VA healthcare services in Ohio",
          address: "10701 East Boulevard, Cleveland, OH 44106",
          phone: "(216) 791-3800",
          website: "https://www.cleveland.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Ohio Department of Mental Health and Addiction Services",
          description: "State mental health and substance abuse services for all Ohio residents",
          address: "30 E Broad Street, Columbus, OH 43215",
          phone: "(614) 466-2596",
          website: "https://mha.ohio.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Ohio Crisis Text Line",
          description: "24/7 statewide crisis support via text and phone",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://mha.ohio.gov/services-providers/crisis-services",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "OhioMeansJobs - Workforce Development",
          description: "State employment services including job training and career assistance for all residents",
          address: "30 E Broad Street, Columbus, OH 43215",
          phone: "(614) 466-2100",
          website: "https://ohiomeansjobs.com/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Ohio Housing Finance Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "57 E Main Street, Columbus, OH 43215",
          phone: "(614) 466-7970",
          website: "https://www.ohiohome.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Oklahoma": {
      veteranResources: [
        {
          name: "Oklahoma City VA Health Care System",
          description: "VA healthcare services in Oklahoma",
          address: "921 Northeast 13th Street, Oklahoma City, OK 73104",
          phone: "(405) 456-1000",
          website: "https://www.oklahoma.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Oklahoma Department of Mental Health and Substance Abuse Services",
          description: "State mental health and substance abuse services for all Oklahoma residents",
          address: "1200 NE 13th Street, Oklahoma City, OK 73117",
          phone: "(405) 522-3908",
          website: "https://oklahoma.gov/odmhsas.html",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Oklahoma Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://oklahoma.gov/odmhsas/treatment/crisis-intervention.html",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Oklahoma Employment Security Commission",
          description: "State employment services including job training and career assistance for all residents",
          address: "Will Rogers Memorial Office Building, Oklahoma City, OK 73105",
          phone: "(405) 557-7100",
          website: "https://www.ok.gov/oesc/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Oklahoma Housing Finance Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "5500 N Western Avenue, Oklahoma City, OK 73118",
          phone: "(405) 848-1144",
          website: "https://www.ohfa.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Oregon": {
      veteranResources: [
        {
          name: "VA Portland Health Care System",
          description: "Comprehensive medical services including primary and specialty care, mental health services, rehabilitation, caregiver support, and resources for homeless veterans",
          address: "3710 Southwest US Veterans Hospital Road, Portland, OR 97239",
          phone: "(503) 220-8262",
          website: "https://www.portland.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Oregon Department of Veterans' Affairs (ODVA)",
          description: "Benefits assistance, healthcare navigation, education and employment resources, financial assistance programs, and housing support",
          address: "700 Summer St NE, Salem, OR 97301",
          phone: "(800) 692-9666",
          website: "https://www.oregon.gov/odva/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Vet Centers in Oregon",
          description: "Community-based counseling centers offering individual and group therapy for veterans and their families",
          address: "Multiple locations throughout Oregon",
          phone: "(877) 927-8387",
          website: "https://www.va.gov/find-locations/?facilityType=vet_center&state=OR",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Portland VA Research Foundation (PVARF)",
          description: "Supports medical research and education activities for veterans healthcare improvement",
          address: "3710 SW US Veterans Hospital Rd, Portland, OR 97239",
          phone: "(503) 220-8262 ext. 56937",
          website: "https://www.pvarf.org/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Center to Improve Veteran Involvement in Care (CIVIC)",
          description: "Conducts research to empower veterans in managing their health and healthcare",
          address: "3710 SW US Veterans Hospital Rd, Portland, OR 97239",
          phone: "(503) 220-8262",
          website: "https://www.portland.va.gov/research/civic/",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veteran Readiness and Employment (VR&E) Program - Oregon",
          description: "Assists veterans with service-connected disabilities in preparing for, finding, and maintaining suitable employment",
          address: "100 SW Main Street, Floor 2, Portland, OR 97204",
          phone: "(800) 827-1000",
          website: "https://www.va.gov/careers-employment/vocational-rehabilitation/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Oregon Veterans' Emergency Financial Assistance Program",
          description: "Financial assistance program for veterans with urgent needs related to housing, utilities, and other emergency situations",
          address: "700 Summer St NE, Salem, OR 97301",
          phone: "(800) 692-9666",
          website: "https://www.oregon.gov/odva/Connect/Pages/Assistance.aspx",
          category: "Housing"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Oregon Health Authority - Behavioral Health Division",
          description: "State mental health and substance abuse services for all Oregon residents",
          address: "500 Summer Street NE, Salem, OR 97301",
          phone: "(503) 945-5944",
          website: "https://www.bethoughtfull.org/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Oregon Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.crisis.bethoughtfull.org/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Oregon Employment Department - WorkSource Centers",
          description: "State employment services including job training and career assistance for all residents",
          address: "875 Union Street NE, Salem, OR 97311",
          phone: "(503) 947-1394",
          website: "https://www.oregon.gov/employ/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Oregon Housing and Community Services",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "725 Summer Street NE, Salem, OR 97301",
          phone: "(503) 986-2000",
          website: "https://www.oregon.gov/ohcs/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Pennsylvania": {
      veteranResources: [
        {
          name: "Corporal Michael J. Crescenz VA Medical Center",
          description: "VA healthcare services in Pennsylvania",
          address: "3900 Woodland Avenue, Philadelphia, PA 19104",
          phone: "(215) 823-5800",
          website: "https://www.philadelphia.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Pennsylvania Department of Human Services - Mental Health",
          description: "State mental health and substance abuse services for all Pennsylvania residents",
          address: "625 Forster Street, Harrisburg, PA 17120",
          phone: "(717) 787-6443",
          website: "https://www.dhs.pa.gov/services/mental-health-services/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Pennsylvania Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.dhs.pa.gov/services/mental-health-services/Pages/Crisis-Services.aspx",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Pennsylvania CareerLink - Department of Labor & Industry",
          description: "State employment services including job training and career assistance for all residents",
          address: "651 Boas Street, Harrisburg, PA 17121",
          phone: "(717) 787-5279",
          website: "https://www.pacareerlink.pa.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Pennsylvania Housing Finance Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "211 N Front Street, Harrisburg, PA 17101",
          phone: "(717) 780-3800",
          website: "https://www.phfa.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Rhode Island": {
      veteranResources: [
        {
          name: "Providence VA Medical Center",
          description: "VA healthcare services in Rhode Island",
          address: "830 Chalkstone Avenue, Providence, RI 02908",
          phone: "(401) 273-7100",
          website: "https://www.providence.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Rhode Island Department of Behavioral Healthcare",
          description: "State mental health and substance abuse services for all Rhode Island residents",
          address: "14 Harrington Road, Cranston, RI 02920",
          phone: "(401) 462-2003",
          website: "https://bhddh.ri.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Rhode Island Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://bhddh.ri.gov/sections_offices/behavioral_health/crisis.php",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Rhode Island Department of Labor and Training - netWORKri",
          description: "State employment services including job training and career assistance for all residents",
          address: "1511 Pontiac Avenue, Cranston, RI 02920",
          phone: "(401) 462-8000",
          website: "https://www.dlt.ri.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Rhode Island Housing",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "44 Washington Street, Providence, RI 02903",
          phone: "(401) 457-1234",
          website: "https://www.rihousing.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "South Carolina": {
      veteranResources: [
        {
          name: "William Jennings Bryan Dorn VA Medical Center",
          description: "VA healthcare services in South Carolina",
          address: "6439 Garners Ferry Road, Columbia, SC 29209",
          phone: "(803) 776-4000",
          website: "https://www.columbia.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "South Carolina Department of Mental Health",
          description: "State mental health services for all South Carolina residents",
          address: "2414 Bull Street, Columbia, SC 29201",
          phone: "(803) 898-8581",
          website: "https://scdmh.net/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "South Carolina Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://scdmh.net/mental-health-services/crisis-services/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "SC Works - Department of Employment and Workforce",
          description: "State employment services including job training and career assistance for all residents",
          address: "1550 Gadsden Street, Columbia, SC 29202",
          phone: "(803) 737-2400",
          website: "https://scworks.org/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "South Carolina State Housing Finance and Development Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "300-C Outlet Pointe Blvd, Columbia, SC 29210",
          phone: "(803) 896-9001",
          website: "https://www.schousing.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "South Dakota": {
      veteranResources: [
        {
          name: "Sioux Falls VA Health Care System",
          description: "Primary and specialty care, mental health, PTSD treatment, rehabilitation, palliative care, and more",
          address: "2501 W 22nd St, Sioux Falls, SD 57105",
          phone: "(605) 336-3230",
          website: "https://www.va.gov/sioux-falls-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "VA Black Hills Health Care System - Fort Meade",
          description: "Comprehensive medical and mental health services, including PTSD care and substance use treatment",
          address: "113 Comanche Rd, Fort Meade, SD 57741",
          phone: "(605) 347-2511",
          website: "https://www.va.gov/black-hills-health-care/locations/fort-meade-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "VA Black Hills Health Care System - Hot Springs",
          description: "Comprehensive medical services and residential rehabilitation programs",
          address: "500 N 5th St, Hot Springs, SD 57747",
          phone: "(605) 745-2000",
          website: "https://www.va.gov/black-hills-health-care/locations/hot-springs-va-medical-center/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Sioux Falls Vet Center",
          description: "Confidential counseling for combat veterans and families, PTSD treatment, and military sexual trauma counseling",
          address: "3800 S Kiwanis Ave, Suite 100, Sioux Falls, SD 57105",
          phone: "(605) 330-4552",
          website: "https://www.va.gov/find-locations/facility/vc_0631V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Rapid City Vet Center",
          description: "Confidential counseling for combat veterans and families, bereavement counseling, and trauma treatment",
          address: "621 6th St, Suite 101, Rapid City, SD 57701",
          phone: "(605) 348-0077",
          website: "https://www.va.gov/find-locations/facility/vc_0632V",
          category: "Treatment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Crisis Line",
          description: "24/7 confidential support for veterans in crisis",
          address: "Nationwide service",
          phone: "988, then press 1",
          website: "https://www.veteranscrisisline.net/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "South Dakota Veterans Cemetery",
          description: "State-operated cemetery offering burial services for veterans and eligible family members",
          address: "Sioux Falls, SD",
          phone: "(605) 336-3230",
          website: "https://vetaffairs.sd.gov/veteranscemetery/default.aspx",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Black Hills National Cemetery",
          description: "Federally operated cemetery providing burial services for veterans and eligible family members",
          address: "Sturgis, SD",
          phone: "(605) 347-3830",
          website: "https://www.cem.va.gov/cems/nchp/blackhills.asp",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "University of South Dakota - Veterans' Services",
          description: "Assists veterans and families with applying for and receiving education benefits, including GI Bill support",
          address: "414 E Clark St, Vermillion, SD 57069",
          phone: "(605) 677-5331",
          website: "https://www.usd.edu/veterans",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veteran Readiness and Employment (VR&E) Program",
          description: "Vocational counseling, training, and job placement assistance for veterans with service-connected disabilities",
          address: "910 5th St, Suite 105, Rapid City, SD 57701",
          phone: "(605) 341-8165",
          website: "https://www.benefits.va.gov/vocrehab/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "South Dakota Department of Veterans Affairs",
          description: "Assistance with benefits claims, education, and employment resources for veterans",
          address: "425 E Capitol Ave, Pierre, SD 57501",
          phone: "(605) 773-3269",
          website: "https://vetaffairs.sd.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "South Dakota Department of Social Services - Behavioral Health",
          description: "State mental health and substance abuse services for all South Dakota residents",
          address: "700 Governors Drive, Pierre, SD 57501",
          phone: "(605) 773-3123",
          website: "https://dss.sd.gov/behavioralhealth/default.aspx",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "South Dakota Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://dss.sd.gov/behavioralhealth/crisis.aspx",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "South Dakota Department of Labor and Regulation",
          description: "State employment services including job training and career assistance for all residents",
          address: "700 Governors Drive, Pierre, SD 57501",
          phone: "(605) 773-3101",
          website: "https://dlr.sd.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "South Dakota Housing Development Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "3060 E Elizabeth Street, Pierre, SD 57501",
          phone: "(605) 773-3181",
          website: "https://www.sdhda.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Tennessee": {
      veteranResources: [
        {
          name: "Tennessee Valley Healthcare System",
          description: "VA healthcare services in Tennessee",
          address: "1310 24th Avenue South, Nashville, TN 37212",
          phone: "(615) 327-4751",
          website: "https://www.tennesseevalley.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Tennessee Department of Mental Health and Substance Abuse Services",
          description: "State mental health and substance abuse services for all Tennessee residents",
          address: "Andrew Johnson Tower, Nashville, TN 37243",
          phone: "(615) 532-6500",
          website: "https://www.tn.gov/behavioral-health.html",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Tennessee Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-855-274-7471",
          website: "https://www.tn.gov/behavioral-health/mental-health-services/crisis-services.html",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Tennessee Department of Labor and Workforce Development - Career Centers",
          description: "State employment services including job training and career assistance for all residents",
          address: "220 French Landing Drive, Nashville, TN 37243",
          phone: "(844) 224-5627",
          website: "https://www.tn.gov/workforce.html",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Tennessee Housing Development Agency",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "502 Deaderick Street, Nashville, TN 37243",
          phone: "(615) 815-2200",
          website: "https://thda.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Texas": {
      veteranResources: [
        {
          name: "Michael E. DeBakey VA Medical Center",
          description: "VA healthcare services in Texas",
          address: "2002 Holcombe Boulevard, Houston, TX 77030",
          phone: "(713) 791-1414",
          website: "https://www.va.gov/houston-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "HUD-Veterans Affairs Supportive Housing (HUD-VASH)",
          description: "Collaborative program between HUD and VA, providing housing vouchers combined with case management and clinical services for homeless veterans",
          address: "Statewide service administered by Texas Department of Housing and Community Affairs (TDHCA)",
          phone: "Contact your local VA Medical Center",
          website: "https://www.va.gov/homeless/hud-vash.asp",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Supportive Services for Veteran Families (SSVF)",
          description: "VA program preventing homelessness by offering temporary financial assistance for rent, utilities, security deposits, and moving costs",
          address: "Multiple locations throughout Texas",
          phone: "1-877-4AID-VET (1-877-424-3838)",
          website: "https://www.va.gov/homeless/ssvf/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Veterans Housing Assistance Program (VHAP)",
          description: "Texas Veterans Land Board program offering low-interest loans for land, home purchases, and home improvements with little or no down payment",
          address: "1700 N. Congress Avenue, Austin, TX 78701",
          phone: "1-800-252-8387",
          website: "https://vlb.texas.gov/homes/index.html",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Endeavors",
          description: "Provides permanent supportive housing, homelessness prevention programs, and mental health services for veterans, including those with disabilities and female veterans",
          address: "6363 De Zavala Rd, San Antonio, TX 78249",
          phone: "(210) 431-6466",
          website: "https://endeavors.org/veteran-services/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Operation Homefront",
          description: "Offers transitional housing, permanent housing, and critical financial assistance for rent, utilities, and food for military and veteran families",
          address: "1355 Central Parkway S, Suite 100, San Antonio, TX 78232",
          phone: "(210) 659-7756",
          website: "https://operationhomefront.org/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },

        {
          name: "National Call Center for Homeless Veterans",
          description: "24/7 confidential support connecting veterans to VA services and community resources",
          address: "Nationwide service",
          phone: "1-877-4AID-VET (1-877-424-3838)",
          website: "https://www.va.gov/homeless/nationalcallcenter.asp",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Texas Health and Human Services - Mental Health Services",
          description: "State mental health services including crisis intervention, substance abuse treatment, and community support programs for all residents",
          address: "4900 N Lamar Blvd, Austin, TX 78751",
          phone: "(512) 424-6500",
          website: "https://www.hhs.texas.gov/services/mental-health-substance-use",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Texas Crisis Text Line",
          description: "24/7 statewide crisis support via text and phone for mental health emergencies available to all residents",
          address: "Statewide Service",
          phone: "Text HOME to 741741",
          website: "https://www.hhs.texas.gov/services/mental-health-substance-use/crisis-services",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Texas Workforce Commission",
          description: "State employment services including job training, career counseling, and workforce development programs for all residents",
          address: "101 E 15th St, Austin, TX 78778",
          phone: "(512) 463-2222",
          website: "https://www.twc.texas.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Texas Department of Housing and Community Affairs",
          description: "State housing assistance programs including affordable housing, emergency rental assistance, and homeownership programs",
          address: "221 E 11th St, Austin, TX 78701",
          phone: "(512) 475-3800",
          website: "https://www.tdhca.state.tx.us/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Utah": {
      veteranResources: [
        {
          name: "VA Salt Lake City Health Care System",
          description: "VA healthcare services in Utah",
          address: "500 Foothill Drive, Salt Lake City, UT 84148",
          phone: "(801) 582-1565",
          website: "https://www.va.gov/salt-lake-city-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Utah Department of Human Services - Substance Abuse and Mental Health",
          description: "State mental health and substance abuse services for all Utah residents",
          address: "195 N 1950 W, Salt Lake City, UT 84116",
          phone: "(801) 538-4270",
          website: "https://dsamh.utah.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Utah Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://dsamh.utah.gov/crisis-services",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Utah Department of Workforce Services",
          description: "State employment services including job training and career assistance for all residents",
          address: "140 E 300 S, Salt Lake City, UT 84111",
          phone: "(801) 526-9675",
          website: "https://jobs.utah.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Utah Housing Corporation",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "2479 S Lake Park Blvd, West Valley City, UT 84120",
          phone: "(801) 902-8200",
          website: "https://www.utahhousingcorp.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Vermont": {
      veteranResources: [
        {
          name: "White River Junction VA Medical Center",
          description: "VA healthcare services in Vermont",
          address: "215 North Main Street, White River Junction, VT 05009",
          phone: "(802) 295-9363",
          website: "https://www.whiteriver.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Vermont Department of Mental Health",
          description: "State mental health services for all Vermont residents",
          address: "280 State Drive, Waterbury, VT 05671",
          phone: "(802) 241-0090",
          website: "https://mentalhealth.vermont.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Vermont Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://mentalhealth.vermont.gov/services/crisis-services",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Vermont Department of Labor - Career Resource Centers",
          description: "State employment services including job training and career assistance for all residents",
          address: "5 Green Mountain Drive, Montpelier, VT 05601",
          phone: "(802) 828-4000",
          website: "https://labor.vermont.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Vermont State Housing Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "164 State Street, Montpelier, VT 05602",
          phone: "(802) 828-3295",
          website: "https://www.vsha.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Virginia": {
      veteranResources: [
        {
          name: "Richmond VA Medical Center",
          description: "Comprehensive healthcare including addiction care, mental health services, primary and specialty care, and hospice support",
          address: "1201 Broad Rock Boulevard, Richmond, VA 23249",
          phone: "(804) 675-5000",
          website: "https://www.va.gov/richmond-health-care/",
          category: "VA"
        ,
          targetAudience: "veteran"
        },
        {
          name: "HUD-Veterans Affairs Supportive Housing (HUD-VASH)",
          description: "Combines HUD rental assistance with VA case management and clinical services for homeless veterans",
          address: "Statewide service",
          phone: "(877) 424-3838",
          website: "https://www.va.gov/homeless/hud-vash.asp",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Supportive Services for Veteran Families (SSVF)",
          description: "Provides rental assistance, utility payments, security deposits, and moving costs for very low-income veteran families",
          address: "Statewide service",
          phone: "(877) 424-3838",
          website: "https://www.va.gov/homeless/ssvf/",
          category: "Housing"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Virginia Department of Veterans Services (DVS)",
          description: "Assistance with VA claims and benefits, education and employment resources, and behavioral health services",
          address: "101 N. 14th Street, 17th Floor, Richmond, VA 23219",
          phone: "(804) 786-0286",
          website: "https://www.dvs.virginia.gov/",
          category: "Employment"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Virginia Disabled American Veterans (DAV)",
          description: "Housing assistance, employment services, medical assistance, and transportation support for veterans",
          address: "Statewide service",
          phone: "(804) 917-3650",
          website: "https://dav.org/veterans/find-your-local-office/",
          category: "Crisis"
        ,
          targetAudience: "veteran"
        },
        {
          name: "Virginia Beach Community Development Corporation",
          description: "Housing assistance and support services for veterans and their families",
          address: "2400 Potters Road, Virginia Beach, VA 23454",
          phone: "(757) 463-9516",
          website: "https://www.vbcdc.org",
          category: "Housing"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Virginia Department of Behavioral Health and Developmental Services",
          description: "State mental health and substance abuse services for all Virginia residents",
          address: "1220 Bank Street, Richmond, VA 23219",
          phone: "(804) 786-3921",
          website: "https://dbhds.virginia.gov/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Virginia Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://dbhds.virginia.gov/clinical-administrative-services/office-of-licensing/crisis-services/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Virginia Employment Commission - Virginia Career Works",
          description: "State employment services including job training and career assistance for all residents",
          address: "703 E Main Street, Richmond, VA 23219",
          phone: "(866) 832-2363",
          website: "https://www.vec.virginia.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Virginia Housing Development Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "601 S Belvidere Street, Richmond, VA 23220",
          phone: "(804) 343-5540",
          website: "https://www.vhda.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Washington": {
      veteranResources: [
        {
          name: "VA Puget Sound Health Care System",
          description: "VA healthcare services in Washington",
          address: "1660 South Columbian Way, Seattle, WA 98108",
          phone: "(206) 762-1010",
          website: "https://www.pugetsound.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Washington State Department of Health - Behavioral Health",
          description: "State mental health and substance abuse services for all Washington residents",
          address: "1011 Plum Street SE, Olympia, WA 98504",
          phone: "(360) 236-4200",
          website: "https://www.doh.wa.gov/YouandYourFamily/MentalHealthandBehavioralHealth",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Washington Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.doh.wa.gov/YouandYourFamily/MentalHealthandBehavioralHealth/SuicidePrevention",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Washington State Employment Security Department - WorkSource",
          description: "State employment services including job training and career assistance for all residents",
          address: "212 Maple Park Ave SE, Olympia, WA 98504",
          phone: "(360) 902-9500",
          website: "https://esd.wa.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Washington State Housing Finance Commission",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "1000 2nd Avenue, Seattle, WA 98104",
          phone: "(206) 464-7139",
          website: "https://www.wshfc.org/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "West Virginia": {
      veteranResources: [
        {
          name: "Huntington VA Medical Center",
          description: "VA healthcare services in West Virginia",
          address: "1540 Spring Valley Drive, Huntington, WV 25704",
          phone: "(304) 429-6741",
          website: "https://www.huntington.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "West Virginia Department of Health and Human Resources - Bureau for Behavioral Health",
          description: "State mental health and substance abuse services for all West Virginia residents",
          address: "350 Capitol Street, Charleston, WV 25301",
          phone: "(304) 356-4811",
          website: "https://dhhr.wv.gov/BBH/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "West Virginia Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://dhhr.wv.gov/BBH/Pages/Crisis-Services.aspx",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "WorkForce West Virginia",
          description: "State employment services including job training and career assistance for all residents",
          address: "112 California Avenue, Charleston, WV 25305",
          phone: "(304) 558-7024",
          website: "https://www.workforcewv.org/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "West Virginia Housing Development Fund",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "814 Virginia Street E, Charleston, WV 25301",
          phone: "(304) 345-6475",
          website: "https://www.wvhdf.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Wisconsin": {
      veteranResources: [
        {
          name: "William S. Middleton Memorial Veterans Hospital",
          description: "VA healthcare services in Wisconsin",
          address: "2500 Overlook Terrace, Madison, WI 53705",
          phone: "(608) 256-1901",
          website: "https://www.madison.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Wisconsin Department of Health Services - Division of Mental Health and Substance Abuse Services",
          description: "State mental health and substance abuse services for all Wisconsin residents",
          address: "1 W Wilson Street, Madison, WI 53703",
          phone: "(608) 266-2717",
          website: "https://www.dhs.wisconsin.gov/mh/index.htm",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Wisconsin Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://www.dhs.wisconsin.gov/mh/crisis.htm",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Wisconsin Department of Workforce Development - Job Centers",
          description: "State employment services including job training and career assistance for all residents",
          address: "201 E Washington Avenue, Madison, WI 53703",
          phone: "(608) 266-3131",
          website: "https://dwd.wisconsin.gov/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Wisconsin Housing and Economic Development Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "201 W Washington Avenue, Madison, WI 53703",
          phone: "(608) 266-7884",
          website: "https://www.wheda.com/",
          category: "Housing",
          targetAudience: "public"
        }
      ]
    },
    "Wyoming": {
      veteranResources: [
        {
          name: "Cheyenne VA Medical Center",
          description: "VA healthcare services in Wyoming",
          address: "2360 East Pershing Boulevard, Cheyenne, WY 82001",
          phone: "(307) 778-7550",
          website: "https://www.cheyenne.va.gov/",
          category: "VA"
        ,
          targetAudience: "veteran"
        }
      ],
      publicResources: [
        {
          name: "Wyoming Department of Health - Behavioral Health Division",
          description: "State mental health and substance abuse services for all Wyoming residents",
          address: "6101 Yellowstone Road, Cheyenne, WY 82002",
          phone: "(307) 777-7656",
          website: "https://health.wyo.gov/behavioralhealth/",
          category: "Treatment",
          targetAudience: "public"
        },
        {
          name: "Wyoming Crisis Line",
          description: "24/7 statewide crisis support and suicide prevention services",
          address: "Statewide Service",
          phone: "1-800-273-8255",
          website: "https://health.wyo.gov/behavioralhealth/crisis-services/",
          category: "Crisis",
          targetAudience: "public"
        },
        {
          name: "Wyoming Department of Workforce Services",
          description: "State employment services including job training and career assistance for all residents",
          address: "5221 Yellowstone Road, Cheyenne, WY 82009",
          phone: "(307) 777-8728",
          website: "https://www.wyomingworkforce.org/",
          category: "Employment",
          targetAudience: "public"
        },
        {
          name: "Wyoming Community Development Authority",
          description: "State housing assistance programs including affordable housing and homebuyer assistance",
          address: "155 N Beech Street, Casper, WY 82601",
          phone: "(307) 265-0603",
          website: "https://www.wyomingcda.com/",
          category: "Housing",
          targetAudience: "public"
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
  const getFilteredResources = () => {
    if (isInternational && selectedCountry && countryData[selectedCountry]) {
      const countryResources = countryData[selectedCountry];
      const allResources = [...countryResources.veteranResources, ...countryResources.publicResources];
      return allResources.filter(resource => category === "all" || resource.category === category);
    } else if (!isInternational && selectedState && stateData[selectedState]) {
      const stateResources = stateData[selectedState];
      const allResources = [...stateResources.veteranResources, ...stateResources.publicResources];
      return allResources.filter(resource => category === "all" || resource.category === category);
    }
    return [];
  };

  const filteredResources = getFilteredResources();

  return (
    <MainLayout>
      <PageHeader
        title="Public Support Resources"
        description="Access mental health and support services in your area and beyond. Select your state, enter your ZIP code, or explore international options to find public and additional resources tailored to your needs."
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

          {/* Public Resources Section - APPEARS FIRST */}
          {((isInternational && selectedCountry && countryData[selectedCountry]?.publicResources?.filter(r => category === "all" || r.category === category).length > 0) ||
            (!isInternational && selectedState && stateData[selectedState]?.publicResources?.filter(r => category === "all" || r.category === category).length > 0)) && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-green-600 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                General Public Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {(isInternational ? 
                  countryData[selectedCountry]?.publicResources?.filter(r => category === "all" || r.category === category) || [] :
                  stateData[selectedState]?.publicResources?.filter(r => category === "all" || r.category === category) || []
                ).map((resource, index) => (
                  <Card key={`public-${index}`} className="shadow-md overflow-hidden border-l-4 border-l-green-500">
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
                            <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                              {resource.category} • General Public
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2 px-4 sm:px-6">
                      <CardDescription className="mb-4 text-sm sm:text-base">{resource.description}</CardDescription>
                      {resource.address && (
                        <div className="flex items-start gap-2 text-xs sm:text-sm mb-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                          <span className="break-words">{resource.address}</span>
                        </div>
                      )}
                      {resource.phone && (
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{resource.phone}</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between gap-3 px-4 sm:px-6">
                      <Button 
                        variant="outline"
                        className="w-full sm:w-auto justify-center text-green-600 border-green-600/30 hover:bg-green-600/10"
                        onClick={() => {
                          if (isInternational) {
                            trackStateResourceClick({
                              state: selectedCountry,
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
                            window.open(
                              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address || '')}`,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                        >
                          Get Directions
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Veteran Resources Section - APPEARS SECOND */}
          {((isInternational && selectedCountry && countryData[selectedCountry]?.veteranResources.filter(r => category === "all" || r.category === category).length > 0) ||
            (!isInternational && selectedState && stateData[selectedState]?.veteranResources?.filter(r => category === "all" || r.category === category).length > 0)) && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-[#3e64dd] flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Veteran-Specific Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {(isInternational ? 
                  countryData[selectedCountry]?.veteranResources?.filter(r => category === "all" || r.category === category) || [] :
                  stateData[selectedState]?.veteranResources?.filter(r => category === "all" || r.category === category) || []
                ).map((resource, index) => (
                  <Card key={`veteran-${index}`} className="shadow-md overflow-hidden border-l-4 border-l-[#3e64dd]">
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
                            <span className="inline-flex items-center rounded-full bg-[#3e64dd]/10 px-2 py-1 text-xs font-medium text-[#3e64dd]">
                              {resource.category} • Veteran-Specific
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
                          if (isInternational) {
                            trackStateResourceClick({
                              state: selectedCountry,
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
                            window.open(
                              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address || '')}`,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                        >
                          Get Directions
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* No Resources Found */}
          {((isInternational && selectedCountry && 
             (!countryData[selectedCountry]?.veteranResources?.filter(r => category === "all" || r.category === category).length &&
              !countryData[selectedCountry]?.publicResources?.filter(r => category === "all" || r.category === category).length)) ||
            (!isInternational && selectedState && 
             (!stateData[selectedState]?.veteranResources?.filter(r => category === "all" || r.category === category).length &&
              !stateData[selectedState]?.publicResources?.filter(r => category === "all" || r.category === category).length))) && (
            <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
              <p className="text-base sm:text-lg text-gray-600">No resources found with the selected filters.</p>
              <p className="mt-2 text-sm sm:text-base">Try changing your search criteria or <Link href="/resources" className="text-[#3e64dd] hover:underline">browse all resources</Link>.</p>
            </div>
          )}
        </div>
      )}

      {!selectedState && !selectedCountry && (
        <div className="bg-gray-50 rounded-lg p-4 sm:p-8 text-center">
          {isInternational ? (
            <>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Select a country to view international resources</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Find resources for U.S. veterans living overseas and general public resources in these countries.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-h-[60vh] overflow-y-auto p-1">
                {Object.entries(countryData).map(([country]) => (
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Select a state below to view available veteran-specific and general public resources.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-h-[60vh] overflow-y-auto p-1">
                {Object.entries(stateData).map(([state]) => (
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

      {/* Floating help button removed since emergency numbers are location-dependent */}
    </MainLayout>
  );
}