import Link from "next/link";
import { Bell } from "lucide-react";
import { Outfit } from "next/font/google";
import Container from "./container";
import NavLinks from "./nav-links";
import MobileMenu from "./mobile-menu";
import HeaderShell from "./header-shell";
import Button from "../ui/button";

const logoFont = Outfit({ subsets: ["latin"], weight: ["600", "700"] });

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
const user = null as null | { name: string };

const Header = () => {
	return (
		<HeaderShell>
			<Container>
				<div className="flex h-16 items-center justify-between gap-6 md:h-22.5">
					<Link href="/" className={`${logoFont.className} shrink-0 text-2xl font-semibold tracking-tight text-primary-500 md:text-3xl`}>
						JobPlatform
					</Link>

					<NavLinks navs={navs} className="hidden lg:flex" />

					<div className="flex items-center gap-2 md:gap-3">
						{/* <button type="button" className="hidden items-center gap-1.5 rounded-md px-2 py-2 text-sm text-gray-500 transition-colors hover:text-primary-500 md:flex">
							<span aria-hidden>🇺🇸</span>
							EN
							<ChevronDown className="size-4" aria-hidden />
						</button> */}

						{user ? (
							<>
								<button type="button" aria-label="Notifications" className="flex size-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-500">
									<Bell className="size-5" />
								</button>
								<Link href="/candidate" aria-label="Account" className="flex size-10 items-center justify-center rounded-full bg-primary-100 font-medium text-primary-500">
									{user.name.charAt(0)}
								</Link>
							</>
						) : (
							<Button href="/login" variant="outline" className="hidden sm:inline-flex">
								Sign In
							</Button>
						)}

						<Button href="/employer/post-job" className="hidden sm:inline-flex">
							Post a Job
						</Button>

						<MobileMenu navs={[...navs, ...extraNavs]} isLoggedIn={!!user} />
					</div>
				</div>
			</Container>
		</HeaderShell>
	);
};

export default Header;
