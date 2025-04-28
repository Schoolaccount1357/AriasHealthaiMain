// Script to check all resource links
import fs from 'fs';
import https from 'https';
import http from 'http';

// Extract stateData from ResourceLocator.tsx
const extractStateData = () => {
  const content = fs.readFileSync('./client/src/pages/ResourceLocator.tsx', 'utf8');
  // Find the beginning of stateData object
  const stateDataStart = content.indexOf('const stateData: StateData = {');
  if (stateDataStart === -1) {
    throw new Error('Could not find stateData in ResourceLocator.tsx');
  }
  
  // Find the end of stateData object (the closing brace followed by semicolon)
  let braceCount = 0;
  let stateDataEnd = stateDataStart;
  let foundOpeningBrace = false;
  
  for (let i = stateDataStart; i < content.length; i++) {
    if (content[i] === '{') {
      braceCount++;
      foundOpeningBrace = true;
    } else if (content[i] === '}') {
      braceCount--;
      if (foundOpeningBrace && braceCount === 0) {
        stateDataEnd = i + 1;
        break;
      }
    }
  }
  
  // Extract the URLs only
  const stateDataSection = content.substring(stateDataStart, stateDataEnd);
  const urlRegex = /website:\s*"([^"]+)"/g;
  const nameRegex = /name:\s*"([^"]+)"/g;
  const stateRegex = /"([^"]+)":\s*{/g;
  
  const urls = [];
  let currentState = '';
  let lines = stateDataSection.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const stateLine = lines[i].match(stateRegex);
    if (stateLine) {
      currentState = stateLine[0].match(/"([^"]+)"/)[1];
    }
    
    const nameLine = lines[i].match(nameRegex);
    if (nameLine) {
      const name = nameLine[0].match(/"([^"]+)"/)[1];
      
      // Look for the website in the next few lines
      for (let j = i; j < i + 10 && j < lines.length; j++) {
        const websiteLine = lines[j].match(urlRegex);
        if (websiteLine) {
          const url = websiteLine[0].match(/"([^"]+)"/)[1];
          urls.push({ state: currentState, resourceName: name, url });
          break;
        }
      }
    }
  }
  
  return urls;
};

const checkUrl = (url) => {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
      resolve({ url, status: res.statusCode });
    });
    
    req.on('error', (err) => {
      resolve({ url, status: 'error', error: err.message });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, status: 'timeout' });
    });
    
    req.end();
  });
};

const main = async () => {
  const brokenLinks = [];
  
  // Extract all URLs from ResourceLocator.tsx
  const urls = extractStateData();
  
  console.log(`Checking ${urls.length} URLs...`);
  
  for (const { state, resourceName, url } of urls) {
    try {
      const result = await checkUrl(url);
      if (result.status !== 200) {
        brokenLinks.push({ state, resourceName, url, status: result.status });
        console.log(`Broken link (${result.status}): ${state} - ${resourceName} - ${url}`);
      }
    } catch (error) {
      brokenLinks.push({ state, resourceName, url, status: 'error', error: error.message });
      console.log(`Error checking: ${state} - ${resourceName} - ${url}: ${error.message}`);
    }
  }
  
  console.log('\n--- Summary ---');
  console.log(`Total links checked: ${urls.length}`);
  console.log(`Broken links found: ${brokenLinks.length}`);
  
  if (brokenLinks.length > 0) {
    console.log('\nBroken links:');
    brokenLinks.forEach(link => {
      console.log(`${link.state} - ${link.resourceName}: ${link.url} (${link.status})`);
    });
  }
};

main().catch(console.error);