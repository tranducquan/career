import Link from "next/link";
import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import { vacancies } from "@/data";
import { cn } from "@/lib/cn";

const MOBILE_LIMIT = 8;

const numberFormat = new Intl.NumberFormat("en-US");

const VacancySection = () => {
	return (
		<section className="border-b border-gray-100 py-16 md:py-24">
			<Container>
				<SectionHeading title="Most Popular Vacancies" />

				<ul className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-8 xl:grid-cols-4">
					{vacancies.map((item, i) => (
						<li key={item.id} className={cn(i >= MOBILE_LIMIT && "max-md:hidden")}>
							<Link href={item.href} className="group block">
								<span className="mb-1.5 block text-base font-medium underline decoration-transparent underline-offset-6 transition-colors group-hover:text-blue-600 group-hover:decoration-blue-600 md:mb-2.5 md:text-lg">{item.name}</span>
								<span className="block text-sm text-gray-500">{numberFormat.format(item.count)} open positions</span>
							</Link>
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default VacancySection;
