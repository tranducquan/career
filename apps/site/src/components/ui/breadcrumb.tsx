import Link from "next/link";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[]; className?: string };

const Breadcrumb = ({ items, className }: Props) => (
	<nav aria-label="Breadcrumb" className={className}>
		<ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
			{items.map((item, i) => {
				const isLast = i === items.length - 1;

				return (
					<li key={item.label} className="flex items-center gap-2">
						{item.href && !isLast ? (
							<Link href={item.href} className="transition-colors hover:text-blue-600 motion-reduce:transition-none">
								{item.label}
							</Link>
						) : (
							<span aria-current={isLast ? "page" : undefined} className={cn(isLast && "text-gray-900")}>
								{item.label}
							</span>
						)}
						{!isLast && (
							<span aria-hidden className="text-gray-400">
								/
							</span>
						)}
					</li>
				);
			})}
		</ol>
	</nav>
);

export default Breadcrumb;
