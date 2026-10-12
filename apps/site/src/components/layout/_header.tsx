import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { Outfit } from "next/font/google";
import Container from "./container";
import MobileMenu from "./mobile-menu";
import NavLinks from "./nav-links";
import Button from "../ui/button";
import { Search, MapPin } from "lucide-react";

const logoFont = Outfit({ subsets: ["latin"], weight: ["600", "700"] });

const navs = [
	{ title: "Home", href: "/" },
	{ title: "Find Job", href: "/jobs" },
	{ title: "Employers", href: "/employers" },
	{ title: "Candidates", href: "/candidates" },
	{ title: "Customer Supports", href: "/support" },
];

const user = null as null | { name: string };

const Header = () => {
	return (
		<header id="header" className="sticky top-0 z-50 bg-white shadow-sm">
			<div className="hidden bg-gray-50 md:block">
				<Container>
					<div className="flex items-center justify-between">
						<NavLinks navs={navs} />
						<button type="button" className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-600">
							<span aria-hidden>🇺🇸</span>
							English
							<ChevronDown className="size-4" aria-hidden />
						</button>
					</div>
				</Container>
			</div>

			<Container>
				<div className="flex items-center justify-between gap-4 py-3 md:py-5">
					<Link href="/" className={`${logoFont.className} text-2xl font-semibold tracking-tight text-blue-600 md:text-3xl`}>
						JobPlatform
					</Link>

					<form action="/jobs" method="GET" role="search" className="hidden max-w-xl flex-1 items-center rounded-md border border-gray-200 bg-white transition-colors focus-within:border-blue-600 lg:flex">
						<label className="flex flex-1 items-center gap-2 px-3 py-2.5">
							<Search className="size-5 shrink-0 text-blue-600" aria-hidden />
							<span className="sr-only">Job title or keyword</span>
							<input type="text" name="q" placeholder="Job title, keyword, company" className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400" />
						</label>
						<label className="hidden items-center gap-2 border-l border-gray-200 px-3 py-2.5 xl:flex">
							<MapPin className="size-5 shrink-0 text-blue-600" aria-hidden />
							<span className="sr-only">Location</span>
							<input type="text" name="location" placeholder="Your location" className="w-40 bg-transparent text-sm outline-none placeholder:text-gray-400" />
						</label>
					</form>

					<div className="flex items-center gap-3">
						{user ? (
							<>
								<button type="button" aria-label="Notifications" className="flex size-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600">
									<Bell className="size-5" />
								</button>
								<Link href="/candidate" aria-label="Account" className="flex size-10 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-600">
									{user.name.charAt(0)}
								</Link>
							</>
						) : (
							<Button href="/login" variant="outline" className="hidden md:inline-flex">
								Sign In
							</Button>
						)}
						<Button href="/employer/post-job" className="hidden md:inline-flex">
							Post a Job
						</Button>
						<MobileMenu navs={navs} isLoggedIn={!!user} />
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
