import Link from "next/link";
import { ArrowRight, Bookmark, CalendarDays, DollarSign, MapPin } from "lucide-react";
import DaysRemaining from "@/components/ui/days-remaining";
import { cn } from "@/lib/cn";
import { jobPath } from "@/lib/slug";
import type { JobType } from "@/types";

type Props = {
	job: JobType;
	layout?: "vertical" | "horizontal";
	className?: string;
};

const CompanyLogo = ({ name, className }: { name: string; className?: string }) => <div className={cn("flex shrink-0 items-center justify-center bg-linear-to-br from-blue-500 to-blue-700 font-semibold text-white", className)}>{name.charAt(0)}</div>;

const stretched = "after:absolute after:inset-0 after:content-['']";

const Meta = ({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) => (
	<span className="inline-flex items-center gap-1.5">
		<Icon aria-hidden className="size-4 shrink-0 text-gray-400" strokeWidth={1.5} />
		{children}
	</span>
);

const Horizontal = ({ job, className }: Omit<Props, "layout">) => (
	<article className={cn("relative flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:shadow-lg md:gap-6 md:p-6 md:hover:-translate-y-1 md:hover:border-blue-300", className)}>
		<CompanyLogo name={job.company} className="size-14 rounded-md text-xl md:size-16" />

		<div className="min-w-0 flex-1">
			<div className="flex flex-wrap items-center gap-2">
				<h3 className="text-base font-medium text-gray-900 md:text-lg">
					<Link href={jobPath(job)} className={stretched}>
						{job.title}
					</Link>
				</h3>
				{job.featured && <span className="rounded-full bg-red-50 px-3 py-0.5 text-xs text-red-500">Featured</span>}
				<span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs text-blue-600">{job.type}</span>
			</div>

			<div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
				<Meta icon={MapPin}>{job.location}</Meta>
				{job.salary && <Meta icon={DollarSign}>{job.salary}</Meta>}
				{job.deadline && (
					<Meta icon={CalendarDays}>
						<DaysRemaining deadline={job.deadline} />
					</Meta>
				)}
			</div>
		</div>

		<div className="flex shrink-0 items-center gap-3 md:gap-5">
			<button type="button" aria-label="Save job" className="relative z-10 text-gray-400 transition-colors hover:text-blue-600">
				<Bookmark aria-hidden className="size-6" />
			</button>
			<span className="hidden items-center gap-2 rounded-md bg-blue-50 px-6 py-3.5 text-sm font-semibold text-blue-600 transition-colors group-hover:bg-blue-600 md:inline-flex">
				Apply Now <ArrowRight aria-hidden className="size-4" />
			</span>
		</div>
	</article>
);

const Vertical = ({ job, className }: Omit<Props, "layout">) => (
	<article className={cn("relative flex h-full flex-col gap-5 rounded-xl border border-gray-100 bg-white p-5 transition md:hover:shadow-lg md:p-6 md:hover:-translate-y-1 md:hover:border-blue-300", className)}>
		<div className="flex items-center gap-3">
			<CompanyLogo name={job.company} className="size-14 rounded-md text-xl" />
			<div className="min-w-0">
				<p className="truncate font-medium text-gray-900">{job.company}</p>
				<p className="flex items-center gap-1.5 text-sm text-gray-400">
					<MapPin aria-hidden className="size-4 shrink-0" strokeWidth={1.5} />
					<span className="truncate">{job.location}</span>
				</p>
			</div>
		</div>

		<div>
			<h3 className="line-clamp-2 text-lg font-medium text-gray-900">
				<Link href={jobPath(job)} className={stretched}>
					{job.title}
				</Link>
			</h3>
			<p className="mt-2 text-sm text-gray-500">
				{job.type}
				{job.salary && <> &bull; {job.salary}</>}
			</p>
		</div>
	</article>
);

const JobCard = ({ layout = "vertical", ...props }: Props) => (layout === "horizontal" ? <Horizontal {...props} /> : <Vertical {...props} />);

export default JobCard;
