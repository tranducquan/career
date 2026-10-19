// Thêm ?message=... vào đường dẫn (giữ nguyên các tham số đang có) để trang đích hiện thông báo
export const withMessage = (path: string, message: string) => {
	const url = new URL(path, "http://local");
	url.searchParams.set("message", message);
	return `${url.pathname}${url.search}`;
};
