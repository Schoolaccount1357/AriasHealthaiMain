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

// Waitlist schema for pre-launch with enhanced demographics
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender"),
  race: text("race"),
  ethnicity: text("ethnicity"),
  // Military information
  serviceStatus: text("service_status").notNull(), // Active Duty / Veteran / Family Member
  militaryBranch: text("military_branch"),
  serviceYears: text("service_years"),
  deploymentHistory: text("deployment_history"),
  // Demographics
  location: text("location"), // State/Region
  zipCode: text("zip_code"),
  educationLevel: text("education_level"),
  employmentStatus: text("employment_status"),
  householdIncome: text("household_income"),
  // Substance use and mental health
  substanceUseHistory: text("substance_use_history"),
  mentalHealthStatus: text("mental_health_status"),
  previousTreatment: text("previous_treatment"),
  // Platform preferences
  communicationPreferences: text("communication_preferences"), // Email, SMS, Phone
  supportGroupPreferences: text("support_group_preferences"),
  languagePreference: text("language_preference"),
  reasonForInterest: text("reason_for_interest"),
  referralSource: text("referral_source"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlist).omit({
  id: true,
  createdAt: true,
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

// Simple waitlist validation schema for basic form
export const simpleWaitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  serviceStatus: z.string().min(1, "Please select your service status"),
  reasonForInterest: z.string().optional(),
});

// Waitlist validation schema with enhanced demographics
export const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  race: z.string().optional(),
  ethnicity: z.string().optional(),
  // Military information
  serviceStatus: z.string().min(1, "Please select your service status"),
  militaryBranch: z.string().optional(),
  serviceYears: z.string().optional(),
  deploymentHistory: z.string().optional(),
  // Demographics
  location: z.string().optional(),
  zipCode: z.string().optional(),
  educationLevel: z.string().optional(),
  employmentStatus: z.string().optional(),
  householdIncome: z.string().optional(),
  // Substance use and mental health
  substanceUseHistory: z.string().optional(),
  mentalHealthStatus: z.string().optional(),
  previousTreatment: z.string().optional(),
  // Platform preferences
  communicationPreferences: z.string().optional(),
  supportGroupPreferences: z.string().optional(),
  languagePreference: z.string().optional(),
  reasonForInterest: z.string().optional(),
  referralSource: z.string().optional(),
});

// Resource usage tracking
export const resourceUsage = pgTable("resource_usage", {
  id: serial("id").primaryKey(),
  resourceType: text("resource_type").notNull(), // 'call', 'text', 'chat'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userAgent: text("user_agent"), // Store browser/device info
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
  referrer: text("referrer"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertNavUsageSchema = createInsertSchema(navUsage).omit({
  id: true,
  createdAt: true
});

export type InsertNavUsage = z.infer<typeof insertNavUsageSchema>;
export type NavUsage = typeof navUsage.$inferSelect;

// Placeholder table - implement your own security logging as needed
export const securityEvents = pgTable("security_events", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(),
  severity: varchar("severity", { length: 20 }).notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertSecurityEventSchema = createInsertSchema(securityEvents).omit({
  id: true,
  timestamp: true
});

export type InsertSecurityEvent = z.infer<typeof insertSecurityEventSchema>;
export type SecurityEvent = typeof securityEvents.$inferSelect;

// Visitor activity log for comprehensive tracking of site visitors
export const visitorActivityLog = pgTable("visitor_activity_log", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  countryCode: varchar("country_code", { length: 2 }), // Country code
  countryName: varchar("country_name", { length: 100 }), // Full country name
  city: varchar("city", { length: 100 }), // City if available
  userAgent: text("user_agent"), // Store user agent for device/browser analytics
  browser: varchar("browser", { length: 50 }), // Extracted browser info
  operatingSystem: varchar("operating_system", { length: 50 }), // Extracted OS info
  deviceType: varchar("device_type", { length: 20 }), // mobile, desktop, tablet, etc.
  referrer: text("referrer"), // Where the visitor came from
  landingPage: text("landing_page"), // First page visited
  pageViewed: text("page_viewed"), // Current page being viewed
  eventType: varchar("event_type", { length: 50 }).notNull(), // 'PAGE_VIEW', 'RESOURCE_CLICK', 'FORM_SUBMIT', etc.
  eventData: json("event_data"), // Additional data about the event
  sessionId: varchar("session_id", { length: 255 }), // For tracking user journey
  userId: integer("user_id"), // If authenticated
  isBotDetected: boolean("is_bot_detected").default(false), // Flag for bot traffic
  botCategory: varchar("bot_category", { length: 50 }), // 'SEARCH_ENGINE', 'SCRAPER', 'UNKNOWN', etc.
  botConfidence: integer("bot_confidence"), // 0-100 confidence score
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertVisitorActivityLogSchema = createInsertSchema(visitorActivityLog).omit({
  id: true,
  createdAt: true
});

export type InsertVisitorActivityLog = z.infer<typeof insertVisitorActivityLogSchema>;
export type VisitorActivityLog = typeof visitorActivityLog.$inferSelect;
