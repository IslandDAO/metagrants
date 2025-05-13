import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  role: text("role").default("user"),
  created_at: timestamp("created_at").defaultNow(),
});

// Projects table for grant recipients
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  long_description: text("long_description"),
  status: text("status").notNull().default("In Development"),
  funding_amount: integer("funding_amount").notNull(),
  start_date: timestamp("start_date").notNull(),
  category: text("category"),
  tags: text("tags").array(),
  image_url: text("image_url"),
  website_url: text("website_url"),
  github_url: text("github_url"),
  twitter_url: text("twitter_url"),
  discord_url: text("discord_url"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Team members table
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  image_url: text("image_url"),
  role: text("role").notNull(),
  twitter: text("twitter"),
  linkedin: text("linkedin"),
  website: text("website"),
  email: text("email"),
  expertise: text("expertise").array(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Project milestones table
export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  deadline: timestamp("deadline").notNull(),
  completed: boolean("completed").default(false),
  completion_date: timestamp("completion_date"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Project team members association
export const projectTeam = pgTable("project_team", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.id),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  social_links: jsonb("social_links"),
  created_at: timestamp("created_at").defaultNow(),
});

// Project updates/news
export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Application form submissions
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  project_name: text("project_name").notNull(),
  project_description: text("project_description").notNull(),
  funding_requested: integer("funding_requested").notNull(),
  project_category: text("project_category").notNull(),
  team_background: text("team_background").notNull(),
  github_url: text("github_url"),
  website_url: text("website_url"),
  additional_info: text("additional_info"),
  status: text("status").default("submitted").notNull(),
  submitted_at: timestamp("submitted_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Create insert schemas for each table
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertProjectTeamSchema = createInsertSchema(projectTeam).omit({
  id: true,
  created_at: true,
});

export const insertProjectUpdateSchema = createInsertSchema(projectUpdates).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  status: true,
  submitted_at: true,
  updated_at: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type Milestone = typeof milestones.$inferSelect;

export type InsertProjectTeam = z.infer<typeof insertProjectTeamSchema>;
export type ProjectTeam = typeof projectTeam.$inferSelect;

export type InsertProjectUpdate = z.infer<typeof insertProjectUpdateSchema>;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
