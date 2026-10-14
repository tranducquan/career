import type { JobType } from "@/types";
import { jobs } from "@/data";

export const getJobLocation = (job: JobType) => (job.remote ? (job.location ? `Remote (${job.location})` : "Remote") : job.location);

export const getFeaturedJobs = (limit: number) => [...jobs].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, limit);
