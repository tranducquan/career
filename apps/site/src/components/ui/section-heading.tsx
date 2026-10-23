import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "./button";

type Props = {
	title: string;
	eyebrow?: string; // nhãn nhỏ phía trên tiêu đề, ví dụ "Categories"
	description?: string; // một câu mô tả phía dưới tiêu đề
	href?: string;
	linkText?: string;
	align?: "left" | "center";
	className?: string;
};

const SectionHeading = ({ title, eyebrow, description, href, linkText = "View All", align = "left", className }: Props) => {
	const isCenter = align === "center";

	return (
		<div className={cn("mb-8 flex gap-4 md:mb-12", isCenter ? "flex-col items-center text-center" : "items-end justify-between", className)}>
			<div className={cn("min-w-0", isCenter && "max-w-2xl")}>
				{eyebrow && <p className="mb-3 text-sm font-semibold tracking-wider text-primary-500 uppercase">{eyebrow}</p>}
				<h2 className="text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl md:text-4xl md:leading-snug">{title}</h2>
				{description && <p className={cn("mt-3 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg", isCenter && "mx-auto")}>{description}</p>}
			</div>
			{href && (
				<Button href={href} variant="outline" className="shrink-0">
					{linkText}
					<ArrowRight />
				</Button>
			)}
		</div>
	);
};

export default SectionHeading;
