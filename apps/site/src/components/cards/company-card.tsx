import { MapPin } from "lucide-react";
import Button from "../ui/button";
import CompanyLogo from "../ui/company-logo";
import FeaturedBadge from "../jobs/featured-badge";
import type { CompanyType } from "@/types";

const CompanyCard = ({ company }: { company: CompanyType }) => {
	const { name, location, href, featured, logo, logoUrl } = company;

	return (
		<article className="group flex h-full flex-col gap-5 rounded-xl border border-gray-100 bg-white p-4 transition sm:p-5 md:gap-6 md:p-6 md:hover:-translate-y-1 md:hover:border-primary-300 md:hover:shadow-lg">
			<div className="flex items-center gap-3 md:gap-4">
				<CompanyLogo name={name} logo={logo} logoUrl={logoUrl} className="size-12 md:size-16 p-1" />

				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<h3 className="truncate text-base font-medium md:text-lg">{name}</h3>
						{featured && <FeaturedBadge />}
					</div>
					<p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
						<MapPin className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
						<span className="truncate">{location}</span>
					</p>
				</div>
			</div>

			<Button href={href} variant="light" fullWidth aria-label={`Open positions at ${name}`} className="mt-auto md:group-hover:border-primary-500 md:group-hover:bg-primary-500 md:group-hover:text-white">
				Open Position
			</Button>
		</article>
	);
};

export default CompanyCard;
