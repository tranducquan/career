import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/layout/container";
import JobCard from "@/components/cards/job-card";
import JobsSearch from "@/components/jobs/jobs-search";
import Pagination from "@/components/jobs/pagination";
import { queryJobs } from "@/lib/jobs";
import { getCategories } from "@/lib/categories";
import { getCountryOptions } from "@/lib/job-countries";

export const metadata: Metadata = { title: "Find Job | JobPlatform" };

const LIMIT = 9;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const list = (v: string | string[] | undefined) => first(v)?.split(",").filter(Boolean);

export default function JobsPage({ searchParams }: { searchParams: SearchParams }) {
	return (
		<Suspense fallback={<div className="py-24 text-center text-gray-500">Loading…</div>}>
			<JobsContent searchParams={searchParams} />
		</Suspense>
	);
}

async function JobsContent({ searchParams }: { searchParams: SearchParams }) {
	const sp = await searchParams;

	const q = first(sp.q);
	const country = first(sp.country);
	const category = first(sp.category);
	const experience = first(sp.experience);
	const salary = first(sp.salary);
	const level = first(sp.level);
	const type = list(sp.type);
	const education = list(sp.education);
	const page = Math.max(1, Number.parseInt(first(sp.page) ?? "1", 10) || 1);

	const [{ items, meta }, categories, countries] = await Promise.all([queryJobs({ q, country, category, experience, level, type, education, sort: "newest", page, limit: LIMIT }), getCategories(), getCountryOptions()]);
	const filterParams = { q, country, category, experience, salary, level, type: type?.join(","), education: education?.join(",") };

	return (
		<>
			<section className="bg-gray-100 py-10 md:py-14">
				<Container>
					<h1 className="mb-6 text-3xl font-medium md:text-4xl">Find Job</h1>
					<JobsSearch
						// key đổi theo URL để form đồng bộ lại khi bấm Back hoặc đổi bộ lọc
						key={JSON.stringify(filterParams)}
						values={{ q, country, category, experience, salary, level, type, education }}
						categories={categories}
						countries={countries}
					/>
				</Container>
			</section>

			<section className="py-10 md:py-14">
				<Container>
					<p className="mb-6 text-gray-600">
						<span className="font-medium text-gray-900">{meta.total}</span> {meta.total === 1 ? "job" : "jobs"} found
					</p>

					{items.length > 0 ? (
						<ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
							{items.map((job) => (
								<li key={job.id}>
									<JobCard job={job} />
								</li>
							))}
						</ul>
					) : (
						<div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
							<p className="text-lg font-medium">No jobs match your filters</p>
							<p className="mt-1 text-gray-500">Try different keywords or reset the filters.</p>
						</div>
					)}

					<Pagination page={meta.page} totalPages={meta.totalPages} params={filterParams} />
				</Container>
			</section>
		</>
	);
}
