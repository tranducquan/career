import { cacheLife } from "next/cache";
import { getPopularTags } from "@repo/db/public";

export const getTopTags = async (limit = 10) => {
	"use cache";
	cacheLife("minutes");

	const rows = await getPopularTags(limit);
	return rows.map((row) => row.tag);
};
