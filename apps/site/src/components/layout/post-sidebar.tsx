// components/sections/post-sidebar.tsx
import Link from "next/link";
import { Search, X } from "lucide-react";

import { buildBlogHref, type BlogFilters } from "@/lib/blog-filters";
import { cn } from "@/lib/cn";

type Option = { name: string; count: number };

type PostSidebarProps = {
	filters: BlogFilters;
	categories: Option[];
	tags: string[];
};

const PostSidebar = ({ filters, categories, tags }: PostSidebarProps) => {
	const { q, category, tag } = filters;
	const hasFilters = Boolean(q || category || tag);

	return (
		<aside className="flex flex-col gap-8 rounded-2xl border border-gray-200 p-5 md:p-6 lg:sticky lg:top-24 lg:self-start">
			{/* Search */}
			<div>
				<h2 className="text-lg font-medium text-gray-900">Search</h2>
				<form action="/blog" className="relative mt-4">
					{category && <input type="hidden" name="category" value={category} />}
					{tag && <input type="hidden" name="tag" value={tag} />}
					<input type="search" name="q" defaultValue={q} placeholder="Search posts..." className="h-12 w-full rounded-lg border border-gray-200 pr-12 pl-4 text-sm outline-none focus:border-primary-500" />
					<button type="submit" aria-label="Search" className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-primary-500">
						<Search aria-hidden className="size-5" />
					</button>
				</form>
			</div>

			{/* Categories */}
			<div>
				<h2 className="text-lg font-medium text-gray-900">Categories</h2>
				<ul className="mt-4 flex flex-col gap-1">
					{categories.map((item) => {
						const active = item.name === category;
						return (
							<li key={item.name}>
								<Link href={buildBlogHref({ q, tag, category: active ? undefined : item.name })} aria-current={active ? "true" : undefined} className={cn("flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-primary-50 font-medium text-primary-500" : "text-gray-600 hover:bg-gray-100")}>
									{item.name}
									<span className="text-xs text-gray-400">{item.count}</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Tags */}
			<div>
				<h2 className="text-lg font-medium text-gray-900">Popular tags</h2>
				<ul className="mt-4 flex flex-wrap gap-2">
					{tags.map((item) => {
						const active = item === tag;
						return (
							<li key={item}>
								<Link href={buildBlogHref({ q, category, tag: active ? undefined : item })} aria-current={active ? "true" : undefined} className={cn("inline-block rounded-md px-3 py-1.5 text-sm transition-colors", active ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-500")}>
									{item}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>

			{hasFilters && (
				<Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-700">
					<X aria-hidden className="size-4" />
					Clear all filters
				</Link>
			)}
		</aside>
	);
};

export default PostSidebar;
