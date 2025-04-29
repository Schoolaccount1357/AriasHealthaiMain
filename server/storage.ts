import { 
  veterans, type Veteran, type InsertVeteran, 
  users, type User, type InsertUser, 
  waitlist, type Waitlist, type InsertWaitlist, 
  resourceUsage, type ResourceUsage, type InsertResourceUsage, 
  stateResourceUsage, type StateResourceUsage, type InsertStateResourceUsage, 
  navUsage, type NavUsage, type InsertNavUsage,
  securityLogs, type SecurityLog, type InsertSecurityLog,
  visitorActivityLog, type VisitorActivityLog, type InsertVisitorActivityLog
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc, and, or, like } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Veteran form operations
  createVeteranForm(form: InsertVeteran): Promise<Veteran>;
  getVeteranForm(id: number): Promise<Veteran | undefined>;
  getVeteranFormByEmail(email: string): Promise<Veteran | undefined>;
  getAllVeteranForms(): Promise<Veteran[]>;
  updateVeteranFormStatus(id: number, status: string): Promise<Veteran | undefined>;
  
  // Waitlist operations
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  getWaitlistByEmail(email: string): Promise<Waitlist | undefined>;
  getAllWaitlistEntries(): Promise<Waitlist[]>;
  
  // Resource Usage operations
  logResourceUsage(data: InsertResourceUsage): Promise<ResourceUsage>;
  getResourceUsageStats(): Promise<{ resourceType: string; count: number }[]>;
  getResourceUsageByType(type: string): Promise<ResourceUsage[]>;
  
  // State Resource Usage operations
  logStateResourceUsage(data: InsertStateResourceUsage): Promise<StateResourceUsage>;
  getStateResourceUsageStats(): Promise<{ state: string; count: number }[]>;
  getStateResourceUsageByState(state: string): Promise<StateResourceUsage[]>;
  getStateResourceUsageByCategory(category: string): Promise<StateResourceUsage[]>;
  
  // Navigation Tracking operations
  logNavUsage(data: InsertNavUsage): Promise<NavUsage>;
  getNavUsageStats(): Promise<{ navType: string; count: number }[]>;
  getNavUsageByType(navType: string): Promise<NavUsage[]>;
  getStateClicksAnalytics(): Promise<{ state: string; count: number }[]>;
  getCountryClicksAnalytics(): Promise<{ country: string; count: number }[]>;
  getRegionTypeComparison(): Promise<{ regionType: string; count: number }[]>;
  
  // Security Logging operations
  logSecurityEvent(data: InsertSecurityLog): Promise<SecurityLog>;
  getSecurityEventsByIP(ip: string): Promise<SecurityLog[]>;
  getRecentSecurityEvents(limit?: number): Promise<SecurityLog[]>;
  getHighSeverityEvents(daysBack?: number): Promise<SecurityLog[]>;
  getSecurityEventsForSession(sessionId: string): Promise<SecurityLog[]>;
  getSecurityEventsByCountry(countryCode: string): Promise<SecurityLog[]>;
  getEventsByType(eventType: string): Promise<SecurityLog[]>;
  getUnresolvedEvents(): Promise<SecurityLog[]>;
  resolveSecurityEvent(id: number, resolvedBy: number, notes?: string): Promise<SecurityLog | undefined>;
  getSecurityEventsStats(): Promise<{ eventType: string; count: number }[]>;
  getBotActivityStats(): Promise<{ botCategory: string; count: number; severity: string; isSuspicious: boolean }[]>;
  getBotActivityList(limit?: number): Promise<{
    id: number;
    timestamp: Date;
    botCategory: string;
    severity: string;
    ipAddress: string;
    countryCode: string | null;
    userAgent: string | null;
    isSuspicious: boolean;
  }[]>;
  getCountryOriginStats(): Promise<{ countryCode: string; countryName: string; count: number }[]>;
  getTrendingIPs(limit?: number): Promise<{ ipAddress: string; count: number; lastSeen: Date }[]>;
  
  // Visitor Activity Logging operations
  logVisitorActivity(data: InsertVisitorActivityLog): Promise<VisitorActivityLog>;
  getVisitorActivityByCountry(countryCode: string): Promise<VisitorActivityLog[]>;
  getVisitorActivityByEventType(eventType: string): Promise<VisitorActivityLog[]>;
  getVisitorActivityByDateRange(startDate: Date, endDate: Date): Promise<VisitorActivityLog[]>;
  getVisitorActivityStats(): Promise<{ eventType: string; count: number }[]>;
  getBotVisitorStats(): Promise<{ botCategory: string; count: number }[]>;
  getVisitorCountryStats(): Promise<{ countryCode: string; countryName: string; count: number }[]>;
  getDeviceTypeStats(): Promise<{ deviceType: string; count: number }[]>;
  getBrowserStats(): Promise<{ browser: string; count: number }[]>;
  getOperatingSystemStats(): Promise<{ operatingSystem: string; count: number }[]>;
  getMostViewedPages(limit?: number): Promise<{ pageViewed: string; count: number }[]>;
  getTopReferrers(limit?: number): Promise<{ referrer: string; count: number }[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Veteran form operations
  async createVeteranForm(form: InsertVeteran): Promise<Veteran> {
    const [veteran] = await db
      .insert(veterans)
      .values({
        ...form,
        status: "pending"
      })
      .returning();
    return veteran;
  }

  async getVeteranForm(id: number): Promise<Veteran | undefined> {
    const [veteran] = await db.select().from(veterans).where(eq(veterans.id, id));
    return veteran || undefined;
  }

  async getVeteranFormByEmail(email: string): Promise<Veteran | undefined> {
    const [veteran] = await db.select().from(veterans).where(eq(veterans.email, email));
    return veteran || undefined;
  }

  async getAllVeteranForms(): Promise<Veteran[]> {
    return await db.select().from(veterans);
  }

  async updateVeteranFormStatus(id: number, status: string): Promise<Veteran | undefined> {
    const [updatedVeteran] = await db
      .update(veterans)
      .set({ status })
      .where(eq(veterans.id, id))
      .returning();
    return updatedVeteran || undefined;
  }
  
  // Waitlist operations
  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const [waitlistEntry] = await db
      .insert(waitlist)
      .values(entry)
      .returning();
    return waitlistEntry;
  }

  async getWaitlistByEmail(email: string): Promise<Waitlist | undefined> {
    const [waitlistEntry] = await db.select().from(waitlist).where(eq(waitlist.email, email));
    return waitlistEntry || undefined;
  }

  async getAllWaitlistEntries(): Promise<Waitlist[]> {
    return await db.select().from(waitlist);
  }

  // Resource Usage operations
  async logResourceUsage(data: InsertResourceUsage): Promise<ResourceUsage> {
    const [usage] = await db
      .insert(resourceUsage)
      .values(data)
      .returning();
    return usage;
  }

  async getResourceUsageStats(): Promise<{ resourceType: string; count: number }[]> {
    const result = await db
      .select({
        resourceType: resourceUsage.resourceType,
        count: sql<number>`count(*)`,
      })
      .from(resourceUsage)
      .groupBy(resourceUsage.resourceType);
    
    return result;
  }

  async getResourceUsageByType(type: string): Promise<ResourceUsage[]> {
    return await db
      .select()
      .from(resourceUsage)
      .where(eq(resourceUsage.resourceType, type));
  }
  
  // State Resource Usage operations
  async logStateResourceUsage(data: InsertStateResourceUsage): Promise<StateResourceUsage> {
    const [usage] = await db
      .insert(stateResourceUsage)
      .values(data)
      .returning();
    return usage;
  }

  async getStateResourceUsageStats(): Promise<{ state: string; count: number }[]> {
    const result = await db
      .select({
        state: stateResourceUsage.state,
        count: sql<number>`count(*)`,
      })
      .from(stateResourceUsage)
      .groupBy(stateResourceUsage.state);
    
    return result;
  }

  async getStateResourceUsageByState(state: string): Promise<StateResourceUsage[]> {
    return await db
      .select()
      .from(stateResourceUsage)
      .where(eq(stateResourceUsage.state, state));
  }
  
  async getStateResourceUsageByCategory(category: string): Promise<StateResourceUsage[]> {
    return await db
      .select()
      .from(stateResourceUsage)
      .where(eq(stateResourceUsage.category, category));
  }
  
  // Navigation tracking operations
  async logNavUsage(data: InsertNavUsage): Promise<NavUsage> {
    const [usage] = await db
      .insert(navUsage)
      .values(data)
      .returning();
    return usage;
  }
  
  async getNavUsageStats(): Promise<{ navType: string; count: number }[]> {
    const result = await db
      .select({
        navType: navUsage.navType,
        count: sql<number>`count(*)`,
      })
      .from(navUsage)
      .groupBy(navUsage.navType);
    
    return result;
  }
  
  async getNavUsageByType(navType: string): Promise<NavUsage[]> {
    return await db
      .select()
      .from(navUsage)
      .where(eq(navUsage.navType, navType));
  }
  
  // Analytics for state clicks
  async getStateClicksAnalytics(): Promise<{ state: string; count: number }[]> {
    const result = await db
      .select({
        state: navUsage.value,
        count: sql<number>`count(*)`,
      })
      .from(navUsage)
      .where(eq(navUsage.navType, 'state_select'))
      .groupBy(navUsage.value)
      .orderBy(sql`count(*) desc`);
    
    return result;
  }
  
  // Analytics for country clicks
  async getCountryClicksAnalytics(): Promise<{ country: string; count: number }[]> {
    const result = await db
      .select({
        country: navUsage.value,
        count: sql<number>`count(*)`,
      })
      .from(navUsage)
      .where(eq(navUsage.navType, 'country_select'))
      .groupBy(navUsage.value)
      .orderBy(sql`count(*) desc`);
    
    return result;
  }
  
  // Analytics for US vs International toggle comparison
  async getRegionTypeComparison(): Promise<{ regionType: string; count: number }[]> {
    const result = await db
      .select({
        regionType: navUsage.value,
        count: sql<number>`count(*)`,
      })
      .from(navUsage)
      .where(eq(navUsage.navType, 'toggle'))
      .groupBy(navUsage.value)
      .orderBy(sql`count(*) desc`);
    
    return result;
  }
  
  // Security Logging operations
  async logSecurityEvent(data: InsertSecurityLog): Promise<SecurityLog> {
    const [log] = await db
      .insert(securityLogs)
      .values(data)
      .returning();
    return log;
  }

  async getSecurityEventsByIP(ip: string): Promise<SecurityLog[]> {
    return await db
      .select()
      .from(securityLogs)
      .where(eq(securityLogs.ipAddress, ip))
      .orderBy(desc(securityLogs.timestamp));
  }

  async getRecentSecurityEvents(limit: number = 100): Promise<SecurityLog[]> {
    return await db
      .select()
      .from(securityLogs)
      .orderBy(desc(securityLogs.timestamp))
      .limit(limit);
  }

  async getHighSeverityEvents(daysBack: number = 7): Promise<SecurityLog[]> {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - daysBack);
    
    return await db
      .select()
      .from(securityLogs)
      .where(
        and(
          or(
            eq(securityLogs.severity, 'HIGH'),
            eq(securityLogs.severity, 'CRITICAL')
          ),
          sql`${securityLogs.timestamp} > ${dateThreshold}`
        )
      )
      .orderBy(desc(securityLogs.timestamp));
  }

  async getSecurityEventsForSession(sessionId: string): Promise<SecurityLog[]> {
    return await db
      .select()
      .from(securityLogs)
      .where(eq(securityLogs.sessionId, sessionId))
      .orderBy(desc(securityLogs.timestamp));
  }

  async getSecurityEventsByCountry(countryCode: string): Promise<SecurityLog[]> {
    return await db
      .select()
      .from(securityLogs)
      .where(eq(securityLogs.countryCode, countryCode))
      .orderBy(desc(securityLogs.timestamp));
  }

  async getEventsByType(eventType: string): Promise<SecurityLog[]> {
    return await db
      .select()
      .from(securityLogs)
      .where(eq(securityLogs.eventType, eventType))
      .orderBy(desc(securityLogs.timestamp));
  }

  async getUnresolvedEvents(): Promise<SecurityLog[]> {
    return await db
      .select()
      .from(securityLogs)
      .where(eq(securityLogs.resolved, false))
      .orderBy(desc(securityLogs.timestamp));
  }

  async resolveSecurityEvent(id: number, resolvedBy: number, notes?: string): Promise<SecurityLog | undefined> {
    const [event] = await db
      .update(securityLogs)
      .set({ 
        resolved: true,
        resolvedBy,
        resolvedAt: new Date(),
        notes: notes || null
      })
      .where(eq(securityLogs.id, id))
      .returning();
    
    return event || undefined;
  }

  async getSecurityEventsStats(): Promise<{ eventType: string; count: number }[]> {
    const result = await db
      .select({
        eventType: securityLogs.eventType,
        count: sql<number>`count(*)`,
      })
      .from(securityLogs)
      .groupBy(securityLogs.eventType)
      .orderBy(sql`count(*) desc`);
    
    return result;
  }

  async getTrendingIPs(limit: number = 10): Promise<{ ipAddress: string; count: number; lastSeen: Date }[]> {
    const result = await db
      .select({
        ipAddress: securityLogs.ipAddress,
        count: sql<number>`count(*)`,
        lastSeen: sql<Date>`max(${securityLogs.timestamp})`,
      })
      .from(securityLogs)
      .groupBy(securityLogs.ipAddress)
      .orderBy(sql`count(*) desc`)
      .limit(limit);
    
    return result;
  }
  
  // New methods for enhanced security logging and reporting
  
  async getBotActivityStats(): Promise<{ botCategory: string; count: number; severity: string; isSuspicious: boolean }[]> {
    const result = await db
      .select({
        botCategory: securityLogs.eventType,
        count: sql<number>`count(*)`,
        severity: securityLogs.severity,
      })
      .from(securityLogs)
      .where(
        or(
          like(securityLogs.eventType, '%BOT%'),
          like(securityLogs.eventType, '%AUTOMATION%'),
          like(securityLogs.eventType, '%SCRAPER%')
        )
      )
      .groupBy(securityLogs.eventType, securityLogs.severity)
      .orderBy(sql`count(*) desc`);
    
    // Add isSuspicious flag based on event type and severity
    return result.map(item => ({
      ...item,
      isSuspicious: item.botCategory.includes('SUSPICIOUS') || 
                    item.severity === 'HIGH' || 
                    item.severity === 'CRITICAL' ||
                    (item.botCategory.includes('BOT') && !item.botCategory.includes('LEGITIMATE'))
    }));
  }
  
  async getBotActivityList(limit: number = 20): Promise<{
    id: number;
    timestamp: Date;
    botCategory: string;
    severity: string;
    ipAddress: string;
    countryCode: string | null;
    userAgent: string | null;
    isSuspicious: boolean;
  }[]> {
    const result = await db
      .select({
        id: securityLogs.id,
        timestamp: securityLogs.timestamp,
        botCategory: securityLogs.eventType,
        severity: securityLogs.severity,
        ipAddress: securityLogs.ipAddress,
        countryCode: securityLogs.countryCode,
        userAgent: securityLogs.userAgent,
      })
      .from(securityLogs)
      .where(
        or(
          like(securityLogs.eventType, '%BOT%'),
          like(securityLogs.eventType, '%AUTOMATION%'),
          like(securityLogs.eventType, '%SCRAPER%')
        )
      )
      .orderBy(desc(securityLogs.timestamp))
      .limit(limit);
    
    // Add isSuspicious flag
    return result.map(item => ({
      ...item,
      isSuspicious: item.botCategory.includes('SUSPICIOUS') || 
                    item.severity === 'HIGH' || 
                    item.severity === 'CRITICAL' ||
                    (item.botCategory.includes('BOT') && !item.botCategory.includes('LEGITIMATE'))
    }));
  }
  
  async getCountryOriginStats(): Promise<{ countryCode: string; countryName: string; count: number }[]> {
    // Since we don't currently store country names, we'll just use the country code for now
    // In a real implementation, we would join with a country lookup table
    const result = await db
      .select({
        countryCode: securityLogs.countryCode,
        countryName: sql<string>`''`,  // Placeholder for country name
        count: sql<number>`count(*)`,
      })
      .from(securityLogs)
      .where(sql`${securityLogs.countryCode} IS NOT NULL`)
      .groupBy(securityLogs.countryCode)
      .orderBy(sql`count(*) desc`);
    
    // Map the country codes to names (in a real implementation this would be from a DB table)
    const countryMap: {[key: string]: string} = {
      "US": "United States",
      "GB": "United Kingdom",
      "CA": "Canada",
      "AU": "Australia",
      "DE": "Germany",
      "FR": "France",
      "JP": "Japan",
      "KR": "South Korea",
      "CN": "China",
      "RU": "Russia",
      "IN": "India",
      "BR": "Brazil",
      "ZA": "South Africa",
      // Add more mappings as needed
    };
    
    return result.map(item => ({
      countryCode: item.countryCode || 'unknown',
      countryName: item.countryCode ? (countryMap[item.countryCode] || `Unknown (${item.countryCode})`) : 'Unknown',
      count: item.count
    }));
  }
  
  // Visitor Activity Logging operations
  
  async logVisitorActivity(data: InsertVisitorActivityLog): Promise<VisitorActivityLog> {
    const [log] = await db
      .insert(visitorActivityLog)
      .values(data)
      .returning();
    return log;
  }
  
  async getVisitorActivityByCountry(countryCode: string): Promise<VisitorActivityLog[]> {
    return await db
      .select()
      .from(visitorActivityLog)
      .where(eq(visitorActivityLog.countryCode, countryCode))
      .orderBy(desc(visitorActivityLog.timestamp));
  }
  
  async getVisitorActivityByEventType(eventType: string): Promise<VisitorActivityLog[]> {
    return await db
      .select()
      .from(visitorActivityLog)
      .where(eq(visitorActivityLog.eventType, eventType))
      .orderBy(desc(visitorActivityLog.timestamp));
  }
  
  async getVisitorActivityByDateRange(startDate: Date, endDate: Date): Promise<VisitorActivityLog[]> {
    return await db
      .select()
      .from(visitorActivityLog)
      .where(
        and(
          sql`${visitorActivityLog.timestamp} >= ${startDate}`,
          sql`${visitorActivityLog.timestamp} <= ${endDate}`
        )
      )
      .orderBy(desc(visitorActivityLog.timestamp));
  }
  
  async getVisitorActivityStats(): Promise<{ eventType: string; count: number }[]> {
    const result = await db
      .select({
        eventType: visitorActivityLog.eventType,
        count: sql<number>`count(*)`,
      })
      .from(visitorActivityLog)
      .groupBy(visitorActivityLog.eventType)
      .orderBy(sql`count(*) desc`);
    
    return result;
  }
  
  async getBotVisitorStats(): Promise<{ botCategory: string; count: number }[]> {
    const result = await db
      .select({
        botCategory: visitorActivityLog.botCategory,
        count: sql<number>`count(*)`,
      })
      .from(visitorActivityLog)
      .where(eq(visitorActivityLog.isBotDetected, true))
      .groupBy(visitorActivityLog.botCategory)
      .orderBy(sql`count(*) desc`);
    
    return result.map(item => ({
      botCategory: item.botCategory || 'Unknown Bot',
      count: item.count
    }));
  }
  
  async getVisitorCountryStats(): Promise<{ countryCode: string; countryName: string; count: number }[]> {
    const result = await db
      .select({
        countryCode: visitorActivityLog.countryCode,
        countryName: visitorActivityLog.countryName,
        count: sql<number>`count(*)`,
      })
      .from(visitorActivityLog)
      .where(sql`${visitorActivityLog.countryCode} IS NOT NULL`)
      .groupBy(visitorActivityLog.countryCode, visitorActivityLog.countryName)
      .orderBy(sql`count(*) desc`);
    
    return result.map(item => ({
      countryCode: item.countryCode || 'unknown',
      countryName: item.countryName || 'Unknown',
      count: item.count
    }));
  }
  
  async getDeviceTypeStats(): Promise<{ deviceType: string; count: number }[]> {
    const result = await db
      .select({
        deviceType: visitorActivityLog.deviceType,
        count: sql<number>`count(*)`,
      })
      .from(visitorActivityLog)
      .where(sql`${visitorActivityLog.deviceType} IS NOT NULL`)
      .groupBy(visitorActivityLog.deviceType)
      .orderBy(sql`count(*) desc`);
    
    return result.map(item => ({
      deviceType: item.deviceType || 'unknown',
      count: item.count
    }));
  }
  
  async getBrowserStats(): Promise<{ browser: string; count: number }[]> {
    const result = await db
      .select({
        browser: visitorActivityLog.browser,
        count: sql<number>`count(*)`,
      })
      .from(visitorActivityLog)
      .where(sql`${visitorActivityLog.browser} IS NOT NULL`)
      .groupBy(visitorActivityLog.browser)
      .orderBy(sql`count(*) desc`);
    
    return result.map(item => ({
      browser: item.browser || 'unknown',
      count: item.count
    }));
  }
  
  async getOperatingSystemStats(): Promise<{ operatingSystem: string; count: number }[]> {
    const result = await db
      .select({
        operatingSystem: visitorActivityLog.operatingSystem,
        count: sql<number>`count(*)`,
      })
      .from(visitorActivityLog)
      .where(sql`${visitorActivityLog.operatingSystem} IS NOT NULL`)
      .groupBy(visitorActivityLog.operatingSystem)
      .orderBy(sql`count(*) desc`);
    
    return result.map(item => ({
      operatingSystem: item.operatingSystem || 'unknown',
      count: item.count
    }));
  }
  
  async getMostViewedPages(limit: number = 10): Promise<{ pageViewed: string; count: number }[]> {
    const result = await db
      .select({
        pageViewed: visitorActivityLog.pageViewed,
        count: sql<number>`count(*)`,
      })
      .from(visitorActivityLog)
      .where(sql`${visitorActivityLog.pageViewed} IS NOT NULL`)
      .groupBy(visitorActivityLog.pageViewed)
      .orderBy(sql`count(*) desc`)
      .limit(limit);
    
    return result.map(item => ({
      pageViewed: item.pageViewed || '/',
      count: item.count
    }));
  }
  
  async getTopReferrers(limit: number = 10): Promise<{ referrer: string; count: number }[]> {
    const result = await db
      .select({
        referrer: visitorActivityLog.referrer,
        count: sql<number>`count(*)`,
      })
      .from(visitorActivityLog)
      .where(
        and(
          sql`${visitorActivityLog.referrer} IS NOT NULL`,
          sql`${visitorActivityLog.referrer} != ''`,
          sql`${visitorActivityLog.referrer} != 'direct'`
        )
      )
      .groupBy(visitorActivityLog.referrer)
      .orderBy(sql`count(*) desc`)
      .limit(limit);
    
    return result.map(item => ({
      referrer: item.referrer || 'unknown',
      count: item.count
    }));
  }
}

export const storage = new DatabaseStorage();
