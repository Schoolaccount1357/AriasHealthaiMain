import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVeteranSchema, basicInfoSchema, militaryBackgroundSchema, healthHistorySchema, preferencesSchema, insertWaitlistSchema, waitlistSchema, insertResourceUsageSchema, insertStateResourceUsageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { Server as SocketIOServer } from "socket.io";
import { WebSocket } from "ws";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for submitting veteran pre-enrollment forms
  app.post("/api/veterans/enroll", async (req: Request, res: Response) => {
    try {
      // Validate the form data using the schema
      const validatedForm = insertVeteranSchema.parse(req.body);
      
      // Check if email already exists
      const existingVeteran = await storage.getVeteranFormByEmail(validatedForm.email);
      if (existingVeteran) {
        return res.status(409).json({ 
          message: "A submission with this email already exists" 
        });
      }
      
      // Create the veteran form entry
      const veteran = await storage.createVeteranForm(validatedForm);
      
      return res.status(201).json({
        message: "Form submitted successfully",
        data: veteran
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      return res.status(500).json({ 
        message: "An error occurred while processing your request" 
      });
    }
  });

  // API endpoint for validating a specific step of the form
  app.post("/api/veterans/validate-step", (req: Request, res: Response) => {
    try {
      const { step, data } = req.body;
      
      let validatedData;
      
      switch (step) {
        case 1:
          validatedData = basicInfoSchema.parse(data);
          break;
        case 2:
          validatedData = militaryBackgroundSchema.parse(data);
          break;
        case 3:
          validatedData = healthHistorySchema.parse(data);
          break;
        case 4:
          validatedData = preferencesSchema.parse(data);
          break;
        default:
          return res.status(400).json({ message: "Invalid step" });
      }
      
      return res.status(200).json({
        message: "Validation successful",
        data: validatedData
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      return res.status(500).json({ 
        message: "An error occurred while validating the form step" 
      });
    }
  });

  // API endpoint to get all veteran forms (for admin purposes)
  app.get("/api/veterans", async (_req: Request, res: Response) => {
    try {
      const forms = await storage.getAllVeteranForms();
      return res.status(200).json({
        message: "Forms retrieved successfully",
        data: forms
      });
    } catch (error) {
      return res.status(500).json({ 
        message: "An error occurred while retrieving veteran forms" 
      });
    }
  });
  
  // API endpoint for joining the waitlist
  app.post("/api/waitlist/join", async (req: Request, res: Response) => {
    try {
      // Validate the waitlist data using the schema
      const validatedEntry = waitlistSchema.parse(req.body);
      
      // Check if email already exists in the waitlist
      const existingEntry = await storage.getWaitlistByEmail(validatedEntry.email);
      if (existingEntry) {
        return res.status(409).json({ 
          message: "This email is already on our waitlist" 
        });
      }
      
      // Add to waitlist
      const waitlistEntry = await storage.addToWaitlist(validatedEntry);
      
      return res.status(201).json({
        message: "You've been added to our waitlist successfully!",
        data: waitlistEntry
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      return res.status(500).json({ 
        message: "An error occurred while processing your waitlist request" 
      });
    }
  });

  // API endpoint to get all waitlist entries (for admin purposes)
  app.get("/api/waitlist", async (_req: Request, res: Response) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      return res.status(200).json({
        message: "Waitlist entries retrieved successfully",
        data: entries
      });
    } catch (error) {
      return res.status(500).json({ 
        message: "An error occurred while retrieving waitlist entries" 
      });
    }
  });
  
  // API endpoint for tracking resource usage (e.g., crisis hotline clicks)
  app.post("/api/resource/track", async (req: Request, res: Response) => {
    try {
      const { resourceType } = req.body;
      
      if (!resourceType || !["call", "text", "chat"].includes(resourceType)) {
        return res.status(400).json({ 
          message: "Invalid resource type. Must be 'call', 'text', or 'chat'" 
        });
      }
      
      // Get basic info from the request for analytics
      const userAgent = req.headers['user-agent'] || '';
      const referrer = req.headers['referer'] || '';
      // Hash the IP address for privacy
      const ipHash = crypto.createHash('sha256').update(req.ip || '').digest('hex');
      
      // Log the resource usage
      const usage = await storage.logResourceUsage({
        resourceType,
        userAgent,
        ipHash,
        referrer,
        timestamp: new Date()
      });
      
      return res.status(201).json({
        message: "Resource usage tracked successfully",
        data: { resourceType }
      });
    } catch (error) {
      console.error("Error tracking resource usage:", error);
      return res.status(500).json({ 
        message: "An error occurred while tracking resource usage" 
      });
    }
  });
  
  // API endpoint for getting resource usage statistics
  app.get("/api/resource/stats", async (_req: Request, res: Response) => {
    try {
      const stats = await storage.getResourceUsageStats();
      return res.status(200).json({
        message: "Resource usage statistics retrieved successfully",
        data: stats
      });
    } catch (error) {
      console.error("Error getting resource stats:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving resource statistics" 
      });
    }
  });
  
  // API endpoint for tracking state-specific resource usage
  app.post("/api/resource/track-state", async (req: Request, res: Response) => {
    try {
      const { state, resourceName, category } = req.body;
      
      if (!state || !resourceName || !category) {
        return res.status(400).json({
          message: "Missing required fields: state, resourceName, or category"
        });
      }
      
      // Get basic info from the request for analytics
      const userAgent = req.headers['user-agent'] || '';
      const referrer = req.headers['referer'] || '';
      // Hash the IP address for privacy
      const ipHash = crypto.createHash('sha256').update(req.ip || '').digest('hex');
      
      // Log the state resource usage
      const usage = await storage.logStateResourceUsage({
        state,
        resourceName,
        category,
        userAgent,
        ipHash,
        referrer,
        timestamp: new Date()
      });
      
      return res.status(201).json({
        message: "State resource usage tracked successfully",
        data: { state, resourceName, category }
      });
    } catch (error) {
      console.error("Error tracking state resource usage:", error);
      return res.status(500).json({
        message: "An error occurred while tracking state resource usage"
      });
    }
  });
  
  // API endpoint for getting state resource usage statistics
  app.get("/api/resource/state-stats", async (_req: Request, res: Response) => {
    try {
      const stats = await storage.getStateResourceUsageStats();
      return res.status(200).json({
        message: "State resource usage statistics retrieved successfully",
        data: stats
      });
    } catch (error) {
      console.error("Error getting state resource stats:", error);
      return res.status(500).json({
        message: "An error occurred while retrieving state resource statistics"
      });
    }
  });

  const httpServer = createServer(app);
  
  // Setup WebSocket server for video chat
  const io = new SocketIOServer(httpServer, {
    path: '/ws',
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  // Store active users
  const activeUsers: Record<string, string> = {};
  const userRooms: Record<string, string> = {};
  
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // User joins with their username
    socket.on('join', ({ username, room }) => {
      // Store user info
      activeUsers[socket.id] = username;
      userRooms[socket.id] = room;
      
      // Join the room
      socket.join(room);
      
      // Notify others in room
      socket.to(room).emit('user-joined', { 
        id: socket.id, 
        username 
      });
      
      // Send list of connected users in the room to the new user
      const usersInRoom = [];
      for (const [id, user] of Object.entries(activeUsers)) {
        if (userRooms[id] === room && id !== socket.id) {
          usersInRoom.push({ id, username: user });
        }
      }
      socket.emit('room-users', usersInRoom);
      
      console.log(`${username} joined room ${room}`);
    });
    
    // Handle WebRTC signaling
    socket.on('signal', ({ to, signal }) => {
      io.to(to).emit('signal', {
        from: socket.id,
        signal,
        username: activeUsers[socket.id]
      });
    });
    
    // Handle messages
    socket.on('message', ({ content, room }) => {
      io.to(room).emit('message', {
        content,
        from: socket.id,
        username: activeUsers[socket.id],
        time: new Date().toISOString()
      });
    });
    
    // Handle disconnections
    socket.on('disconnect', () => {
      const room = userRooms[socket.id];
      if (room) {
        socket.to(room).emit('user-left', {
          id: socket.id,
          username: activeUsers[socket.id]
        });
      }
      
      // Remove user from active users
      delete activeUsers[socket.id];
      delete userRooms[socket.id];
      
      console.log('User disconnected:', socket.id);
    });
  });
  
  return httpServer;
}
