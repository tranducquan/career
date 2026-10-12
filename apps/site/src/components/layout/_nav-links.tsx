"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

type Props = { navs: { title: string; href: string }[] };

const NavLinks = ({ navs }: Props) => {
	const pathname = usePathname();

	return (
		<nav aria-label="Main" className="flex gap-8">
			{navs.map((item) => {
				const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
				return (
					<Link key={item.title} href={item.href} aria-current={active ? "page" : undefined} className={cn("border-b-2 py-3.5 text-sm transition-colors", active ? "border-blue-600 text-blue-600 font-medium" : "border-transparent text-gray-600 hover:text-blue-600")}>
						{item.title}
					</Link>
				);
			})}
		</nav>
	);
};

export default NavLinks;
