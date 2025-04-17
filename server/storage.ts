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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private veteranForms: Map<number, Veteran>;
  private userCurrentId: number;
  private veteranCurrentId: number;

  constructor() {
    this.users = new Map();
    this.veteranForms = new Map();
    this.userCurrentId = 1;
    this.veteranCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Veteran form operations
  async createVeteranForm(form: InsertVeteran): Promise<Veteran> {
    const id = this.veteranCurrentId++;
    const createdAt = new Date();
    const status = "pending";
    
    const veteran: Veteran = { 
      ...form, 
      id, 
      createdAt, 
      status 
    };
    
    this.veteranForms.set(id, veteran);
    return veteran;
  }

  async getVeteranForm(id: number): Promise<Veteran | undefined> {
    return this.veteranForms.get(id);
  }

  async getVeteranFormByEmail(email: string): Promise<Veteran | undefined> {
    return Array.from(this.veteranForms.values()).find(
      (form) => form.email === email
    );
  }

  async getAllVeteranForms(): Promise<Veteran[]> {
    return Array.from(this.veteranForms.values());
  }

  async updateVeteranFormStatus(id: number, status: string): Promise<Veteran | undefined> {
    const form = await this.getVeteranForm(id);
    if (!form) return undefined;
    
    const updatedForm: Veteran = {
      ...form,
      status
    };
    
    this.veteranForms.set(id, updatedForm);
    return updatedForm;
  }
}

export const storage = new MemStorage();
