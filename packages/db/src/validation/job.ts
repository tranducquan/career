import { z } from "zod";
import { jobStatuses } from "../schema/jobs";
import { checkbox, lines, nullableDate, nullableText, countryCode } from "./shared";

export const jobInputSchema = z
	.object({
		companyId: z.coerce.number().int().positive("Choose a company"),
		// Ô chọn danh mục để trống thì là null
		categoryId: z.preprocess((value) => (value === "" || value == null ? null : value), z.coerce.number().int().positive().nullable()),
		title: z.string().trim().min(1, "Title is required").max(150),
		type: z.string().trim().min(1, "Type is required").max(50),
		level: nullableText,
		location: nullableText,
		country: countryCode,
		remote: checkbox,
		featured: checkbox,
		status: z.enum(jobStatuses),
		salary: nullableText,
		salaryRange: nullableText,
		salaryType: nullableText,
		education: nullableText,
		experience: nullableText,
		postedAt: nullableDate,
		deadline: nullableDate,
		description: z.string().trim().min(1, "Description is required").max(10000),
		responsibilities: lines,
		requirements: lines,
		desirable: lines,
		benefits: lines,
		perks: lines,
		tags: lines,
	})
	.refine((job) => job.remote || job.location, { message: "Location is required for non-remote jobs", path: ["location"] });

export type JobInput = z.infer<typeof jobInputSchema>;
