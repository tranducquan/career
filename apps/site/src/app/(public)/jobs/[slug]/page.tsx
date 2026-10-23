import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Globe, Layers, Map as MapIcon, Timer, Wallet } from "lucide-react";
import Link from "next/link";

import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import Button from "@/components/ui/button";
import CompanyLogo from "@/components/ui/company-logo";
import FeaturedBadge from "@/components/jobs/featured-badge";
import SaveJobButton from "@/components/jobs/save-job-button";
import ShareButtons from "@/components/jobs/share-buttons";
import type { JobType } from "@/types";
import { jobPath } from "@/lib/slug";
import { getJob, SITE_URL } from "@/lib/jobs";
import { typeLabel } from "@/lib/job-format";
import JobDescription from "@/components/jobs/job-description";
import { formatDate } from "@/lib/date";
import CountryFlag from "@/components/ui/country-flag";
import { getJobLocation } from "@/lib/job-format";

import RelatedJobs, { RelatedJobsFallback } from "@/components/jobs/related-jobs";
import JobDetailFallback from "@/components/jobs/job-detail-fallback";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const job = await getJob(slug);
	if (!job) return { title: "Job not found" };

	return { title: `${job.title} - ${job.company}`, description: job.description.slice(0, 150) };
}

const card = "rounded-lg border border-gray-200 bg-white";
const gridCols = "lg:grid-cols-[1fr_28rem] lg:gap-10 xl:grid-cols-[1fr_32rem] xl:gap-14";
const heading = "text-lg leading-normal font-medium text-gray-900";

const BulletList = ({ title, items }: { title: string; items?: string[] }) => {
	if (!items?.length) return null;

	return (
		<section>
			<h2 className={`mb-4 ${heading}`}>{title}</h2>
			<ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-500 marker:text-gray-500 md:text-base">
				{items.map((item, i) => (
					<li key={`${i}-${item}`}>{item}</li>
				))}
			</ul>
		</section>
	);
};

const SalaryLocation = ({ job }: { job: JobType }) => {
	const location = getJobLocation(job);
	if (!job.salaryRange && !location) return null;

	return (
		<div className={`${card} grid ${location ? "grid-cols-2" : "grid-cols-1"} items-center gap-4 p-4 md:p-6`}>
			<div className="pr-2 text-center">
				<p className="text-base leading-normal font-medium text-gray-900 md:text-lg">Salary (USD)</p>
				{job.salaryRange && <p className="mt-2 text-lg font-semibold text-success-500 md:text-xl">{job.salaryRange}</p>}
				{job.salaryType && <p className="mt-1 text-sm text-gray-500">{job.salaryType}</p>}
			</div>
			{location && (
				<div className="flex flex-col items-center border-l border-gray-200 pl-2 text-center">
					{job.country ? <CountryFlag code={job.country} className="mb-2 w-9" /> : job.remote ? <Globe aria-hidden className="mb-2 size-6 text-primary-500" strokeWidth={1.75} /> : <MapIcon aria-hidden className="mb-2 size-6 text-primary-500" strokeWidth={1.75} />}
					<p className="text-base leading-normal font-medium text-gray-900 md:text-lg">Job Location</p>
					<p className="mt-1 text-sm text-gray-500 md:text-base">{location}</p>
				</div>
			)}
		</div>
	);
};

const JobOverview = ({ job }: { job: JobType }) => {
	const items = [
		{ icon: CalendarDays, label: "Job posted", value: formatDate(job.postedAt) },
		{ icon: Timer, label: "Job expires", value: formatDate(job.deadline) },
		{ icon: Layers, label: "Job level", value: job.level },
		{ icon: Wallet, label: "Experience", value: job.experience },
		{ icon: BriefcaseBusiness, label: "Education", value: job.education },
	].filter((item) => item.value);

	return (
		<div className={card}>
			<div className="p-4 md:p-6">
				<h2 className={`mb-5 ${heading}`}>Job Overview</h2>
				<dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
					{items.map(({ icon: Icon, label, value }) => (
						<div key={label}>
							<Icon aria-hidden className="mb-4 size-6 text-primary-500" strokeWidth={1.75} />
							<dt className="text-sm text-gray-500 uppercase">{label}</dt>
							<dd className="mt-1.5 text-sm font-medium text-gray-900 md:text-base">{value}</dd>
						</div>
					))}
				</dl>
			</div>

			<div className="space-y-4 border-t border-gray-200 p-4 md:space-y-6 md:p-6">
				<div>
					<h3 className={`mb-5 ${heading}`}>Share this job:</h3>
					<ShareButtons url={`${SITE_URL}${jobPath(job)}`} title={job.title} />
				</div>

				{job.tags && job.tags.length > 0 && (
					<div>
						<h3 className={`mb-5 ${heading}`}>Job tags:</h3>
						<ul className="flex flex-wrap gap-2.5">
							{job.tags.map((tag) => (
								<li key={tag}>
									<Link href={`/jobs?q=${encodeURIComponent(tag)}`} target="_blank" rel="noopener noreferrer" className="block rounded-sm bg-gray-100 px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-500 motion-reduce:transition-none">
										{tag}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

const JobDetail = async ({ params }: Props) => {
	const { slug } = await params;
	const job = await getJob(slug);
	if (!job) notFound();
	if (jobPath(job) !== `/jobs/${slug}`) permanentRedirect(jobPath(job));

	return (
		<div id="job-detail-page">
			<Section className="pt-0!">
				<Container>
					<div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-10">
						<div className="flex items-center gap-4 md:gap-6">
							<CompanyLogo name={job.company} logo={job.logo} logoUrl={job.logoUrl} className="size-17 rounded-full text-3xl md:size-20 p-2.5" />
							<div className="min-w-0">
								<h1 className="text-xl leading-normal font-medium text-gray-900 md:text-2xl lg:text-[1.75rem]">{job.title}</h1>
								<div className="mt-2.5 flex flex-wrap items-center gap-2.5">
									<span className="text-sm text-gray-500">at {job.company}</span>
									{job.featured && <FeaturedBadge />}
									<span className="rounded-xs bg-success-50 px-2 pt-[0.313rem] pb-1 leading-none text-xs font-semibold text-success-500 uppercase">{typeLabel(job.type)}</span>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<SaveJobButton jobId={job.id} />
							<Button href="/login">
								Apply Now <ArrowRight aria-hidden />
							</Button>
						</div>
					</div>

					<div className={`grid gap-8 ${gridCols}`}>
						<article className="min-w-0 divide-y divide-gray-200 *:py-8 *:first:pt-0 *:last:pb-0">
							<section>
								<h2 className={`mb-4 ${heading}`}>Job Description</h2>
								<JobDescription text={job.description} />
							</section>
							<BulletList title="Responsibilities" items={job.responsibilities} />
							<BulletList title="Requirements" items={job.requirements} />
							<BulletList title="Desirable" items={job.desirable} />
							<BulletList title="Benefits" items={job.benefits} />
						</article>

						<aside className="space-y-6">
							<SalaryLocation job={job} />
							<JobOverview job={job} />
						</aside>
					</div>
				</Container>
			</Section>

			<Suspense fallback={<RelatedJobsFallback />}>
				<RelatedJobs jobId={job.id} category={job.categorySlug} />
			</Suspense>
		</div>
	);
};

const JobsPage = ({ params }: Props) => (
	<Suspense fallback={<JobDetailFallback />}>
		<JobDetail params={params} />
	</Suspense>
);

export default JobsPage;
