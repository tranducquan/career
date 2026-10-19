import type { Metadata } from "next";
import AdminShell from "@/components/admin-shell";
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
			<body>{loggedIn ? <AdminShell>{children}</AdminShell> : children}</body>
		</html>
	);
};

export default RootLayout;
