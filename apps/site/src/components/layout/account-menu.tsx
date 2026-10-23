"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/cn";
import { roleLabel, type Role } from "@/lib/account-links";

type Props = { user: { name: string; role: Role }; links: { title: string; href: string }[] };

const AccountMenu = ({ user, links }: Props) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		document.addEventListener("mousedown", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<div ref={ref} className="relative">
			<button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex h-10 cursor-pointer items-center gap-2 rounded-full pr-2 pl-1 transition-colors hover:bg-gray-100">
				<span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-500">
					{user.name.charAt(0).toUpperCase()}
				</span>
				<span className="max-w-32 truncate text-sm font-medium text-gray-800">{user.name}</span>
				<ChevronDown aria-hidden className={cn("size-4 text-gray-400 transition-transform", open && "rotate-180")} />
			</button>

			{open && (
				<div role="menu" className="absolute top-full right-0 z-50 mt-2 w-60 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg">
					<div className="border-b border-gray-100 px-4 pt-1.5 pb-3">
						<p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
						<p className="text-xs text-gray-500">{roleLabel[user.role]}</p>
					</div>
					<ul className="py-1.5">
						{links.map((item) => (
							<li key={item.href}>
								<Link role="menuitem" href={item.href} onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-500">
									{item.title}
								</Link>
							</li>
						))}
					</ul>
					<div className="border-t border-gray-100 pt-1.5">
						<Link role="menuitem" href="/logout" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50">
							<LogOut aria-hidden className="size-4" />
							Log out
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default AccountMenu;
