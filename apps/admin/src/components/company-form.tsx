"use client";

import { useActionState, useState } from "react";
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

	const initialLogo = text("logoUrl");
	const [logoMode, setLogoMode] = useState<"icon" | "link">(initialLogo && !initialLogo.startsWith("thesvg:") ? "link" : "icon");
	const [iconName, setIconName] = useState(initialLogo.startsWith("thesvg:") ? initialLogo.slice(7) : "");
	const [linkUrl, setLinkUrl] = useState(initialLogo.startsWith("thesvg:") ? "" : initialLogo);

	const cleanIcon = iconName.trim().toLowerCase().replace(/\s+/g, "-");
	const logoValue = logoMode === "icon" ? (cleanIcon ? `thesvg:${cleanIcon}` : "") : linkUrl.trim();

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
				<Field label="Logo" hint="Icon: name from thesvg.org (e.g. apple-music). Link: image URL. Leave empty to show initials.">
					<div className="flex gap-2">
						<select value={logoMode} onChange={(e) => setLogoMode(e.target.value as "icon" | "link")} className={`${input} w-auto`}>
							<option value="icon">Icon</option>
							<option value="link">Link</option>
						</select>
						{logoMode === "icon" ? <input value={iconName} onChange={(e) => setIconName(e.target.value)} placeholder="apple-music" className={input} /> : <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://... or /logos/name.svg" className={input} />}
					</div>
					<input type="hidden" name="logoUrl" value={logoValue} />
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
