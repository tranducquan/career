import { cacheLife } from "next/cache";
import { getPublishedJobById, getPublishedJobs, isValidId } from "@repo/db/public";
import type { JobType } from "@/types";
import { getIdFromSlug } from "@/lib/slug";

export type JobQuery = {
	q?: string;
	type?: string;
	level?: string;
	location?: string;
	category?: string; // slug danh mục
	remote?: boolean;
	featured?: boolean;
	sort?: "newest" | "deadline";
	page: number;
	limit: number;
};

type Row = Awaited<ReturnType<typeof getPublishedJobs>>["items"][number];

const opt = <T>(value: T | null | undefined) => value ?? undefined;

// Chuyển dòng database sang JobType để component không phải sửa
const toJob = ({ job, companyName, companyLogoUrl }: Row): JobType => ({
	id: job.id,
	title: job.title,
	company: companyName,
	logoUrl: opt(companyLogoUrl),
	featured: job.featured,
	location: opt(job.location),
	remote: job.remote,
	type: job.type,
	salary: opt(job.salary),
	salaryRange: opt(job.salaryRange),
	salaryType: opt(job.salaryType),
	level: opt(job.level),
	education: opt(job.education),
	experience: opt(job.experience),
	postedAt: opt(job.postedAt),
	deadline: opt(job.deadline),
	description: job.description,
	responsibilities: job.responsibilities,
	requirements: job.requirements,
	desirable: job.desirable,
	benefits: job.benefits,
	perks: job.perks,
	tags: job.tags,
});

export const queryJobs = async (query: JobQuery) => {
	"use cache";
	cacheLife("minutes");

	const { items, meta } = await getPublishedJobs(query);
	return { items: items.map(toJob), meta };
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const getJob = async (slug: string) => {
	"use cache";
	cacheLife("minutes");

	const id = getIdFromSlug(slug);
	if (!isValidId(id)) return undefined;

	const row = await getPublishedJobById(Number(id));
	return row ? toJob(row) : undefined;
};

// Job featured lên đầu, thiếu thì lấy thêm job mới nhất cho đủ
export const getFeaturedJobs = async (limit: number) => {
	"use cache";
	cacheLife("minutes");

	const featured = await getPublishedJobs({ featured: true, page: 1, limit });
	const items = featured.items.map(toJob);
	if (items.length >= limit) return items;

	const rest = await getPublishedJobs({ featured: false, page: 1, limit: limit - items.length });
	return [...items, ...rest.items.map(toJob)];
};
