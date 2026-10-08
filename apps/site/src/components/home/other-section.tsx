import { ArrowRight } from "lucide-react";
import Container from "../layout/container";
import Button from "../ui/button";
import { cn } from "@/lib/cn";

type CtaCardProps = {
	title: string;
	text: string;
	href: string;
	variant: "light" | "primary";
};

const cardStyles = {
	light: {
		wrapper: "bg-gray-100",
		text: "text-gray-600",
	},
	primary: {
		wrapper: "bg-blue-600 text-white",
		text: "text-white/80",
	},
} as const;

const CtaCard = ({ title, text, href, variant }: CtaCardProps) => {
	const styles = cardStyles[variant];

	return (
		<div className={cn("flex flex-col items-start rounded-xl p-4 sm:p-6 md:p-8 lg:p-12", styles.wrapper)}>
			<h3 className="text-2xl leading-normal font-medium text-balance md:text-[2rem]">{title}</h3>
			<p className={cn("mt-4 leading-relaxed", styles.text)}>{text}</p>
			<Button href={href} variant="ghost" className="mt-6 md:mt-8">
				Register Now
				<ArrowRight aria-hidden />
			</Button>
		</div>
	);
};

const OtherSection = () => {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<div className="grid gap-4 md:grid-cols-2 md:gap-6">
					<CtaCard variant="light" title="Become a Candidate" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur." href="/login" />
					<CtaCard variant="primary" title="Become an Employer" text="Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliqu." href="/login" />
				</div>
			</Container>
		</section>
	);
};

export default OtherSection;
