import { z } from "zod";
import { nullableText, slugify } from "./shared";

export const categoryInputSchema = z
	.object({
		name: z.string().trim().min(1, "Name is required").max(100),
		// Để trống thì tự sinh từ tên
		slug: z.preprocess((value) => (typeof value === "string" ? value : ""), z.string().max(100)),
		iconKey: nullableText,
		sortOrder: z.preprocess((value) => (value === "" || value == null ? 0 : value), z.coerce.number().int().min(0).max(9999)),
	})
	.transform((category) => ({ ...category, slug: slugify(category.slug || category.name) }))
	.refine((category) => category.slug.length > 0, { message: "Slug is required", path: ["slug"] });

export type CategoryInput = z.infer<typeof categoryInputSchema>;
