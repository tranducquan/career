import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const create = () => {
	const url = process.env.DATABASE_URL;
	if (!url) throw new Error("DATABASE_URL chưa được đặt");
	return drizzle(neon(url), { schema });
};

let instance: ReturnType<typeof create> | undefined;

// Tạo kết nối khi cần dùng, để import package không làm hỏng build khi chưa có biến môi trường
export const getDb = () => (instance ??= create());
