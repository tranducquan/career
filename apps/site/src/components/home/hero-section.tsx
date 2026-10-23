import Image from "next/image";
import Link from "next/link";
import Container from "../layout/container";
import Section from "../layout/section";
import HeroSearch from "./hero-search";
import { getCountryOptions } from "@/lib/job-countries";
import { getTopTags } from "@/lib/popular-tags";

const FALLBACK_TAGS = ["Designer", "Programming", "Digital Marketing", "Video"];
const TAGS_LIMIT = 5;

const HeroSection = async () => {
	const [countries, topTags] = await Promise.all([getCountryOptions(), getTopTags(TAGS_LIMIT)]);
	// Chưa có tag trong DB thì dùng danh sách gợi ý mặc định
	const tags = topTags.length > 0 ? topTags : FALLBACK_TAGS;

	return (
		<Section className="bg-linear-to-b from-primary-50/70 to-gray-100">
			<Container>
				<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-22">
					<div className="lg:col-span-7">
						<h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl md:leading-[1.25] xl:text-[3.5rem]">
							Find a <span className="text-primary-500">job</span> that suits your interest &amp; skills.
						</h1>
						<p className="mt-4 max-w-xl text-base leading-relaxed text-gray-500 md:mt-6 md:text-lg">Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.</p>

						<HeroSearch countries={countries} />

						<div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
							<span className="mr-1 text-gray-500">Suggestion:</span>
							{tags.map((tag) => (
								<Link key={tag} href={`/jobs?q=${encodeURIComponent(tag)}`} className="rounded-full bg-white px-3.5 py-1.5 font-medium text-gray-700 shadow-xs transition-colors hover:bg-primary-500 hover:text-white motion-reduce:transition-none">
									{tag}
								</Link>
							))}
						</div>
					</div>

					<div className="relative hidden aspect-4/3 lg:col-span-5 lg:block">
						<Image src="/images/hero.png" alt="" fill priority sizes="(min-width: 1024px) 50vw, 0px" className="object-contain" />
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default HeroSection;
