import Link from "next/link";
import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import { categories } from "@/data";
import { cn } from "@/lib/cn";

const MOBILE_LIMIT = 6;

const numberFormat = new Intl.NumberFormat("en-US");

const CategorySection = () => {
	return (
		<section className="border-b border-gray-100 py-16 md:py-24">
			<Container>
				<SectionHeading title="Popular Category" href="#" />

				<ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
					{categories.map(({ id, href, name, count, icon: Icon }, i) => (
						<li key={id} className={cn(i >= MOBILE_LIMIT && "max-md:hidden")}>
							<Link href={href} className="group flex h-full flex-col items-start gap-3 rounded-xl border border-gray-100 p-3 transition md:gap-4 md:p-5 md:hover:-translate-y-1 md:hover:border-blue-300 md:hover:shadow-lg lg:flex-row lg:items-center">
								<div className="shrink-0 rounded-md bg-blue-100 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white md:p-5">
									<Icon className="size-6 md:size-7" />
								</div>

								<div className="min-w-0">
									<h3 className="mb-1 text-base font-medium transition-colors group-hover:text-blue-600 md:mb-1.5 md:text-lg">{name}</h3>
									<p className="text-sm text-gray-500">{numberFormat.format(count)} open positions</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default CategorySection;
