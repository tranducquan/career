"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Job } from "@repo/db/schema";
import type { FormState } from "@/lib/form-state";

type Option = { id: number; name: string };

type Props = {
	action: (state: FormState, formData: FormData) => Promise<FormState>;
	companies: Option[];
	categories: Option[];
	job?: Job;
};

type TextField = "title" | "type" | "level" | "location" | "salary" | "salaryRange" | "salaryType" | "education" | "experience" | "postedAt" | "deadline" | "description" | "companyId" | "categoryId" | "status";
type ListField = "responsibilities" | "requirements" | "desirable" | "benefits" | "perks" | "tags";

const input = "w-full rounded border border-gray-300 px-3 py-2";

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
	<label className="block">
		<span className="mb-1 block">{label}</span>
		{children}
		{hint && <span className="mt-1 block text-gray-500">{hint}</span>}
	</label>
);

const JobForm = ({ action, companies, categories, job }: Props) => {
	const [state, formAction, pending] = useActionState(action, undefined);
	const values = state?.values;
	const errors = state?.errors ? Object.values(state.errors) : [];

	// Sau khi gửi lỗi, giữ giá trị người dùng đã nhập, nếu chưa gửi thì dùng giá trị của job
	const text = (name: TextField) => {
		if (values) return values[name] ?? "";
		const value = job?.[name];
		return value == null ? "" : String(value);
	};
	const list = (name: ListField) => (values ? (values[name] ?? "") : (job?.[name] ?? []).join("\n"));
	const checked = (name: "remote" | "featured") => (values ? values[name] === "on" : (job?.[name] ?? false));

	const listField = (name: ListField, label: string) => (
		<Field label={label} hint="One item per line">
			<textarea name={name} defaultValue={list(name)} rows={4} className={input} />
		</Field>
	);

	return (
		<form action={formAction} className="max-w-3xl space-y-4">
			{errors.length > 0 && (
				<ul role="alert" className="list-disc rounded border border-red-300 bg-red-50 py-2 pr-3 pl-7 text-red-700">
					{errors.map((message) => (
						<li key={message}>{message}</li>
					))}
				</ul>
			)}

			<div className="grid gap-4 sm:grid-cols-2">
				<Field label="Company *">
					<select name="companyId" defaultValue={text("companyId")} required className={input}>
						<option value="">Choose a company</option>
						{companies.map((company) => (
							<option key={company.id} value={company.id}>
								{company.name}
							</option>
						))}
					</select>
				</Field>

				<Field label="Category">
					<select name="categoryId" defaultValue={text("categoryId")} className={input}>
						<option value="">None</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</Field>
			</div>

			<Field label="Title *">
				<input name="title" defaultValue={text("title")} required className={input} />
			</Field>

			<div className="grid gap-4 sm:grid-cols-3">
				<Field label="Type *">
					<input name="type" defaultValue={text("type")} list="job-types" required className={input} />
					<datalist id="job-types">
						{["Full Time", "Part Time", "Contract", "Internship", "Freelance"].map((type) => (
							<option key={type} value={type} />
						))}
					</datalist>
				</Field>

				<Field label="Level">
					<input name="level" defaultValue={text("level")} list="job-levels" className={input} />
					<datalist id="job-levels">
						{["Intern", "Entry Level", "Mid Level", "Senior Level", "Lead"].map((level) => (
							<option key={level} value={level} />
						))}
					</datalist>
				</Field>

				<Field label="Status *">
					<select name="status" defaultValue={text("status") || "draft"} className={input}>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
						<option value="closed">Closed</option>
					</select>
				</Field>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<Field label="Location" hint="Required unless the job is remote. For remote jobs, use it for the allowed region (for example US only).">
					<input name="location" defaultValue={text("location")} className={input} />
				</Field>

				<div className="flex items-end gap-6 pb-2">
					<label className="flex items-center gap-2">
						<input type="checkbox" name="remote" defaultChecked={checked("remote")} />
						<span>Remote</span>
					</label>
					<label className="flex items-center gap-2">
						<input type="checkbox" name="featured" defaultChecked={checked("featured")} />
						<span>Featured</span>
					</label>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				<Field label="Salary (short)" hint="Shown on cards, e.g. $30K-$35K/month">
					<input name="salary" defaultValue={text("salary")} className={input} />
				</Field>
				<Field label="Salary range" hint="e.g. $100,000 - $120,000">
					<input name="salaryRange" defaultValue={text("salaryRange")} className={input} />
				</Field>
				<Field label="Salary type" hint="e.g. Yearly salary">
					<input name="salaryType" defaultValue={text("salaryType")} className={input} />
				</Field>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<Field label="Education">
					<input name="education" defaultValue={text("education")} className={input} />
				</Field>
				<Field label="Experience">
					<input name="experience" defaultValue={text("experience")} className={input} />
				</Field>
				<Field label="Posted at">
					<input type="date" name="postedAt" defaultValue={text("postedAt")} className={input} />
				</Field>
				<Field label="Deadline">
					<input type="date" name="deadline" defaultValue={text("deadline")} className={input} />
				</Field>
			</div>

			<Field label="Description *" hint="Separate paragraphs with a blank line">
				<textarea name="description" defaultValue={text("description")} rows={10} required className={input} />
			</Field>

			{listField("responsibilities", "Responsibilities")}
			{listField("requirements", "Requirements")}
			{listField("desirable", "Desirable")}
			{listField("benefits", "Benefits")}
			{listField("perks", "Perks (tags)")}
			{listField("tags", "Job tags")}

			<div className="flex items-center gap-4">
				<button type="submit" disabled={pending} className="rounded bg-black px-4 py-2 text-white disabled:opacity-50">
					{pending ? "Saving..." : "Save"}
				</button>
				<Link href="/jobs" className="underline">
					Cancel
				</Link>
			</div>
		</form>
	);
};

export default JobForm;
