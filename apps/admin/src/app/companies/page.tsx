import Link from "next/link";
import { listCompanies } from "@repo/db/admin";
import ConfirmButton from "@/components/confirm-button";
import { EmptyRow, RowActions, TBody, THead, Table, Td, Th, Tr } from "@/components/data-table";
import Pagination from "@/components/pagination";
import { Notice, PageTitle, SearchBox } from "@/components/wp";
import { parsePage } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";
import { deleteCompanyAction } from "./actions";

type Props = { searchParams: Promise<{ q?: string; page?: string; message?: string; error?: string }> };

const messages: Record<string, string> = {
	created: "Company created.",
	updated: "Company updated.",
	deleted: "Company deleted.",
};

const errors: Record<string, string> = {
	"has-jobs": "Cannot delete: this company still has jobs. Delete or move its jobs first.",
	invalid: "Invalid company.",
};

const CompaniesPage = async ({ searchParams }: Props) => {
	await requireAdmin();

	const { q, page, message, error } = await searchParams;
	const query = q?.trim() || undefined;
	const { items, total, totalPages, page: currentPage } = await listCompanies({ q: query, page: parsePage(page) });

	return (
		<div>
			<PageTitle title="Companies" addHref="/companies/new" />

			{message && messages[message] && <Notice>{messages[message]}</Notice>}
			{error && errors[error] && <Notice type="error">{errors[error]}</Notice>}

			<div className="mb-2 flex justify-end">
				<SearchBox label="Search Companies" defaultValue={q} />
			</div>

			<Pagination page={currentPage} totalPages={totalPages} total={total} basePath="/companies" params={{ q: query }} />

			<Table>
				<THead>
					<Th>Name</Th>
					<Th secondary>Location</Th>
					<Th secondary>Jobs</Th>
				</THead>
				<TBody>
					{items.map((company) => (
						<Tr key={company.id}>
							<Td>
								<Link href={`/companies/${company.id}`} className="font-semibold text-wp-accent hover:text-wp-accent-dark">
									{company.name}
								</Link>
								{company.featured && <span className="font-semibold text-wp-title"> — Featured</span>}
								<div className="mt-0.5 text-xs text-[#646970] md:hidden">
									{company.location} · {company.jobCount} {company.jobCount === 1 ? "job" : "jobs"}
								</div>
								<RowActions>
									<Link href={`/companies/${company.id}`} className="text-wp-accent hover:text-wp-accent-dark hover:underline">
										Edit
									</Link>
									{company.jobCount === 0 && (
										<form action={deleteCompanyAction}>
											<input type="hidden" name="id" value={company.id} />
											<ConfirmButton message={`Delete ${company.name}?`} className="cursor-pointer text-wp-danger hover:underline">
												Delete
											</ConfirmButton>
										</form>
									)}
								</RowActions>
							</Td>
							<Td secondary>{company.location}</Td>
							<Td secondary>{company.jobCount}</Td>
						</Tr>
					))}
					{items.length === 0 && <EmptyRow colSpan={3}>No companies found.</EmptyRow>}
				</TBody>
			</Table>

			<Pagination page={currentPage} totalPages={totalPages} total={total} basePath="/companies" params={{ q: query }} />
		</div>
	);
};

export default CompaniesPage;
