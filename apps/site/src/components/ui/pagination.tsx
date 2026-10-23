import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
	page: number;
	totalPages: number;
	getHref: (page: number) => string; // mỗi trang tự dựng URL của mình
	className?: string;
};

const getPages = (page: number, total: number) => {
	const pages = new Set([1, total, page - 1, page, page + 1]);
	const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
	const result: (number | "…")[] = [];
	sorted.forEach((p, i) => {
		if (i > 0 && p - sorted[i - 1] > 1) result.push("…");
		result.push(p);
	});
	return result;
};

const base = "flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors md:size-12";

type PageLinkProps = {
	href: string;
	label: string;
	active?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
};

const PageLink = ({ href, label, active, disabled, children }: PageLinkProps) => {
	if (disabled) {
		return (
			<span aria-label={label} aria-disabled className={cn(base, "cursor-not-allowed text-gray-400")}>
				{children}
			</span>
		);
	}

	return (
		<Link href={href} aria-label={label} aria-current={active ? "page" : undefined} className={cn(base, active ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-primary-50 hover:text-primary-500")}>
			{children}
		</Link>
	);
};

const Pagination = ({ page, totalPages, getHref, className }: Props) => {
	if (totalPages <= 1) return null;

	return (
		<nav aria-label="Pagination" className={cn("mt-10 flex items-center justify-center gap-2 md:mt-14", className)}>
			<PageLink href={getHref(page - 1)} disabled={page === 1} label="Previous page">
				<ChevronLeft aria-hidden className="size-5" />
			</PageLink>

			{getPages(page, totalPages).map((p, i) =>
				p === "…" ? (
					<span key={`gap-${i}`} aria-hidden className="flex size-10 items-center justify-center text-gray-400 md:size-12">
						…
					</span>
				) : (
					<PageLink key={p} href={getHref(p)} active={p === page} label={`Page ${p}`}>
						{String(p).padStart(2, "0")}
					</PageLink>
				),
			)}

			<PageLink href={getHref(page + 1)} disabled={page === totalPages} label="Next page">
				<ChevronRight aria-hidden className="size-5" />
			</PageLink>
		</nav>
	);
};

export default Pagination;
