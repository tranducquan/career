import { z } from "zod";
import { checkbox, nullableText } from "./shared";

export const companyInputSchema = z.object({
	name: z.string().trim().min(1, "Name is required").max(150),
	location: z.string().trim().min(1, "Location is required").max(150),
	href: z.preprocess((value) => (typeof value === "string" && value.trim() !== "" ? value.trim() : "#"), z.string().max(300)),
	logoUrl: nullableText,
	featured: checkbox,
});

export type CompanyInput = z.infer<typeof companyInputSchema>;
