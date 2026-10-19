import { jobs } from "@/data";
import type { JobType } from "@/types";
import { jobPath, jobSlug, getIdFromSlug } from "@/lib/slug";

export type JobQuery = {
	q?: string;
	type?: string;
	level?: string;
	location?: string;
	remote?: boolean;
	featured?: boolean;
	sort?: "newest" | "deadline";
	page: number;
	limit: number;
};

const toTime = (date?: string) => {
	const time = date ? Date.parse(date) : NaN;
	return Number.isNaN(time) ? 0 : time;
};

const includes = (value: string | undefined, needle: string) => !!value?.toLowerCase().includes(needle);

export const queryJobs = ({ q, type, level, location, remote, featured, sort = "newest", page, limit }: JobQuery) => {
	const needle = q?.trim().toLowerCase();
	const place = location?.trim().toLowerCase();

	const filtered = jobs.filter((job) => {
		if (needle && !(includes(job.title, needle) || includes(job.company, needle) || job.tags?.some((tag) => includes(tag, needle)))) return false;
		if (type && job.type.toLowerCase() !== type.toLowerCase()) return false;
		if (level && job.level?.toLowerCase() !== level.toLowerCase()) return false;
		if (place && !includes(job.location, place)) return false;
		if (remote !== undefined && !!job.remote !== remote) return false;
		if (featured !== undefined && !!job.featured !== featured) return false;
		return true;
	});

	filtered.sort((a, b) => (sort === "deadline" ? toTime(a.deadline) - toTime(b.deadline) : toTime(b.postedAt) - toTime(a.postedAt)));

	const total = filtered.length;
	const start = (page - 1) * limit;

	return {
		items: filtered.slice(start, start + limit),
		meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
	};
};

export const createJob = (input: Omit<JobType, "id">): JobType => {
	const id = Math.max(0, ...jobs.map((job) => Number(job.id) || 0)) + 1;
	const job: JobType = { ...input, id };
	jobs.unshift(job);
	return job;
};

// `logo` là React component, không serialize được sang JSON nên loại ra
export const toJobDTO = (job: JobType) => {
	const { logo, ...dto } = job;
	void logo;
	return { ...dto, slug: jobSlug(job), path: jobPath(job) };
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const getJob = (slug: string) => jobs.find((job) => String(job.id) === getIdFromSlug(slug));

export const getJobLocation = (job: JobType) => (job.remote ? (job.location ? `Remote (${job.location})` : "Remote") : job.location);

export const typeLabel = (type: string) => type.replace(/\s+/g, "-");

// Job featured lên đầu, các job còn lại giữ nguyên thứ tự gốc
export const getFeaturedJobs = (limit: number) => [...jobs].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, limit);
