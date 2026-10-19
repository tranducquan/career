"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "@/lib/form-state";
import { input } from "./styles";
import { Field, FormErrors, Metabox, SubmitButton } from "./wp";

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

const CompanyForm = ({ action, company }: Props) => {
	const [state, formAction, pending] = useActionState(action, undefined);
	const values = state?.values;
	const errors = state?.errors ? Object.values(state.errors) : [];

	// Sau khi gửi lỗi, giữ giá trị người dùng đã nhập, nếu chưa gửi thì dùng giá trị hiện có
	const text = (name: "name" | "location" | "href" | "logoUrl") => values?.[name] ?? company?.[name] ?? "";

	return (
		<form action={formAction} className="max-w-2xl">
			<FormErrors errors={errors} />

			<Metabox
				title="Company details"
				footer={
					<>
						<Link href="/companies" className="text-wp-danger hover:underline">
							Cancel
						</Link>
						<SubmitButton pending={pending} label={company ? "Update" : "Save"} />
					</>
				}
			>
				<Field label="Name">
					<input name="name" defaultValue={text("name")} required className={input} />
				</Field>
				<Field label="Location">
					<input name="location" defaultValue={text("location")} required className={input} />
				</Field>
				<Field label="Link" hint="Where the Open Position button goes. Leave empty for #.">
					<input name="href" defaultValue={text("href")} placeholder="#" className={input} />
				</Field>
				<Field label="Logo URL">
					<input name="logoUrl" defaultValue={text("logoUrl")} placeholder="https://..." className={input} />
				</Field>
				<label className="flex items-center gap-2">
					<input type="checkbox" name="featured" defaultChecked={values ? values.featured === "on" : (company?.featured ?? false)} />
					<span>Featured</span>
				</label>
			</Metabox>
		</form>
	);
};

export default CompanyForm;
