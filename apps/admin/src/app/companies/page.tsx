import { requireAdmin } from "@/lib/require-admin";

const CompaniesPage = async () => {
	await requireAdmin();

	return <h1 className="text-lg font-medium">Companies</h1>;
};

export default CompaniesPage;
