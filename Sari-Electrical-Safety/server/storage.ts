import { db } from "./db";
import {
  readings,
  alerts,
  type Reading,
  type InsertReading,
  type Alert,
  type InsertAlert,
  type SimulationConfig
} from "@shared/schema";
import { users, type User, type InsertUser } from "@shared/models/auth";
import { eq, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addReading(reading: InsertReading): Promise<Reading>;
  getLatestReading(): Promise<Reading | undefined>;
  getReadingsHistory(limit: number): Promise<Reading[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  getAlerts(): Promise<Alert[]>;
  markAlertAsRead(id: number): Promise<Alert | undefined>;
  getSimulationConfig(): Promise<SimulationConfig>;
  updateSimulationConfig(config: Partial<SimulationConfig>): Promise<SimulationConfig>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;
  private simulationConfig: SimulationConfig = {
    isRunning: true,
    scenario: "NORMAL"
  };

constructor() {
    // سنستخدم الذاكرة المؤقتة (Memory) بدلاً من Postgres لحل المشكلة فوراً
    this.sessionStore = new session.MemoryStore();
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async addReading(reading: InsertReading): Promise<Reading> {
    const [newReading] = await db.insert(readings).values(reading).returning();
    return newReading;
  }

  async getLatestReading(): Promise<Reading | undefined> {
    const [reading] = await db.select().from(readings).orderBy(desc(readings.timestamp)).limit(1);
    return reading;
  }

  async getReadingsHistory(limit: number): Promise<Reading[]> {
    return await db.select().from(readings).orderBy(desc(readings.timestamp)).limit(limit);
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [newAlert] = await db.insert(alerts).values(alert).returning();
    return newAlert;
  }

  async getAlerts(): Promise<Alert[]> {
    return await db.select().from(alerts).orderBy(desc(alerts.timestamp));
  }

  async markAlertAsRead(id: number): Promise<Alert | undefined> {
    const [updated] = await db.update(alerts).set({ isRead: true }).where(eq(alerts.id, id)).returning();
    return updated;
  }

  async getSimulationConfig(): Promise<SimulationConfig> {
    return this.simulationConfig;
  }

  async updateSimulationConfig(config: Partial<SimulationConfig>): Promise<SimulationConfig> {
    this.simulationConfig = { ...this.simulationConfig, ...config };
    return this.simulationConfig;
  }
}

export const storage = new DatabaseStorage();
