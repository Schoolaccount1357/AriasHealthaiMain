#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'client/src/pages/ResourceLocator.tsx';
let content = readFileSync(filePath, 'utf8');

// Final countries that need publicResources arrays added
const finalCountriesToFix = [
  {
    name: 'Germany',
    publicResources: [
      {
        name: "Bundesgesundheitsministerium - Mental Health Services",
        description: "Federal mental health services and crisis support for German residents",
        address: "Friedrichstraße 108, 10117 Berlin",
        phone: "030 18441-0",
        website: "https://www.bundesgesundheitsministerium.de/",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "Telefonseelsorge Deutschland",
        description: "24/7 crisis support and counseling services nationwide",
        address: "Nationwide Service",
        phone: "0800 111 0 111",
        website: "https://www.telefonseelsorge.de/",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "Bundesagentur für Arbeit",
        description: "Federal employment agency providing job placement and career services",
        address: "Available at job centers nationwide",
        phone: "0800 4 5555 00",
        website: "https://www.arbeitsagentur.de/",
        category: "Employment",
        targetAudience: "public"
      },
      {
        name: "Bundesministerium für Wohnen - Housing Programs",
        description: "Federal housing assistance and affordable housing programs",
        address: "Krausenstraße 17/18, 10117 Berlin",
        phone: "030 18401-0",
        website: "https://www.bmwsb.bund.de/",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  },
  {
    name: 'Japan',
    publicResources: [
      {
        name: "Ministry of Health - Mental Health Services",
        description: "National mental health services and crisis support for Japanese residents",
        address: "1-2-2 Kasumigaseki, Chiyoda-ku, Tokyo",
        phone: "03-5253-1111",
        website: "https://www.mhlw.go.jp/",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "Japan Suicide Prevention Association",
        description: "24/7 crisis support and suicide prevention services",
        address: "Nationwide Service",
        phone: "#9999",
        website: "https://www.jspa.or.jp/",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "Hello Work - Public Employment Security Office",
        description: "Government employment services and job placement assistance",
        address: "Available at Hello Work offices nationwide",
        phone: "Contact local office",
        website: "https://www.hellowork.mhlw.go.jp/",
        category: "Employment",
        targetAudience: "public"
      },
      {
        name: "Japan Housing Finance Agency",
        description: "Government housing finance and assistance programs",
        address: "4-3-13 Toranomon, Minato-ku, Tokyo",
        phone: "050-3389-8000",
        website: "https://www.jhf.go.jp/",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  },
  {
    name: 'South Korea',
    publicResources: [
      {
        name: "Ministry of Health and Welfare - Mental Health",
        description: "National mental health services for Korean residents",
        address: "13 Doum 4-ro, Sejong City",
        phone: "044-202-2114",
        website: "https://www.mohw.go.kr/",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "Korea Suicide Prevention Center",
        description: "24/7 crisis support and suicide prevention hotline",
        address: "Nationwide Service",
        phone: "1577-0199",
        website: "https://www.spckorea.or.kr/",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "Korea Employment Information Service",
        description: "Government employment services and job search assistance",
        address: "Available at employment centers nationwide",
        phone: "1588-1919",
        website: "https://www.keis.or.kr/",
        category: "Employment",
        targetAudience: "public"
      },
      {
        name: "Korea Land and Housing Corporation",
        description: "National housing development and assistance programs",
        address: "267 Dongtanbanseong-daero, Hwaseong-si, Gyeonggi-do",
        phone: "1600-1004",
        website: "https://www.lh.or.kr/",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  },
  {
    name: 'Canada',
    publicResources: [
      {
        name: "Mental Health Commission of Canada",
        description: "National mental health services and resources for all Canadians",
        address: "350 Albert Street, Ottawa, ON K1R 1A4",
        phone: "613-683-3755",
        website: "https://mentalhealthcommission.ca/",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "Canada Suicide Prevention Service",
        description: "24/7 crisis support and suicide prevention services nationwide",
        address: "Nationwide Service",
        phone: "1-833-456-4566",
        website: "https://www.crisisservicescanada.ca/",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "Service Canada - Employment Services",
        description: "Federal employment services and job search assistance",
        address: "Available at Service Canada centers nationwide",
        phone: "1-800-622-6232",
        website: "https://www.canada.ca/en/employment-social-development.html",
        category: "Employment",
        targetAudience: "public"
      },
      {
        name: "Canada Mortgage and Housing Corporation",
        description: "National housing programs and affordable housing assistance",
        address: "700 Montreal Road, Ottawa, ON K1A 0P7",
        phone: "1-800-668-2642",
        website: "https://www.cmhc-schl.gc.ca/",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  },
  {
    name: 'Spain',
    publicResources: [
      {
        name: "Ministerio de Sanidad - Salud Mental",
        description: "National health ministry mental health services for Spanish residents",
        address: "Paseo del Prado 18-20, 28014 Madrid",
        phone: "901 400 100",
        website: "https://www.sanidad.gob.es/",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "Teléfono de la Esperanza",
        description: "24/7 crisis support and emotional assistance hotline",
        address: "Nationwide Service",
        phone: "717 003 717",
        website: "https://www.telefonodelaesperanza.org/",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "Servicio Público de Empleo Estatal",
        description: "National employment service providing job placement and training",
        address: "Available at employment offices nationwide",
        phone: "901 119 999",
        website: "https://www.sepe.es/",
        category: "Employment",
        targetAudience: "public"
      },
      {
        name: "Ministerio de Vivienda - Housing Programs",
        description: "National housing ministry programs and assistance",
        address: "Paseo de la Castellana 67, 28046 Madrid",
        phone: "91 379 82 00",
        website: "https://www.transportes.gob.es/vivienda",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  },
  {
    name: 'Netherlands',
    publicResources: [
      {
        name: "GGZ Nederland - Mental Health Care",
        description: "National mental health care services for Dutch residents",
        address: "Available through local GGZ centers",
        phone: "088 358 2000",
        website: "https://www.ggznederland.nl/",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "113 Suicide Prevention",
        description: "24/7 crisis support and suicide prevention services",
        address: "Nationwide Service",
        phone: "113",
        website: "https://www.113.nl/",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "UWV - Employee Insurance Agency",
        description: "Government employment and social security services",
        address: "Available at UWV offices nationwide",
        phone: "0800 - 9292",
        website: "https://www.uwv.nl/",
        category: "Employment",
        targetAudience: "public"
      },
      {
        name: "Wonen Nederland - Housing Association",
        description: "National housing assistance and affordable housing programs",
        address: "Available through local housing associations",
        phone: "Contact local association",
        website: "https://www.wonennederland.nl/",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  }
];

// Function to add publicResources to a country
function addPublicResources(countryName, publicResources) {
  // Find the country section - more specific pattern to avoid duplicates
  const countryPattern = new RegExp(`(\\s*"${countryName}":\\s*\\{[\\s\\S]*?veteranResources:\\s*\\[[\\s\\S]*?\\])(\\s*\\}\\s*,?\\s*$)`, 'm');
  
  if (!countryPattern.test(content)) {
    console.log(`Could not find pattern for ${countryName}`);
    return;
  }
  
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
  console.log(`Successfully added publicResources to ${countryName}`);
}

// Add publicResources to all countries that need them
finalCountriesToFix.forEach(country => {
  console.log(`Processing ${country.name}...`);
  addPublicResources(country.name, country.publicResources);
});

// Write the updated content back to the file
writeFileSync(filePath, content);
console.log(`Fixed ${finalCountriesToFix.length} final countries with publicResources arrays.`);