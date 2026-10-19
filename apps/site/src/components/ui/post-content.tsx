// components/sections/post-content.tsx
import { cn } from "@/lib/cn";

type PostContentProps = {
	html: string;
	className?: string;
};

const PostContent = ({ html, className }: PostContentProps) => {
	return (
		<div
			className={cn(
				"prose max-w-none prose-gray",
				// Heading
				"prose-headings:font-medium prose-headings:text-gray-900",
				// Đoạn đầu in đậm như design
				"[&>p:first-child]:text-lg [&>p:first-child]:font-semibold [&>p:first-child]:text-gray-900",
				// Link, ảnh
				"prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline",
				"prose-img:rounded-lg",
				// Quote giống design: nền xanh nhạt, viền trái
				"prose-blockquote:rounded-lg prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:font-medium prose-blockquote:text-gray-900 prose-blockquote:not-italic",
				"[&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none",
				className,
			)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
};

export default PostContent;
