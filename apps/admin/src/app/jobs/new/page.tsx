import Link from "next/link";
import { listCategoryOptions, listCompanyOptions } from "@repo/db/admin";
import JobForm from "@/components/job-form";
import { requireAdmin } from "@/lib/require-admin";
import { saveJob } from "../actions";

const NewJobPage = async () => {
	await requireAdmin();

	const [companies, categories] = await Promise.all([listCompanyOptions(), listCategoryOptions()]);

	if (companies.length === 0) {
		return (
			<p>
				You need a company before you can post a job.{" "}
				<Link href="/companies/new" className="underline">
					Create a company
				</Link>
			</p>
		);
	}

	return (
		<div>
			<h1 className="mb-4 text-lg font-medium">New job</h1>
			<JobForm action={saveJob.bind(null, null)} companies={companies} categories={categories} />
		</div>
	);
};

export default NewJobPage;
