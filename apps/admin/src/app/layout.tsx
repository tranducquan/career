import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { isAdmin } from "@/lib/require-admin";
import "./globals.css";

export const metadata: Metadata = {
	title: "Admin",
	robots: { index: false, follow: false },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const loggedIn = await isAdmin();

	return (
		<html lang="en">
			<body className="text-sm text-gray-900">
				{loggedIn ? (
					<>
						<Sidebar />
						<main className="min-w-0 max-w-full p-3 lg:ml-56 lg:p-6">
							<div className="min-w-0">{children}</div>
						</main>
					</>
				) : (
					children
				)}
			</body>
		</html>
	);
};

export default RootLayout;
