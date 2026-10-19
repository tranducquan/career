// lib/blog-data.ts
import { posts } from "@/data";

export const categories = Object.entries(
	posts.reduce<Record<string, number>>((acc, post) => {
		acc[post.category] = (acc[post.category] ?? 0) + 1;
		return acc;
	}, {}),
).map(([name, count]) => ({ name, count }));

export const tags = [...new Set(posts.flatMap((post) => post.tags))];

export const getPostBySlug = (slug: string) => posts.find((post) => post.slug === slug);

export const getRelatedPosts = (slug: string, category: string, limit = 2) => posts.filter((post) => post.slug !== slug && post.category === category).slice(0, limit);
