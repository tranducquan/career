import type { LucideIcon } from "lucide-react";
import { UserRoundPlus, CloudUpload, ZoomIn, BadgeCheck } from "lucide-react";
import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import { cn } from "@/lib/cn";

type Step = {
	title: string;
	text: string;
	icon: LucideIcon;
};

const steps: Step[] = [
	{ title: "Create account", text: "Aliquam facilisis egestas sapien, nec tempor leo tristique at.", icon: UserRoundPlus },
	{ title: "Upload CV/Resume", text: "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales", icon: CloudUpload },
	{ title: "Find suitable job", text: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.", icon: ZoomIn },
	{ title: "Apply job", text: "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales", icon: BadgeCheck },
];

// Mũi tên nối giữa các bước, chỉ hiện ở màn hình xl
const StepArrow = ({ flipped }: { flipped: boolean }) => (
	<svg aria-hidden focusable="false" width="223" height="49" viewBox="0 0 223 49" fill="none" className={cn("pointer-events-none absolute -right-4 z-10 hidden w-[85%] translate-x-1/2 xl:block", flipped ? "top-18 -scale-y-100" : "-top-2")}>
		<g opacity={0.8}>
			<path d="M.75 40.558S43.709.75 108.627.75s107.877 39.808 107.877 39.808" stroke="#0a65cc" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 8" />
			<path d="M216.041 28.249a.75.75 0 0 0-.852-.632.75.75 0 0 0-.628.854zm1.211 13.092.106.744a.75.75 0 0 0 .634-.855zM204.2 42.433a.75.75 0 0 0-.636.85.75.75 0 0 0 .847.638zm10.361-13.962 1.951 12.982 1.48-.223-1.951-12.981zm2.586 12.126L204.2 42.433l.211 1.488 12.947-1.836z" fill="#0a65cc" />
		</g>
	</svg>
);

const HowToSection = () => {
	const lastIndex = steps.length - 1;

	return (
		<section className="bg-gray-100 py-16 md:py-24">
			<Container>
				<SectionHeading title="How Jobplatform Work" align="center" />

				<ol className="grid gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
					{steps.map(({ title, text, icon: Icon }, i) => (
						<li key={title} className="group relative flex items-start gap-4 rounded-xl bg-blue-100 p-4 transition-[background-color,box-shadow] sm:flex-col sm:items-center sm:bg-transparent sm:p-6 sm:text-center sm:hover:bg-white sm:hover:shadow-lg cursor-pointer">
							<div className="relative shrink-0">
								<div className="flex size-14 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm transition-colors group-hover:bg-blue-600 group-hover:text-white sm:size-18">
									<Icon className="size-6 sm:size-7" />
								</div>
								<span className="absolute -top-1 -left-1 flex size-5 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white sm:hidden">{i + 1}</span>
							</div>

							<div className="min-w-0 sm:flex sm:flex-col sm:items-center">
								<h3 className="mb-1 text-base font-medium sm:mt-6 sm:mb-3 md:text-lg">{title}</h3>
								<p className="max-w-xs text-sm text-gray-500">{text}</p>
							</div>

							{i < lastIndex && <StepArrow flipped={i % 2 !== 0} />}
						</li>
					))}
				</ol>
			</Container>
		</section>
	);
};

export default HowToSection;
