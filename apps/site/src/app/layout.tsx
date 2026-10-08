import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
	title: "JobPlatform",
	description: "Nền tảng tìm việc và tuyển dụng",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.className} antialiased`}>
			<body>{children}</body>
		</html>
	);
}
