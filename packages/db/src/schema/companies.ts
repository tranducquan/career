import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: text("name").notNull(),
	location: text("location").notNull(),
	href: text("href").notNull().default("#"),
	logoUrl: text("logo_url"),
	featured: boolean("featured").notNull().default(false),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
