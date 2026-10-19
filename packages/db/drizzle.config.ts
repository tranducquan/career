import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) throw new Error("Thiếu DATABASE_URL_UNPOOLED hoặc DATABASE_URL trong packages/db/.env");

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/schema/index.ts",
	out: "./drizzle",
	dbCredentials: { url },
});
