import CompanyForm from "@/components/company-form";
import { PageTitle } from "@/components/wp";
import { requireAdmin } from "@/lib/require-admin";
import { saveCompany } from "../actions";

const NewCompanyPage = async () => {
	await requireAdmin();

	return (
		<div>
			<PageTitle title="Add New Company" />
			<CompanyForm action={saveCompany.bind(null, null)} />
		</div>
	);
};

export default NewCompanyPage;
