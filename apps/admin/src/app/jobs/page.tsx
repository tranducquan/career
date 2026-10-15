import { requireAdmin } from "@/lib/require-admin";

const JobsPage = async () => {
	await requireAdmin();

	return <h1 className="text-lg font-medium">Jobs</h1>;
};

export default JobsPage;
