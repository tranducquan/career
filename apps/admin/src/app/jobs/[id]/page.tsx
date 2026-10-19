import { notFound } from "next/navigation";
import { getJob, listCategoryOptions, listCompanyOptions } from "@repo/db/admin";
import JobForm from "@/components/job-form";
import { parseId } from "@/lib/parse";
import { PageTitle } from "@/components/wp";
import { requireAdmin } from "@/lib/require-admin";
import { saveJob } from "../actions";

type Props = { params: Promise<{ id: string }> };

const EditJobPage = async ({ params }: Props) => {
	await requireAdmin();

	const id = parseId((await params).id);
	if (!id) notFound();

	const [job, companies, categories] = await Promise.all([getJob(id), listCompanyOptions(), listCategoryOptions()]);
	if (!job) notFound();

	return (
		<div>
			<PageTitle title="Edit Job" addHref="/jobs/new" />
			<JobForm action={saveJob.bind(null, id)} companies={companies} categories={categories} job={job} />
		</div>
	);
};

export default EditJobPage;
