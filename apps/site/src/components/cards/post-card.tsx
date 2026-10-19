import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { ArrowRight, Calendar, MessageCircleMore } from "lucide-react";
import { cn } from "@/lib/cn";

type PostCardProps = {
	title: string;
	excerpt: string;
	href: string;
	image: string | StaticImageData;
	date: string;
	comments: number;
	orientation?: "horizontal" | "vertical";
	className?: string;
};

const orientationStyles = {
	horizontal: {
		wrapper: "flex-col md:flex-row md:items-center md:gap-8",
		image: "aspect-3/2 md:w-2/5 md:shrink-0",
	},
	vertical: {
		wrapper: "flex-col",
		image: "aspect-3/2 w-full",
	},
} as const;

const PostCard = ({ title, excerpt, href, image, date, comments, orientation = "horizontal", className }: PostCardProps) => {
	const styles = orientationStyles[orientation];

	return (
		<article className={cn("flex gap-4 md:gap-6 rounded-xl border border-gray-200 bg-white p-3 sm:p-4 md:p-6", styles.wrapper, className)}>
			<div className={cn("relative overflow-hidden rounded-xl", styles.image)}>
				<Image src={image} alt="" fill sizes={orientation === "horizontal" ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover" />
			</div>

			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
					<span className="flex items-center gap-2">
						<Calendar aria-hidden className="size-5 text-primary-500" />
						<time>{date}</time>
					</span>
					<span className="flex items-center gap-2">
						<MessageCircleMore aria-hidden className="size-5 text-primary-500" />
						{comments} Comments
					</span>
				</div>

				<h3 className="mt-4 line-clamp-2 text-lg leading-snug font-medium text-gray-900 md:text-xl">{title}</h3>
				<p className="mt-3 line-clamp-3 leading-relaxed text-gray-600">{excerpt}</p>

				<Link href={href} className="mt-5 inline-flex items-center gap-2 font-medium text-primary-500 transition-colors hover:text-primary-700">
					Read more
					<ArrowRight aria-hidden className="size-5" />
				</Link>
			</div>
		</article>
	);
};

export default PostCard;
