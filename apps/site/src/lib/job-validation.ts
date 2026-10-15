import type { JobType } from "@/types";

type JobInput = Omit<JobType, "id">;
type Result = { ok: true; data: JobInput } | { ok: false; errors: Record<string, string> };

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const optionalStr = (value: unknown) => str(value) || undefined;
const strList = (value: unknown) => (Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim() !== "").map((item) => item.trim()) : undefined);

export const validateJobInput = (body: unknown): Result => {
	if (typeof body !== "object" || body === null || Array.isArray(body)) {
		return { ok: false, errors: { body: "Body must be a JSON object" } };
	}

	const b = body as Record<string, unknown>;
	const errors: Record<string, string> = {};

	const title = str(b.title);
	const company = str(b.company);
	const type = str(b.type);
	const description = str(b.description);
	const location = optionalStr(b.location);
	const remote = b.remote === true;

	if (!title) errors.title = "Title is required";
	else if (title.length > 150) errors.title = "Title must be at most 150 characters";
	if (!company) errors.company = "Company is required";
	if (!type) errors.type = "Type is required";
	if (!description) errors.description = "Description is required";
	else if (description.length > 10000) errors.description = "Description must be at most 10000 characters";
	if (!location && !remote) errors.location = "Location is required for non-remote jobs";

	if (Object.keys(errors).length > 0) return { ok: false, errors };

	return {
		ok: true,
		data: {
			title,
			company,
			type,
			description,
			location,
			remote,
			featured: b.featured === true,
			salary: optionalStr(b.salary),
			salaryRange: optionalStr(b.salaryRange),
			salaryType: optionalStr(b.salaryType),
			level: optionalStr(b.level),
			education: optionalStr(b.education),
			experience: optionalStr(b.experience),
			postedAt: optionalStr(b.postedAt),
			deadline: optionalStr(b.deadline),
			responsibilities: strList(b.responsibilities),
			requirements: strList(b.requirements),
			desirable: strList(b.desirable),
			benefits: strList(b.benefits),
			perks: strList(b.perks),
			tags: strList(b.tags),
		},
	};
};
