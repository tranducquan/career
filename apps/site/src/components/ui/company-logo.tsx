import { cn } from "@/lib/cn";
import type { CompanyType } from "@/types";

type Props = {
	name: string;
	logo?: CompanyType["logo"];
	className?: string;
};

const CompanyLogo = ({ name, logo: Svg, className }: Props) => <div className={cn("flex shrink-0 items-center justify-center", Svg ? "border border-gray-100 bg-gray-100" : "bg-linear-to-br from-blue-500 to-blue-700 font-semibold text-white", className)}>{Svg ? <Svg aria-hidden className="size-3/5" /> : name.charAt(0)}</div>;

export default CompanyLogo;
