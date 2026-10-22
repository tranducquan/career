export const SORT_OPTIONS = [
	{ value: "newest", label: "Latest" },
	{ value: "deadline", label: "Deadline" },
] as const;

export const LIMIT_OPTIONS = [12, 24, 48] as const;
export const DEFAULT_LIMIT = 12;
