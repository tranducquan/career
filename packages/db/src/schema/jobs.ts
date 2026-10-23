import { sql } from "drizzle-orm";
import { boolean, date, index, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { companies } from "./companies";

export const jobStatuses = ["draft", "published", "closed"] as const;
export type JobStatus = (typeof jobStatuses)[number];

export const jobStatus = pgEnum("job_status", jobStatuses);

const list = (name: string) =>
	text(name)
		.array()
		.notNull()
		.default(sql`'{}'::text[]`);

export const jobs = pgTable(
	"jobs",
	{
		// id là số nguyên vì slug của job lấy id ở sau dấu "-" cuối cùng
		id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
		// restrict: không cho xoá công ty khi còn job
		companyId: integer("company_id")
			.notNull()
			.references(() => companies.id, { onDelete: "restrict" }),
		// Cho phép null để job chưa phân loại vẫn lưu được. restrict: không xoá danh mục khi còn job
		categoryId: integer("category_id").references(() => categories.id, { onDelete: "restrict" }),
		title: text("title").notNull(),
		type: text("type").notNull(),
		level: text("level"),
		location: text("location"),
		remote: boolean("remote").notNull().default(false),
		featured: boolean("featured").notNull().default(false),
		status: jobStatus("status").notNull().default("draft"),
		salary: text("salary"),
		salaryRange: text("salary_range"),
		salaryType: text("salary_type"),
		salaryMin: integer("salary_min"),
		salaryMax: integer("salary_max"),
		education: text("education"),
		experience: text("experience"),
		postedAt: date("posted_at", { mode: "string" }),
		deadline: date("deadline", { mode: "string" }),
		description: text("description").notNull(),
		responsibilities: list("responsibilities"),
		requirements: list("requirements"),
		desirable: list("desirable"),
		benefits: list("benefits"),
		perks: list("perks"),
		tags: list("tags"),
		country: text("country"), // mã ISO 3166-1 alpha-2, ví dụ "VN"
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [index("jobs_status_idx").on(table.status), index("jobs_company_idx").on(table.companyId), index("jobs_category_idx").on(table.categoryId)],
);

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
