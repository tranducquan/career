import CategoryForm from "@/components/category-form";
import { PageTitle } from "@/components/wp";
import { requireAdmin } from "@/lib/require-admin";
import { saveCategory } from "../actions";

const NewCategoryPage = async () => {
	await requireAdmin();

	return (
		<div>
			<PageTitle title="Add New Category" />
			<CategoryForm action={saveCategory.bind(null, null)} />
		</div>
	);
};

export default NewCategoryPage;
