"use client";

import { useActionState } from "react";
import { Loader2, Send } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { sendContact, type ContactState } from "@/app/(public)/contact/actions";
import Button from "../ui/button";

const initialState: ContactState = { status: "idle" };

const ContactForm = () => {
	const [state, formAction, pending] = useActionState(sendContact, initialState);

	return (
		<form action={formAction} noValidate className="space-y-4.5">
			<div className="grid gap-4.5 sm:grid-cols-2">
				<Input name="name" placeholder="Họ và tên" autoComplete="name" required defaultValue={state.values?.name} error={state.errors?.name} />
				<Input name="email" type="email" placeholder="Email" autoComplete="email" required defaultValue={state.values?.email} error={state.errors?.email} />
			</div>

			<Input name="subject" placeholder="Tiêu đề" required defaultValue={state.values?.subject} error={state.errors?.subject} />

			<Textarea name="message" placeholder="Nội dung" required maxLength={2000} defaultValue={state.values?.message} error={state.errors?.message} hint="Maximum 2,000 characters." />

			{/* Ô bẫy bot, người thật không thấy và không điền */}
			<div aria-hidden className="absolute left-[-9999px]">
				<input type="text" name="website" tabIndex={-1} autoComplete="off" />
			</div>

			<Button type="submit" fullWidth disabled={pending} className="mt-3.5">
				{pending ? (
					<>
						Sending <Loader2 aria-hidden className="animate-spin" />
					</>
				) : (
					<>
						Send Message <Send aria-hidden />
					</>
				)}
			</Button>

			{state.status !== "idle" && state.message && (
				<p role={state.status === "error" ? "alert" : "status"} className={cn("rounded-md px-4 py-3 text-sm", state.status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
					{state.message}
				</p>
			)}
		</form>
	);
};

export default ContactForm;
