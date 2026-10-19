import Link from "next/link";
import { btnSecondary, btnPrimary, input } from "./styles";

export const PageTitle = ({ title, addHref, addLabel = "Add New" }: { title: string; addHref?: string; addLabel?: string }) => (
	<div className="mb-3 flex flex-wrap items-center gap-3">
		<h1 className="text-[23px] leading-[1.3] font-normal text-wp-title">{title}</h1>
		{addHref && (
			<Link href={addHref} className={btnSecondary}>
				{addLabel}
			</Link>
		)}
	</div>
);

export const Notice = ({ type = "success", children }: { type?: "success" | "error"; children: React.ReactNode }) => (
	<div role={type === "error" ? "alert" : "status"} className={`mb-3 border border-l-4 border-wp-border bg-white px-3 py-2.5 shadow-sm ${type === "error" ? "border-l-wp-danger" : "border-l-wp-success"}`}>
		{children}
	</div>
);

type Tab = { label: string; count?: number; href: string; active: boolean };

// "All (9) | Published (7) | Draft (1)" như màn hình danh sách của WordPress
export const StatusTabs = ({ tabs }: { tabs: Tab[] }) => (
	<ul className="flex flex-wrap items-center gap-y-1 text-[13px]">
		{tabs.map((tab, index) => (
			<li key={tab.label} className="flex items-center">
				{index > 0 && <span className="px-1.5 text-[#a7aaad]">|</span>}
				<Link href={tab.href} aria-current={tab.active ? "page" : undefined} className={tab.active ? "font-semibold text-wp-title" : "text-wp-accent hover:text-wp-accent-dark"}>
					{tab.label}
					{tab.count !== undefined && <span className="font-normal text-[#646970]"> ({tab.count})</span>}
				</Link>
			</li>
		))}
	</ul>
);

export const SearchBox = ({ label, defaultValue, hidden }: { label: string; defaultValue?: string; hidden?: Record<string, string | undefined> }) => (
	<form method="get" role="search" className="flex min-w-0 items-center gap-1.5">
		{Object.entries(hidden ?? {}).map(([name, value]) => (value ? <input key={name} type="hidden" name={name} value={value} /> : null))}
		<input type="search" name="q" defaultValue={defaultValue} aria-label={label} className={`${input} min-w-0 max-w-44 sm:max-w-60`} />
		<button type="submit" className={btnSecondary}>
			{label}
		</button>
	</form>
);

// Hộp có tiêu đề như các metabox trong màn hình soạn thảo của WordPress
export const Metabox = ({ title, children, footer }: { title: string; children: React.ReactNode; footer?: React.ReactNode }) => (
	<section className="border border-wp-border bg-white shadow-sm">
		<h2 className="border-b border-wp-border px-3 py-2.5 text-[14px] leading-[1.4] font-semibold text-wp-title">{title}</h2>
		<div className="space-y-3 p-3">{children}</div>
		{footer && <div className="flex items-center justify-between gap-3 border-t border-wp-border bg-[#f6f7f7] px-3 py-2.5">{footer}</div>}
	</section>
);

export const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
	<label className="block">
		<span className="mb-1 block text-[13px] text-wp-title">{label}</span>
		{children}
		{hint && <span className="mt-1 block text-[12px] text-[#646970]">{hint}</span>}
	</label>
);

export const FormErrors = ({ errors }: { errors: string[] }) =>
	errors.length > 0 ? (
		<Notice type="error">
			<ul className="list-disc pl-4">
				{errors.map((message) => (
					<li key={message}>{message}</li>
				))}
			</ul>
		</Notice>
	) : null;

export const SubmitButton = ({ pending, label }: { pending: boolean; label: string }) => (
	<button type="submit" disabled={pending} className={btnPrimary}>
		{pending ? "Saving..." : label}
	</button>
);
