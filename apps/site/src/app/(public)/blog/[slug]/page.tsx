// app/(public)/blog/[slug]/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MessageCircleMore, Tag } from "lucide-react";

import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import PostCard from "@/components/cards/post-card";
import PostSidebar from "@/components/layout/post-sidebar";
import { posts } from "@/data";
import { buildBlogHref } from "@/lib/blog-filters";
import { categories, tags, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";

type PostDetailPageProps = {
	params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => posts.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PostDetailPageProps): Promise<Metadata> => {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) return { title: "Post not found" };

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: [post.image],
		},
	};
};

const PostDetailPage = ({ params }: PostDetailPageProps) => {
	return (
		<Suspense fallback={<PostDetailSkeleton />}>
			<PostDetail params={params} />
		</Suspense>
	);
};

const PostDetail = async ({ params }: PostDetailPageProps) => {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) notFound();

	const related = getRelatedPosts(post.slug, post.category);
	const paragraphs = post.content.split("\n\n");

	return (
		<div id="post-detail-page">
			<Section>
				<Container>
					<div className="grid gap-8 lg:grid-cols-[18rem_1fr] xl:grid-cols-[20rem_1fr]">
						<PostSidebar filters={{}} categories={categories} tags={tags} />

						<div className="min-w-0">
							<article>
								<div className="relative aspect-video overflow-hidden rounded-2xl">
									<Image src={post.image} alt="" fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
								</div>

								<div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
									<Link href={buildBlogHref({ category: post.category })} className="rounded-md bg-primary-50 px-3 py-1 font-medium text-primary-500 transition-colors hover:bg-primary-100">
										{post.category}
									</Link>
									<span className="flex items-center gap-2">
										<Calendar aria-hidden className="size-5 text-primary-500" />
										<time>{post.date}</time>
									</span>
									<span className="flex items-center gap-2">
										<MessageCircleMore aria-hidden className="size-5 text-primary-500" />
										{post.comments} Comments
									</span>
								</div>

								<h1 className="mt-4 text-2xl leading-snug font-medium text-balance text-gray-900 md:text-4xl md:leading-snug">{post.title}</h1>

								<div className="mt-6 flex items-center gap-3">
									<Image src={post.author.avatar} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
									<div>
										<p className="font-medium text-gray-900">{post.author.name}</p>
										<p className="text-sm text-gray-600">Author</p>
									</div>
								</div>

								<div className="mt-8 flex flex-col gap-5 leading-relaxed text-gray-600 md:text-lg">
									{paragraphs.map((paragraph, index) => (
										<p key={index}>{paragraph}</p>
									))}
								</div>

								<div className="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
									<span className="flex items-center gap-2 text-sm font-medium text-gray-900">
										<Tag aria-hidden className="size-4" />
										Tags:
									</span>
									<ul className="flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<li key={tag}>
												<Link href={buildBlogHref({ tag })} className="inline-block rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-500">
													{tag}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</article>

							{related.length > 0 && (
								<div className="mt-14">
									<h2 className="text-xl font-medium text-gray-900 md:text-2xl">Related posts</h2>
									<div className="mt-6 grid gap-6 md:grid-cols-2">
										{related.map((item) => (
											<PostCard key={item.id} orientation="vertical" image={item.image} date={item.date} comments={item.comments} title={item.title} excerpt={item.excerpt} href={`/blog/${item.slug}`} />
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</Container>
			</Section>
		</div>
	);
};

const PostDetailSkeleton = () => (
	<>
		<div className="h-32 animate-pulse bg-gray-100" />
		<Container>
			<div className="grid gap-8 py-12 md:py-20 lg:grid-cols-[18rem_1fr] xl:grid-cols-[20rem_1fr]">
				<div className="h-96 animate-pulse rounded-2xl bg-gray-100" />
				<div className="flex flex-col gap-4">
					<div className="aspect-video animate-pulse rounded-2xl bg-gray-100" />
					<div className="h-8 w-3/4 animate-pulse rounded bg-gray-100" />
					<div className="h-40 animate-pulse rounded bg-gray-100" />
				</div>
			</div>
		</Container>
	</>
);

export default PostDetailPage;
