import { and, count, desc, asc, eq, getTableColumns, ilike } from "drizzle-orm";
import { getDb } from "../client";
import { categories, companies, jobs, type JobStatus } from "../schema";
import type { CategoryInput } from "../validation/category";
import type { CompanyInput } from "../validation/company";
import type { JobInput } from "../validation/job";

const PAGE_SIZE = 20;

const escapeLike = (value: string) => value.replace(/[\\%_]/g, (char) => `\\${char}`);

type ListParams = { q?: string; page?: number; pageSize?: number };

const pageInfo = (total: number, page: number, pageSize: number) => ({
	total,
	page,
	pageSize,
	totalPages: Math.max(1, Math.ceil(total / pageSize)),
});

// ---------- Jobs ----------

export const listJobs = async ({ q, status, page = 1, pageSize = PAGE_SIZE }: ListParams & { status?: JobStatus }) => {
	const db = getDb();
	const where = and(q ? ilike(jobs.title, `%${escapeLike(q)}%`) : undefined, status ? eq(jobs.status, status) : undefined);

	const [items, totals] = await Promise.all([
		db
			.select({
				id: jobs.id,
				title: jobs.title,
				type: jobs.type,
				status: jobs.status,
				featured: jobs.featured,
				postedAt: jobs.postedAt,
				updatedAt: jobs.updatedAt,
				company: companies.name,
				category: categories.name,
			})
			.from(jobs)
			.innerJoin(companies, eq(jobs.companyId, companies.id))
			.leftJoin(categories, eq(jobs.categoryId, categories.id))
			.where(where)
			.orderBy(desc(jobs.updatedAt))
			.limit(pageSize)
			.offset((page - 1) * pageSize),
		db.select({ total: count() }).from(jobs).where(where),
	]);

	return { items, ...pageInfo(totals[0]?.total ?? 0, page, pageSize) };
};

// Số job theo từng trạng thái, dùng cho các tab "All | Published | Draft | Closed"
export const countJobsByStatus = async () => {
	const rows = await getDb().select({ status: jobs.status, total: count() }).from(jobs).groupBy(jobs.status);
	const result: Record<JobStatus, number> = { draft: 0, published: 0, closed: 0 };
	for (const row of rows) result[row.status] = row.total;
	return result;
};

export const getJob = async (id: number) => {
	const [job] = await getDb().select().from(jobs).where(eq(jobs.id, id)).limit(1);
	return job;
};

export const createJob = async (input: JobInput) => {
	const [created] = await getDb().insert(jobs).values(input).returning({ id: jobs.id });
	return created;
};

export const updateJob = async (id: number, input: JobInput) => {
	const [updated] = await getDb()
		.update(jobs)
		.set({ ...input, updatedAt: new Date() })
		.where(eq(jobs.id, id))
		.returning({ id: jobs.id });
	return updated;
};

export const updateJobStatus = async (id: number, status: JobStatus) => {
	const [updated] = await getDb().update(jobs).set({ status, updatedAt: new Date() }).where(eq(jobs.id, id)).returning({ id: jobs.id });
	return updated;
};

export const deleteJob = async (id: number) => {
	const [deleted] = await getDb().delete(jobs).where(eq(jobs.id, id)).returning({ id: jobs.id });
	return deleted;
};

// ---------- Companies ----------

// jobCount giúp biết vì sao một công ty không xoá được
export const listCompanies = async ({ q, page = 1, pageSize = PAGE_SIZE }: ListParams) => {
	const db = getDb();
	const where = q ? ilike(companies.name, `%${escapeLike(q)}%`) : undefined;

	const [items, totals] = await Promise.all([
		db
			.select({ ...getTableColumns(companies), jobCount: count(jobs.id) })
			.from(companies)
			.leftJoin(jobs, eq(jobs.companyId, companies.id))
			.where(where)
			.groupBy(companies.id)
			.orderBy(desc(companies.createdAt))
			.limit(pageSize)
			.offset((page - 1) * pageSize),
		db.select({ total: count() }).from(companies).where(where),
	]);

	return { items, ...pageInfo(totals[0]?.total ?? 0, page, pageSize) };
};

// Dùng cho ô chọn công ty trong form job
export const listCompanyOptions = () => getDb().select({ id: companies.id, name: companies.name }).from(companies).orderBy(companies.name);

export const getCompany = async (id: number) => {
	const [company] = await getDb().select().from(companies).where(eq(companies.id, id)).limit(1);
	return company;
};

export const createCompany = async (input: CompanyInput) => {
	const [created] = await getDb().insert(companies).values(input).returning({ id: companies.id });
	return created;
};

export const updateCompany = async (id: number, input: CompanyInput) => {
	const [updated] = await getDb().update(companies).set(input).where(eq(companies.id, id)).returning({ id: companies.id });
	return updated;
};

// Báo lỗi nếu công ty còn job (khoá ngoại restrict), action cần bắt lỗi này
export const deleteCompany = async (id: number) => {
	const [deleted] = await getDb().delete(companies).where(eq(companies.id, id)).returning({ id: companies.id });
	return deleted;
};

// ---------- Categories ----------

export const listCategories = async ({ q, page = 1, pageSize = PAGE_SIZE }: ListParams) => {
	const db = getDb();
	const where = q ? ilike(categories.name, `%${escapeLike(q)}%`) : undefined;

	const [items, totals] = await Promise.all([
		db
			.select({ ...getTableColumns(categories), jobCount: count(jobs.id) })
			.from(categories)
			.leftJoin(jobs, eq(jobs.categoryId, categories.id))
			.where(where)
			.groupBy(categories.id)
			.orderBy(asc(categories.sortOrder), asc(categories.name))
			.limit(pageSize)
			.offset((page - 1) * pageSize),
		db.select({ total: count() }).from(categories).where(where),
	]);

	return { items, ...pageInfo(totals[0]?.total ?? 0, page, pageSize) };
};

// Dùng cho ô chọn danh mục trong form job
export const listCategoryOptions = () => getDb().select({ id: categories.id, name: categories.name }).from(categories).orderBy(asc(categories.sortOrder), asc(categories.name));

export const getCategory = async (id: number) => {
	const [category] = await getDb().select().from(categories).where(eq(categories.id, id)).limit(1);
	return category;
};

// Slug trùng sẽ báo lỗi unique, action cần bắt lỗi này
export const createCategory = async (input: CategoryInput) => {
	const [created] = await getDb().insert(categories).values(input).returning({ id: categories.id });
	return created;
};

export const updateCategory = async (id: number, input: CategoryInput) => {
	const [updated] = await getDb().update(categories).set(input).where(eq(categories.id, id)).returning({ id: categories.id });
	return updated;
};

// Báo lỗi nếu danh mục còn job (khoá ngoại restrict), action cần bắt lỗi này
export const deleteCategory = async (id: number) => {
	const [deleted] = await getDb().delete(categories).where(eq(categories.id, id)).returning({ id: categories.id });
	return deleted;
};
