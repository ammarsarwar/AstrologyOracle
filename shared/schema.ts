import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const constellations = pgTable("constellations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  element: text("element").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  historyImageUrl: text("history_image_url").notNull(),
  skyImageUrl: text("sky_image_url").notNull(),
  symbolUrl: text("symbol_url").notNull(),
  imageUrl: text("image_url").notNull(),
  rightAscension: text("right_ascension").notNull(),
  declination: text("declination").notNull(),
  areaDegrees: integer("area_degrees").notNull(),
  sizeRank: text("size_rank").notNull(),
  bordersCount: integer("borders_count").notNull(),
  borders: text("borders").notNull(),
  brightestStars: text("brightest_stars").notNull(),
  observationInfo: text("observation_info").notNull(),
  observationPeriod: text("observation_period").notNull(),
});

export const insertConstellationSchema = createInsertSchema(constellations);

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  constellationId: text("constellation_id").notNull(),
});

export const insertFavoriteSchema = createInsertSchema(favorites).pick({
  userId: true,
  constellationId: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Constellation = typeof constellations.$inferSelect;
export type InsertConstellation = z.infer<typeof insertConstellationSchema>;

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
