import { Suspense } from "react";
import type { Metadata } from "next";
import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create account" };

const RegisterPage = () => (
	<Suspense>
		<RegisterForm />
	</Suspense>
);

export default RegisterPage;
