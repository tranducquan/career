import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: text("name").notNull(),
	// slug dùng cho đường dẫn lọc, ví dụ /jobs?category=graphics-design
	slug: text("slug").notNull().unique(),
	// Tên icon Lucide dạng chuỗi (ví dụ "pen-tool"), site ánh xạ sang component
	iconKey: text("icon_key"),
	sortOrder: integer("sort_order").notNull().default(0),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
