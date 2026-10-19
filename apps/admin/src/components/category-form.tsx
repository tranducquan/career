"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { FormState } from "@/lib/form-state";

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

const input = "w-full rounded border border-gray-300 px-3 py-2";

const CategoryForm = ({ action, category }: Props) => {
	const [state, formAction, pending] = useActionState(action, undefined);
	const values = state?.values;
	const errors = state?.errors ? Object.values(state.errors) : [];

	// Sau khi gửi lỗi, giữ giá trị người dùng đã nhập, nếu chưa gửi thì dùng giá trị hiện có
	const text = (name: "name" | "slug" | "iconKey" | "sortOrder") => values?.[name] ?? (category?.[name] != null ? String(category[name]) : "");

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
				<span className="mb-1 block">Slug</span>
				<input name="slug" defaultValue={text("slug")} placeholder="Leave empty to generate from the name" className={input} />
			</label>

			<label className="block">
				<span className="mb-1 block">Icon key</span>
				<input name="iconKey" defaultValue={text("iconKey")} placeholder="pen-tool" className={input} />
				<span className="mt-1 block text-gray-500">Lucide icon name in kebab-case. The site shows a default icon if the name is unknown.</span>
			</label>

			<label className="block">
				<span className="mb-1 block">Sort order</span>
				<input type="number" name="sortOrder" min={0} max={9999} defaultValue={text("sortOrder") || "0"} className={input} />
			</label>

			<div className="flex items-center gap-4">
				<button type="submit" disabled={pending} className="rounded bg-black px-4 py-2 text-white disabled:opacity-50">
					{pending ? "Saving..." : "Save"}
				</button>
				<Link href="/categories" className="underline">
					Cancel
				</Link>
			</div>
		</form>
	);
};

export default CategoryForm;
