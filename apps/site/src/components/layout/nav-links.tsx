"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type Props = { navs: { title: string; href: string }[]; className?: string };

const NavLinks = ({ navs, className }: Props) => {
	const pathname = usePathname();

	return (
		<nav aria-label="Main" className={cn("items-center gap-8", className)}>
			{navs.map((item) => {
				const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
				return (
					<Link key={item.title} href={item.href} aria-current={active ? "page" : undefined} className={cn("relative py-2 text-base font-medium transition-colors", "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:bg-blue-600 after:transition-transform", active ? "text-blue-600 after:scale-x-100" : "text-gray-600 after:scale-x-0 hover:text-blue-600 hover:after:scale-x-100")}>
						{item.title}
					</Link>
				);
			})}
		</nav>
	);
};

export default NavLinks;
