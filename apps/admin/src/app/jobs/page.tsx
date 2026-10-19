import Link from "next/link";
import { countJobsByStatus, listJobs } from "@repo/db/admin";
import { jobStatuses } from "@repo/db/schema";
import ConfirmButton from "@/components/confirm-button";
import { EmptyRow, RowActions, TBody, THead, Table, Td, Th, Tr } from "@/components/data-table";
import Pagination from "@/components/pagination";
import { Notice, PageTitle, SearchBox, StatusTabs } from "@/components/wp";
import { day } from "@/lib/format";
import { parsePage } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";
import { deleteJobAction, setJobStatusAction } from "./actions";

type Props = { searchParams: Promise<{ q?: string; status?: string; page?: string; message?: string }> };

const statusLabels = { draft: "Draft", published: "Published", closed: "Closed" } as const;

const messages: Record<string, string> = {
	created: "Job created.",
	updated: "Job updated.",
	published: "Job published.",
	closed: "Job closed.",
	deleted: "Job deleted.",
};

const JobsPage = async ({ searchParams }: Props) => {
	await requireAdmin();

	const { q, status, page, message } = await searchParams;
	const statusFilter = jobStatuses.find((item) => item === status);
	const query = q?.trim() || undefined;

	const [{ items, total, totalPages, page: currentPage }, counts] = await Promise.all([listJobs({ q: query, status: statusFilter, page: parsePage(page) }), countJobsByStatus()]);

	// Sau khi đổi trạng thái hoặc xoá, quay về đúng trang đang xem
	const search = new URLSearchParams();
	if (query) search.set("q", query);
	if (statusFilter) search.set("status", statusFilter);
	if (currentPage > 1) search.set("page", String(currentPage));
	const returnTo = search.toString() ? `/jobs?${search}` : "/jobs";

	const allCount = counts.draft + counts.published + counts.closed;
	const tabs = [
		{ label: "All", count: allCount, href: "/jobs", active: !statusFilter },
		...jobStatuses.map((item) => ({ label: statusLabels[item], count: counts[item], href: `/jobs?status=${item}`, active: statusFilter === item })),
	];

	return (
		<div>
			<PageTitle title="Jobs" addHref="/jobs/new" />

			{message && messages[message] && <Notice>{messages[message]}</Notice>}

			<div className="mb-2 flex flex-wrap items-center justify-between gap-2">
				<StatusTabs tabs={tabs} />
				<SearchBox label="Search Jobs" defaultValue={q} hidden={{ status: statusFilter }} />
			</div>

			<Pagination page={currentPage} totalPages={totalPages} total={total} basePath="/jobs" params={{ q: query, status: statusFilter }} />

			<Table>
				<THead>
					<Th>Title</Th>
					<Th secondary>Company</Th>
					<Th secondary>Category</Th>
					<Th secondary>Type</Th>
					<Th secondary>Date</Th>
				</THead>
				<TBody>
					{items.map((job) => (
						<Tr key={job.id}>
							<Td>
								<Link href={`/jobs/${job.id}`} className="font-semibold text-wp-accent hover:text-wp-accent-dark">
									{job.title}
								</Link>
								{job.featured && <span className="font-semibold text-wp-title"> — Featured</span>}
								{/* Điện thoại: các cột phụ bị ẩn nên tóm tắt ngay dưới tiêu đề */}
								<div className="mt-0.5 text-[12px] text-[#646970] md:hidden">
									{job.company} · {statusLabels[job.status]}
								</div>
								<RowActions>
									<Link href={`/jobs/${job.id}`} className="text-wp-accent hover:text-wp-accent-dark hover:underline">
										Edit
									</Link>
									<form action={setJobStatusAction}>
										<input type="hidden" name="id" value={job.id} />
										<input type="hidden" name="returnTo" value={returnTo} />
										<input type="hidden" name="status" value={job.status === "published" ? "closed" : "published"} />
										<button type="submit" className="cursor-pointer text-wp-accent hover:text-wp-accent-dark hover:underline">
											{job.status === "published" ? "Close" : "Publish"}
										</button>
									</form>
									<form action={deleteJobAction}>
										<input type="hidden" name="id" value={job.id} />
										<input type="hidden" name="returnTo" value={returnTo} />
										<ConfirmButton message={`Delete "${job.title}"?`} className="cursor-pointer text-wp-danger hover:underline">
											Delete
										</ConfirmButton>
									</form>
								</RowActions>
							</Td>
							<Td secondary>{job.company}</Td>
							<Td secondary>{job.category ?? "—"}</Td>
							<Td secondary>{job.type}</Td>
							<Td secondary>
								<div>{statusLabels[job.status]}</div>
								<div className="text-[#646970]">{(job.postedAt ?? day(job.updatedAt)).replaceAll("-", "/")}</div>
							</Td>
						</Tr>
					))}
					{items.length === 0 && <EmptyRow colSpan={5}>No jobs found.</EmptyRow>}
				</TBody>
			</Table>

			<Pagination page={currentPage} totalPages={totalPages} total={total} basePath="/jobs" params={{ q: query, status: statusFilter }} />
		</div>
	);
};

export default JobsPage;
