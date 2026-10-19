import Link from "next/link";
import { listCategories } from "@repo/db/admin";
import ConfirmButton from "@/components/confirm-button";
import { ActionsTd, EmptyRow, TBody, THead, Table, Td, Th, Tr } from "@/components/data-table";
import Pagination from "@/components/pagination";
import { dash, day } from "@/lib/format";
import { parsePage } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";
import { deleteCategoryAction } from "./actions";

type Props = { searchParams: Promise<{ q?: string; page?: string; error?: string }> };

const errorMessages: Record<string, string> = {
	"has-jobs": "Cannot delete: this category still has jobs. Move or delete its jobs first.",
	invalid: "Invalid category.",
};

const CategoriesPage = async ({ searchParams }: Props) => {
	await requireAdmin();

	const { q, page, error } = await searchParams;
	const { items, total, totalPages, page: currentPage } = await listCategories({ q: q?.trim() || undefined, page: parsePage(page) });

	return (
		<div>
			<div className="mb-4 flex flex-wrap items-center gap-4">
				<h1 className="text-lg font-medium">Categories ({total})</h1>
				<Link href="/categories/new" className="rounded bg-black px-3 py-1.5 text-white">
					New category
				</Link>
			</div>

			<form method="get" className="mb-4 flex gap-2">
				<input type="search" name="q" defaultValue={q} placeholder="Search by name" className="min-w-0 flex-1 rounded border border-gray-300 px-3 py-1.5 sm:max-w-xs" />
				<button type="submit" className="rounded border border-gray-300 px-3 py-1.5">
					Search
				</button>
			</form>

			{error && errorMessages[error] && (
				<p role="alert" className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700">
					{errorMessages[error]}
				</p>
			)}

			<Table>
				<THead>
					<Th primary>Name</Th>
					<Th>ID</Th>
					<Th>Slug</Th>
					<Th>Icon key</Th>
					<Th>Sort order</Th>
					<Th>Jobs</Th>
					<Th>Created</Th>
					<Th actions>
						<span className="sr-only">Actions</span>
					</Th>
				</THead>
				<TBody>
					{items.map((category) => (
						<Tr key={category.id}>
							<Td primary>{category.name}</Td>
							<Td>{category.id}</Td>
							<Td>{category.slug}</Td>
							<Td>{dash(category.iconKey)}</Td>
							<Td>{category.sortOrder}</Td>
							<Td>{category.jobCount}</Td>
							<Td>{day(category.createdAt)}</Td>
							<ActionsTd>
								<Link href={`/categories/${category.id}`} className="py-1 underline">
									Edit
								</Link>
								{category.jobCount === 0 && (
									<form action={deleteCategoryAction}>
										<input type="hidden" name="id" value={category.id} />
										<ConfirmButton message={`Delete ${category.name}?`} className="py-1 text-red-600 underline">
											Delete
										</ConfirmButton>
									</form>
								)}
							</ActionsTd>
						</Tr>
					))}
					{items.length === 0 && <EmptyRow colSpan={8}>No categories found.</EmptyRow>}
				</TBody>
			</Table>

			<Pagination page={currentPage} totalPages={totalPages} basePath="/categories" params={{ q }} />
		</div>
	);
};

export default CategoriesPage;
