// app/(public)/blog/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Container from "@/components/layout/container";
import PostCard from "@/components/cards/post-card";
import PostSidebar from "@/components/layout/post-sidebar";
import { posts } from "@/data";
import { buildBlogHref, type BlogFilters } from "@/lib/blog-filters";
import { cn } from "@/lib/cn";
import { categories, tags } from "@/lib/blog-data";

export const metadata: Metadata = {
	title: "Blog",
	description: "Latest articles, career tips and hiring advice.",
};

const PAGE_SIZE = 4;

type BlogPageProps = {
	searchParams: Promise<{ q?: string; category?: string; tag?: string; page?: string }>;
};

const BlogPage = ({ searchParams }: BlogPageProps) => {
	return (
		<>
			{/* <PageHeader title="Blog" breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]} /> */}

			<section className="py-12 md:py-20">
				<Container>
					<Suspense fallback={<BlogSkeleton />}>
						<BlogContent searchParams={searchParams} />
					</Suspense>
				</Container>
			</section>
		</>
	);
};

const BlogContent = async ({ searchParams }: BlogPageProps) => {
	const { q, category, tag, page } = await searchParams;
	const filters: BlogFilters = { q, category, tag };

	const keyword = q?.trim().toLowerCase();
	const filtered = posts.filter((post) => {
		if (category && post.category !== category) return false;
		if (tag && !post.tags.includes(tag)) return false;
		if (keyword && !`${post.title} ${post.excerpt}`.toLowerCase().includes(keyword)) return false;
		return true;
	});

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);
	const visiblePosts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	return (
		<div className="grid gap-8 lg:grid-cols-[18rem_1fr] xl:grid-cols-[20rem_1fr]">
			<PostSidebar filters={filters} categories={categories} tags={tags} />

			<div>
				{/* <p className="mb-6 text-sm text-gray-600">
					{filtered.length} {filtered.length === 1 ? "post" : "posts"} found
				</p> */}

				{visiblePosts.length === 0 ? (
					<div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
						<p className="font-medium text-gray-900">No posts found</p>
						<p className="mt-1 text-sm text-gray-600">Try changing or clearing your filters.</p>
					</div>
				) : (
					<div className="grid gap-6">
						{visiblePosts.map((post) => (
							<PostCard key={post.id} orientation="horizontal" image={post.image} date={post.date} comments={post.comments} title={post.title} excerpt={post.excerpt} href={`/blog/${post.slug}`} />
						))}
					</div>
				)}

				{totalPages > 1 && (
					<nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2 md:mt-14">
						<PageLink href={buildBlogHref({ ...filters, page: currentPage - 1 })} disabled={currentPage === 1} label="Previous page">
							<ChevronLeft aria-hidden className="size-5" />
						</PageLink>

						{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
							<PageLink key={p} href={buildBlogHref({ ...filters, page: p })} active={p === currentPage} label={`Page ${p}`}>
								{String(p).padStart(2, "0")}
							</PageLink>
						))}

						<PageLink href={buildBlogHref({ ...filters, page: currentPage + 1 })} disabled={currentPage === totalPages} label="Next page">
							<ChevronRight aria-hidden className="size-5" />
						</PageLink>
					</nav>
				)}
			</div>
		</div>
	);
};

const BlogSkeleton = () => (
	<div className="grid gap-8 lg:grid-cols-[18rem_1fr] xl:grid-cols-[20rem_1fr]">
		<div className="h-96 animate-pulse rounded-2xl bg-gray-100" />
		<div className="grid gap-6 md:grid-cols-2">
			{Array.from({ length: PAGE_SIZE }, (_, i) => (
				<div key={i} className="h-96 animate-pulse rounded-2xl bg-gray-100" />
			))}
		</div>
	</div>
);

type PageLinkProps = {
	href: string;
	label: string;
	active?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
};

const PageLink = ({ href, label, active, disabled, children }: PageLinkProps) => {
	const base = "flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors md:size-12";

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

export default BlogPage;
