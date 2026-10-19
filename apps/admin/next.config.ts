import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-Robots-Tag", value: "noindex, nofollow" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "Referrer-Policy", value: "same-origin" },
				],
			},
		];
	},
};

export default nextConfig;
