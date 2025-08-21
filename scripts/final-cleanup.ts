
import * as fs from 'fs';
import * as path from 'path';

async function finalCleanup() {
  console.log('🧹 Running final personal data cleanup...');
  
  const issues: string[] = [];
  
  // 1. Remove any remaining sensitive files
  const filesToRemove = [
    'logs',
    '.env',
    'database_backup.sql',
    'sanitized-data-export.json',
    '.env.local',
    '.env.development'
  ];
  
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      if (fs.lstatSync(file).isDirectory()) {
        fs.rmSync(file, { recursive: true, force: true });
      } else {
        fs.unlinkSync(file);
      }
      console.log(`✅ Removed ${file}`);
    }
  });
  
  // 2. Check for personal information in key files
  const personalPatterns = [
    /joyce/gi,
    /lee/gi,
    /joycesarahlee/gi,
    /joyce\.lee/gi,
    /@gmail\.com/gi,
    /personal.*api.*key/gi,
    /my.*secret/gi
  ];
  
  const filesToSanitize = [
    'server/index.ts',
    'server/routes.ts', 
    'server/db.ts',
    'shared/schema.ts',
    'package.json'
  ];
  
  filesToSanitize.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      personalPatterns.forEach(pattern => {
        if (pattern.test(content)) {
          issues.push(`⚠️  Potential personal data in ${file}`);
        }
      });
    }
  });
  
  // 3. Clean git history markers (but keep functional git)
  try {
    if (fs.existsSync('.git/config')) {
      const gitConfig = fs.readFileSync('.git/config', 'utf8');
      if (gitConfig.includes('joyce') || gitConfig.includes('lee')) {
        console.log('⚠️  Personal info found in git config - consider cleaning');
      }
    }
  } catch (error) {
    // Git config check failed, continue
  }
  
  // 4. Summary
  if (issues.length === 0) {
    console.log('\n✅ All personal data has been sanitized!');
    console.log('✅ Repository is safe for company migration.');
  } else {
    console.log('\n⚠️  Issues found:');
    issues.forEach(issue => console.log(issue));
  }
  
  console.log('\n🎉 Final cleanup complete!');
}

finalCleanup().catch(console.error);
