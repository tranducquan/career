import Link from "next/link";
import { ArrowRight, CalendarDays, Wallet, Globe, MapPin, type LucideIcon } from "lucide-react";
import CompanyLogo from "@/components/ui/company-logo";
import DaysRemaining from "@/components/ui/days-remaining";
import SaveJobButton from "@/components/jobs/save-job-button";
import { cn } from "@/lib/cn";
import { jobPath } from "@/lib/slug";
import { getJobLocation, typeLabel } from "@/lib/job-format";
import type { JobType } from "@/types";
import FeaturedBadge from "../jobs/featured-badge";
import Button from "../ui/button";

type Props = {
	job: JobType;
	layout?: "vertical" | "horizontal";
	className?: string;
};

type CardProps = Omit<Props, "layout">;

const TAGS_LIMIT = 3;

// Link phủ kín card, các nút bên trong cần "relative z-10" để vẫn bấm được
const stretched = "after:absolute after:inset-0 after:content-['']";

// Card thường. Card featured được đánh dấu bằng data-featured, các phần con đổi màu qua group-data-[featured]
const base = "group relative isolate rounded-xl border border-gray-200 bg-white transition duration-200 data-featured:border-primary-200 data-featured:bg-primary-50/20 md:hover:-translate-y-0.5 md:hover:border-primary-300 md:hover:shadow-lg";

const Meta = ({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) => (
	<span className="inline-flex max-w-full min-w-0 items-center gap-1.5">
		<Icon aria-hidden className="size-5 shrink-0 text-gray-400" strokeWidth={1.75} />
		<span className="truncate">{children}</span>
	</span>
);

const TypeBadge = ({ type }: { type: string }) => <span className="rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 group-data-featured:border-primary-200 group-data-featured:bg-white">{typeLabel(type)}</span>;

const Tags = ({ tags, className }: { tags?: string[]; className?: string }) => {
	if (!tags?.length) return null;

	return (
		<ul className={cn("flex flex-wrap gap-1.5", className)}>
			{tags.slice(0, TAGS_LIMIT).map((tag, i) => (
				<li key={`${i}-${tag}`} className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-600">
					{tag}
				</li>
			))}
		</ul>
	);
};

const Horizontal = ({ job, className }: CardProps) => {
	const location = getJobLocation(job);

	return (
		<article data-featured={job.featured || undefined} className={cn(base, "flex min-w-0 items-center gap-4 p-4 md:gap-6 md:p-6", className)}>
			<CompanyLogo name={job.company} logo={job.logo} logoUrl={job.logoUrl} className="self-start size-14 rounded-lg bg-gray-100 p-0.5 text-xl group-data-featured:bg-white md:size-16 md:p-1" />

			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-center gap-2">
					<h3 className="wrap-break-word text-base font-semibold text-gray-900 transition-colors group-hover:text-primary-500 md:text-lg">
						<Link href={jobPath(job)} className={stretched}>
							{job.title}
						</Link>
					</h3>
					{job.featured && <FeaturedBadge />}
					<TypeBadge type={job.type} />
				</div>

				<p className="mt-0.5 truncate text-sm text-gray-500">{job.company}</p>

				<div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-gray-500">
					{location && <Meta icon={job.remote ? Globe : MapPin}>{location}</Meta>}
					{job.salary && (
						<Meta icon={Wallet}>
							<span className="font-medium text-gray-900">{job.salary}</span>
						</Meta>
					)}
					{job.deadline && (
						<Meta icon={CalendarDays}>
							<DaysRemaining deadline={job.deadline} />
						</Meta>
					)}
				</div>

				<Tags tags={job.tags} className="mt-3 hidden md:flex" />
			</div>

			<div className="flex shrink-0 items-center gap-3 md:gap-5">
				<SaveJobButton jobId={job.id} appearance="plain" className="relative z-10" />
				{/* Chỉ để trang trí: bấm vào đây đi qua lớp phủ tới link của tiêu đề */}
				{/* <span aria-hidden className="hidden items-center gap-2 rounded-md bg-primary-50 px-5 py-2.5 text-sm font-semibold text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white md:inline-flex">
					Apply Now <ArrowRight className="size-4" />
				</span> */}
				<Button variant="light" className="group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white">
					Apply Now <ArrowRight className="size-4" />
				</Button>
			</div>
		</article>
	);
};

const Vertical = ({ job, className }: CardProps) => {
	const location = getJobLocation(job);

	return (
		<article data-featured={job.featured || undefined} className={cn(base, "flex h-full min-w-0 flex-col p-5 md:p-6", className)}>
			<div className="flex flex-wrap items-center gap-2">
				<TypeBadge type={job.type} />
				{job.featured && <FeaturedBadge />}
			</div>

			<h3 className="wrap-break-word mt-3 line-clamp-2 text-lg leading-snug font-semibold text-gray-900 transition-colors group-hover:text-primary-500 md:text-xl">
				<Link href={jobPath(job)} className={stretched}>
					{job.title}
				</Link>
			</h3>

			<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
				{job.salary && <span className="font-medium text-gray-900">{job.salary}</span>}
				{job.deadline && (
					<Meta icon={CalendarDays}>
						<DaysRemaining deadline={job.deadline} />
					</Meta>
				)}
			</div>

			<Tags tags={job.tags} className="my-3" />

			<div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-4">
				<CompanyLogo name={job.company} logo={job.logo} logoUrl={job.logoUrl} className="size-12 rounded-lg bg-gray-100 p-0.5 text-lg group-data-featured:bg-white" />
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-medium text-gray-900 md:text-base">{job.company}</p>
					{location && (
						<div className="mt-0.5 text-sm text-gray-500">
							<Meta icon={job.remote ? Globe : MapPin}>{location}</Meta>
						</div>
					)}
				</div>
				<SaveJobButton jobId={job.id} appearance="plain" className="relative z-10 text-gray-300" />
			</div>
		</article>
	);
};

const JobCard = ({ layout = "vertical", ...props }: Props) => (layout === "horizontal" ? <Horizontal {...props} /> : <Vertical {...props} />);

export default JobCard;
