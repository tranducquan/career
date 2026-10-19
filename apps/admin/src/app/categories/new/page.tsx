import CategoryForm from "@/components/category-form";
import { requireAdmin } from "@/lib/require-admin";
import { saveCategory } from "../actions";

const NewCategoryPage = async () => {
	await requireAdmin();

	return (
		<div>
			<h1 className="mb-4 text-lg font-medium">New category</h1>
			<CategoryForm action={saveCategory.bind(null, null)} />
		</div>
	);
};

export default NewCategoryPage;
