import { ArrowRight } from "lucide-react";
import Container from "../layout/container";
import Button from "../ui/button";
import { cn } from "@/lib/cn";

import Image from "next/image";
import type { StaticImageData } from "next/image";

type CtaCardProps = {
	title: string;
	text: string;
	role: "candidate" | "employer";
	variant: "light" | "primary";
	image: string | StaticImageData;
};

const cardStyles = {
	light: {
		wrapper: "bg-gray-100",
		overlay: "bg-gray-100/80",
		text: "text-gray-500",
	},
	primary: {
		wrapper: "bg-primary-500 text-white",
		overlay: "bg-primary-500/85",
		text: "text-white/80",
	},
} as const;

const CtaCard = ({ title, text, role, variant, image }: CtaCardProps) => {
	const styles = cardStyles[variant];

	return (
		<div className={cn("relative isolate flex flex-col items-start overflow-hidden rounded-xl p-4 sm:p-6 md:p-8 lg:p-12", styles.wrapper)}>
			<Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="-z-20 object-cover object-top-left" />
			{/* <div aria-hidden className={cn("absolute inset-0 -z-10", styles.overlay)} /> */}
			<div className="md:max-w-2/3">
				<h3 className="text-2xl leading-normal font-medium text-balance md:text-[2rem]">{title}</h3>
				<p className={cn("mt-4 leading-relaxed", styles.text)}>{text}</p>
				<Button href={`/register?role=${role}`} variant="ghost" className="mt-6 md:mt-8">
					Register now
					<ArrowRight aria-hidden />
				</Button>
			</div>
		</div>
	);
};

const OtherSection = () => {
	return (
		<section className="py-12 md:py-20 lg:py-24">
			<Container>
				<div className="grid gap-4 md:grid-cols-2 md:gap-6">
					<CtaCard role="candidate" variant="light" image="/images/become4.jpg" title="Become a Candidate" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur." />
					<CtaCard role="employer" variant="primary" image="/images/become.jpg" title="Become an Employer" text="Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliqu." />
				</div>
			</Container>
			``
		</section>
	);
};

export default OtherSection;
