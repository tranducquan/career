"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "../ui/button";

type Props = {
	navs: { title: string; href: string }[];
	isLoggedIn: boolean;
};

const MobileMenu = ({ navs, isLoggedIn }: Props) => {
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	return (
		<div className="lg:hidden">
			<button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex size-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100">
				{open ? <X className="size-6" /> : <Menu className="size-6" />}
			</button>

			{open && (
				<div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-100 bg-white shadow-lg md:inset-x-auto md:right-6 md:top-[calc(100%+0.5rem)] md:w-72 md:rounded-xl md:border md:border-gray-200">
					<nav aria-label="Mobile" className="flex flex-col px-3 py-2 md:px-2 md:py-2">
						{navs.map((item) => (
							<Link key={item.title} href={item.href} onClick={close} className="rounded-md px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 md:py-2 md:text-sm">
								{item.title}
							</Link>
						))}
					</nav>
					<div className="flex flex-col gap-2 border-t border-gray-100 p-4 md:p-3">
						{!isLoggedIn && (
							<Button href="/login" onClick={close}>
								Sign In
							</Button>
						)}
						<Button href="/employer/post-job" onClick={close}>
							Post a Job
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileMenu;
