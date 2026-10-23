"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Loader2, X } from "lucide-react";
import Button from "../ui/button";
import { cn } from "@/lib/cn";
import CountryPicker, { type CountryOption } from "./country-picker";
import CategoryPicker, { type CategoryOption } from "./category-picker";

import { DEFAULT_LIMIT } from "@/lib/jobs-view";

type ViewState = { sort: string; limit: number; view: string };

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

const toHref = (v: JobFilterValues, extra: ViewState) => {
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
	if (extra.sort !== "newest") sp.set("sort", extra.sort);
	if (extra.limit !== DEFAULT_LIMIT) sp.set("limit", String(extra.limit));
	if (extra.view !== "grid") sp.set("view", extra.view);
	const qs = sp.toString();
	return qs ? `/jobs?${qs}` : "/jobs";
};

const countActive = (v: JobFilterValues) => [v.experience, v.salary, v.level].filter(Boolean).length + (v.type?.length ?? 0) + (v.education?.length ?? 0);

const inputClass = "h-12 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-gray-400";

type Option = { value: string; label: string };

const control = "size-[18px] shrink-0 cursor-pointer border border-gray-300 bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500";
const radioClass = cn(control, "radio-dot rounded-full");
const checkboxClass = cn(control, "check-tick rounded-[4px]");

const RadioGroup = ({ title, name, options, value, onChange }: { title: string; name: string; options: Option[]; value?: string; onChange: (v?: string) => void }) => (
	<fieldset className="p-5">
		<p className="mb-5 font-medium">{title}</p>
		<div className="space-y-3 -mt-1">
			{options.map((o) => {
				const checked = value === o.value;
				return (
					<label key={o.value} className={cn("flex cursor-pointer items-center gap-3 text-sm transition-colors hover:text-primary-500", checked ? "text-primary-500" : "text-gray-600")}>
						<input
							type="radio"
							name={name}
							checked={checked}
							onChange={() => onChange(o.value)}
							onClick={() => checked && onChange(undefined)} // bấm lại để bỏ chọn
							className={radioClass}
						/>
						{o.label}
					</label>
				);
			})}
		</div>
	</fieldset>
);

const CheckGroup = ({ title, options, value = [], onChange }: { title: string; options: Option[]; value?: string[]; onChange: (v: string[]) => void }) => (
	<fieldset className="p-5">
		<p className="mb-5 font-medium">{title}</p>
		<div className="space-y-3 -mt-1">
			<label className={cn("flex cursor-pointer items-center gap-3 text-sm transition-colors hover:text-primary-500", value.length === 0 ? "text-primary-500" : "text-gray-600")}>
				<input type="checkbox" checked={value.length === 0} onChange={() => onChange([])} className={checkboxClass} />
				All
			</label>
			{options.map((o) => {
				const checked = value.includes(o.value);
				return (
					<label key={o.value} className={cn("flex cursor-pointer items-center gap-3 text-sm transition-colors hover:text-primary-500", checked ? "text-primary-500" : "text-gray-600")}>
						<input type="checkbox" checked={checked} onChange={() => onChange(checked ? value.filter((x) => x !== o.value) : [...value, o.value])} className={checkboxClass} />
						{o.label}
					</label>
				);
			})}
		</div>
	</fieldset>
);

