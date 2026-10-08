import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import CompanyCard from "../cards/company-card";
import { companies } from "@/data";

const CompaniesSection = () => {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeading title="Top Companies" href="#" />

				<ul className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
					{companies.map((company) => (
						<li key={company.id}>
							<CompanyCard company={company} />
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default CompaniesSection;
