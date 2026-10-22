import Link from "next/link";
import { ArrowRight, CalendarDays, DollarSign, Globe, MapPin } from "lucide-react";
import CompanyLogo from "@/components/ui/company-logo";
import DaysRemaining from "@/components/ui/days-remaining";
import SaveJobButton from "@/components/jobs/save-job-button";
import { cn } from "@/lib/cn";
import { jobPath } from "@/lib/slug";
import { getJobLocation } from "@/lib/job-format";
import type { JobType } from "@/types";
import FeaturedBadge from "../jobs/featured-badge";
import Button from "../ui/button";

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
		<Icon aria-hidden className="size-5 shrink-0 text-gray-500" strokeWidth={1.75} />
		{children}
	</span>
);

const Horizontal = ({ job, className }: CardProps) => {
	const location = getJobLocation(job);

	return (
		<article className={cn("group relative isolate flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition md:gap-6 md:p-6 md:hover:-translate-y-1 md:hover:border-primary-300 md:hover:shadow-lg", job.featured && "bg-linear-to-r from-[#FFF6E6] to-white", className)}>
			<CompanyLogo name={job.company} logo={job.logo} logoUrl={job.logoUrl} className={cn("size-14 rounded-lg text-xl p-0.5 md:size-16 md:p-1", job.featured && "bg-white")} />
			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-center gap-2">
					<h3 className="text-base font-medium text-gray-900 md:text-lg group-hover:text-primary-500">
						<Link href={jobPath(job)} className={stretched}>
							{job.title}
						</Link>
					</h3>
					{job.featured && <FeaturedBadge />}
					<span className="rounded-xs bg-success-50 px-2 pt-[0.313rem] pb-1 leading-none text-xs font-semibold text-success-500 uppercase">{typeLabel(job.type)}</span>
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
			<div className="group flex shrink-0 items-center gap-3 md:gap-5">
				<SaveJobButton jobId={job.id} appearance="plain" className="relative z-10" />
				<Button href="#" variant="light" className="md:group-hover:border-primary-500 md:group-hover:bg-primary-500 md:group-hover:text-white">
					Apply Now <ArrowRight aria-hidden className="size-4" />
				</Button>
			</div>
		</article>
	);
};

const Vertical = ({ job, className }: CardProps) => {
	const location = getJobLocation(job);

	return (
		<article className={cn("group relative isolate flex h-full flex-col gap-3.5 rounded-xl border border-gray-200 p-5 transition md:hover:-translate-y-1 md:hover:border-primary-300 md:hover:shadow-lg md:p-6", job.featured && "bg-linear-to-r from-[#FFF6E6] to-white", className)}>
			<h3 className="line-clamp-2 text-xl leading-normal font-medium text-gray-900 transition-colors group-hover:text-primary-500">
				<Link href={jobPath(job)} className={stretched}>
					{job.title}
				</Link>
			</h3>
			<div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 -mt-1">
				{job.featured && <FeaturedBadge />}
				<span className="rounded-xs bg-success-50 px-2 pt-[0.313rem] pb-1 leading-none text-xs font-semibold text-success-500 uppercase">{typeLabel(job.type)}</span>
				{job.salary && <span>{job.salary}</span>}
			</div>
			<div className="mt-auto flex items-center gap-3 pt-2.5">
				<CompanyLogo name={job.company} logo={job.logo} logoUrl={job.logoUrl} className={cn("size-14 rounded-lg text-xl p-0.5", job.featured && "bg-white")} />
				<div className="min-w-0 flex-1">
					<p className="mb-1.5 truncate text-base font-medium text-gray-900">{job.company}</p>
					{location && (
						<p className="text-sm text-gray-500">
							<Meta icon={job.remote ? Globe : MapPin}>{location}</Meta>
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
