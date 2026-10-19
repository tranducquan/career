"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Job } from "@repo/db/schema";
import type { FormState } from "@/lib/form-state";
import { input, textarea } from "./styles";
import { Field, FormErrors, Metabox, SubmitButton } from "./wp";

type Option = { id: number; name: string };

type Props = {
	action: (state: FormState, formData: FormData) => Promise<FormState>;
	companies: Option[];
	categories: Option[];
	job?: Job;
};

type TextField = "title" | "type" | "level" | "location" | "salary" | "salaryRange" | "salaryType" | "education" | "experience" | "postedAt" | "deadline" | "description" | "companyId" | "categoryId" | "status";
type ListField = "responsibilities" | "requirements" | "desirable" | "benefits" | "perks" | "tags";

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

	const listBox = (name: ListField, title: string) => (
		<Metabox title={title}>
			<textarea name={name} defaultValue={list(name)} rows={4} aria-label={title} className={textarea} />
			<p className="text-[12px] text-[#646970]">One item per line.</p>
		</Metabox>
	);

	return (
		<form action={formAction}>
			<FormErrors errors={errors} />

			<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17.5rem]">
				{/* Cột chính */}
				<div className="min-w-0 space-y-5">
					<input name="title" defaultValue={text("title")} placeholder="Add title" aria-label="Title" required className="w-full border border-wp-border bg-white px-3 py-1.5 text-[1.5rem] leading-[1.7] text-wp-title shadow-[inset_0_1px_2px_rgb(0_0_0/7%)] focus:border-wp-accent focus:shadow-[0_0_0_1px_var(--color-wp-accent)] focus:outline-none" />

					<Metabox title="Description">
						<textarea name="description" defaultValue={text("description")} rows={12} required aria-label="Description" className={textarea} />
						<p className="text-[12px] text-[#646970]">Separate paragraphs with a blank line.</p>
					</Metabox>

					{listBox("requirements", "Requirements")}
					{listBox("desirable", "Desirable")}
					{listBox("benefits", "Benefits")}
					{listBox("responsibilities", "Responsibilities")}
					{listBox("perks", "Perks (tags)")}
					{listBox("tags", "Job tags")}
				</div>

				{/* Cột bên phải */}
				<aside className="min-w-0 space-y-5">
					<Metabox
						title="Publish"
						footer={
							<>
								<Link href="/jobs" className="text-wp-danger hover:underline">
									Cancel
								</Link>
								<SubmitButton pending={pending} label={job ? "Update" : "Save"} />
							</>
						}
					>
						<Field label="Status">
							<select name="status" defaultValue={text("status") || "draft"} className={input}>
								<option value="draft">Draft</option>
								<option value="published">Published</option>
								<option value="closed">Closed</option>
							</select>
						</Field>
						<Field label="Posted at">
							<input type="date" name="postedAt" defaultValue={text("postedAt")} className={input} />
						</Field>
						<Field label="Deadline">
							<input type="date" name="deadline" defaultValue={text("deadline")} className={input} />
						</Field>
						<label className="flex items-center gap-2">
							<input type="checkbox" name="featured" defaultChecked={checked("featured")} />
							<span>Featured</span>
						</label>
					</Metabox>

					<Metabox title="Company">
						<select name="companyId" defaultValue={text("companyId")} required aria-label="Company" className={input}>
							<option value="">Choose a company</option>
							{companies.map((company) => (
								<option key={company.id} value={company.id}>
									{company.name}
								</option>
							))}
						</select>
					</Metabox>

					<Metabox title="Category">
						<select name="categoryId" defaultValue={text("categoryId")} aria-label="Category" className={input}>
							<option value="">None</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</Metabox>

					<Metabox title="Job details">
						<Field label="Type">
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
						<Field label="Location" hint="Required unless the job is remote. For remote jobs, use it for the allowed region.">
							<input name="location" defaultValue={text("location")} className={input} />
						</Field>
						<label className="flex items-center gap-2">
							<input type="checkbox" name="remote" defaultChecked={checked("remote")} />
							<span>Remote</span>
						</label>
						<Field label="Education">
							<input name="education" defaultValue={text("education")} className={input} />
						</Field>
						<Field label="Experience">
							<input name="experience" defaultValue={text("experience")} className={input} />
						</Field>
					</Metabox>

					<Metabox title="Salary">
						<Field label="Short" hint="Shown on cards, e.g. $30K-$35K/month">
							<input name="salary" defaultValue={text("salary")} className={input} />
						</Field>
						<Field label="Range" hint="e.g. $100,000 - $120,000">
							<input name="salaryRange" defaultValue={text("salaryRange")} className={input} />
						</Field>
						<Field label="Type" hint="e.g. Yearly salary">
							<input name="salaryType" defaultValue={text("salaryType")} className={input} />
						</Field>
					</Metabox>
				</aside>
			</div>
		</form>
	);
};

export default JobForm;
