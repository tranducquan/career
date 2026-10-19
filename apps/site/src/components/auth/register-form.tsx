"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Building2, CircleUser } from "lucide-react";

import { Input } from "@/components/ui/input";
import PasswordInput from "./password-input";
import SocialButtons from "./social-buttons";

const roles = [
	{ value: "candidate", label: "Candidate", icon: CircleUser },
	{ value: "employer", label: "Employers", icon: Building2 },
] as const;

const RegisterForm = () => {
	const searchParams = useSearchParams();
	const roleFromUrl = searchParams.get("role") === "employer" ? "employer" : "candidate";

	const [role, setRole] = useState<"candidate" | "employer">(roleFromUrl);
	const [prevRoleFromUrl, setPrevRoleFromUrl] = useState(roleFromUrl);
	const [confirmError, setConfirmError] = useState<string>();

	if (roleFromUrl !== prevRoleFromUrl) {
		setPrevRoleFromUrl(roleFromUrl);
		setRole(roleFromUrl);
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		if (data.get("password") !== data.get("confirmPassword")) {
			setConfirmError("Passwords do not match.");
			return;
		}

		setConfirmError(undefined);
		// TODO: gọi server action / API với Object.fromEntries(data)
	};

	return (
		<div>
			<h1 className="text-center text-3xl font-medium text-gray-900 md:text-4xl">Create account.</h1>
			<p className="mt-4 text-center text-sm text-gray-600">
				Already have account?{" "}
				<Link href="/login" className="font-medium text-primary-500 hover:text-primary-700">
					Log In
				</Link>
			</p>

			<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
				<fieldset className="rounded-md bg-gray-100 p-3">
					<legend className="sr-only">Create account as a</legend>
					<p aria-hidden className="mb-2 text-center text-xs tracking-wide text-gray-500 uppercase">
						Create account as a
					</p>
					<div className="grid grid-cols-2 gap-2">
						{roles.map(({ value, label, icon: Icon }) => (
							<label key={value} className="cursor-pointer">
								<input type="radio" name="role" value={value} checked={role === value} onChange={() => setRole(value)} className="peer sr-only" />
								<span className="flex h-12 items-center justify-center gap-2 rounded-md text-sm font-medium text-gray-700 transition-colors peer-checked:bg-primary-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2">
									<Icon aria-hidden className="size-5" />
									{label}
								</span>
							</label>
						))}
					</div>
				</fieldset>
				<div className="grid gap-4 sm:grid-cols-2">
					<Input name="fullName" placeholder="Full Name" autoComplete="name" required />
					<Input name="username" placeholder="Username" autoComplete="username" required />
				</div>
				<Input type="email" name="email" placeholder="Email address" autoComplete="email" required />
				<PasswordInput name="password" placeholder="Password" autoComplete="new-password" minLength={8} required />
				<PasswordInput name="confirmPassword" placeholder="Confirm Password" autoComplete="new-password" error={confirmError} required />
				<label className="flex items-center gap-2 text-sm text-gray-600">
					<input type="checkbox" name="terms" required className="size-4 rounded border-gray-300 accent-primary-500" />
					<span>
						I&apos;ve read and agree with your{" "}
						<Link href="/terms" className="font-medium text-primary-500 hover:text-primary-700">
							Terms of Services
						</Link>
					</span>
				</label>
				<button type="submit" className="mt-2 flex h-12 items-center justify-center gap-2 rounded-md bg-primary-500 text-sm font-medium text-white transition-colors hover:bg-primary-600 md:text-base">
					Create Account
					<ArrowRight aria-hidden className="size-5" />
				</button>
			</form>

			<div className="mt-8">
				<SocialButtons action="Sign up" />
			</div>
		</div>
	);
};

export default RegisterForm;
