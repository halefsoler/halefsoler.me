import { createInsertSchema } from "drizzle-zod";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const courseWaitinglistTable = pgTable("course_waitinglist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  source: text("source").notNull().default("course_page"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertCourseWaitinglistSchema = createInsertSchema(
  courseWaitinglistTable,
).omit({ id: true, createdAt: true });

export type InsertCourseWaitinglist = z.infer<
  typeof insertCourseWaitinglistSchema
>;
export type CourseWaitinglist =
  typeof courseWaitinglistTable.$inferSelect;
