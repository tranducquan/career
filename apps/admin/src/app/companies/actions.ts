"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { createCompany, deleteCompany, updateCompany } from "@repo/db/admin";
import { companyInputSchema, issuesToErrors } from "@repo/db/validation";
import { isForeignKeyError } from "@/lib/db-errors";
import { stringValues, type FormState } from "@/lib/form-state";
import { parseId } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";

// id = null: tạo mới, có id: cập nhật. Trang gắn id bằng .bind(null, id)
export async function saveCompany(id: number | null, _state: FormState, formData: FormData): Promise<FormState> {
	await requireAdmin();

	const values = stringValues(formData);
	const parsed = companyInputSchema.safeParse(values);
	if (!parsed.success) return { errors: issuesToErrors(parsed.error), values };

	if (id === null) {
		await createCompany(parsed.data);
	} else {
		const updated = await updateCompany(id, parsed.data);
		if (!updated) notFound();
	}

	revalidatePath("/companies");
	// redirect phải nằm ngoài try/catch vì nó hoạt động bằng cách ném một lỗi đặc biệt
	redirect("/companies");
}

export async function deleteCompanyAction(formData: FormData) {
	await requireAdmin();

	const id = parseId(String(formData.get("id") ?? ""));
	if (!id) redirect("/companies?error=invalid");

	try {
		await deleteCompany(id);
	} catch (error) {
		if (isForeignKeyError(error)) redirect("/companies?error=has-jobs");
		throw error;
	}

	revalidatePath("/companies");
	redirect("/companies");
}
