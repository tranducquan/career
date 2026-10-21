import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import CompanyCard from "../cards/company-card";
import { getTopCompanies } from "@/lib/companies";

const COMPANIES_LIMIT = 8;

const CompaniesSection = async () => {
	const topCompanies = await getTopCompanies(COMPANIES_LIMIT);
	if (topCompanies.length === 0) return null;

	return (
		<section className="py-12 md:py-20 lg:py-24">
			<Container>
				<SectionHeading title="Top Companies" href="/employers" />

				<ul className="grid gap-3 md:gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
					{topCompanies.map((company) => (
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
