import { pgTable, text, serial, integer, boolean, timestamp, real, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Export auth models so they are included in the schema
export * from "./models/auth";

// === TABLE DEFINITIONS ===

// Sensor Readings
export const readings = pgTable("readings", {
  id: serial("id").primaryKey(),
  current: doublePrecision("current").notNull(), // Amperes
  voltage: doublePrecision("voltage").notNull(), // Volts
  leakageCurrent: doublePrecision("leakage_current").notNull(), // mA
  temperature: doublePrecision("temperature").notNull(), // Celsius
  power: doublePrecision("power").notNull(), // Watts (calculated)
  riskLevel: text("risk_level", { enum: ["SAFE", "MODERATE", "HIGH", "CRITICAL"] }).notNull().default("SAFE"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Alerts/Hazards
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: ["LEAKAGE", "OVERLOAD", "OVERHEATING", "SHORT_CIRCUIT"] }).notNull(),
  message: text("message").notNull(),
  severity: text("severity", { enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] }).notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// === SCHEMAS ===
export const insertReadingSchema = createInsertSchema(readings).omit({ id: true, timestamp: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true, timestamp: true });

// === EXPLICIT TYPES ===
export type Reading = typeof readings.$inferSelect;
export type InsertReading = z.infer<typeof insertReadingSchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

// Request/Response Types
export type ReadingResponse = Reading;
export type AlertResponse = Alert;

export type SimulationConfig = {
  isRunning: boolean;
  scenario: "NORMAL" | "LEAKAGE_FAULT" | "OVERLOAD" | "OVERHEATING";
};
