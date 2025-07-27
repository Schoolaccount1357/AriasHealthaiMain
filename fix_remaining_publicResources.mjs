#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'client/src/pages/ResourceLocator.tsx';
let content = readFileSync(filePath, 'utf8');

// States that need publicResources arrays added
const statesToFix = [
  {
    name: 'Florida',
    publicResources: [
      {
        name: "Florida Department of Children and Families - Mental Health",
        description: "State mental health and substance abuse services for all Florida residents",
        address: "1317 Winewood Blvd, Tallahassee, FL 32399",
        phone: "(850) 487-1111",
        website: "https://www.myflfamilies.com/services/mental-health/",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "Florida Crisis Line",
        description: "24/7 statewide crisis support and suicide prevention services",
        address: "Statewide Service",
        phone: "1-800-273-8255",
        website: "https://www.myflfamilies.com/services/mental-health/crisis-services/",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "CareerSource Florida",
        description: "State employment services including job training and career assistance for all residents",
        address: "107 E Madison St, Tallahassee, FL 32399",
        phone: "(850) 245-7105",
        website: "https://careersourceflorida.com/",
        category: "Employment",
        targetAudience: "public"
      },
      {
        name: "Florida Housing Finance Corporation",
        description: "State housing assistance programs including affordable housing and homebuyer assistance",
        address: "227 N Bronough Street, Tallahassee, FL 32301",
        phone: "(850) 488-4197",
        website: "https://www.floridahousing.org/",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  },
  {
    name: 'Hawaii',
    publicResources: [
      {
        name: "Hawaii Department of Health - Adult Mental Health Division",
        description: "State mental health services for all Hawaii residents",
        address: "1250 Punchbowl Street, Honolulu, HI 96813",
        phone: "(808) 586-4686",
        website: "https://health.hawaii.gov/amhd/",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "Hawaii Crisis Line",
        description: "24/7 statewide crisis support and suicide prevention services",
        address: "Statewide Service",
        phone: "1-800-273-8255",
        website: "https://health.hawaii.gov/amhd/crisis-services/",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "Hawaii Department of Labor - American Job Centers",
        description: "State employment services including job training and career assistance for all residents",
        address: "830 Punchbowl Street, Honolulu, HI 96813",
        phone: "(808) 586-8700",
        website: "https://labor.hawaii.gov/",
        category: "Employment",
        targetAudience: "public"
      },
      {
        name: "Hawaii Housing Finance and Development Corporation",
        description: "State housing assistance programs including affordable housing and homebuyer assistance",
        address: "677 Queen Street, Honolulu, HI 96813",
        phone: "(808) 587-0597",
        website: "https://dbedt.hawaii.gov/hhfdc/",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  },
  {
    name: 'Idaho',
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
        name: "Idaho Crisis Line",
        description: "24/7 statewide crisis support and suicide prevention services",
        address: "Statewide Service",
        phone: "1-800-273-8255",
        website: "https://healthandwelfare.idaho.gov/services-programs/behavioral-health/crisis-services",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "Idaho Department of Labor",
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
        phone: "(208) 331-4882",
        website: "https://www.idahohousing.com/",
        category: "Housing",
        targetAudience: "public"
      }
    ]
  },
  {
    name: 'Illinois',
    publicResources: [
      {
        name: "Illinois Department of Human Services - Mental Health",
        description: "State mental health and substance abuse services for all Illinois residents",
        address: "401 S Clinton Street, Chicago, IL 60607",
        phone: "(312) 814-2908",
        website: "https://www.dhs.state.il.us/page.aspx?item=29729",
        category: "Treatment",
        targetAudience: "public"
      },
      {
        name: "Illinois Crisis Line",
        description: "24/7 statewide crisis support and suicide prevention services",
        address: "Statewide Service",
        phone: "1-800-273-8255",
        website: "https://www.dhs.state.il.us/page.aspx?item=51693",
        category: "Crisis",
        targetAudience: "public"
      },
      {
        name: "Illinois Department of Commerce - WorkNet Centers",
        description: "State employment services including job training and career assistance for all residents",
        address: "100 W Randolph Street, Chicago, IL 60601",
        phone: "(312) 814-7179",
        website: "https://www2.illinois.gov/dceo/WorkforceDevelopment/",
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
  }
];

// Function to add publicResources to a state
function addPublicResources(stateName, publicResources) {
  // Find the state section
  const statePattern = new RegExp(`(\\s*"${stateName}":\\s*\\{[\\s\\S]*?veteranResources:\\s*\\[[\\s\\S]*?\\])(\\s*\\})`, 'g');
  
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
  
  content = content.replace(statePattern, replacement);
}

// Add publicResources to all states that need them
statesToFix.forEach(state => {
  console.log(`Adding publicResources to ${state.name}...`);
  addPublicResources(state.name, state.publicResources);
});

// Write the updated content back to the file
writeFileSync(filePath, content);
console.log(`Fixed ${statesToFix.length} states with publicResources arrays.`);