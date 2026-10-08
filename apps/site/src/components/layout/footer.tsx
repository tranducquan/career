import Link from "next/link";
import Container from "./container";
import { Phone, MapPin } from "lucide-react";
import { Facebook, Youtube, Instagram, Twitter } from "@thesvg/react";

const navs = [
	{
		title: "Quick Link",
		list: [
			{ title: "About", link: "#" },
			{ title: "Contact", link: "#" },
			{ title: "Pricing", link: "#" },
			{ title: "Blog", link: "#" },
		],
	},
	{
		title: "Candidate",
		list: [
			{ title: "Browse Jobs", link: "#" },
			{ title: "Browse Employees", link: "#" },
			{ title: "Candidate Dashboard", link: "#" },
			{ title: "Saved Jobs", link: "#" },
		],
	},
	{
		title: "Employees",
		list: [
			{ title: "Post a Job", link: "#" },
			{ title: "Browse Candidates", link: "#" },
			{ title: "Employers Dashboard", link: "#" },
			{ title: "Applications", link: "#" },
		],
	},
	{
		title: "Support",
		list: [
			{ title: "Faqs", link: "#" },
			{ title: "Privacy Policy", link: "#" },
			{ title: "Terms & Conditions", link: "#" },
		],
	},
];

const socials = [
	{ title: "Facebook", icon: Facebook, link: "#" },
	{ title: "Instagram", icon: Instagram, link: "#" },
	{ title: "Youtube", icon: Youtube, link: "#" },
	{ title: "X", icon: Twitter, link: "#" },
];

const Footer = () => {
	return (
		<footer id="footer" className="bg-gray-900 text-sm text-white/75 md:text-base">
			<div className="py-14 md:py-20">
				<Container>
					<div className="grid gap-10 md:gap-12 xl:grid-cols-6">
						<div className="space-y-5 border-b border-white/10 pb-10 xl:col-span-2 xl:border-b-0 xl:pb-0">
							<Link href="/" className="inline-block text-2xl font-semibold text-white">
								JobPlatform
							</Link>

							<div className="space-y-3">
								<a href="tel:+13195550115" className="flex items-center gap-3 font-medium text-white transition-colors hover:text-blue-400 md:text-lg">
									<Phone className="size-5 shrink-0 text-blue-400" />
									(319) 555-0115
								</a>
								<p className="flex max-w-sm items-start gap-3">
									<MapPin className="mt-0.5 size-5 shrink-0 text-blue-400" />
									6391 Elgin St. Celina, Delaware 10299, New York, United States of America
								</p>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8 xl:col-span-4">
							{navs.map((nav) => (
								<div key={nav.title}>
									<h3 className="mb-3 text-base font-medium text-white md:mb-5 md:text-xl">{nav.title}</h3>
									<ul className="space-y-1 md:space-y-2">
										{nav.list.map((item) => (
											<li key={item.title}>
												<Link href={item.link} className="block py-1 transition-colors hover:text-white">
													{item.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</Container>
			</div>

			<div className="border-t border-white/10">
				<Container>
					<div className="flex flex-col-reverse items-center gap-5 py-6 text-center md:flex-row md:justify-between md:text-left">
						<p className="text-sm leading-normal">© 2026 JobPlatform - TDQ. All rights reserved</p>
						<div className="flex items-center gap-3">
							{socials.map(({ title, icon: Icon, link }) => (
								<a key={title} href={link} aria-label={title} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/30">
									<Icon className="w-6 h-6" />
								</a>
							))}
						</div>
					</div>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
