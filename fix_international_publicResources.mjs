#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'client/src/pages/ResourceLocator.tsx';
let content = readFileSync(filePath, 'utf8');

// International countries that need publicResources arrays added
const countriesToFix = [
  {
    name: 'United Kingdom',
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
  {
    name: 'Italy',
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
  {
    name: 'Thailand',
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
  {
    name: 'Vietnam',
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
  {
    name: 'Australia',
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
  {
    name: 'New Zealand',
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
  {
    name: 'France',
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
  {
    name: 'Portugal',
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
  {
    name: 'Israel',
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
  {
    name: 'United Arab Emirates',
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
  }
];

// Function to add publicResources to a country
function addPublicResources(countryName, publicResources) {
  // Find the country section
  const countryPattern = new RegExp(`(\\s*"${countryName}":\\s*\\{[\\s\\S]*?veteranResources:\\s*\\[[\\s\\S]*?\\])(\\s*\\})`, 'g');
  
  const publicResourcesStr = publicResources.map(resource => {
    return `        {
          name: "${resource.name}",
          description: "${resource.description}",
          address: "${resource.address}",
          phone: "${resource.phone}",
          website: "${resource.website}",
          category: "${resource.category}",
          targetAudience: "${resource.targetAudience}"
        }`;
  }).join(',\n');

  const replacement = `$1,
      publicResources: [
${publicResourcesStr}
      ]$2`;
  
  content = content.replace(countryPattern, replacement);
}

// Add publicResources to all countries that need them
countriesToFix.forEach(country => {
  console.log(`Adding publicResources to ${country.name}...`);
  addPublicResources(country.name, country.publicResources);
});

// Write the updated content back to the file
writeFileSync(filePath, content);
console.log(`Fixed ${countriesToFix.length} countries with publicResources arrays.`);