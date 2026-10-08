import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/layout/container";
import notFoundImg from "../../public/images/not-found.png";

export const metadata: Metadata = {
	title: "Page not found | JobPlatform",
};

const NotFound = () => {
	return (
		<div id="not-found-page">
			<Container>
				<div className="grid lg:grid-cols-2 xl:grid-cols-5 gap-10 xl:gap-x-16 items-center md:min-h-screen py-10">
					<div className="text-center lg:text-left xl:col-span-2">
						<h1 className="text-3xl md:text-[2.5rem] font-medium mb-6 leading-normal">Oops! Page not found</h1>
						<p className="text-gray-700 text-base md:text-lg">Something went wrong. It looks like the link is broken or the page is removed.</p>
						<div className="justify-center lg:justify-start items-start flex gap-4 mt-8">
							<Link href="/" className="rounded-md border-2 border-blue-600 bg-blue-600 px-6 py-2.5 text-base font-semibold text-white capitalize">
								Home
							</Link>
							<Link href="/jobs" className="rounded-md border-2 border-blue-100 px-6 py-2.5 text-base text-blue-600 font-semibold capitalize">
								Go back
							</Link>
						</div>
					</div>
					<Image src={notFoundImg} alt="Page not found" className="xl:col-span-3" priority />
				</div>
			</Container>
		</div>
	);
};

export default NotFound;
