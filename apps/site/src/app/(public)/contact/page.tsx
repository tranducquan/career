import type { Metadata } from "next";
import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
	title: "Liên hệ",
	description: "Liên hệ với đội ngũ hỗ trợ của JobPlatform.",
};

const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9707012280264!2d105.76782957599869!3d21.03385828760208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b9dfef75d9%3A0xf38178a85c8bfb4!2zMjEgxJAuIEzDqiDEkOG7qWMgVGjhu40sIFThu6sgTGnDqm0sIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1791789784474!5m2!1svi!2s`;

const Page = () => (
	<div id="contact-page">
		<section className="py-12 md:py-20 lg:py-24">
			<Container>
				<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
					<div className="max-w-lg">
						<p className="mb-3 text-base text-blue-600 font-medium">Who we are</p>
						<h1 className="text-3xl leading-[1.2] font-medium text-gray-900 md:text-4xl lg:text-5xl">We care about customer services</h1>
						<p className="mt-5 leading-relaxed text-gray-600">Want to chat? We’d love to hear from you! Get in touch with our Customer Success Team to inquire about speaking events, advertising rates, or just say hello.</p>

						<Button href="mailto: support@jobplatform.com" className="mt-8">
							Email Support
						</Button>
					</div>

					<div className="rounded-xl bg-white p-6 shadow-xl ring-1 ring-gray-100 md:p-8 xl:p-12">
						<h2 className="mb-6 text-2xl font-medium text-gray-900 leading-normal">Get in Touch</h2>
						<ContactForm />
					</div>
				</div>
			</Container>
		</section>

		<section aria-label="Bản đồ">
			<iframe src={mapSrc} title="google map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-80 w-full border-0 md:h-110" />
		</section>
	</div>
);

export default Page;
