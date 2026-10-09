import HeroSection from "@/components/home/hero-section";
import VacancySection from "@/components/home/vacancy-section";
import HowToSection from "@/components/home/howto-section";
import CategorySection from "@/components/home/category-section";
import JobsSection from "@/components/home/jobs-section";
import CompaniesSection from "@/components/home/companies-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import OtherSection from "@/components/home/other-section";

const Page = () => {
	return (
		<div id="home-page">
			<HeroSection />
			<VacancySection />
			<HowToSection />
			<CategorySection />
			<JobsSection />
			<CompaniesSection />
			<TestimonialsSection />
			<OtherSection />
		</div>
	);
};

export default Page;
