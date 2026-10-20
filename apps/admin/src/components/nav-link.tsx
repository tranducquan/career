"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
	const pathname = usePathname();
	const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

	return (
		<Link href={href} aria-current={active ? "page" : undefined} className={`flex flex-1 items-center justify-center gap-2 border-r border-b border-[#aaa] px-3 py-2.5 whitespace-nowrap last:border-r-0 hover:no-underline md:w-full md:flex-none md:justify-between md:border-r-0 md:px-4 ${active ? "bg-white font-bold" : "bg-[#fafafa] hover:bg-[#e3e3e3]"}`}>
			{children}
			{active && <span className="size-2 bg-[#235a81]" />}
		</Link>
	);
};

export default NavLink;
