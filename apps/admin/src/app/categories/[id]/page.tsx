import { notFound } from "next/navigation";
import { getCategory } from "@repo/db/admin";
import CategoryForm from "@/components/category-form";
import { parseId } from "@/lib/parse";
import { PageTitle } from "@/components/wp";
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
			<PageTitle title="Edit Category" addHref="/categories/new" />
			<CategoryForm action={saveCategory.bind(null, id)} category={category} />
		</div>
	);
};

export default EditCategoryPage;
