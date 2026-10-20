"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, SESSION_MAX_AGE, createSessionToken } from "@/lib/session";

const digest = (value: string) => createHash("sha256").update(value).digest();

const passwordMatches = (input: string) => {
	const expected = process.env.ADMIN_PASSWORD;
	if (!expected) throw new Error("ADMIN_PASSWORD chưa được đặt");
	// Băm trước để hai chuỗi cùng độ dài, rồi so sánh theo kiểu hằng thời gian
	return timingSafeEqual(digest(input), digest(expected));
};

// Chỉ cho chuyển hướng về đường dẫn nội bộ, tránh open redirect
const safeNext = (value: FormDataEntryValue | null) => {
	const next = typeof value === "string" ? value : "";
	return next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/login") ? next : "/";
};

export async function login(formData: FormData) {
	const password = formData.get("password");
	const next = safeNext(formData.get("next"));

	if (typeof password !== "string" || !passwordMatches(password)) {
		redirect(`/login?error=1&next=${encodeURIComponent(next)}`);
	}

	(await cookies()).set(COOKIE_NAME, await createSessionToken(), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE,
	});

	redirect(next);
}

export async function logout() {
	(await cookies()).delete(COOKIE_NAME);
	redirect("/login");
}
