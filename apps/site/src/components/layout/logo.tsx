// components/layout/logo.tsx
import Link from "next/link";
import { Outfit } from "next/font/google";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/cn";

const logoFont = Outfit({ subsets: ["latin"], weight: ["600", "700"] });

type LogoProps = {
	className?: string;
};

const Logo = ({ className }: LogoProps) => (
	<Link href="/" aria-label="JobPlatform home" className={cn(logoFont.className, "inline-flex shrink-0 items-center gap-2 text-2xl font-semibold tracking-tight text-gray-900 md:text-[1.75rem]", className)}>
		<span aria-hidden className="flex size-8 items-center justify-center rounded-lg bg-primary-500 text-white md:size-9">
			<Briefcase className="size-4.5 md:size-5" strokeWidth={2} />
		</span>
		<span>
			Job<span className="text-primary-500">Platform</span>
		</span>
	</Link>
);

export default Logo;
