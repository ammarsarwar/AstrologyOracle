import { constellations, favorites, type Constellation, type InsertFavorite, type Favorite, type User, type InsertUser, users } from "@shared/schema";
import { constellationData } from "../client/src/lib/constellationData";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllConstellations(): Promise<Constellation[]>;
  getConstellation(id: string): Promise<Constellation | undefined>;
  
  getUserFavorites(userId: number): Promise<string[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(userId: number, constellationId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private constellationsMap: Map<string, Constellation>;
  private favoritesMap: Map<number, Favorite>;
  private userIdCounter: number;
  private favoriteIdCounter: number;

  constructor() {
    this.users = new Map();
    this.constellationsMap = new Map();
    this.favoritesMap = new Map();
    this.userIdCounter = 1;
    this.favoriteIdCounter = 1;

    // Initialize with constellation data
    this.initConstellations();

    // Add a demo user
    this.createUser({
      username: "demo",
      password: "password",
    });
  }

  private initConstellations() {
    constellationData.forEach(constellation => {
      this.constellationsMap.set(constellation.id, constellation as Constellation);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllConstellations(): Promise<Constellation[]> {
    return Array.from(this.constellationsMap.values());
  }

  async getConstellation(id: string): Promise<Constellation | undefined> {
    return this.constellationsMap.get(id);
  }

  async getUserFavorites(userId: number): Promise<string[]> {
    const userFavorites = Array.from(this.favoritesMap.values()).filter(
      (favorite) => favorite.userId === userId
    );
    return userFavorites.map(favorite => favorite.constellationId);
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    // Check if already exists
    const existingFavorite = Array.from(this.favoritesMap.values()).find(
      (favorite) => 
        favorite.userId === insertFavorite.userId && 
        favorite.constellationId === insertFavorite.constellationId
    );

    if (existingFavorite) {
      return existingFavorite;
    }

    const id = this.favoriteIdCounter++;
    const favorite: Favorite = { ...insertFavorite, id };
    this.favoritesMap.set(id, favorite);
    return favorite;
  }

  async removeFavorite(userId: number, constellationId: string): Promise<void> {
    const favoriteToRemove = Array.from(this.favoritesMap.entries()).find(
      ([_, favorite]) => 
        favorite.userId === userId && 
        favorite.constellationId === constellationId
    );

    if (favoriteToRemove) {
      this.favoritesMap.delete(favoriteToRemove[0]);
    }
  }
}

export const storage = new MemStorage();
