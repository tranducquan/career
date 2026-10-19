// Mã lỗi Postgres có thể nằm ở chính lỗi hoặc ở lỗi gốc (cause) tuỳ phiên bản driver và ORM
const getPgCode = (error: unknown): string | undefined => {
	let current: unknown = error;
	for (let depth = 0; depth < 5 && current && typeof current === "object"; depth++) {
		const code = (current as { code?: unknown }).code;
		if (typeof code === "string") return code;
		current = (current as { cause?: unknown }).cause;
	}
	return undefined;
};

// Vi phạm khoá ngoại. Với ON DELETE RESTRICT, Postgres báo 23001 (restrict_violation) chứ không phải 23503,
// nên phải nhận cả hai mã: 23001 khi xoá bản ghi còn được tham chiếu, 23503 khi trỏ tới bản ghi không tồn tại
export const isForeignKeyError = (error: unknown) => {
	const code = getPgCode(error);
	return code === "23503" || code === "23001";
};

// Trùng giá trị unique (ví dụ slug)
export const isUniqueError = (error: unknown) => getPgCode(error) === "23505";
