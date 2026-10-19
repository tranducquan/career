import "dotenv/config";
import { sql } from "drizzle-orm";
import { getDb } from "../src/client";

// Xoá TOÀN BỘ dữ liệu. Chỉ dùng trên branch dev của Neon.
if (process.env.CONFIRM_RESET !== "yes") {
	console.error("Từ chối chạy. Thêm CONFIRM_RESET=yes vào lệnh để xác nhận xoá toàn bộ dữ liệu.");
	process.exit(1);
}

const url = process.env.DATABASE_URL;
if (!url) {
	console.error("DATABASE_URL chưa được đặt.");
	process.exit(1);
}

// In tên máy chủ để bạn nhìn thấy mình đang xoá database nào
console.log(`Đang xoá dữ liệu trên: ${new URL(url).host}`);

await getDb().execute(sql`TRUNCATE TABLE jobs, categories, companies RESTART IDENTITY CASCADE`);

console.log("Đã xoá toàn bộ dữ liệu.");
