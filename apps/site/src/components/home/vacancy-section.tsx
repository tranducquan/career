import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import Button from "../ui/button";
import { vacancies } from "@/data";
import { cn } from "@/lib/cn";

const MOBILE_LIMIT = 6;

const numberFormat = new Intl.NumberFormat("en-US");

const VacancySection = () => {
	return (
		<section className="border-b border-gray-100 py-12 md:py-20 lg:py-24">
			<Container>
				<SectionHeading title="Most Popular Vacancies" />

				<ul className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
					{vacancies.map((item, i) => (
						<li key={item.id} className={cn(i >= MOBILE_LIMIT && "max-md:hidden")}>
							<Link href={item.href} className="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 transition-colors hover:border-blue-200 hover:bg-blue-50/50 active:bg-blue-50 md:px-5 md:py-4">
								<span className="min-w-0">
									<span className="block truncate text-base font-medium transition-colors group-hover:text-blue-600 md:text-lg">{item.name}</span>
									<span className="mt-2 block text-sm text-gray-500">{numberFormat.format(item.count)} open positions</span>
								</span>
								<ArrowUpRight className="size-5 shrink-0 text-gray-300 transition-colors group-hover:text-blue-600" aria-hidden />
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
		</section>
	);
};

export default VacancySection;
