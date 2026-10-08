import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import TestimonialsCarousel from "../ui/testimonials-carousel";

const TestimonialsSection = () => {
	return (
		<section className="bg-gray-100 py-16 md:py-24">
			<Container>
				<SectionHeading title="Clients Testimonial" align="center" className="mb-8 md:mb-12" />
				<TestimonialsCarousel />
			</Container>
		</section>
	);
};

export default TestimonialsSection;
