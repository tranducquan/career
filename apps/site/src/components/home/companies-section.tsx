import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import CompanyCard from "../cards/company-card";
import { getTopCompanies } from "@/lib/companies";
import Section from "../layout/section";

const COMPANIES_LIMIT = 6;

const CompaniesSection = async () => {
	const topCompanies = await getTopCompanies(COMPANIES_LIMIT);
	if (topCompanies.length === 0) return null;

	return (
		<Section>
			<Container>
				<SectionHeading eyebrow="Employers" title="Top Companies" href="/employers" />

				<ul className="grid gap-3 md:gap-6 sm:grid-cols-2 md:grid-cols-3">
					{topCompanies.map((company) => (
						<li key={company.id}>
							<CompanyCard company={company} />
						</li>
					))}
				</ul>
			</Container>
		</Section>
	);
};

export default CompaniesSection;
