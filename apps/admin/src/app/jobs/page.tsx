import Link from "next/link";
import { listJobs } from "@repo/db/admin";
import { jobStatuses } from "@repo/db/schema";
import ConfirmButton from "@/components/confirm-button";
import { ActionsTd, EmptyRow, TBody, THead, Table, Td, Th, Tr } from "@/components/data-table";
import Pagination from "@/components/pagination";
import { dash, day, joined, yesNo } from "@/lib/format";
import { parsePage } from "@/lib/parse";
import { requireAdmin } from "@/lib/require-admin";
import { deleteJobAction, setJobStatusAction } from "./actions";

type Props = { searchParams: Promise<{ q?: string; status?: string; page?: string }> };

const statusLabels = { draft: "Draft", published: "Published", closed: "Closed" } as const;
const statusColors = { draft: "text-gray-500", published: "text-green-700", closed: "text-red-600" } as const;

const JobsPage = async ({ searchParams }: Props) => {
	await requireAdmin();

	const { q, status, page } = await searchParams;
	const statusFilter = jobStatuses.find((item) => item === status);
	const query = q?.trim() || undefined;

	const { items, total, totalPages, page: currentPage } = await listJobs({ q: query, status: statusFilter, page: parsePage(page) });

	// Sau khi đổi trạng thái hoặc xoá, quay về đúng trang đang xem
	const search = new URLSearchParams();
	if (query) search.set("q", query);
	if (statusFilter) search.set("status", statusFilter);
	if (currentPage > 1) search.set("page", String(currentPage));
	const returnTo = search.toString() ? `/jobs?${search}` : "/jobs";

	return (
		<div>
			<div className="mb-4 flex flex-wrap items-center gap-4">
				<h1 className="text-lg font-medium">Jobs ({total})</h1>
				<Link href="/jobs/new" className="rounded bg-black px-3 py-1.5 text-white">
					New job
				</Link>
			</div>

			<form method="get" className="mb-4 flex flex-wrap gap-2">
				<input type="search" name="q" defaultValue={q} placeholder="Search by title" className="min-w-0 flex-1 basis-40 rounded border border-gray-300 px-3 py-1.5 sm:max-w-xs sm:flex-none" />
				<select name="status" defaultValue={statusFilter ?? ""} className="rounded border border-gray-300 px-3 py-1.5">
					<option value="">All statuses</option>
					{jobStatuses.map((item) => (
						<option key={item} value={item}>
							{statusLabels[item]}
						</option>
					))}
				</select>
				<button type="submit" className="rounded border border-gray-300 px-3 py-1.5">
					Filter
				</button>
			</form>

			<Table>
				<THead>
					<Th primary>Title</Th>
					<Th>ID</Th>
					<Th>Company</Th>
					<Th>Category</Th>
					<Th>Status</Th>
					<Th>Type</Th>
					<Th>Level</Th>
					<Th>Location</Th>
					<Th>Remote</Th>
					<Th>Featured</Th>
					<Th>Salary</Th>
					<Th>Salary range</Th>
					<Th>Salary type</Th>
					<Th>Education</Th>
					<Th>Experience</Th>
					<Th>Posted at</Th>
					<Th>Deadline</Th>
					<Th>Description</Th>
					<Th>Responsibilities</Th>
					<Th>Requirements</Th>
					<Th>Desirable</Th>
					<Th>Benefits</Th>
					<Th>Perks</Th>
					<Th>Tags</Th>
					<Th>Created</Th>
					<Th>Updated</Th>
					<Th actions>
						<span className="sr-only">Actions</span>
					</Th>
				</THead>
				<TBody>
					{items.map((job) => (
						<Tr key={job.id}>
							<Td primary truncate title={job.title}>
								{job.title}
							</Td>
							<Td>{job.id}</Td>
							<Td>{job.company}</Td>
							<Td>{dash(job.category)}</Td>
							<Td className={statusColors[job.status]}>{statusLabels[job.status]}</Td>
							<Td>{job.type}</Td>
							<Td>{dash(job.level)}</Td>
							<Td>{dash(job.location)}</Td>
							<Td>{yesNo(job.remote)}</Td>
							<Td>{yesNo(job.featured)}</Td>
							<Td>{dash(job.salary)}</Td>
							<Td>{dash(job.salaryRange)}</Td>
							<Td>{dash(job.salaryType)}</Td>
							<Td>{dash(job.education)}</Td>
							<Td>{dash(job.experience)}</Td>
							<Td>{dash(job.postedAt)}</Td>
							<Td>{dash(job.deadline)}</Td>
							<Td truncate title={job.description}>
								{job.description}
							</Td>
							<Td truncate title={joined(job.responsibilities)}>
								{joined(job.responsibilities)}
							</Td>
							<Td truncate title={joined(job.requirements)}>
								{joined(job.requirements)}
							</Td>
							<Td truncate title={joined(job.desirable)}>
								{joined(job.desirable)}
							</Td>
							<Td truncate title={joined(job.benefits)}>
								{joined(job.benefits)}
							</Td>
							<Td truncate title={joined(job.perks)}>
								{joined(job.perks)}
							</Td>
							<Td truncate title={joined(job.tags)}>
								{joined(job.tags)}
							</Td>
							<Td>{day(job.createdAt)}</Td>
							<Td>{day(job.updatedAt)}</Td>
							<ActionsTd>
								<Link href={`/jobs/${job.id}`} className="py-1 underline">
									Edit
								</Link>

								<form action={setJobStatusAction}>
									<input type="hidden" name="id" value={job.id} />
									<input type="hidden" name="returnTo" value={returnTo} />
									<input type="hidden" name="status" value={job.status === "published" ? "closed" : "published"} />
									<button type="submit" className="py-1 underline">
										{job.status === "published" ? "Close" : "Publish"}
									</button>
								</form>

								<form action={deleteJobAction}>
									<input type="hidden" name="id" value={job.id} />
									<input type="hidden" name="returnTo" value={returnTo} />
									<ConfirmButton message={`Delete "${job.title}"?`} className="py-1 text-red-600 underline">
										Delete
									</ConfirmButton>
								</form>
							</ActionsTd>
						</Tr>
					))}
					{items.length === 0 && <EmptyRow colSpan={27}>No jobs found.</EmptyRow>}
				</TBody>
			</Table>

			<Pagination page={currentPage} totalPages={totalPages} basePath="/jobs" params={{ q: query, status: statusFilter }} />
		</div>
	);
};

export default JobsPage;
