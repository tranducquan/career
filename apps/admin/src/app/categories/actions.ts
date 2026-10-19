"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { createCategory, deleteCategory, updateCategory } from "@repo/db/admin";
import { categoryInputSchema, issuesToErrors } from "@repo/db/validation";
import { isForeignKeyError, isUniqueError } from "@/lib/db-errors";
import { stringValues, type FormState } from "@/lib/form-state";
import { parseId } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";
import { withMessage } from "@/lib/redirect";

// id = null: tạo mới, có id: cập nhật. Trang gắn id bằng .bind(null, id)
export async function saveCategory(id: number | null, _state: FormState, formData: FormData): Promise<FormState> {
	await requireAdmin();

	const values = stringValues(formData);
	const parsed = categoryInputSchema.safeParse(values);
	if (!parsed.success) return { errors: issuesToErrors(parsed.error), values };

	let found = true;
	try {
		if (id === null) await createCategory(parsed.data);
		else found = !!(await updateCategory(id, parsed.data));
	} catch (error) {
		if (isUniqueError(error)) return { errors: { slug: `Slug "${parsed.data.slug}" is already used by another category` }, values };
		throw error;
	}

	if (!found) notFound();

	revalidatePath("/categories");
	redirect(withMessage("/categories", id === null ? "created" : "updated"));
}

export async function deleteCategoryAction(formData: FormData) {
	await requireAdmin();

	const id = parseId(String(formData.get("id") ?? ""));
	if (!id) redirect("/categories?error=invalid");

	try {
		await deleteCategory(id);
	} catch (error) {
		if (isForeignKeyError(error)) redirect("/categories?error=has-jobs");
		throw error;
	}

	revalidatePath("/categories");
	redirect(withMessage("/categories", "deleted"));
}
