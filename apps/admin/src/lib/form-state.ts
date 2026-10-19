// Kết quả trả về từ server action khi dữ liệu không hợp lệ
export type FormState =
	| {
			errors?: Record<string, string>;
			// Giữ lại những gì người dùng đã nhập để không phải gõ lại
			values?: Record<string, string>;
	  }
	| undefined;

export const stringValues = (formData: FormData) => {
	const values: Record<string, string> = {};
	for (const [key, value] of formData.entries()) {
		if (typeof value === "string") values[key] = value;
	}
	return values;
};
