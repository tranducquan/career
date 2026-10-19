import { and, asc, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { getDb } from "../client";
import { categories, companies, jobs } from "../schema";

// File này chỉ chứa truy vấn đọc, và chỉ lấy job đã đăng (published).
// Site công khai chỉ nên import từ "@repo/db/public".

const escapeLike = (value: string) => value.replace(/[\\%_]/g, (char) => `\\${char}`);

export type PublicJobQuery = {
	q?: string;
	type?: string;
	level?: string;
	location?: string;
	category?: string; // slug của danh mục
	remote?: boolean;
	featured?: boolean;
	sort?: "newest" | "deadline";
	page: number;
	limit: number;
};

const jobColumns = {
	job: jobs,
	companyName: companies.name,
	companyLogoUrl: companies.logoUrl,
	categoryName: categories.name,
};

export const getPublishedJobs = async ({ q, type, level, location, category, remote, featured, sort = "newest", page, limit }: PublicJobQuery) => {
	const db = getDb();
	const search = q?.trim() ? `%${escapeLike(q.trim())}%` : undefined;

	const where = and(
		eq(jobs.status, "published"),
		search ? or(ilike(jobs.title, search), ilike(companies.name, search), sql`array_to_string(${jobs.tags}, ' ') ilike ${search}`) : undefined,
		type ? ilike(jobs.type, escapeLike(type)) : undefined,
		level ? ilike(jobs.level, escapeLike(level)) : undefined,
		location ? ilike(jobs.location, `%${escapeLike(location)}%`) : undefined,
		category ? eq(categories.slug, category) : undefined,
		remote === undefined ? undefined : eq(jobs.remote, remote),
		featured === undefined ? undefined : eq(jobs.featured, featured),
	);

	const orderBy = sort === "deadline" ? [sql`${jobs.deadline} asc nulls last`, desc(jobs.id)] : [sql`${jobs.postedAt} desc nulls last`, desc(jobs.id)];

	const [rows, totals] = await Promise.all([
		db
			.select(jobColumns)
			.from(jobs)
			.innerJoin(companies, eq(jobs.companyId, companies.id))
			.leftJoin(categories, eq(jobs.categoryId, categories.id))
			.where(where)
			.orderBy(...orderBy)
			.limit(limit)
			.offset((page - 1) * limit),
		db.select({ total: count() }).from(jobs).innerJoin(companies, eq(jobs.companyId, companies.id)).leftJoin(categories, eq(jobs.categoryId, categories.id)).where(where),
	]);

	const total = totals[0]?.total ?? 0;
	return { items: rows, meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) } };
};

// Trang chi tiết lấy theo id (phần số cuối của slug)
export const getPublishedJobById = async (id: number) => {
	const [row] = await getDb()
		.select(jobColumns)
		.from(jobs)
		.innerJoin(companies, eq(jobs.companyId, companies.id))
		.leftJoin(categories, eq(jobs.categoryId, categories.id))
		.where(and(eq(jobs.id, id), eq(jobs.status, "published")))
		.limit(1);
	return row;
};

// Id nằm ngoài khoảng int32 của Postgres sẽ làm truy vấn lỗi, nên cần chặn trước khi gọi
export const isValidId = (value: string) => /^\d{1,9}$/.test(value) && Number(value) > 0;

export const getCompanies = (limit = 50) =>
	getDb()
		.select()
		.from(companies)
		.orderBy(desc(companies.featured), asc(companies.name))
		.limit(limit);

// count được tính từ job đang đăng, không lưu trong bảng nên không bao giờ bị lệch
export const getCategoriesWithCount = () =>
	getDb()
		.select({
			id: categories.id,
			name: categories.name,
			slug: categories.slug,
			iconKey: categories.iconKey,
			count: count(jobs.id),
		})
		.from(categories)
		.leftJoin(jobs, and(eq(jobs.categoryId, categories.id), eq(jobs.status, "published")))
		.groupBy(categories.id)
		.orderBy(asc(categories.sortOrder), asc(categories.name));
