// components/layout/logo.tsx
import Link from "next/link";
import { Outfit } from "next/font/google";
import { cn } from "@/lib/cn";

const logoFont = Outfit({ subsets: ["latin"], weight: ["600", "700"] });

type LogoProps = {
	className?: string;
};

const Logo = ({ className }: LogoProps) => {
	return (
		<Link href="/" aria-label="JobPlatform home" className={cn(logoFont.className, "inline-block shrink-0 text-2xl font-semibold tracking-tight text-primary-500 md:text-3xl", className)}>
			JobPlatform
		</Link>
	);
};

export default Logo;
