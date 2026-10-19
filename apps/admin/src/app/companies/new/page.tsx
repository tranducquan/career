import CompanyForm from "@/components/company-form";
import { requireAdmin } from "@/lib/require-admin";
import { saveCompany } from "../actions";

const NewCompanyPage = async () => {
	await requireAdmin();

	return (
		<div>
			<h1 className="mb-4 text-lg font-medium">New company</h1>
			<CompanyForm action={saveCompany.bind(null, null)} />
		</div>
	);
};

export default NewCompanyPage;
