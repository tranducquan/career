import { and, asc, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { getDb } from "../client";
import { categories, companies, jobs } from "../schema";

// File này chỉ chứa truy vấn đọc, và chỉ lấy job đã đăng (published).
// Site công khai chỉ nên import từ "@repo/db/public".

const escapeLike = (value: string) => value.replace(/[\\%_]/g, (char) => `\\${char}`);

export type PublicJobQuery = {
	q?: string;
	type?: string[];
	level?: string;
	experience?: string;
	education?: string[];
	location?: string;
	category?: string;
	remote?: boolean;
	featured?: boolean;
	sort?: "newest" | "deadline";
	page: number;
	limit: number;
	country?: string; // mã ISO, ví dụ "VN"
};

// So khớp không phân biệt hoa thường và coi "-" như khoảng trắng ("Full-time" = "Full Time")
const norm = (value: string) => value.toLowerCase().replaceAll("-", " ").replace(/\s+/g, " ").trim();

const anyOf = (column: typeof jobs.type | typeof jobs.education, values?: string[]) => (values?.length ? or(...values.map((v) => sql`replace(lower(${column}), '-', ' ') = ${norm(v)}`)) : undefined);

const jobColumns = {
	job: jobs,
	companyName: companies.name,
	companyLogoUrl: companies.logoUrl,
	categoryName: categories.name,
	categorySlug: categories.slug,
};

export const getPublishedJobs = async ({ q, type, level, experience, education, location, country, category, remote, featured, sort = "newest", page, limit }: PublicJobQuery) => {
	const db = getDb();
	const search = q?.trim() ? `%${escapeLike(q.trim())}%` : undefined;
	const wantsRemote = type?.some((t) => norm(t) === "remote");
	const types = type?.filter((t) => norm(t) !== "remote");

	const where = and(
		eq(jobs.status, "published"),
		search ? or(ilike(jobs.title, search), ilike(companies.name, search), sql`array_to_string(${jobs.tags}, ' ') ilike ${search}`) : undefined,
		// Chọn "Remote" cùng loại khác thì lấy job thuộc loại đó HOẶC remote
		or(anyOf(jobs.type, types), wantsRemote ? eq(jobs.remote, true) : undefined),
		anyOf(jobs.education, education),
		level ? ilike(jobs.level, `${escapeLike(level)}%`) : undefined, // "Entry" khớp "Entry Level"
		experience ? sql`replace(lower(${jobs.experience}), ' ', '') = ${norm(experience).replaceAll(" ", "")}` : undefined, // "1 - 2 Years" = "1-2 Years"
		location ? ilike(jobs.location, `%${escapeLike(location)}%`) : undefined,
		category ? eq(categories.slug, category) : undefined,
		remote === undefined ? undefined : eq(jobs.remote, remote),
		featured === undefined ? undefined : eq(jobs.featured, featured),
		location ? ilike(jobs.location, `%${escapeLike(location)}%`) : undefined,
		country ? eq(jobs.country, country.toUpperCase()) : undefined,
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

export const getCompanies = (limit = 50) => getDb().select().from(companies).orderBy(desc(companies.featured), asc(companies.name)).limit(limit);

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

// Các nước đang có job published, kèm số job
export const getJobCountries = () =>
	getDb()
		.select({ code: jobs.country, count: count() })
		.from(jobs)
		.where(and(eq(jobs.status, "published"), sql`${jobs.country} is not null`))
		.groupBy(jobs.country);

// Các tag xuất hiện nhiều nhất trong job đang đăng
export const getPopularTags = async (limit = 10) => {
	const db = getDb();
	const tag = sql<string>`unnest(${jobs.tags})`.as("tag");
	const source = db.select({ tag }).from(jobs).where(eq(jobs.status, "published")).as("t");

	return db.select({ tag: source.tag, total: count() }).from(source).groupBy(source.tag).orderBy(desc(count()), asc(source.tag)).limit(limit);
};
