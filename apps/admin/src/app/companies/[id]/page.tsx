import { notFound } from "next/navigation";
import { getCompany } from "@repo/db/admin";
import CompanyForm from "@/components/company-form";
import { parseId } from "@/lib/parse";
import { PageTitle } from "@/components/wp";
import { requireAdmin } from "@/lib/require-admin";
import { saveCompany } from "../actions";

type Props = { params: Promise<{ id: string }> };

const EditCompanyPage = async ({ params }: Props) => {
	await requireAdmin();

	const id = parseId((await params).id);
	if (!id) notFound();

	const company = await getCompany(id);
	if (!company) notFound();

	return (
		<div>
			<PageTitle title="Edit Company" addHref="/companies/new" />
			<CompanyForm action={saveCompany.bind(null, id)} company={company} />
		</div>
	);
};

export default EditCompanyPage;
