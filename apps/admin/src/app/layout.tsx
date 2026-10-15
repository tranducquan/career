import type { Metadata } from "next";
import { isAdmin } from "@/lib/require-admin";
import { logout } from "@/app/login/actions";
import NavLink from "@/components/nav-link";
import Breadcrumb from "@/components/breadcrumb";
import "./globals.css";

export const metadata: Metadata = {
	title: "Admin",
	robots: { index: false, follow: false },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const loggedIn = await isAdmin();

	return (
		<html lang="en">
			<body className="min-h-screen">
				{loggedIn ? (
					<div className="flex min-h-screen flex-col md:flex-row">
						<aside className="flex flex-wrap bg-[#f3f3f3] md:w-56 md:shrink-0 md:flex-col md:flex-nowrap md:border-r md:border-[#aaa]">
							<div className="order-1 flex h-12 flex-1 items-center border-b border-[#aaa] px-4 text-base font-bold md:w-full md:flex-none">Admin</div>

							<nav className="order-3 flex w-full flex-row md:order-2 md:flex-1 md:flex-col">
								<NavLink href="/">Home</NavLink>
								<NavLink href="/jobs">Jobs</NavLink>
								<NavLink href="/companies">Companies</NavLink>
							</nav>

							<form action={logout} className="order-2 flex border-[#aaa] md:order-3 md:block md:border-t">
								<button type="submit" className="h-12 rounded-none border-0 border-b border-l border-[#aaa] bg-[#fafafa] bg-none px-4 hover:bg-[#fde8e8] hover:text-red-700 md:h-auto md:w-full md:border-l-0 md:border-b md:py-2.5 md:text-left">
									Logout
								</button>
							</form>
						</aside>

						<div className="flex min-w-0 flex-1 flex-col">
							<Breadcrumb />
							<main className="p-6">{children}</main>
						</div>
					</div>
				) : (
					children
				)}
			</body>
		</html>
	);
};

export default RootLayout;
