import Link from "next/link";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import { getCategories } from "@/lib/categories";
import { cn } from "@/lib/cn";
import Section from "../layout/section";

const MOBILE_LIMIT = 6;

const numberFormat = new Intl.NumberFormat("en-US");

const CategorySection = async () => {
	const categories = await getCategories();
	if (categories.length === 0) return null;

	return (
		<Section className=" border-gray-100" bordered>
			<Container>
				<SectionHeading eyebrow="Browse by field" title="Popular Category" href="/jobs" />

				<ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
					{categories.map(({ id, href, name, count, iconKey }, i) => (
						<li key={id} className={cn(i >= MOBILE_LIMIT && "max-md:hidden")}>
							<Link href={href} className="group flex h-full flex-col items-start gap-3 rounded-xl border border-gray-100 p-3 transition md:gap-4 md:p-5 md:hover:-translate-y-1 md:hover:border-primary-300 md:hover:shadow-lg lg:flex-row lg:items-center">
								<div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-50 p-3 text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white md:size-17 md:p-5">
									<DynamicIcon name={(iconKey ?? "shapes") as IconName} className="size-6 md:size-7" strokeWidth={1.75} />
								</div>

								<div className="min-w-0">
									<h3 className="mb-1 text-base font-medium transition-colors group-hover:text-primary-500 md:mb-1.5 md:text-lg">{name}</h3>
									<p className="text-sm text-gray-500">{numberFormat.format(count)} open positions</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</Container>
		</Section>
	);
};

export default CategorySection;