const JobsSearch = ({ values, categories, countries, viewState }: { values: JobFilterValues; categories: CategoryOption[]; countries: CountryOption[]; viewState: ViewState }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);
	const [open, setOpen] = useState(false);
	const [focused, setFocused] = useState(false);
	const [draft, setDraft] = useState<JobFilterValues>(values);

	const patch = (p: Partial<JobFilterValues>) => setDraft((d) => ({ ...d, ...p }));
	const active = countActive(draft);
	// Nền tối bật khi đang ở trong thanh search, nên chuyển qua lại giữa các ô không bị nháy
	const dim = focused || open;

	const onFocus = () => setFocused(true);
	const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
	};

	const qRef = useRef<HTMLInputElement>(null);

	const clearQ = () => {
		patch({ q: undefined });
		qRef.current?.focus();
	};

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		setOpen(false);
		setFocused(false);
		(document.activeElement as HTMLElement | null)?.blur();
		startTransition(() => {
			router.push(toHref({ ...draft, q: draft.q?.trim() || undefined }, viewState));
		});
	};

	const reset = () => {
		setDraft({ q: draft.q, country: draft.country, category: draft.category });
	};

	// Bấm ra ngoài hoặc nhấn Esc thì đóng
	useEffect(() => {
		if (!dim) return;
		const onClick = (e: MouseEvent) => {
			if (formRef.current?.contains(e.target as Node)) return;
			setOpen(false);
			setFocused(false);
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== "Escape") return;
			setOpen(false);
			setFocused(false);
			(document.activeElement as HTMLElement | null)?.blur();
		};
		document.addEventListener("mousedown", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [dim]);

	return (
		<div>
			<div aria-hidden className={cn("fixed inset-0 z-30 bg-black/50 transition-opacity duration-300", dim ? "opacity-100" : "pointer-events-none opacity-0")} />

			<form ref={formRef} onSubmit={submit} onFocus={onFocus} onBlur={onBlur} onMouseDown={onFocus} role="search" className={cn("relative rounded-xl bg-white shadow-sm transition-shadow", dim && "z-40 shadow-xl")}>
				<div className="flex flex-col gap-1 p-3 lg:flex-row lg:items-center lg:gap-0">
					<label className="flex flex-1 items-center gap-3 px-3 lg:border-r lg:border-gray-200">
						<Search className="size-6 shrink-0 text-primary-500" strokeWidth={1.75} aria-hidden />
						<span className="sr-only">Keyword</span>
						<input ref={qRef} value={draft.q ?? ""} onChange={(e) => patch({ q: e.target.value })} placeholder="Job title, Keyword..." className={inputClass} />
						{draft.q && (
							<button type="button" onClick={clearQ} aria-label="Clear keyword" className="flex size-6 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-primary-500">
								<X className="size-4" aria-hidden />
							</button>
						)}
					</label>

					<div className="flex flex-1 lg:border-r lg:border-gray-200">
						<CountryPicker options={countries} value={draft.country} onChange={(country) => patch({ country })} onOpen={() => setOpen(false)} />
					</div>

					<div className="flex flex-1">
						<CategoryPicker options={categories} value={draft.category} onChange={(category) => patch({ category })} onOpen={() => setOpen(false)} />
					</div>

					<div className="flex items-center gap-2 lg:ml-2">
						<button type="button" aria-expanded={open} aria-controls="advance-filter" onClick={() => setOpen((v) => !v)} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md px-3 font-medium text-primary-500 transition-colors hover:bg-blue-50 lg:flex-none">
							Advance Filter
							{active > 0 && <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-500 px-1.5 text-xs leading-none font-semibold text-white tabular-nums">{active}</span>}
							<ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
						</button>
						<Button type="submit" disabled={isPending} className="flex-1 lg:flex-none">
							{isPending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
							{isPending ? "Searching..." : "Find Job"}
						</Button>
					</div>
				</div>

				{open && (
					<div id="advance-filter" className="absolute inset-x-0 top-full z-20 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-xl">
						<div className="grid sm:grid-cols-2 sm:divide-x sm:divide-gray-100 lg:grid-cols-5">
							<RadioGroup title="Experience" name="experience" options={EXPERIENCE} value={draft.experience} onChange={(v) => patch({ experience: v })} />
							<RadioGroup title="Salary" name="salary" options={SALARY} value={draft.salary} onChange={(v) => patch({ salary: v })} />
							<CheckGroup title="Job Type" options={TYPES} value={draft.type} onChange={(v) => patch({ type: v })} />
							<CheckGroup title="Education" options={EDUCATION} value={draft.education} onChange={(v) => patch({ education: v })} />
							<RadioGroup title="Job Level" name="level" options={LEVELS} value={draft.level} onChange={(v) => patch({ level: v })} />
						</div>
						<div className="flex justify-end border-t border-gray-100 p-2.5">
							<Button type="button" variant="ghost" size="sm" onClick={reset}>
								Reset filters
							</Button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default JobsSearch;
