
import { db } from "../server/db";
import { veterans, users, waitlist, securityLogs, visitorActivityLog } from "@shared/schema";
import * as fs from 'fs';

async function exportSanitizedData() {
  try {
    // Export veterans data with PII removed
    const veteransData = await db.select({
      id: veterans.id,
      status: veterans.status,
      createdAt: veterans.createdAt,
      // Remove: firstName, lastName, email, phone, ssn, address
    }).from(veterans);

    // Export basic usage stats without PII
    const resourceStats = await db.select().from(resourceUsage);
    const navStats = await db.select().from(navUsage);
    
    // Security logs without IP addresses and user agents
    const sanitizedSecurityLogs = await db.select({
      id: securityLogs.id,
      eventType: securityLogs.eventType,
      severity: securityLogs.severity,
      timestamp: securityLogs.timestamp,
      countryCode: securityLogs.countryCode,
      // Remove: ipAddress, userAgent, sessionId
    }).from(securityLogs);

    const exportData = {
      veterans: veteransData,
      resourceStats,
      navStats,
      securityLogs: sanitizedSecurityLogs,
      exportedAt: new Date().toISOString()
    };

    fs.writeFileSync('sanitized-data-export.json', JSON.stringify(exportData, null, 2));
    console.log('✅ Sanitized data exported to sanitized-data-export.json');
    
  } catch (error) {
    console.error('❌ Export failed:', error);
  }
}

exportSanitizedData();
