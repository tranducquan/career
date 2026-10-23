export const SORT_OPTIONS = [
	{ value: "newest", label: "Latest" },
	{ value: "deadline", label: "Deadline" },
] as const;

export const LIMIT_OPTIONS = [12, 24, 48] as const;
export const DEFAULT_LIMIT = 12;

export const buildJobsHref = (params: Record<string, string | undefined>, page: number) => {
	const sp = new URLSearchParams();
	Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
	if (page > 1) sp.set("page", String(page));
	const qs = sp.toString();
	return qs ? `/jobs?${qs}` : "/jobs";
};
