import { pgTable, uuid, varchar, text, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(),
  provider: varchar("provider", { length: 100 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 200 }).notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type", { length: 50 }),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = pgTable("sessions", {
  sessionToken: varchar("session_token", { length: 500 }).notNull().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 500 }).notNull(),
  expires: timestamp("expires").notNull(),
});

export const links = pgTable("links", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 20 }).notNull().unique(),
  originalUrl: text("original_url").notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 200 }),
  isActive: boolean("is_active").default(true),
  passwordHash: text("password_hash"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const clicks = pgTable("clicks", {
  id: uuid("id").defaultRandom().primaryKey(),
  linkId: uuid("link_id").notNull().references(() => links.id, { onDelete: "cascade" }),
  country: varchar("country", { length: 2 }),
  city: varchar("city", { length: 100 }),
  device: varchar("device", { length: 20 }),
  browser: varchar("browser", { length: 50 }),
  os: varchar("os", { length: 50 }),
  referrer: text("referrer"),
  ipHash: text("ip_hash"),
  clickedAt: timestamp("clicked_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type Link = typeof links.$inferSelect;
export type Click = typeof clicks.$inferSelect;