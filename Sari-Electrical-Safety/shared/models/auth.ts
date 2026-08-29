import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, timestamp, varchar, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// 1. جدول الجلسات (سنبقيه لتخزين بيانات تسجيل الدخول)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// 2. جدول المستخدمين المطور (لنظامك الخاص)
export const users = pgTable("users", {
  id: serial("id").primaryKey(), // استخدام serial يسهل التعامل مع المعرفات
  username: text("username").notNull().unique(), // اسم المستخدم للدخول
  password: text("password").notNull(), // كلمة المرور المشفرة
  email: varchar("email").unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 3. مخططات التحقق (Schemas) - مهمة جداً لصفحة الـ Login
export const insertUserSchema = createInsertSchema(users);
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// تعريف بيانات الدخول المتوقعة من صفحة الـ Dashboard
export const loginSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export type LoginData = z.infer<typeof loginSchema>;
