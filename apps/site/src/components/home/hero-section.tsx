import Image from "next/image";
import { Briefcase, Building2, Users, FileText, Search, MapPin } from "lucide-react";
import Container from "../layout/container";
import Button from "../ui/button";

const stats = [
	{ value: 175324, label: "Live Jobs", icon: Briefcase },
	{ value: 97354, label: "Companies", icon: Building2 },
	{ value: 3847154, label: "Candidates", icon: Users },
	{ value: 7532, label: "New Jobs", icon: FileText },
];

const numberFormat = new Intl.NumberFormat("en-US");

const HeroSection = () => {
	return (
		<section className="bg-gray-100 py-20 md:py-24">
			<Container>
				<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-22">
					<div className="lg:col-span-7">
						<h1 className="text-3xl leading-tight font-medium text-balance sm:text-4xl md:text-5xl xl:text-[3.5rem] md:leading-[1.3]">Find a job that suits your interest &amp; skills.</h1>
						<p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:mt-6 md:text-lg">Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.</p>

						<form action="/jobs" method="GET" role="search" className="mt-6 flex flex-col gap-2 rounded-xl bg-white p-3 shadow-md md:mt-8 md:flex-row md:items-center md:gap-0">
							<label className="flex flex-1 items-center gap-3 px-3 py-2 md:border-r md:border-gray-100">
								<Search className="size-6 shrink-0 text-blue-600" aria-hidden />
								<span className="sr-only">Job title or keyword</span>
								<input type="text" name="q" placeholder="Job title, keyword..." className="w-full min-w-0 bg-transparent outline-none placeholder:text-gray-400" />
							</label>
							<label className="flex flex-1 items-center gap-3 px-3 py-2">
								<MapPin className="size-6 shrink-0 text-blue-600" aria-hidden />
								<span className="sr-only">Location</span>
								<input type="text" name="location" placeholder="Your location" className="w-full min-w-0 bg-transparent outline-none placeholder:text-gray-400" />
							</label>
							<Button type="submit" className="md:ml-2 md:h-14">
								Find Job
							</Button>
						</form>

						<p className="mt-6 text-sm text-gray-500">Suggestion: Designer, Programming, Digital Marketing, Video</p>
					</div>

					<div className="relative hidden aspect-4/3 lg:block lg:col-span-5">
						<Image src="/images/hero.png" alt="" fill priority sizes="(min-width: 1024px) 50vw, 0px" className="object-contain" />
					</div>
				</div>

				<ul className="mt-12 grid grid-cols-2 gap-3 md:mt-22 lg:grid-cols-4 lg:gap-6">
					{stats.map(({ value, label, icon: Icon }) => (
						<li key={label} className="group flex items-center gap-3 rounded-xl bg-white p-4 transition hover:shadow-md md:gap-5 md:p-5 cursor-pointer">
							<div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 md:size-15 group-hover:bg-blue-600 group-hover:text-white transition-colors">
								<Icon className="size-6 md:size-7" aria-hidden />
							</div>
							<div className="min-w-0">
								<p className="text-lg font-medium md:text-xl mb-1">{numberFormat.format(value)}</p>
								<p className="truncate text-sm md:text-base text-gray-500">{label}</p>
							</div>
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default HeroSection;
