"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import PasswordInput from "./password-input";
import SocialButtons from "./social-buttons";

const LoginForm = () => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// TODO: gọi server action / signIn với Object.fromEntries(data)
	};

	return (
		<div>
			<h1 className="text-center text-3xl font-medium text-gray-900 md:text-4xl">Sign in</h1>
			<p className="mt-4 text-center text-sm text-gray-600">
				Don&apos;t have account{" "}
				<Link href="/register" className="font-medium text-primary-500 hover:text-primary-700">
					Create Account
				</Link>
			</p>

			<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
				<Input type="email" name="email" placeholder="Email address" autoComplete="email" required />
				<PasswordInput name="password" placeholder="Password" autoComplete="current-password" required />

				<div className="flex items-center justify-between gap-4 text-sm">
					<label className="flex items-center gap-2 text-gray-600">
						<input type="checkbox" name="remember" className="size-4 rounded border-gray-300 accent-primary-500" />
						Remember Me
					</label>
					<Link href="/forgot-password" className="font-medium text-primary-500 hover:text-primary-700">
						Forget password
					</Link>
				</div>

				<button type="submit" className="mt-2 flex h-12 items-center justify-center gap-2 rounded-md bg-primary-500 text-sm font-medium text-white transition-colors hover:bg-primary-600 md:text-base">
					Sign In
					<ArrowRight aria-hidden className="size-5" />
				</button>
			</form>

			<div className="mt-8">
				<SocialButtons action="Sign in" dividerLabel="or" />
			</div>
		</div>
	);
};

export default LoginForm;
