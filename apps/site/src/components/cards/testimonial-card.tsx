import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types";

type Props = {
	item: Testimonial;
	className?: string;
};

// Tạo mảng một lần, không tạo lại mỗi lần render
const STARS = [1, 2, 3, 4, 5];

const TestimonialCard = ({ item, className }: Props) => {
	const { rating, content, avatar, name, role } = item;

	return (
		<figure className={cn("relative flex h-full flex-col rounded-xl bg-white p-4 shadow-md md:p-6", className)}>
			<div className="flex gap-1.5" role="img" aria-label={`${rating} out of 5 stars`}>
				{STARS.map((n) => (
					<Star key={n} aria-hidden className={cn("size-5", n <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-300 text-gray-300")} />
				))}
			</div>

			<blockquote className="mt-4 flex-1 leading-relaxed text-gray-700">{content}</blockquote>

			<figcaption className="mt-8 flex items-center gap-4 pr-16">
				{/* alt rỗng vì tên đã có ngay bên cạnh, tránh screen reader đọc hai lần */}
				<Image src={avatar} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover" />
				<div className="min-w-0">
					<p className="text-base font-medium text-gray-900">{name}</p>
					<p className="text-sm text-gray-500">{role}</p>
				</div>
			</figcaption>

			<svg aria-hidden focusable="false" width="48" height="48" viewBox="0 0 48 48" fill="none" className="pointer-events-none absolute right-6 bottom-6 size-10 text-gray-300 md:size-12">
				<path fillRule="evenodd" clipRule="evenodd" d="M22 34a8 8 0 0 1-16 0c0-4.42 8-28 8-28h4l-4 20a8 8 0 0 1 8 8m20 0a8 8 0 0 1-16 0c0-4.42 8-28 8-28h4l-4 20a8 8 0 0 1 8 8" fill="currentColor" />
			</svg>
		</figure>
	);
};

export default TestimonialCard;
