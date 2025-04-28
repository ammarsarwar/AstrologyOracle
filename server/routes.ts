import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFavoriteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  const apiRouter = express.Router();

  // Get all constellations
  apiRouter.get("/constellations", async (_req, res) => {
    try {
      const constellations = await storage.getAllConstellations();
      res.json(constellations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch constellations" });
    }
  });

  // Get constellation by ID
  apiRouter.get("/constellations/:id", async (req, res) => {
    try {
      const constellation = await storage.getConstellation(req.params.id);
      if (!constellation) {
        return res.status(404).json({ message: "Constellation not found" });
      }
      res.json(constellation);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch constellation" });
    }
  });

  // Get user's favorite constellations
  apiRouter.get("/favorites", async (req, res) => {
    try {
      // For demo purposes, use userId 1
      const userId = 1;
      const favorites = await storage.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  // Add or remove constellation from favorites
  apiRouter.post("/favorites", async (req, res) => {
    try {
      const validateSchema = z.object({
        constellationId: z.string(),
        action: z.enum(["add", "remove"])
      });

      const { constellationId, action } = validateSchema.parse(req.body);
      
      // For demo purposes, use userId 1
      const userId = 1;
      
      if (action === "add") {
        const favorite = await storage.addFavorite({
          userId,
          constellationId,
        });
        res.status(201).json(favorite);
      } else {
        await storage.removeFavorite(userId, constellationId);
        res.status(200).json({ message: "Removed from favorites" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update favorites" });
    }
  });

  // Share constellation
  apiRouter.post("/share", async (req, res) => {
    try {
      const validateSchema = z.object({
        constellationId: z.string(),
      });

      const { constellationId } = validateSchema.parse(req.body);
      
      // In a real app, we would generate a share link, save it, etc.
      // For this demo, we'll just return success
      res.status(200).json({ 
        message: "Shared successfully", 
        shareUrl: `/constellation/${constellationId}` 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to share constellation" });
    }
  });

  // Register API routes with /api prefix
  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
