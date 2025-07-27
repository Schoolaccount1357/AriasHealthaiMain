#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'client/src/pages/ResourceLocator.tsx';
let content = readFileSync(filePath, 'utf8');

// Fix all veteran resources that are missing targetAudience property
console.log('Adding targetAudience: "veteran" to all veteran resources...');

// Pattern to match veteran resources without targetAudience
const veteranResourcePattern = /(\{[^}]*name:\s*"[^"]*"[^}]*category:\s*"[^"]*"[^}]*)\}/g;

let veteranFixCount = 0;
content = content.replace(/veteranResources:\s*\[[^\]]*\]/gs, (match) => {
  return match.replace(veteranResourcePattern, (resourceMatch) => {
    if (!resourceMatch.includes('targetAudience')) {
      veteranFixCount++;
      // Insert targetAudience before the closing brace
      return resourceMatch.slice(0, -1) + ',\n          targetAudience: "veteran"\n        }';
    }
    return resourceMatch;
  });
});

console.log(`Fixed ${veteranFixCount} veteran resources.`);

// Fix any remaining resources that are clearly veteran resources but don't have targetAudience
const additionalVeteranPatterns = [
  /(\{[^}]*"VA"[^}]*)\}/g,
  /(\{[^}]*"Veterans"[^}]*)\}/g,
  /(\{[^}]*"Veteran"[^}]*)\}/g,
  /(\{[^}]*"Vet Center"[^}]*)\}/g
];

let additionalFixCount = 0;
additionalVeteranPatterns.forEach(pattern => {
  content = content.replace(pattern, (match) => {
    if (!match.includes('targetAudience') && !match.includes('publicResources')) {
      additionalFixCount++;
      return match.slice(0, -1) + ',\n          targetAudience: "veteran"\n        }';
    }
    return match;
  });
});

console.log(`Fixed ${additionalFixCount} additional veteran resources.`);

// Remove any duplicate publicResources entries that may have been created
console.log('Removing any duplicate publicResources entries...');

const duplicatePublicResourcesPattern = /publicResources:\s*\[[^\]]*\],?\s*publicResources:\s*\[[^\]]*\]/gs;
let duplicateCount = 0;

content = content.replace(duplicatePublicResourcesPattern, (match) => {
  duplicateCount++;
  // Keep only the first publicResources array
  const firstMatch = match.match(/publicResources:\s*\[[^\]]*\]/s);
  return firstMatch ? firstMatch[0] : match;
});

console.log(`Removed ${duplicateCount} duplicate publicResources entries.`);

// Write the updated content back to the file
writeFileSync(filePath, content);
console.log('Successfully fixed all targetAudience properties and removed duplicates.');