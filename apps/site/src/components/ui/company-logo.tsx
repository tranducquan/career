import { cn } from "@/lib/cn";
import type { CompanyType } from "@/types";

type Props = {
	name: string;
	logo?: CompanyType["logo"];
	logoUrl?: string;
	className?: string;
};

const THESVG_PREFIX = "thesvg:";

// "thesvg:apple-music" → URL ảnh trên thesvg.org, còn lại giữ nguyên
const resolveLogoUrl = (value?: string) => (value?.startsWith(THESVG_PREFIX) ? `https://thesvg.org/icons/${value.slice(THESVG_PREFIX.length)}/default.svg` : value);

// "FPT Software" → "FS", "Google" → "GO"
const getInitials = (name: string) => {
	const words = name.trim().split(/\s+/).filter(Boolean);
	const letters = words.length >= 2 ? words[0].charAt(0) + words[1].charAt(0) : (words[0] ?? "").slice(0, 2);
	return letters.toUpperCase();
};

const CompanyLogo = ({ name, logo: Svg, logoUrl, className }: Props) => {
	const src = resolveLogoUrl(logoUrl);
	const hasLogo = !!(Svg || src);

	return (
		<div className={cn("flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg", hasLogo ? "border border-gray-100 bg-gray-200" : "bg-linear-to-br from-primary-400 to-primary-600 font-semibold text-white", className)}>
			{Svg ? (
				<Svg aria-hidden className="h-7 w-7 shrink-0 object-contain" />
			) : logoUrl ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img src={src} alt="" aria-hidden className="size-full object-contain p-2" />
			) : (
				getInitials(name)
			)}
		</div>
	);
};

export default CompanyLogo;
