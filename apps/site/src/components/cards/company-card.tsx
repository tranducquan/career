import { MapPin } from "lucide-react";
import Button from "../ui/button";
import CompanyLogo from "../ui/company-logo";
import FeaturedBadge from "../jobs/featured-badge";
import type { CompanyType } from "@/types";

const CompanyCard = ({ company }: { company: CompanyType }) => {
	const { name, location, href, featured, logo, logoUrl } = company;
	// Công ty chưa nhập link riêng thì mở danh sách job của công ty đó
	const target = !href || href === "#" ? `/jobs?q=${encodeURIComponent(name)}` : href;

	return (
		<article data-featured={featured || undefined} className="group flex h-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 transition duration-200 data-featured:border-primary-200 data-featured:bg-primary-50/20 sm:p-5 md:gap-6 md:p-6 md:hover:-translate-y-0.5 md:hover:border-primary-300 md:hover:shadow-lg">
			<div className="flex items-center gap-3 md:gap-4">
				<CompanyLogo name={name} logo={logo} logoUrl={logoUrl} className="size-12 rounded-lg bg-gray-100 p-1 group-data-featured:bg-white md:size-16" />

				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
						<h3 className="truncate text-base font-semibold text-gray-900 md:text-lg">{name}</h3>
						{featured && <FeaturedBadge />}
					</div>
					<p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
						<MapPin className="size-4 shrink-0 text-gray-400" strokeWidth={1.75} aria-hidden />
						<span className="truncate">{location}</span>
					</p>
				</div>
			</div>

			<Button href={target} variant="light" fullWidth aria-label={`Open positions at ${name}`} className="mt-auto md:group-hover:border-primary-500 md:group-hover:bg-primary-500 md:group-hover:text-white">
				Open Position
			</Button>
		</article>
	);
};

export default CompanyCard;
