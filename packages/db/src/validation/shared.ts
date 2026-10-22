import { z } from "zod";

// Checkbox của form gửi "on" khi được chọn, không gửi gì khi bỏ chọn
export const checkbox = z.preprocess((value) => value === "on" || value === "true" || value === true, z.boolean());

// Ô trống hoặc thiếu field thì thành null, để khi sửa vẫn xoá được giá trị cũ
const emptyToNull = (value: unknown) => (typeof value === "string" && value.trim() !== "" ? value.trim() : null);

export const nullableText = z.preprocess(emptyToNull, z.string().max(300).nullable());

export const nullableDate = z.preprocess(
	emptyToNull,
	z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD")
		.nullable(),
);

// Một ô văn bản, mỗi dòng một mục
export const lines = z.preprocess(
	(value) =>
		typeof value === "string"
			? value
					.split(/\r?\n/)
					.map((line) => line.trim())
					.filter(Boolean)
			: [],
	z.array(z.string().max(500)).max(50),
);

// Đổi lỗi của Zod thành { tênField: thôngBáo } để hiện ở đầu form
export const issuesToErrors = (error: z.ZodError) => {
	const errors: Record<string, string> = {};
	for (const issue of error.issues) {
		const key = issue.path.join(".") || "form";
		errors[key] ??= issue.message;
	}
	return errors;
};

// "Graphics & Design" -> "graphics-design", bỏ dấu tiếng Việt
export const slugify = (text: string) =>
	text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/gi, "d")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

// Logo: tên icon thesvg ("thesvg:figma"), link http(s) hoặc đường dẫn nội bộ "/..."
const logoPattern = /^(thesvg:[a-z0-9-]+|https?:\/\/\S+|\/\S+)$/i;

export const logoValue = z.preprocess(emptyToNull, z.string().max(300).regex(logoPattern, "Logo must be an icon name or a link starting with http(s):// or /").nullable());

export const countryCode = z.preprocess(
	(value) => (typeof value === "string" && value.trim() !== "" ? value.trim().toUpperCase() : null),
	z
		.string()
		.regex(/^[A-Z]{2}$/, "Invalid country")
		.nullable(),
);
