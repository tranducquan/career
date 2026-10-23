import Link from "next/link";
import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import Button from "../ui/button";
import Section from "../layout/section";
import { vacancies } from "@/data";
import { cn } from "@/lib/cn";

const MOBILE_LIMIT = 8;

const numberFormat = new Intl.NumberFormat("en-US");

const VacancySection = () => {
	return (
		<Section>
			<Container>
				<SectionHeading title="Most Popular Vacancies" />

				<ul className="flex flex-wrap gap-2.5 md:gap-3">
					{vacancies.map((item, i) => (
						<li key={item.id} className={cn(i >= MOBILE_LIMIT && "max-md:hidden")}>
							<Link href={item.href} className="group inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white py-2 pr-2 pl-4 text-sm font-medium text-gray-900 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-500 motion-reduce:transition-none md:text-base">
								{item.name}
								<span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500 tabular-nums transition-colors group-hover:bg-primary-500 group-hover:text-white">{numberFormat.format(item.count)}</span>
							</Link>
						</li>
					))}
				</ul>

				{vacancies.length > MOBILE_LIMIT && (
					<Button href="/jobs" variant="outline" className="mt-6 md:hidden">
						View all vacancies
					</Button>
				)}
			</Container>
		</Section>
	);
};

export default VacancySection;
