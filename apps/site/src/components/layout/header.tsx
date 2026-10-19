// components/layout/header.tsx
import Link from "next/link";
import { Bell } from "lucide-react";
import Container from "./container";
import Logo from "./logo";
import NavLinks from "./nav-links";
import MobileMenu from "./mobile-menu";
import HeaderShell from "./header-shell";
import Button from "../ui/button";
import { getPostJobAction } from "@/lib/post-job-path";

export const navs = [
	{ title: "Home", href: "/" },
	{ title: "Find Job", href: "/jobs" },
	{ title: "About", href: "/about" },
	{ title: "Blog", href: "/blog" },
	{ title: "Employers", href: "/employers" },
	{ title: "Candidates", href: "/candidates" },
];

const extraNavs = [
	{ title: "Pricing Plans", href: "/pricing" },
	{ title: "Customer Supports", href: "/support" },
];

// Tạm hard-code, sau này lấy từ session
const user = null as null | { name: string; role: "candidate" | "employer" };

const Header = () => {
	const postJob = getPostJobAction(user);

	return (
		<HeaderShell>
			<Container>
				<div className="flex h-16 items-center justify-between gap-6 md:h-22.5">
					<Logo />

					<NavLinks navs={navs} className="hidden lg:flex" />

					<div className="flex items-center gap-2 md:gap-3">
						{user ? (
							<>
								<button type="button" aria-label="Notifications" className="flex size-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-500">
									<Bell className="size-5" />
								</button>
								<Link href={user.role === "employer" ? "/employer" : "/candidate"} aria-label="Account" className="flex size-10 items-center justify-center rounded-full bg-primary-100 font-medium text-primary-500">
									{user.name.charAt(0)}
								</Link>
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

						<MobileMenu navs={[...navs, ...extraNavs]} isLoggedIn={!!user} postJobHref={postJob?.href} />
					</div>
				</div>
			</Container>
		</HeaderShell>
	);
};

export default Header;
