"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { createJob, deleteJob, updateJob, updateJobStatus } from "@repo/db/admin";
import { jobStatuses } from "@repo/db/schema";
import { issuesToErrors, jobInputSchema } from "@repo/db/validation";
import { isForeignKeyError } from "@/lib/db-errors";
import { stringValues, type FormState } from "@/lib/form-state";
import { parseId } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";

// Chỉ cho quay về đường dẫn nội bộ thuộc /jobs (giữ lại ô tìm kiếm, bộ lọc và trang)
const returnPath = (formData: FormData) => {
	const value = String(formData.get("returnTo") ?? "");
	return value.startsWith("/jobs") && !value.startsWith("//") ? value : "/jobs";
};

// id = null: tạo mới, có id: cập nhật. Trang gắn id bằng .bind(null, id)
export async function saveJob(id: number | null, _state: FormState, formData: FormData): Promise<FormState> {
	await requireAdmin();

	const values = stringValues(formData);
	const parsed = jobInputSchema.safeParse(values);
	if (!parsed.success) return { errors: issuesToErrors(parsed.error), values };

	let found = true;
	try {
		if (id === null) await createJob(parsed.data);
		else found = !!(await updateJob(id, parsed.data));
	} catch (error) {
		// Công ty hoặc danh mục đã bị xoá ngay trước khi lưu
		if (isForeignKeyError(error)) return { errors: { companyId: "The selected company or category no longer exists" }, values };
		throw error;
	}

	if (!found) notFound();

	revalidatePath("/jobs");
	redirect("/jobs");
}

export async function setJobStatusAction(formData: FormData) {
	await requireAdmin();

	const id = parseId(String(formData.get("id") ?? ""));
	const status = String(formData.get("status") ?? "");
	const back = returnPath(formData);

	if (!id || !(jobStatuses as readonly string[]).includes(status)) redirect(back);

	await updateJobStatus(id, status as (typeof jobStatuses)[number]);

	revalidatePath("/jobs");
	redirect(back);
}

export async function deleteJobAction(formData: FormData) {
	await requireAdmin();

	const id = parseId(String(formData.get("id") ?? ""));
	const back = returnPath(formData);
	if (!id) redirect(back);

	await deleteJob(id);

	revalidatePath("/jobs");
	redirect(back);
}
