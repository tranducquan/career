import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import TestimonialsCarousel from "../ui/testimonials-carousel";
import Section from "../layout/section";

const TestimonialsSection = () => {
	return (
		<Section className="bg-gray-100">
			<Container>
				<SectionHeading title="Clients Testimonial" align="center" className="mb-8 md:mb-12" />
				<TestimonialsCarousel />
			</Container>
		</Section>
	);
};

export default TestimonialsSection;
