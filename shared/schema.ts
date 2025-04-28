import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
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
