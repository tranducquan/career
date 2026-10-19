import Link from "next/link";
import { ArrowRight, CalendarDays, DollarSign, Globe, MapPin } from "lucide-react";
import CompanyLogo from "@/components/ui/company-logo";
import DaysRemaining from "@/components/ui/days-remaining";
import SaveJobButton from "@/components/jobs/save-job-button";
import { cn } from "@/lib/cn";
import { jobPath } from "@/lib/slug";
import { getJobLocation } from "@/lib/jobs";
import type { JobType } from "@/types";
import FeaturedBadge from "../jobs/featured-badge";

type Props = {
	job: JobType;
	layout?: "vertical" | "horizontal";
	className?: string;
};

type CardProps = Omit<Props, "layout">;

// Link phủ kín card, các nút bên trong cần "relative z-10" để vẫn bấm được
const stretched = "after:absolute after:inset-0 after:content-['']";

const typeLabel = (type: string) => type.replace(" ", "-");

const Meta = ({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) => (
	<span className="inline-flex items-center gap-1.5">
		<Icon aria-hidden className="size-5 shrink-0 text-gray-400" strokeWidth={1.5} />
		{children}
	</span>
);

const Horizontal = ({ job, className }: CardProps) => {
	const location = getJobLocation(job);

	return (
		<article className={cn("group relative flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition md:gap-6 md:p-6 md:hover:-translate-y-1 md:hover:border-primary-300 md:hover:shadow-lg", className)}>
			<CompanyLogo name={job.company} logo={job.logo} className="size-14 rounded-md text-xl md:size-16" />

			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-center gap-2">
					<h3 className="text-base font-medium text-gray-900 md:text-lg group-hover:text-primary-500">
						<Link href={jobPath(job)} className={stretched}>
							{job.title}
						</Link>
					</h3>
					{job.featured && <FeaturedBadge />}
					<span className="rounded-full bg-primary-50 px-3 py-0.5 text-xs text-primary-500">{typeLabel(job.type)}</span>
				</div>

				<div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
					{location && <Meta icon={job.remote ? Globe : MapPin}>{location}</Meta>}
					{job.salary && <Meta icon={DollarSign}>{job.salary}</Meta>}
					{job.deadline && (
						<Meta icon={CalendarDays}>
							<DaysRemaining deadline={job.deadline} />
						</Meta>
					)}
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-3 md:gap-5">
				<SaveJobButton jobId={job.id} appearance="plain" className="relative z-10" />
				<span className="hidden items-center gap-2 rounded-md bg-primary-100 px-6 py-3.5 text-sm font-semibold text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white md:inline-flex">
					Apply Now <ArrowRight aria-hidden className="size-4" />
				</span>
			</div>
		</article>
	);
};

const Vertical = ({ job, className }: CardProps) => {
	const location = getJobLocation(job);

	return (
		<article className={cn("group relative flex h-full flex-col gap-3.5 rounded-xl border border-gray-200 p-5 transition md:hover:-translate-y-1 md:hover:border-primary-300 md:hover:shadow-lg md:p-6", className)}>
			<h3 className="line-clamp-2 text-xl leading-normal font-medium text-gray-900 transition-colors group-hover:text-primary-500">
				<Link href={jobPath(job)} className={stretched}>
					{job.title}
				</Link>
			</h3>

			<div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
				{job.featured && <FeaturedBadge />}
				<span className="rounded-xs bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-500 uppercase">{typeLabel(job.type)}</span>
				{job.salary && <span>{job.salary}</span>}
			</div>

			<div className="mt-auto flex items-center gap-3 pt-2.5">
				<CompanyLogo name={job.company} logo={job.logo} className="size-14 rounded-md bg-primary-50 text-xl" />

				<div className="min-w-0 flex-1">
					<p className="mb-1.5 truncate text-base font-medium text-gray-900">{job.company}</p>
					{location && (
						<p className="flex items-center gap-1.5 text-sm text-gray-500">
							{job.remote ? <Globe aria-hidden className="size-5 shrink-0 text-gray-400" /> : <MapPin aria-hidden className="size-5 shrink-0 text-gray-400" />}
							<span className="truncate">{location}</span>
						</p>
					)}
				</div>

				<SaveJobButton jobId={job.id} appearance="plain" className="relative z-10 text-gray-300" />
			</div>
		</article>
	);
};

const JobCard = ({ layout = "vertical", ...props }: Props) => (layout === "horizontal" ? <Horizontal {...props} /> : <Vertical {...props} />);

export default JobCard;
