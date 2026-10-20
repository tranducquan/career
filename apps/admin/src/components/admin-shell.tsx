"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

type Item = { label: string; href: string };
type Section = { label: string; href: string; icon: ReactNode; items: Item[] };

const Svg = ({ children }: { children: ReactNode }) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0" aria-hidden>
		{children}
	</svg>
);

const sections: Section[] = [
	{
		label: "Jobs",
		href: "/jobs",
		icon: (
			<Svg>
				<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
				<rect width="20" height="14" x="2" y="6" rx="2" />
			</Svg>
		),
		items: [
			{ label: "All Jobs", href: "/jobs" },
			{ label: "Add New", href: "/jobs/new" },
		],
	},
	{
		label: "Companies",
		href: "/companies",
		icon: (
			<Svg>
				<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
				<path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
				<path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
				<path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
			</Svg>
		),
		items: [
			{ label: "All Companies", href: "/companies" },
			{ label: "Add New", href: "/companies/new" },
		],
	},
	{
		label: "Categories",
		href: "/categories",
		icon: (
			<Svg>
				<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
				<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
			</Svg>
		),
		items: [
			{ label: "All Categories", href: "/categories" },
			{ label: "Add New", href: "/categories/new" },
		],
	},
];

// "Add New" chỉ sáng ở đúng trang /new, còn "All ..." sáng ở danh sách và trang sửa
const isItemActive = (item: Item, pathname: string) => {
	if (item.href.endsWith("/new")) return pathname === item.href;
	const base = item.href;
	return pathname === base || (pathname.startsWith(`${base}/`) && !pathname.startsWith(`${base}/new`));
};

const AdminShell = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname() ?? "";
	// Menu mobile chỉ mở cho đúng trang đang xem, nên chuyển trang là menu tự đóng, không cần effect
	const [openFor, setOpenFor] = useState<string | null>(null);
	const open = openFor === pathname;

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpenFor(null);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);

	return (
		<>
			{/* Thanh admin trên cùng */}
			<header className="fixed inset-x-0 top-0 z-50 flex h-11 items-center bg-wp-bar text-sm text-wp-bg md:h-8">
				<button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="admin-menu" onClick={() => setOpenFor(open ? null : pathname)} className="flex h-11 w-12 items-center justify-center md:hidden">
					<Svg>
						{open ? (
							<>
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</>
						) : (
							<>
								<path d="M4 6h16" />
								<path d="M4 12h16" />
								<path d="M4 18h16" />
							</>
						)}
					</Svg>
				</button>
				<Link href="/" className="px-3 hover:text-[#72aee6] md:pl-3">
					Career Admin
				</Link>
				<div className="ml-auto flex items-center gap-3 pr-3">
					<span className="hidden text-wp-border sm:inline">Howdy, Admin</span>
					<form action={logout}>
						<button type="submit" className="cursor-pointer hover:text-[#72aee6]">
							Log Out
						</button>
					</form>
				</div>
			</header>

			{/* Sidebar tối bên trái. Mobile: mở bằng nút trên thanh admin */}
			{open && <button type="button" aria-label="Close menu" onClick={() => setOpenFor(null)} className="fixed inset-0 top-11 z-30 bg-black/40 md:hidden" />}
			<nav id="admin-menu" aria-label="Main menu" className={`fixed top-11 bottom-0 left-0 z-40 w-64 overflow-y-auto bg-wp-menu text-sm md:top-8 md:w-40 lg:w-50 ${open ? "block" : "hidden md:block"}`}>
				<ul>
					<li>
						<Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`flex items-center gap-2.5 px-3 py-3 md:py-2 ${pathname === "/" ? "bg-wp-accent text-white" : "text-wp-bg hover:bg-wp-menu-hover hover:text-[#72aee6]"}`}>
							<Svg>
								<rect width="7" height="9" x="3" y="3" rx="1" />
								<rect width="7" height="5" x="14" y="3" rx="1" />
								<rect width="7" height="9" x="14" y="12" rx="1" />
								<rect width="7" height="5" x="3" y="16" rx="1" />
							</Svg>
							<span>Dashboard</span>
						</Link>
					</li>
					{sections.map((section) => {
						const current = pathname === section.href || pathname.startsWith(`${section.href}/`);
						return (
							<li key={section.href}>
								<Link href={section.href} aria-current={current ? "page" : undefined} className={`flex items-center gap-2.5 px-3 py-3 md:py-2 ${current ? "bg-wp-accent text-white" : "text-wp-bg hover:bg-wp-menu-hover hover:text-[#72aee6]"}`}>
									{section.icon}
									<span>{section.label}</span>
								</Link>
								{current && (
									<ul className="bg-wp-submenu py-2">
										{section.items.map((item) => (
											<li key={item.href}>
												<Link href={item.href} className={`block py-1.5 pr-2 pl-10 text-sm md:py-1 md:pl-10 ${isItemActive(item, pathname) ? "font-semibold text-white" : "text-wp-border hover:text-[#72aee6]"}`}>
													{item.label}
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>
						);
					})}
				</ul>
			</nav>

			<main className="pt-11 md:ml-40 lg:ml-50 md:pt-8">
				<div className="p-3 md:px-5 md:py-4">{children}</div>
			</main>
		</>
	);
};

export default AdminShell;
