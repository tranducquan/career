import { NextResponse, type NextRequest } from "next/server";
import { createJob, getJobSlug, queryJobs, toJobDTO } from "@/lib/jobs";
import { validateJobInput } from "@/lib/job-validation";

const MAX_LIMIT = 50;

const parseBool = (value: string | null) => (value === null ? undefined : value === "true" || value === "1");

const parseInt = (value: string | null, fallback: number, min: number, max: number) => {
	const n = Number.parseInt(value ?? "", 10);
	return Number.isNaN(n) ? fallback : Math.min(Math.max(n, min), max);
};

export async function GET(request: NextRequest) {
	const sp = request.nextUrl.searchParams;
	const sort = sp.get("sort");

	const { items, meta } = queryJobs({
		q: sp.get("q") ?? undefined,
		type: sp.get("type") ?? undefined,
		level: sp.get("level") ?? undefined,
		location: sp.get("location") ?? undefined,
		remote: parseBool(sp.get("remote")),
		featured: parseBool(sp.get("featured")),
		sort: sort === "deadline" ? "deadline" : "newest",
		page: parseInt(sp.get("page"), 1, 1, Number.MAX_SAFE_INTEGER),
		limit: parseInt(sp.get("limit"), 12, 1, MAX_LIMIT),
	});

	return NextResponse.json({ data: items.map(toJobDTO), meta }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}

export async function POST(request: NextRequest) {
	// TODO: kiểm tra đăng nhập và quyền employer trước khi cho tạo job
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const result = validateJobInput(body);
	if (!result.ok) {
		return NextResponse.json({ error: "Validation failed", errors: result.errors }, { status: 422 });
	}

	const job = createJob(result.data);
	return NextResponse.json({ data: toJobDTO(job) }, { status: 201, headers: { Location: `/api/jobs/${getJobSlug(job)}` } });
}
