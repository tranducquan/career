import { normalize } from "@/lib/text";

export const slugify = (text: string) =>
	normalize(text)
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

type SlugSource = { id: number | string; title: string };

// "Senior UX Designer", 1 → "senior-ux-designer-1"
export const jobSlug = (job: SlugSource) => [slugify(job.title), job.id].filter(Boolean).join("-");

export const jobPath = (job: SlugSource) => `/jobs/${jobSlug(job)}`;

// "senior-ux-designer-1" → "1"
export const getIdFromSlug = (slug: string) => slug.slice(slug.lastIndexOf("-") + 1);
