import Link from "next/link";
import { listCategoryOptions, listCompanyOptions } from "@repo/db/admin";
import JobForm from "@/components/job-form";
import { Notice, PageTitle } from "@/components/wp";
import { requireAdmin } from "@/lib/require-admin";
import { saveJob } from "../actions";

const NewJobPage = async () => {
	await requireAdmin();

	const [companies, categories] = await Promise.all([listCompanyOptions(), listCategoryOptions()]);

	if (companies.length === 0) {
		return (
			<div>
				<PageTitle title="Add New Job" />
				<Notice type="error">
					You need a company before you can post a job.{" "}
					<Link href="/companies/new" className="text-wp-accent underline">
						Create a company
					</Link>
				</Notice>
			</div>
		);
	}

	return (
		<div>
			<PageTitle title="Add New Job" />
			<JobForm action={saveJob.bind(null, null)} companies={companies} categories={categories} />
		</div>
	);
};

export default NewJobPage;
