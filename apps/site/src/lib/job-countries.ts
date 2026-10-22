import { cacheLife } from "next/cache";
import { getJobCountries } from "@repo/db/public";
import { countryName } from "@/lib/country";

export const getCountryOptions = async () => {
	"use cache";
	cacheLife("minutes");

	const rows = await getJobCountries();
	return rows
		.filter((row): row is { code: string; count: number } => !!row.code)
		.map((row) => ({ code: row.code, name: countryName(row.code), count: row.count }))
		.sort((a, b) => a.name.localeCompare(b.name, "vi"));
};
