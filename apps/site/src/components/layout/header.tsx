// components/layout/header.tsx
import { Suspense } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import Container from "./container";
import Logo from "./logo";
import NavLinks from "./nav-links";
import MobileMenu from "./mobile-menu";
import HeaderShell from "./header-shell";
import Button from "../ui/button";
import { cn } from "@/lib/cn";
import { navLinkBase, navLinkIdle, navListClass } from "./nav-styles";
import { getPostJobAction } from "@/lib/post-job-path";
import AccountMenu from "./account-menu";
import { accountLinks } from "@/lib/account-links";

// Chỉ giữ các trang đang có. Thêm lại About, Employers... khi đã làm trang.
export const navs = [
	{ title: "Home", href: "/" },
	{ title: "Find Job", href: "/jobs" },
	{ title: "Blog", href: "/blog" },
	{ title: "FAQs", href: "/faqs" },
	{ title: "Contact", href: "/contact" },
];

// Tạm hard-code, sau này lấy từ session
// const user = null as null | { name: string; role: "candidate" | "employer" };
const user = { name: "Quan Tran", role: "candidate" } as null | { name: string; role: "candidate" | "employer" };

// Hiển thị khi chưa biết pathname (lúc prerender), cùng style với NavLinks nhưng chưa có trạng thái active
const NavLinksFallback = () => (
	<nav aria-label="Main" className={cn(navListClass, "hidden lg:flex")}>
		{navs.map((item) => (
			<Link key={item.title} href={item.href} className={cn(navLinkBase, navLinkIdle)}>
				{item.title}
			</Link>
		))}
	</nav>
);

const Header = () => {
	const postJob = getPostJobAction(user);

	return (
		<HeaderShell>
			<Container>
				<div className="flex h-16 items-center justify-between gap-6 md:h-20">
					<Logo />

					<Suspense fallback={<NavLinksFallback />}>
						<NavLinks navs={navs} className="hidden lg:flex" />
					</Suspense>

					<div className="flex items-center gap-2 md:gap-3">
						{user ? (
							<>
								<button type="button" aria-label="Notifications" className="flex size-10 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-500">
									<Bell className="size-5" />
								</button>
								<div className="hidden lg:block">
									<AccountMenu user={user} links={accountLinks[user.role]} />
								</div>
							</>
						) : (
							<Button href="/login" variant="outline" className="hidden sm:inline-flex">
								Sign In
							</Button>
						)}

						{postJob && (
							<Button href={postJob.href} className="hidden sm:inline-flex">
								Post a Job
							</Button>
						)}

						<MobileMenu navs={navs} user={user} accountLinks={user ? accountLinks[user.role] : []} postJobHref={postJob?.href} />
					</div>
				</div>
			</Container>
		</HeaderShell>
	);
};

export default Header;
