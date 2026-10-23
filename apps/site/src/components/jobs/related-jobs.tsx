import { cacheLife } from "next/cache";
import Container from "@/components/layout/container";
import JobCard from "@/components/cards/job-card";
import { queryJobs } from "@/lib/jobs";
import Section from "../layout/section";

const RELATED_LIMIT = 6;

const getRelatedJobs = async (jobId: string, category: string) => {
	"use cache";
	cacheLife("minutes");

	// Lấy dư 1 để còn loại chính job đang xem
	const { items } = await queryJobs({ category, sort: "newest", page: 1, limit: RELATED_LIMIT + 1 });
	return items.filter((j) => String(j.id) !== jobId).slice(0, RELATED_LIMIT);
};

type Props = { jobId: number | string; category?: string };

const RelatedJobs = async ({ jobId, category }: Props) => {
	if (!category) return null;

	const jobs = await getRelatedJobs(String(jobId), category);
	if (jobs.length === 0) return null;

	return (
		<Section aria-labelledby="related-jobs" className="border-t border-gray-200">
			<Container>
				<h2 id="related-jobs" className="mb-6 text-xl leading-normal font-medium text-gray-900 md:mb-8 md:text-2xl lg:text-3xl">
					Related Jobs
				</h2>
				<ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
					{jobs.map((job) => (
						<li key={job.id}>
							<JobCard job={job} />
						</li>
					))}
				</ul>
			</Container>
		</Section>
	);
};

export const RelatedJobsFallback = () => (
	<Section aria-hidden className="border-t border-gray-200">
		<Container>
			<div className="animate-pulse motion-reduce:animate-none">
				<div className="mb-6 h-7 w-40 rounded bg-gray-100 md:mb-8 md:h-8" />
				<div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
					{Array.from({ length: RELATED_LIMIT }, (_, i) => (
						<div key={i} className="h-48 rounded-xl bg-gray-100" />
					))}
				</div>
			</div>
		</Container>
	</Section>
);

export default RelatedJobs;
