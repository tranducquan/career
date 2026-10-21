import type { JobType } from "@/types";

export const getJobLocation = (job: JobType) => (job.remote ? (job.location ? `Remote (${job.location})` : "Remote") : job.location);

export const typeLabel = (type: string) => type.replace(/\s+/g, "-");
