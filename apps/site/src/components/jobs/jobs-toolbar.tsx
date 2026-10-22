"use client";

import { useRouter } from "next/navigation";
import { ChevronDown, LayoutGrid, StretchHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";
import { DEFAULT_LIMIT, LIMIT_OPTIONS, SORT_OPTIONS } from "@/lib/jobs-view";

type Props = {
	params: Record<string, string | undefined>; // các bộ lọc hiện tại
	sort: string;
	limit: number;
	view: "grid" | "list";
};

const selectClass = "h-12 w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white pr-9 pl-4 text-sm text-gray-700 outline-none focus-visible:border-primary-500";

const JobsToolbar = ({ params, sort, limit, view }: Props) => {
	const router = useRouter();

	const go = (patch: { sort?: string; limit?: number; view?: string }) => {
		const next = { sort, limit, view, ...patch };
		const sp = new URLSearchParams();
		Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
		if (next.sort !== "newest") sp.set("sort", next.sort);
		if (next.limit !== DEFAULT_LIMIT) sp.set("limit", String(next.limit));
		if (next.view !== "grid") sp.set("view", next.view);
		const qs = sp.toString();
		router.push(qs ? `/jobs?${qs}` : "/jobs");
	};

	const viewButton = (value: "grid" | "list", label: string, Icon: typeof LayoutGrid) => (
		<button type="button" aria-label={label} aria-pressed={view === value} onClick={() => go({ view: value })} className={cn("flex size-10 cursor-pointer items-center justify-center rounded-md transition-colors", view === value ? "bg-primary-500 text-white" : "text-gray-400 hover:bg-gray-100")}>
			<Icon className="size-5" aria-hidden />
		</button>
	);

	return (
		<div className="flex flex-wrap items-center gap-3">
			<div className="relative w-40">
				<select aria-label="Sort by" value={sort} onChange={(e) => go({ sort: e.target.value })} className={selectClass}>
					{SORT_OPTIONS.map((o) => (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					))}
				</select>
				<ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-400" aria-hidden />
			</div>

			<div className="relative w-40">
				<select aria-label="Jobs per page" value={limit} onChange={(e) => go({ limit: Number(e.target.value) })} className={selectClass}>
					{LIMIT_OPTIONS.map((n) => (
						<option key={n} value={n}>
							{n} per page
						</option>
					))}
				</select>
				<ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-400" aria-hidden />
			</div>

			<div className="hidden md:flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1">
				{viewButton("grid", "Grid view", LayoutGrid)}
				{viewButton("list", "List view", StretchHorizontal)}
			</div>
		</div>
	);
};

export default JobsToolbar;
