// apps/site/src/components/layout/breadcrumb.tsx
"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "./container";
import { cn } from "@/lib/cn";

type BreadcrumbItem = {
	label: string;
	href: string;
	segment?: string;
};

const labels: Record<string, string> = {
	jobs: "Find Job",
	blog: "Blog",
	about: "About Us",
	employers: "Employers",
	candidates: "Candidates",
	pricing: "Pricing Plans",
	support: "Customer Supports",
	"post-job": "Post a Job",
};

const humanize = (segment: string) =>
	decodeURIComponent(segment)
		.split("-")
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

// /jobs/<slug>-<id>: bỏ phần id số ở cuối
const stripId = (segment: string) => segment.replace(/-\d+$/, "");

// Segment không có trang riêng: hiện text, không tạo link
const noPage = new Set(["employer", "candidate"]);

const Inner = () => {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);

	// Home: không hiển thị
	if (segments.length === 0) return null;

	const items: BreadcrumbItem[] = [
		{ label: "Home", href: "/" },
		...segments.map((segment, index) => {
			const isJobDetail = segments[0] === "jobs" && index > 0;
			return {
				segment,
				label: labels[segment] ?? humanize(isJobDetail ? stripId(segment) : segment),
				href: "/" + segments.slice(0, index + 1).join("/"),
			};
		}),
	];

	const current = items[items.length - 1].label;

	return (
		<section className="bg-gray-100 py-3 md:py-6">
			<Container>
				<div className="flex items-center md:justify-between md:gap-6">
					<p className="hidden min-w-0 truncate text-base font-medium text-gray-900 md:block md:text-lg">{current}</p>

					<nav aria-label="Breadcrumb" className="min-w-0 md:max-w-[60%]">
						<ol className="flex items-center gap-2 text-sm text-gray-500">
							{items.map((item, index) => {
								const isLast = index === items.length - 1;

								return (
									<li key={item.href} className={cn("flex items-center gap-2", isLast && "min-w-0")}>
										{isLast || (item.segment && noPage.has(item.segment)) ? (
											<span aria-current={isLast ? "page" : undefined} className={cn("truncate", isLast && "font-medium text-gray-900")}>
												{item.label}
											</span>
										) : (
											<Link href={item.href} className="whitespace-nowrap transition-colors hover:text-primary-500">
												{item.label}
											</Link>
										)}
										{!isLast && (
											<span aria-hidden className="shrink-0 text-gray-400">
												/
											</span>
										)}
									</li>
								);
							})}
						</ol>
					</nav>
				</div>
			</Container>
		</section>
	);
};

// usePathname ở route động cần Suspense khi dùng Cache Components
const Breadcrumb = () => (
	<Suspense fallback={null}>
		<Inner />
	</Suspense>
);

export default Breadcrumb;
