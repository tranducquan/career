"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

const items = [
	{ href: "/jobs", label: "Jobs" },
	{ href: "/companies", label: "Companies" },
	{ href: "/categories", label: "Categories" },
];

const NavLinks = ({ pathname, roomy }: { pathname: string; roomy?: boolean }) => (
	<nav aria-label="Main" className="flex flex-col gap-1">
		{items.map((item) => {
			const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
			return (
				<Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`rounded px-3 ${roomy ? "py-3 text-base" : "py-2"} ${active ? "bg-black text-white" : "hover:bg-gray-200"}`}>
					{item.label}
				</Link>
			);
		})}
	</nav>
);

const LogoutButton = ({ roomy }: { roomy?: boolean }) => (
	<form action={logout}>
		<button type="submit" className={`w-full rounded px-3 text-left hover:bg-gray-200 ${roomy ? "py-3 text-base" : "py-2"}`}>
			Logout
		</button>
	</form>
);

const Sidebar = () => {
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
			{/* Màn hình lớn: sidebar cố định bên trái */}
			<aside className="fixed inset-y-0 left-0 z-20 hidden w-56 flex-col border-r border-gray-200 bg-gray-50 p-3 lg:flex">
				<p className="mb-4 px-3 py-2 text-base font-medium">Admin</p>
				<NavLinks pathname={pathname} />
				<div className="mt-auto">
					<LogoutButton />
				</div>
			</aside>

			{/* Mobile và tablet: thanh trên cùng và menu toàn màn hình */}
			<header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
				<span className="text-base font-medium">Admin</span>
				<button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpenFor(open ? null : pathname)} className="rounded border border-gray-300 px-3 py-1.5">
					{open ? "Close" : "Menu"}
				</button>
			</header>

			{open && (
				<div id="mobile-menu" className="fixed inset-x-0 top-14 bottom-0 z-30 flex flex-col overflow-y-auto bg-white p-3 lg:hidden">
					<NavLinks pathname={pathname} roomy />
					<div className="mt-auto border-t border-gray-200 pt-3">
						<LogoutButton roomy />
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;
