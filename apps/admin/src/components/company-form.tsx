"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "@/lib/form-state";

type Company = {
	name: string;
	location: string;
	href: string;
	logoUrl: string | null;
	featured: boolean;
};

type Props = {
	action: (state: FormState, formData: FormData) => Promise<FormState>;
	company?: Company;
};

const input = "w-full rounded border border-gray-300 px-3 py-2";

const CompanyForm = ({ action, company }: Props) => {
	const [state, formAction, pending] = useActionState(action, undefined);
	const values = state?.values;
	const errors = state?.errors ? Object.values(state.errors) : [];

	// Sau khi gửi lỗi, giữ giá trị người dùng đã nhập, nếu chưa gửi thì dùng giá trị hiện có
	const text = (name: "name" | "location" | "href" | "logoUrl") => values?.[name] ?? company?.[name] ?? "";

	return (
		<form action={formAction} className="max-w-lg space-y-4">
			{errors.length > 0 && (
				<ul role="alert" className="list-disc rounded border border-red-300 bg-red-50 py-2 pr-3 pl-7 text-red-700">
					{errors.map((message) => (
						<li key={message}>{message}</li>
					))}
				</ul>
			)}

			<label className="block">
				<span className="mb-1 block">Name *</span>
				<input name="name" defaultValue={text("name")} required className={input} />
			</label>

			<label className="block">
				<span className="mb-1 block">Location *</span>
				<input name="location" defaultValue={text("location")} required className={input} />
			</label>

			<label className="block">
				<span className="mb-1 block">Link</span>
				<input name="href" defaultValue={text("href")} placeholder="#" className={input} />
			</label>

			<label className="block">
				<span className="mb-1 block">Logo URL</span>
				<input name="logoUrl" defaultValue={text("logoUrl")} placeholder="https://..." className={input} />
			</label>

			<label className="flex items-center gap-2">
				<input type="checkbox" name="featured" defaultChecked={values ? values.featured === "on" : (company?.featured ?? false)} />
				<span>Featured</span>
			</label>

			<div className="flex items-center gap-4">
				<button type="submit" disabled={pending} className="rounded px-3 py-1.5 disabled:opacity-50 border border-gray-300">
					{pending ? "Saving..." : "Save"}
				</button>
				<Link href="/companies" className="underline">
					Cancel
				</Link>
			</div>
		</form>
	);
};

export default CompanyForm;
