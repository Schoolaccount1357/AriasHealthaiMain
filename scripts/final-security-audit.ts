
import * as fs from 'fs';
import * as path from 'path';

async function finalSecurityAudit() {
  console.log('🔍 Running final security audit...');
  
  const issues: string[] = [];
  const warnings: string[] = [];
  
  // 1. Check for sensitive files
  const sensitiveFiles = [
    'logs',
    '.env',
    'database_backup.sql',
    'sanitized-data-export.json'
  ];
  
  sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
      issues.push(`❌ Sensitive file still exists: ${file}`);
    }
  });
  
  // 2. Check security middleware for personal data
  const securityFile = 'server/middleware/security.ts';
  if (fs.existsSync(securityFile)) {
    const content = fs.readFileSync(securityFile, 'utf8');
    if (content.includes('getClientIp') || content.includes('ipAddress') || content.includes('req.ip')) {
      warnings.push(`⚠️  Security middleware contains IP tracking code`);
    }
    if (content.includes('userAgent') || content.includes('sessionId') || content.includes('user-agent')) {
      warnings.push(`⚠️  Security middleware contains user tracking data`);
    }
    if (content.includes('personal') || content.includes('private') || content.includes('Joyce') || content.includes('Lee')) {
      issues.push(`❌ Personal information found in security middleware`);
    }
  }

  // 2a. Check for personal information in other files
  const filesToCheck = [
    'server/index.ts',
    'server/routes.ts',
    'server/storage.ts',
    'shared/schema.ts',
    'README.md'
  ];
  
  filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('Joyce') || content.includes('joycesarahlee') || content.includes('joyce.lee')) {
        issues.push(`❌ Personal name found in: ${file}`);
      }
    }
  });
  
  // 3. Check for hardcoded secrets
  const codeFiles = [
    'server/index.ts',
    'server/routes.ts', 
    'server/db.ts'
  ];
  
  codeFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('sk-') || content.includes('pk_') || content.includes('password')) {
        issues.push(`❌ Potential hardcoded secrets in: ${file}`);
      }
    }
  });
  
  // 4. Check .env files
  if (fs.existsSync('.env')) {
    issues.push(`❌ .env file exists - should be removed before sharing`);
  }
  
  // 5. Generate report
  console.log('\n📊 SECURITY AUDIT REPORT');
  console.log('========================');
  
  if (issues.length > 0) {
    console.log('\n🚨 CRITICAL ISSUES (must fix):');
    issues.forEach(issue => console.log(issue));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (consider reviewing):');
    warnings.forEach(warning => console.log(warning));
  }
  
  if (issues.length === 0 && warnings.length === 0) {
    console.log('\n✅ No critical security issues found!');
    console.log('✅ Repository appears safe for company migration.');
  } else {
    console.log(`\n📋 Summary: ${issues.length} critical issues, ${warnings.length} warnings`);
  }
  
  // 6. Create security summary
  const securitySummary = `# Security Audit Summary

## Audit Date: ${new Date().toISOString()}

### Critical Issues: ${issues.length}
${issues.map(issue => `- ${issue}`).join('\n')}

### Warnings: ${warnings.length}
${warnings.map(warning => `- ${warning}`).join('\n')}

### Recommendations:
1. Run sanitization scripts before sharing
2. Review security middleware for personal data
3. Ensure all environment variables are in .env.example only
4. Remove any remaining log files

### Company Migration Checklist:
- [ ] All personal API keys removed
- [ ] Security logs sanitized or removed
- [ ] IP tracking code replaced with placeholders
- [ ] Personal information removed from commit history
- [ ] Database contains no real user data
`;

  fs.writeFileSync('SECURITY-AUDIT-REPORT.md', securitySummary);
  console.log('\n📄 Security audit report saved to SECURITY-AUDIT-REPORT.md');
}

finalSecurityAudit().catch(console.error);
