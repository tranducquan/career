import Link from "next/link";
import { listCategories } from "@repo/db/admin";
import ConfirmButton from "@/components/confirm-button";
import { EmptyRow, RowActions, TBody, THead, Table, Td, Th, Tr } from "@/components/data-table";
import Pagination from "@/components/pagination";
import { Notice, PageTitle, SearchBox } from "@/components/wp";
import { parsePage } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";
import { deleteCategoryAction } from "./actions";

type Props = { searchParams: Promise<{ q?: string; page?: string; message?: string; error?: string }> };

const messages: Record<string, string> = {
	created: "Category created.",
	updated: "Category updated.",
	deleted: "Category deleted.",
};

const errors: Record<string, string> = {
	"has-jobs": "Cannot delete: this category still has jobs. Move or delete its jobs first.",
	invalid: "Invalid category.",
};

const CategoriesPage = async ({ searchParams }: Props) => {
	await requireAdmin();

	const { q, page, message, error } = await searchParams;
	const query = q?.trim() || undefined;
	const { items, total, totalPages, page: currentPage } = await listCategories({ q: query, page: parsePage(page) });

	return (
		<div>
			<PageTitle title="Categories" addHref="/categories/new" />

			{message && messages[message] && <Notice>{messages[message]}</Notice>}
			{error && errors[error] && <Notice type="error">{errors[error]}</Notice>}

			<div className="mb-2 flex justify-end">
				<SearchBox label="Search Categories" defaultValue={q} />
			</div>

			<Pagination page={currentPage} totalPages={totalPages} total={total} basePath="/categories" params={{ q: query }} />

			<Table>
				<THead>
					<Th>Name</Th>
					<Th secondary>Slug</Th>
					<Th secondary>Order</Th>
					<Th secondary>Count</Th>
				</THead>
				<TBody>
					{items.map((category) => (
						<Tr key={category.id}>
							<Td>
								<Link href={`/categories/${category.id}`} className="font-semibold text-wp-accent hover:text-wp-accent-dark">
									{category.name}
								</Link>
								<div className="mt-0.5 text-[12px] text-[#646970] md:hidden">
									{category.slug} · {category.jobCount} {category.jobCount === 1 ? "job" : "jobs"}
								</div>
								<RowActions>
									<Link href={`/categories/${category.id}`} className="text-wp-accent hover:text-wp-accent-dark hover:underline">
										Edit
									</Link>
									{category.jobCount === 0 && (
										<form action={deleteCategoryAction}>
											<input type="hidden" name="id" value={category.id} />
											<ConfirmButton message={`Delete ${category.name}?`} className="cursor-pointer text-wp-danger hover:underline">
												Delete
											</ConfirmButton>
										</form>
									)}
								</RowActions>
							</Td>
							<Td secondary>{category.slug}</Td>
							<Td secondary>{category.sortOrder}</Td>
							<Td secondary>{category.jobCount}</Td>
						</Tr>
					))}
					{items.length === 0 && <EmptyRow colSpan={4}>No categories found.</EmptyRow>}
				</TBody>
			</Table>

			<Pagination page={currentPage} totalPages={totalPages} total={total} basePath="/categories" params={{ q: query }} />
		</div>
	);
};

export default CategoriesPage;
