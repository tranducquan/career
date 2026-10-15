import { NextResponse, type NextRequest } from "next/server";
import { getJob, toJobDTO } from "@/lib/jobs";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Context) {
	const { slug } = await params;
	const job = getJob(slug);

	if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

	return NextResponse.json({ data: toJobDTO(job) }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}
