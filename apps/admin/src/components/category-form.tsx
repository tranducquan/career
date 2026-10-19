"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "@/lib/form-state";
import { input } from "./styles";
import { Field, FormErrors, Metabox, SubmitButton } from "./wp";

type Category = {
	name: string;
	slug: string;
	iconKey: string | null;
	sortOrder: number;
};

type Props = {
	action: (state: FormState, formData: FormData) => Promise<FormState>;
	category?: Category;
};

const CategoryForm = ({ action, category }: Props) => {
	const [state, formAction, pending] = useActionState(action, undefined);
	const values = state?.values;
	const errors = state?.errors ? Object.values(state.errors) : [];

	// Sau khi gửi lỗi, giữ giá trị người dùng đã nhập, nếu chưa gửi thì dùng giá trị hiện có
	const text = (name: "name" | "slug" | "iconKey" | "sortOrder") => values?.[name] ?? (category?.[name] != null ? String(category[name]) : "");

	return (
		<form action={formAction} className="max-w-2xl">
			<FormErrors errors={errors} />

			<Metabox
				title="Category details"
				footer={
					<>
						<Link href="/categories" className="text-wp-danger hover:underline">
							Cancel
						</Link>
						<SubmitButton pending={pending} label={category ? "Update" : "Save"} />
					</>
				}
			>
				<Field label="Name">
					<input name="name" defaultValue={text("name")} required className={input} />
				</Field>
				<Field label="Slug" hint='The URL-friendly version of the name. Leave empty to generate it, for example "graphics-design".'>
					<input name="slug" defaultValue={text("slug")} className={input} />
				</Field>
				<Field label="Icon key" hint="Lucide icon name in kebab-case, for example pen-tool. The site shows a default icon if the name is unknown.">
					<input name="iconKey" defaultValue={text("iconKey")} placeholder="pen-tool" className={input} />
				</Field>
				<Field label="Sort order" hint="Lower numbers appear first.">
					<input type="number" name="sortOrder" min={0} max={9999} defaultValue={text("sortOrder") || "0"} className={`${input} max-w-32`} />
				</Field>
			</Metabox>
		</form>
	);
};

export default CategoryForm;
