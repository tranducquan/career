import { countryName } from "@/lib/country";
import type { JobType } from "@/types";

export const getJobLocation = (job: JobType) => {
	const place = [job.location, job.country ? countryName(job.country) : undefined].filter(Boolean).join(", ");
	if (job.remote) return place ? `Remote (${place})` : "Remote";
	return place || undefined;
};

export const typeLabel = (type: string) => type.replace(/\s+/g, "-");
