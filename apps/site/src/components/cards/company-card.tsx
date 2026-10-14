import { MapPin } from "lucide-react";
import Button from "../ui/button";
import FeaturedBadge from "../jobs/featured-badge";
import type { CompanyType } from "@/types";

const CompanyCard = ({ company }: { company: CompanyType }) => {
	const { name, location, href, featured, logo: Logo } = company;

	return (
		<article className="group flex h-full flex-col gap-5 rounded-xl border border-gray-100 bg-white p-4 transition sm:p-5 md:gap-6 md:p-6 md:hover:-translate-y-1 md:hover:border-blue-300 md:hover:shadow-lg">
			<div className="flex items-center gap-3 md:gap-4">
				<div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 p-2.5 md:size-16 md:p-3">
					<Logo className="size-full" aria-hidden />
				</div>

				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<h3 className="truncate text-base font-medium md:text-lg">{name}</h3>
						{featured && <FeaturedBadge />}
					</div>
					<p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
						<MapPin className="size-4 shrink-0" aria-hidden />
						<span className="truncate">{location}</span>
					</p>
				</div>
			</div>

			<Button href={href} variant="light" fullWidth aria-label={`Open positions at ${name}`} className="mt-auto md:group-hover:border-blue-600 md:group-hover:bg-blue-600 md:group-hover:text-white">
				Open Position
			</Button>
		</article>
	);
};

export default CompanyCard;
