"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import Button from "../ui/button";
import Logo from "./logo";
import { roleLabel, type Role } from "@/lib/account-links";

type NavItem = { title: string; href: string };

type Props = {
	navs: NavItem[];
	user: { name: string; role: Role } | null;
	accountLinks: NavItem[];
	postJobHref?: string;
};

const row = "block rounded-lg px-3 py-2.5 text-base font-medium text-gray-800 transition-colors hover:bg-primary-50 hover:text-primary-500";

const MobileMenu = ({ navs, user, accountLinks, postJobHref }: Props) => {
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	useEffect(() => {
		if (!open) return;

		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		const media = window.matchMedia("(min-width: 1024px)");
		const onChange = () => media.matches && setOpen(false);

		document.addEventListener("keydown", onKey);
		media.addEventListener("change", onChange);
		return () => {
			document.body.style.overflow = previous;
			document.removeEventListener("keydown", onKey);
			media.removeEventListener("change", onChange);
		};
	}, [open]);

	const showActions = !user || Boolean(postJobHref);

	const overlay = (
		<div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
			<div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
				<div onClick={close}>
					<Logo className="text-xl md:text-xl" />
				</div>
				<button type="button" aria-label="Close menu" autoFocus onClick={close} className="flex size-9 cursor-pointer items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100">
					<X className="size-5" />
				</button>
			</div>

			<div className="flex-1 overflow-y-auto px-3 py-3">
				<nav aria-label="Mobile">
					<ul>
						{navs.map((item) => (
							<li key={item.title}>
								<Link href={item.href} onClick={close} className={row}>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{user && (
					<section aria-label="Account" className="mt-3 border-t border-gray-100 pt-3">
						<div className="mb-2 flex items-center gap-2.5 px-3">
							<span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-500">
								{user.name.charAt(0).toUpperCase()}
							</span>
							<div className="min-w-0">
								<p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
								<p className="text-xs text-gray-500">{roleLabel[user.role]}</p>
							</div>
						</div>

						<ul className="grid grid-cols-2 gap-2 px-1">
							{accountLinks.map((item) => (
								<li key={item.href}>
									<Link href={item.href} onClick={close} className="block rounded-lg border border-gray-200 px-3 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:border-primary-300 hover:text-primary-500">
										{item.title}
									</Link>
								</li>
							))}
						</ul>

						{/* Cần tạo route hoặc server action /logout khi làm đăng nhập */}
						<Link href="/logout" onClick={close} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
							<LogOut aria-hidden className="size-4" />
							Log out
						</Link>
					</section>
				)}
			</div>

			{showActions && (
				<div className="grid shrink-0 grid-flow-col auto-cols-fr gap-2 border-t border-gray-100 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
					{!user && (
						<Button href="/login" variant="outline" fullWidth onClick={close}>
							Sign In
						</Button>
					)}
					{postJobHref && (
						<Button href={postJobHref} fullWidth onClick={close}>
							Post a Job
						</Button>
					)}
				</div>
			)}
		</div>
	);

	return (
		<div className="lg:hidden">
			<button type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)} className="flex size-10 cursor-pointer items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100">
				<Menu className="size-6" />
			</button>

			{open && createPortal(overlay, document.body)}
		</div>
	);
};

export default MobileMenu;
