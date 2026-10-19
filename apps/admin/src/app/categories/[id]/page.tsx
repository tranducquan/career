import { notFound } from "next/navigation";
import { getCategory } from "@repo/db/admin";
import CategoryForm from "@/components/category-form";
import { parseId } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";
import { saveCategory } from "../actions";

type Props = { params: Promise<{ id: string }> };

const EditCategoryPage = async ({ params }: Props) => {
	await requireAdmin();

	const id = parseId((await params).id);
	if (!id) notFound();

	const category = await getCategory(id);
	if (!category) notFound();

	return (
		<div>
			<h1 className="mb-4 text-lg font-medium">Edit category</h1>
			<CategoryForm action={saveCategory.bind(null, id)} category={category} />
		</div>
	);
};

export default EditCategoryPage;
