import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Bookmark, BriefcaseBusiness, CalendarDays, GraduationCap, Globe, Hourglass, Mail, MapPin, Phone, Wallet } from "lucide-react";
import { Facebook, Twitter, Instagram, Youtube, Pinterest } from "@thesvg/react";
import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import { jobs } from "@/data";
import type { JobType } from "@/types";
import { Suspense } from "react";

type Props = { params: Promise<{ id: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const getJob = (id: string) => jobs.find((job) => String(job.id) === id);

export function generateStaticParams() {
	return jobs.map((job) => ({ id: String(job.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const job = getJob(id);
	if (!job) return { title: "Job not found" };

	return { title: `${job.title} - ${job.company}`, description: job.description.slice(0, 150) };
}

const card = "rounded-xl border border-blue-100 bg-white p-5 md:p-6";

const Logo = ({ name, className }: { name: string; className: string }) => <div className={`flex shrink-0 items-center justify-center bg-linear-to-br from-blue-500 to-blue-700 font-semibold text-white ${className}`}>{name.charAt(0)}</div>;

const Contact = ({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) => (
	<span className="inline-flex items-center gap-2 text-sm text-gray-600">
		<Icon aria-hidden className="size-4 text-blue-600" />
		{children}
	</span>
);

const BulletList = ({ title, items }: { title: string; items?: string[] }) => {
	if (!items?.length) return null;

	return (
		<section>
			<h2 className="mb-4 text-lg font-medium text-gray-900">{title}</h2>
			<ul className="list-disc space-y-3 pl-5 text-sm text-gray-600 marker:text-gray-400">
				{items.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</section>
	);
};

const ShareButtons = ({ job }: { job: JobType }) => {
	const url = encodeURIComponent(`${SITE_URL}/jobs/${job.id}`);
	const text = encodeURIComponent(job.title);

	const links = [
		{ label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${url}`, color: "text-blue-700" },
		{ label: "Twitter", icon: Twitter, href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`, color: "text-gray-900" },
		{ label: "Pinterest", icon: Pinterest, href: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`, color: "text-red-600" },
	];

	return (
		<div className="flex flex-wrap items-center gap-3">
			<span className="text-sm text-gray-900">Share this job:</span>
			{links.map(({ label, icon: Icon, href, color }) => (
				<a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-md border border-blue-100 px-4 py-2.5 text-sm transition-colors hover:bg-blue-50 motion-reduce:transition-none ${color}`}>
					<Icon aria-hidden className="size-4" />
					{label}
				</a>
			))}
		</div>
	);
};

const JobOverview = ({ job }: { job: JobType }) => {
	const items = [
		{ icon: CalendarDays, label: "Job posted", value: job.postedAt },
		{ icon: Hourglass, label: "Job expire in", value: job.deadline },
		{ icon: GraduationCap, label: "Education", value: job.education },
		{ icon: Wallet, label: "Salary", value: job.salary },
		{ icon: MapPin, label: "Location", value: job.location },
		{ icon: BriefcaseBusiness, label: "Job type", value: job.type },
		{ icon: BriefcaseBusiness, label: "Experience", value: job.experience },
	].filter((item) => item.value);

	return (
		<div className={card}>
			<h2 className="mb-6 text-lg font-medium text-gray-900">Job Overview</h2>
			<dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
				{items.map(({ icon: Icon, label, value }) => (
					<div key={label}>
						<Icon aria-hidden className="mb-3 size-7 text-blue-600" strokeWidth={1.5} />
						<dt className="text-xs text-gray-500 uppercase">{label}:</dt>
						<dd className="mt-1 text-sm font-medium text-gray-900">{value}</dd>
					</div>
				))}
			</dl>
		</div>
	);
};

const CompanyCard = ({ job }: { job: JobType }) => {
	const info = job.companyInfo;
	if (!info) return null;

	const rows = [
		{ label: "Founded in", value: info.founded },
		{ label: "Organization type", value: info.orgType },
		{ label: "Company size", value: info.size },
		{ label: "Phone", value: info.phone },
		{ label: "Email", value: info.email },
		{ label: "Website", value: info.website },
	].filter((row) => row.value);

	const socials = [
		{ label: "Facebook", icon: Facebook, href: info.socials?.facebook },
		{ label: "Twitter", icon: Twitter, href: info.socials?.twitter },
		{ label: "Instagram", icon: Instagram, href: info.socials?.instagram },
		{ label: "YouTube", icon: Youtube, href: info.socials?.youtube },
	].filter((s) => s.href);

	return (
		<div className={card}>
			<div className="mb-6 flex items-center gap-4">
				<Logo name={job.company} className="size-14 rounded-md text-xl" />
				<div className="min-w-0">
					<h2 className="truncate text-lg font-medium text-gray-900">{job.company}</h2>
					{info.tagline && <p className="truncate text-sm text-gray-500">{info.tagline}</p>}
				</div>
			</div>

			<dl className="space-y-4 text-sm">
				{rows.map(({ label, value }) => (
					<div key={label} className="flex justify-between gap-4">
						<dt className="text-gray-500">{label}:</dt>
						<dd className="text-right font-medium text-gray-900">{value}</dd>
					</div>
				))}
			</dl>

			{socials.length > 0 && (
				<div className="mt-6 flex gap-3">
					{socials.map(({ label, icon: Icon, href }) => (
						<a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex size-9 items-center justify-center rounded-sm bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white motion-reduce:transition-none">
							<Icon aria-hidden className="size-4" />
						</a>
					))}
				</div>
			)}
		</div>
	);
};

const JobDetail = async ({ params }: Props) => {
	const { id } = await params;
	const job = getJob(id);
	if (!job) notFound();

	const info = job.companyInfo;
	const paragraphs = job.description.split("\n\n");

	return (
		<div className="pb-16 md:pb-24">
			{/* Header */}
			<Container>
				<div className="flex flex-col gap-6 py-8 md:flex-row md:items-start md:justify-between md:py-10">
					<div className="flex items-center gap-4 md:gap-6">
						<Logo name={job.company} className="size-16 rounded-full text-2xl md:size-20" />

						<div className="min-w-0">
							<div className="flex flex-wrap items-center gap-2">
								<h1 className="text-xl font-medium text-gray-900 md:text-2xl">{job.title}</h1>
								{job.featured && <span className="rounded-sm bg-red-50 px-2.5 py-0.5 text-xs text-red-600">Featured</span>}
								<span className="rounded-sm bg-blue-50 px-2.5 py-0.5 text-xs text-blue-600">{job.type}</span>
							</div>

							<div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
								{info?.website && <Contact icon={Globe}>{info.website}</Contact>}
								{info?.phone && <Contact icon={Phone}>{info.phone}</Contact>}
								{info?.email && <Contact icon={Mail}>{info.email}</Contact>}
							</div>
						</div>
					</div>

					<div className="md:text-right">
						<div className="flex items-center gap-3">
							<button type="button" aria-label="Save job" className="flex size-12 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 motion-reduce:transition-none">
								<Bookmark aria-hidden className="size-5" />
							</button>
							<Button href="/login" size="lg" className="flex-1 md:flex-none">
								Apply Now <ArrowRight aria-hidden />
							</Button>
						</div>
						{job.deadline && (
							<p className="mt-3 text-xs text-gray-500">
								Job expire in: <span className="text-red-500">{job.deadline}</span>
							</p>
						)}
					</div>
				</div>
			</Container>

			{/* Body */}
			<Container>
				<div className="grid gap-8 lg:grid-cols-[1fr_26rem] lg:gap-10 xl:grid-cols-[1fr_28rem]">
					<article className="min-w-0 space-y-8">
						<section>
							<h2 className="mb-4 text-lg font-medium text-gray-900">Job Description</h2>
							<div className="space-y-4 text-sm leading-relaxed text-gray-600">
								{paragraphs.map((p, i) => (
									<p key={i}>{p}</p>
								))}
							</div>
						</section>

						<BulletList title="Responsibilities" items={job.responsibilities} />
						<BulletList title="Requirements" items={job.requirements} />
						<BulletList title="Benefits" items={job.benefits} />

						<ShareButtons job={job} />
					</article>

					<aside className="space-y-6">
						<JobOverview job={job} />
						<CompanyCard job={job} />
					</aside>
				</div>
			</Container>
		</div>
	);
};

const JobDetailFallback = () => (
	<Container>
		<div className="space-y-8 py-8 md:py-10">
			<div className="flex items-center gap-4 md:gap-6">
				<div className="size-16 animate-pulse rounded-full bg-gray-100 md:size-20" />
				<div className="space-y-3">
					<div className="h-6 w-64 max-w-full animate-pulse rounded bg-gray-100" />
					<div className="h-4 w-48 max-w-full animate-pulse rounded bg-gray-100" />
				</div>
			</div>
			<div className="grid gap-8 lg:grid-cols-[1fr_26rem] lg:gap-10 xl:grid-cols-[1fr_28rem]">
				<div className="h-96 animate-pulse rounded-xl bg-gray-100" />
				<div className="h-96 animate-pulse rounded-xl bg-gray-100" />
			</div>
		</div>
	</Container>
);

const Page = ({ params }: Props) => (
	<Suspense fallback={<JobDetailFallback />}>
		<JobDetail params={params} />
	</Suspense>
);

export default Page;
