import { cacheLife } from "next/cache";
import { getCategoriesWithCount } from "@repo/db/public";

export const getCategories = async () => {
	"use cache";
	cacheLife("minutes");

	const rows = await getCategoriesWithCount();
	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		slug: row.slug,
		count: row.count,
		iconKey: row.iconKey ?? undefined,
		href: `/jobs?category=${encodeURIComponent(row.slug)}`,
	}));
};
