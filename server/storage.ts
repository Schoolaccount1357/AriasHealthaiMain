import { veterans, type Veteran, type InsertVeteran, users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
