import Link from "next/link";
import { listCompanies } from "@repo/db/admin";
import ConfirmButton from "@/components/confirm-button";
import { ActionsTd, EmptyRow, TBody, THead, Table, Td, Th, Tr } from "@/components/data-table";
import Pagination from "@/components/pagination";
import { dash, day, yesNo } from "@/lib/format";
import { parsePage } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";
import { deleteCompanyAction } from "./actions";

type Props = { searchParams: Promise<{ q?: string; page?: string; error?: string }> };

const errorMessages: Record<string, string> = {
	"has-jobs": "Cannot delete: this company still has jobs. Delete or move its jobs first.",
	invalid: "Invalid company.",
};

const CompaniesPage = async ({ searchParams }: Props) => {
	await requireAdmin();

	const { q, page, error } = await searchParams;
	const { items, total, totalPages, page: currentPage } = await listCompanies({ q: q?.trim() || undefined, page: parsePage(page) });

	return (
		<div>
			<div className="mb-4 flex flex-wrap items-center gap-4">
				<h1 className="text-lg font-medium">Companies ({total})</h1>
				<Link href="/companies/new" className="rounded bg-black px-3 py-1.5 text-white">
					New company
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
					<Th>Location</Th>
					<Th>Link</Th>
					<Th>Logo URL</Th>
					<Th>Featured</Th>
					<Th>Jobs</Th>
					<Th>Created</Th>
					<Th actions>
						<span className="sr-only">Actions</span>
					</Th>
				</THead>
				<TBody>
					{items.map((company) => (
						<Tr key={company.id}>
							<Td primary>{company.name}</Td>
							<Td>{company.id}</Td>
							<Td>{company.location}</Td>
							<Td truncate title={company.href}>
								{company.href}
							</Td>
							<Td truncate title={company.logoUrl ?? undefined}>
								{dash(company.logoUrl)}
							</Td>
							<Td>{yesNo(company.featured)}</Td>
							<Td>{company.jobCount}</Td>
							<Td>{day(company.createdAt)}</Td>
							<ActionsTd>
								<Link href={`/companies/${company.id}`} className="py-1 underline">
									Edit
								</Link>
								{company.jobCount === 0 && (
									<form action={deleteCompanyAction}>
										<input type="hidden" name="id" value={company.id} />
										<ConfirmButton message={`Delete ${company.name}?`} className="py-1 text-red-600 underline">
											Delete
										</ConfirmButton>
									</form>
								)}
							</ActionsTd>
						</Tr>
					))}
					{items.length === 0 && <EmptyRow colSpan={9}>No companies found.</EmptyRow>}
				</TBody>
			</Table>

			<Pagination page={currentPage} totalPages={totalPages} basePath="/companies" params={{ q }} />
		</div>
	);
};

export default CompaniesPage;
