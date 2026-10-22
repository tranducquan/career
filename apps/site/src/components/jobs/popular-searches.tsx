import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
	tags: string[];
	active?: string;
	max?: number;
	extra?: Record<string, string | undefined>;
};

const norm = (s?: string) => s?.trim().toLowerCase();

const PopularSearches = ({ tags, active, max = 8, extra }: Props) => {
	if (tags.length === 0) return null;

	// Cắt theo max, nhưng vẫn giữ tag đang chọn nếu nó nằm ngoài top
	const visible = tags.slice(0, max);
	const activeTag = tags.find((t) => norm(t) === norm(active));
	if (activeTag && !visible.includes(activeTag)) visible.push(activeTag);

	// Dựng URL, giữ lại sort / limit / view đang chọn
	const build = (q?: string) => {
		const sp = new URLSearchParams();
		if (q) sp.set("q", q);
		Object.entries(extra ?? {}).forEach(([k, v]) => v && sp.set(k, v));
		const qs = sp.toString();
		return qs ? `/jobs?${qs}` : "/jobs";
	};

	return (
		<nav aria-label="Popular searches" className="mt-5 flex flex-col gap-2 text-sm md:flex-row md:items-start md:gap-3">
			<span className="text-gray-500 md:shrink-0 md:py-1.5">Popular searches:</span>
			<div className="-mx-4 flex min-w-0 gap-x-1 overflow-x-auto px-4 scrollbar-none md:mx-0 md:flex-1 md:flex-wrap md:gap-y-2 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
				{visible.map((tag) => {
					const isActive = norm(active) === norm(tag);
					return (
						<Link
							key={tag}
							// Đang chọn thì bấm lại sẽ bỏ chọn
							href={isActive ? build() : build(tag)}
							aria-current={isActive ? "true" : undefined}
							aria-label={isActive ? `Clear search: ${tag}` : undefined}
							className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 font-medium whitespace-nowrap transition-colors", isActive ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-200/70")}
						>
							{tag}
							{isActive && <X className="size-3.5" aria-hidden />}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default PopularSearches;
