import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/layout/container";
import JobCard from "@/components/cards/job-card";
import JobsSearch from "@/components/jobs/jobs-search";
import JobsToolbar from "@/components/jobs/jobs-toolbar";
import { DEFAULT_LIMIT, LIMIT_OPTIONS } from "@/lib/jobs-view";
import PopularSearches from "@/components/jobs/popular-searches";
import Pagination from "@/components/jobs/pagination";
import { queryJobs } from "@/lib/jobs";
import { getCategories } from "@/lib/categories";
import { getCountryOptions } from "@/lib/job-countries";
import { getTopTags } from "@/lib/popular-tags";
import Section from "@/components/layout/section";

export const metadata: Metadata = { title: "Find Job | JobPlatform" };

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

	const sort = first(sp.sort) === "deadline" ? "deadline" : "newest";
	const limitParam = Number(first(sp.limit));
	const limit = (LIMIT_OPTIONS as readonly number[]).includes(limitParam) ? limitParam : DEFAULT_LIMIT;
	const view = first(sp.view) === "list" ? "list" : "grid";

	const [{ items, meta }, categories, countries, tags] = await Promise.all([queryJobs({ q, country, category, experience, level, type, education, sort, page, limit }), getCategories(), getCountryOptions(), getTopTags(10)]);

	const filterParams = { q, country, category, experience, salary, level, type: type?.join(","), education: education?.join(",") };
	const pageParams = {
		...filterParams,
		sort: sort === "newest" ? undefined : sort,
		limit: limit === DEFAULT_LIMIT ? undefined : String(limit),
		view: view === "grid" ? undefined : view,
	};

	const extra = { sort: sort === "newest" ? undefined : sort, limit: limit === DEFAULT_LIMIT ? undefined : String(limit), view: view === "grid" ? undefined : view };

	return (
		<>
			<section className="relative z-10 bg-gray-100 pb-6 ">
				<Container>
					<JobsSearch key={JSON.stringify(filterParams)} values={{ q, country, category, experience, salary, level, type, education }} categories={categories} countries={countries} viewState={{ sort, limit, view }} />
					<PopularSearches tags={tags} active={q} extra={extra} />
				</Container>
			</section>

			<Section className="pt-6!">
				<Container>
					<div className="mb-6 flex flex-wrap items-center justify-between gap-4">
						<p className="text-gray-600">
							<span className="font-medium text-gray-900">{meta.total}</span> {meta.total === 1 ? "job" : "jobs"} found
						</p>
						<JobsToolbar params={filterParams} sort={sort} limit={limit} view={view} />
					</div>

					{items.length > 0 ? (
						<ul className={view === "list" ? "grid gap-4 md:gap-6" : "grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3"}>
							{items.map((job) => (
								<li key={job.id}>
									<JobCard job={job} layout={view === "list" ? "horizontal" : "vertical"} />
								</li>
							))}
						</ul>
					) : (
						<div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
							<p className="text-lg font-medium">No jobs match your filters</p>
							<p className="mt-1 text-gray-500">Try different keywords or reset the filters.</p>
						</div>
					)}

					<Pagination page={meta.page} totalPages={meta.totalPages} params={pageParams} />
				</Container>
			</Section>
		</>
	);
}
