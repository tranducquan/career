import { cacheLife } from "next/cache";
import { getCompanies } from "@repo/db/public";
import type { CompanyType } from "@/types";

export const getTopCompanies = async (limit: number): Promise<CompanyType[]> => {
	"use cache";
	cacheLife("minutes");

	const rows = await getCompanies(limit);
	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		location: row.location,
		href: row.href,
		featured: row.featured,
		logoUrl: row.logoUrl ?? undefined,
	}));
};
