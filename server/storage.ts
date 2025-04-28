import { veterans, type Veteran, type InsertVeteran, users, type User, type InsertUser, waitlist, type Waitlist, type InsertWaitlist, resourceUsage, type ResourceUsage, type InsertResourceUsage, stateResourceUsage, type StateResourceUsage, type InsertStateResourceUsage } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
