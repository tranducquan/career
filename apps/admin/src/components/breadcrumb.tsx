"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
	const pathname = usePathname();
	const parts = pathname.split("/").filter(Boolean);

	return (
		<div className="flex h-12 flex-wrap items-center gap-2.5 overflow-hidden border-b border-[#aaa] bg-linear-to-b from-white to-[#ddd] px-4">
			<span className="font-bold">Admin</span>
			{parts.map((part, i) => {
				const href = "/" + parts.slice(0, i + 1).join("/");
				const last = i === parts.length - 1;
				return (
					<span key={href} className="flex items-center gap-2.5">
						<span className="text-gray-500">»</span>
						{last ? <span>{decodeURIComponent(part)}</span> : <Link href={href}>{decodeURIComponent(part)}</Link>}
					</span>
				);
			})}
		</div>
	);
};

export default Breadcrumb;
