// lib/blog-filters.ts
export type BlogFilters = {
	q?: string;
	category?: string;
	tag?: string;
	page?: number | string;
};

export const buildBlogHref = (filters: BlogFilters) => {
	const params = new URLSearchParams();

	if (filters.q) params.set("q", filters.q);
	if (filters.category) params.set("category", filters.category);
	if (filters.tag) params.set("tag", filters.tag);
	if (filters.page && Number(filters.page) > 1) params.set("page", String(filters.page));

	const query = params.toString();
	return query ? `/blog?${query}` : "/blog";
};
