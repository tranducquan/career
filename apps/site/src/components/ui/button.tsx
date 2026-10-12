import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

type OwnProps = {
	variant?: Variant;
	size?: Size;
	className?: string;
	fullWidth?: boolean | "mobile";
	children: React.ReactNode;
};

type ButtonProps = OwnProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof OwnProps> & { href?: undefined };

type LinkProps = OwnProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof OwnProps | "href"> & { href: string };

type Props = ButtonProps | LinkProps;

const variants: Record<Variant, string> = {
	primary: "border-blue-600 bg-blue-600 text-white hover:border-blue-800 hover:bg-blue-800",
	outline: "border-blue-100 bg-transparent text-blue-600 hover:bg-blue-100",
	light: "border-blue-100 bg-blue-100 text-blue-600 hover:border-blue-600 hover:bg-blue-600 group-hover:text-white",
	ghost: "border-white bg-white text-blue-600 hover:shadow-md transition-shadow",
};

const sizes: Record<Size, string> = {
	sm: "min-h-11 px-4 py-2 text-sm sm:min-h-10 [&_svg]:size-4",
	md: "px-5 py-2.5 text-sm sm:px-6 sm:text-base [&_svg]:size-4 sm:[&_svg]:size-5",
	lg: "px-6 py-3 text-base sm:px-8 sm:text-lg [&_svg]:size-5 sm:[&_svg]:size-6",
};

const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border font-semibold transition-colors " + "[&_svg]:shrink-0 " + "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 " + "disabled:pointer-events-none disabled:opacity-50";

const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

const Button = (props: Props) => {
	const { variant = "primary", size = "md", fullWidth, className, children, ...rest } = props;
	const classes = cn(base, variants[variant], sizes[size], fullWidth === true && "w-full", fullWidth === "mobile" && "w-full sm:w-auto", className);

	if (typeof rest.href === "string") {
		const { href, target, ...anchorProps } = rest as LinkProps;

		if (isExternal(href) || target === "_blank") {
			return (
				<a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={classes} {...anchorProps}>
					{children}
				</a>
			);
		}

		return (
			<Link href={href} target={target} className={classes} {...anchorProps}>
				{children}
			</Link>
		);
	}

	const { type = "button", ...buttonProps } = rest as ButtonProps;
	return (
		<button type={type} className={cn(classes, "cursor-pointer")} {...buttonProps}>
			{children}
		</button>
	);
};

export default Button;
