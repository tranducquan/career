import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifySessionToken } from "@/lib/session";

export const isAdmin = async () => verifySessionToken((await cookies()).get(COOKIE_NAME)?.value);

// Gọi ở đầu mọi page quản trị và mọi server action ghi dữ liệu.
// Proxy chỉ là lớp đầu, lớp này mới là lớp bảo vệ thật.
export const requireAdmin = async () => {
	if (!(await isAdmin())) redirect("/login");
};
