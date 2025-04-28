import { pgTable, text, serial, integer, boolean, timestamp, json, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Veteran pre-enrollment form schema
export const veterans = pgTable("veterans", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  dob: text("dob").notNull(),
  gender: text("gender").notNull(),
  // Military background
  branch: text("branch"),
  rank: text("rank"),
  serviceYears: text("service_years"),
  deploymentCount: integer("deployment_count"),
  // Health history
  sudsHistory: text("suds_history"),
  treatmentHistory: text("treatment_history"),
  currentStatus: text("current_status"),
  mentalHealthConditions: text("mental_health_conditions"),
  // Preferences
  communicationPreference: text("communication_preference"),
  peerPreferences: text("peer_preferences"),
  goals: text("goals"),
  additionalInfo: text("additional_info"),
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  status: text("status").default("pending").notNull(),
});

export const insertVeteranSchema = createInsertSchema(veterans).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertVeteran = z.infer<typeof insertVeteranSchema>;
export type Veteran = typeof veterans.$inferSelect;

// Form step schema for validation
export const basicInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Valid phone number is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender selection is required"),
});

export const militaryBackgroundSchema = z.object({
  branch: z.string().min(1, "Branch of service is required"),
  rank: z.string().min(1, "Rank is required"),
  serviceYears: z.string().min(1, "Years of service is required"),
  deploymentCount: z.coerce.number().int().min(0),
});

export const healthHistorySchema = z.object({
  sudsHistory: z.string().min(1, "Please describe your experience with substance use"),
  treatmentHistory: z.string().optional(),
  currentStatus: z.string().min(1, "Current status is required"),
  mentalHealthConditions: z.string().optional(),
});

export const preferencesSchema = z.object({
  communicationPreference: z.string().min(1, "Communication preference is required"),
  peerPreferences: z.string().optional(),
  goals: z.string().min(1, "Goals are required"),
  additionalInfo: z.string().optional(),
});

// Waitlist schema for pre-launch
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  serviceStatus: text("service_status").notNull(), // Active Duty / Veteran / Family Member
  reasonForInterest: text("reason_for_interest"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlist).omit({
  id: true,
  createdAt: true,
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

// Waitlist validation schema
export const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  serviceStatus: z.string().min(1, "Please select your service status"),
  reasonForInterest: z.string().optional(),
});

// Resource usage tracking
export const resourceUsage = pgTable("resource_usage", {
  id: serial("id").primaryKey(),
  resourceType: text("resource_type").notNull(), // 'call', 'text', 'chat'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userAgent: text("user_agent"), // Store browser/device info
  ipHash: text("ip_hash"), // Store hashed IP to avoid duplicate counting while preserving privacy
  referrer: text("referrer"), // Which page they came from
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertResourceUsageSchema = createInsertSchema(resourceUsage).omit({
  id: true,
  createdAt: true
});

export type InsertResourceUsage = z.infer<typeof insertResourceUsageSchema>;
export type ResourceUsage = typeof resourceUsage.$inferSelect;

// State resource usage tracking
export const stateResourceUsage = pgTable("state_resource_usage", {
  id: serial("id").primaryKey(),
  state: text("state").notNull(),
  resourceName: text("resource_name").notNull(),
  category: text("category").notNull(), // 'VA', 'Crisis', 'Treatment', 'Housing', 'Employment'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userAgent: text("user_agent"),
  ipHash: text("ip_hash"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertStateResourceUsageSchema = createInsertSchema(stateResourceUsage).omit({
  id: true,
  createdAt: true
});

export type InsertStateResourceUsage = z.infer<typeof insertStateResourceUsageSchema>;
export type StateResourceUsage = typeof stateResourceUsage.$inferSelect;

// Navigation usage tracking (for US/International toggle and state/country selection)
export const navUsage = pgTable("nav_usage", {
  id: serial("id").primaryKey(),
  navType: text("nav_type").notNull(), // 'toggle', 'state_select', 'country_select'
  value: text("value").notNull(), // what was clicked/selected
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userAgent: text("user_agent"),
  ipHash: text("ip_hash"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertNavUsageSchema = createInsertSchema(navUsage).omit({
  id: true,
  createdAt: true
});

export type InsertNavUsage = z.infer<typeof insertNavUsageSchema>;
export type NavUsage = typeof navUsage.$inferSelect;

// Security logs for tracking suspicious activities
export const securityLogs = pgTable("security_logs", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(), // 'RATE_LIMIT_EXCEEDED', 'SUSPICIOUS_BOT', etc.
  severity: varchar("severity", { length: 20 }).notNull(), // 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  ipAddress: varchar("ip_address", { length: 50 }).notNull(), // Store full IP for security investigation
  userAgent: text("user_agent"), // Store complete user agent
  url: text("url"), // The URL that was accessed
  message: text("message"), // Description of the event
  metadata: json("metadata"), // Additional structured data about the event
  countryCode: varchar("country_code", { length: 2 }), // Country code if available
  isTor: boolean("is_tor").default(false), // Flag for Tor exit nodes
  isProxy: boolean("is_proxy").default(false), // Flag for proxy/VPN
  ipReputation: integer("ip_reputation"), // Reputation score (0-100, lower is worse)
  userId: integer("user_id"), // Link to user if authenticated
  sessionId: varchar("session_id", { length: 255 }), // Track session for correlating events
  resolved: boolean("resolved").default(false), // Whether this security event was reviewed/resolved
  resolvedBy: integer("resolved_by"), // Which admin resolved it
  resolvedAt: timestamp("resolved_at"), // When it was resolved
  notes: text("notes"), // Admin notes on resolution
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertSecurityLogSchema = createInsertSchema(securityLogs).omit({
  id: true,
  resolved: true,
  resolvedBy: true,
  resolvedAt: true,
  createdAt: true
});

export type InsertSecurityLog = z.infer<typeof insertSecurityLogSchema>;
export type SecurityLog = typeof securityLogs.$inferSelect;
