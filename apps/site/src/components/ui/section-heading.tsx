import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "./button";

type Props = {
	title: string;
	href?: string;
	linkText?: string;
	align?: "left" | "center";
	className?: string;
};

const SectionHeading = ({ title, href, linkText = "View All", align = "left", className }: Props) => {
	const isCenter = align === "center";

	return (
		<div className={cn("mb-8 flex gap-4 md:mb-12", isCenter ? "flex-col items-center text-center" : "items-center justify-between", className)}>
			<h2 className={cn("min-w-0 text-balance text-2xl font-medium leading-tight sm:text-3xl md:text-[2.5rem] md:leading-normal", isCenter && "max-w-2xl")}>{title}</h2>
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
