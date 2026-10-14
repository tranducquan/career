import { companies } from "@/data";

export const getTopCompanies = (limit: number) => [...companies].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, limit);
