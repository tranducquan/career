import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
	page: number;
	totalPages: number;
	params: Record<string, string | undefined>; // các filter hiện tại
};

const buildHref = (params: Props["params"], page: number) => {
	const sp = new URLSearchParams();
	Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
	if (page > 1) sp.set("page", String(page));
	const qs = sp.toString();
	return qs ? `/jobs?${qs}` : "/jobs";
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

const itemClass = "flex size-10 items-center justify-center rounded-md text-sm font-medium transition-colors";

const Pagination = ({ page, totalPages, params }: Props) => {
	if (totalPages <= 1) return null;

	return (
		<nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
			{page > 1 ? (
				<Link href={buildHref(params, page - 1)} aria-label="Previous page" className={cn(itemClass, "border border-gray-200 hover:bg-blue-50")}>
					<ChevronLeft className="size-5" />
				</Link>
			) : (
				<span aria-hidden className={cn(itemClass, "border border-gray-100 text-gray-300")}>
					<ChevronLeft className="size-5" />
				</span>
			)}

			{getPages(page, totalPages).map((p, i) =>
				p === "…" ? (
					<span key={`gap-${i}`} className="px-1 text-gray-400">
						…
					</span>
				) : (
					<Link key={p} href={buildHref(params, p)} aria-current={p === page ? "page" : undefined} className={cn(itemClass, p === page ? "bg-blue-600 text-white" : "hover:bg-blue-50")}>
						{p}
					</Link>
				),
			)}

			{page < totalPages ? (
				<Link href={buildHref(params, page + 1)} aria-label="Next page" className={cn(itemClass, "border border-gray-200 hover:bg-blue-50")}>
					<ChevronRight className="size-5" />
				</Link>
			) : (
				<span aria-hidden className={cn(itemClass, "border border-gray-100 text-gray-300")}>
					<ChevronRight className="size-5" />
				</span>
			)}
		</nav>
	);
};

export default Pagination;
