"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Layers, ChevronDown } from "lucide-react";
import Button from "../ui/button";
import { cn } from "@/lib/cn";
import CountryPicker, { type CountryOption } from "./country-picker";

export type JobFilterValues = {
	q?: string;
	country?: string;
	category?: string; // slug
	experience?: string;
	salary?: string; // "6000-8000"
	type?: string[];
	education?: string[];
	level?: string;
};

type CategoryOption = { slug: string; name: string; count: number };

// value phải khớp dữ liệu trong DB
const EXPERIENCE = ["Freshers", "1 - 2 Years", "2 - 4 Years", "4 - 6 Years", "6 - 8 Years", "8 - 10 Years", "10 - 15 Years", "15+ Years"].map((l) => ({ value: l, label: l }));
const SALARY = [
	{ value: "50-1000", label: "$50 - $1000" },
	{ value: "1000-2000", label: "$1000 - $2000" },
	{ value: "3000-4000", label: "$3000 - $4000" },
	{ value: "4000-6000", label: "$4000 - $6000" },
	{ value: "6000-8000", label: "$6000 - $8000" },
	{ value: "8000-10000", label: "$8000 - $10000" },
	{ value: "10000-15000", label: "$10000 - $15000" },
	{ value: "15000-", label: "$15000+" },
];
const TYPES = ["Full-time", "Part-time", "Internship", "Remote", "Temporary", "Contract"].map((l) => ({ value: l, label: l.replace("-", " ") }));
const EDUCATION = ["High School", "Intermediate", "Graduation", "Master Degree", "Bachelor Degree"].map((l) => ({ value: l, label: l }));
const LEVELS = [
	{ value: "Entry", label: "Entry Level" },
	{ value: "Mid", label: "Mid Level" },
	{ value: "Expert", label: "Expert Level" },
];

const toHref = (v: JobFilterValues) => {
	const sp = new URLSearchParams();
	const set = (k: string, val?: string) => val && sp.set(k, val);
	set("q", v.q);
	set("country", v.country);
	set("category", v.category);
	set("experience", v.experience);
	set("salary", v.salary);
	set("level", v.level);
	if (v.type?.length) sp.set("type", v.type.join(","));
	if (v.education?.length) sp.set("education", v.education.join(","));
	const qs = sp.toString();
	return qs ? `/jobs?${qs}` : "/jobs";
};

const countActive = (v: JobFilterValues) => [v.experience, v.salary, v.level].filter(Boolean).length + (v.type?.length ?? 0) + (v.education?.length ?? 0);

const inputClass = "h-12 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-gray-400";

type Option = { value: string; label: string };

const RadioGroup = ({ title, name, options, value, onChange }: { title: string; name: string; options: Option[]; value?: string; onChange: (v?: string) => void }) => (
	<fieldset className="p-5">
		<legend className="mb-4 font-medium">{title}</legend>
		<div className="space-y-3">
			{options.map((o) => (
				<label key={o.value} className={cn("flex cursor-pointer items-center gap-3 text-sm", value === o.value ? "text-blue-600" : "text-gray-600")}>
					<input
						type="radio"
						name={name}
						checked={value === o.value}
						onChange={() => onChange(o.value)}
						onClick={() => value === o.value && onChange(undefined)} // bấm lại để bỏ chọn
						className="size-4 accent-blue-600"
					/>
					{o.label}
				</label>
			))}
		</div>
	</fieldset>
);

const CheckGroup = ({ title, options, value = [], onChange }: { title: string; options: Option[]; value?: string[]; onChange: (v: string[]) => void }) => (
	<fieldset className="p-5">
		<legend className="mb-4 font-medium">{title}</legend>
		<div className="space-y-3">
			<label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
				<input type="checkbox" checked={value.length === 0} onChange={() => onChange([])} className="size-4 accent-blue-600" />
				All
			</label>
			{options.map((o) => {
				const checked = value.includes(o.value);
				return (
					<label key={o.value} className={cn("flex cursor-pointer items-center gap-3 text-sm", checked ? "text-blue-600" : "text-gray-600")}>
						<input type="checkbox" checked={checked} onChange={() => onChange(checked ? value.filter((x) => x !== o.value) : [...value, o.value])} className="size-4 accent-blue-600" />
						{o.label}
					</label>
				);
			})}
		</div>
	</fieldset>
);

