"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const HeaderShell = ({ children }: { children: React.ReactNode }) => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header id="header" className={cn("sticky top-0 z-50 border-b bg-white transition-shadow duration-200", scrolled ? "border-transparent shadow-md" : "border-gray-100")}>
			{children}
		</header>
	);
};

export default HeaderShell;
