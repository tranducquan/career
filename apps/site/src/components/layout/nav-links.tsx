"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { navLinkActive, navLinkBase, navLinkIdle, navListClass } from "./nav-styles";

type Props = { navs: { title: string; href: string }[]; className?: string };

// "/blog" khớp "/blog" và "/blog/abc", nhưng không khớp "/blogger"
const isActive = (href: string, pathname: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

const NavLinks = ({ navs, className }: Props) => {
	const pathname = usePathname();

	return (
		<nav aria-label="Main" className={cn(navListClass, className)}>
			{navs.map((item) => {
				const active = isActive(item.href, pathname);
				return (
					<Link key={item.title} href={item.href} aria-current={active ? "page" : undefined} className={cn(navLinkBase, active ? navLinkActive : navLinkIdle)}>
						{item.title}
					</Link>
				);
			})}
		</nav>
	);
};

export default NavLinks;