const JobsSearch = ({ values, categories, countries }: { values: JobFilterValues; categories: CategoryOption[]; countries: CountryOption[] }) => {
	const router = useRouter();
	const [open, setOpen] = useState(countActive(values) > 0);
	const [draft, setDraft] = useState<JobFilterValues>(values);
	const patch = (p: Partial<JobFilterValues>) => setDraft((d) => ({ ...d, ...p }));

	const active = countActive(draft);

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(toHref({ ...draft, q: draft.q?.trim() || undefined }));
	};

	const reset = () => {
		setDraft({ q: draft.q, country: draft.country, category: draft.category });
	};

	return (
		<form onSubmit={submit} role="search" className="rounded-xl bg-white shadow-sm">
			<div className="flex flex-col gap-1 p-2 lg:flex-row lg:items-center lg:gap-0">
				<label className="flex flex-1 items-center gap-3 px-3 lg:border-r lg:border-gray-100">
					<Search className="size-5 shrink-0 text-blue-600" aria-hidden />
					<span className="sr-only">Keyword</span>
					<input value={draft.q ?? ""} onChange={(e) => patch({ q: e.target.value })} placeholder="Job title, Keyword..." className={inputClass} />
				</label>

				<div className="flex flex-1 lg:border-r lg:border-gray-100">
					<CountryPicker options={countries} value={draft.country} onChange={(country) => patch({ country })} />
				</div>

				<label className="relative flex flex-1 items-center gap-3 px-3">
					<Layers className="size-5 shrink-0 text-blue-600" aria-hidden />
					<span className="sr-only">Category</span>
					<select value={draft.category ?? ""} onChange={(e) => patch({ category: e.target.value || undefined })} className={cn(inputClass, "cursor-pointer appearance-none pr-6", !draft.category && "text-gray-400")}>
						<option value="">Select Category</option>
						{categories.map((c) => (
							<option key={c.slug} value={c.slug}>
								{c.name}
							</option>
						))}
					</select>
					<ChevronDown className="pointer-events-none absolute right-3 size-4 text-gray-400" aria-hidden />
				</label>

				<div className="flex items-center gap-2 lg:ml-2">
					<button type="button" aria-expanded={open} aria-controls="advance-filter" onClick={() => setOpen((v) => !v)} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md px-3 font-medium text-blue-600 transition-colors hover:bg-blue-50 lg:flex-none">
						Advance Filter
						{active > 0 && <span className="rounded-full bg-blue-600 px-1.5 text-xs text-white">{active}</span>}
						<ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
					</button>
					<Button type="submit" className="flex-1 lg:flex-none">
						Find Job
					</Button>
				</div>
			</div>

			{open && (
				<div id="advance-filter" className="border-t border-gray-100">
					<div className="grid sm:grid-cols-2 sm:divide-x sm:divide-gray-100 lg:grid-cols-5">
						<RadioGroup title="Experience" name="experience" options={EXPERIENCE} value={draft.experience} onChange={(v) => patch({ experience: v })} />
						<RadioGroup title="Salary" name="salary" options={SALARY} value={draft.salary} onChange={(v) => patch({ salary: v })} />
						<CheckGroup title="Job Type" options={TYPES} value={draft.type} onChange={(v) => patch({ type: v })} />
						<CheckGroup title="Education" options={EDUCATION} value={draft.education} onChange={(v) => patch({ education: v })} />
						<RadioGroup title="Job Level" name="level" options={LEVELS} value={draft.level} onChange={(v) => patch({ level: v })} />
					</div>
					<div className="flex justify-end border-t border-gray-100 p-3">
						<Button type="button" variant="ghost" size="sm" onClick={reset}>
							Reset filters
						</Button>
					</div>
				</div>
			)}
		</form>
	);
};

export default JobsSearch;
