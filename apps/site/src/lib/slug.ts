import { normalize } from "@/lib/text";

export const slugify = (text: string) =>
	normalize(text)
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

export const jobPath = (job: { id: number | string; title: string }) => `/jobs/${slugify(job.title)}-${job.id}`;

// "senior-ux-designer-1" → "1"
export const getIdFromSlug = (slug: string) => slug.slice(slug.lastIndexOf("-") + 1);
