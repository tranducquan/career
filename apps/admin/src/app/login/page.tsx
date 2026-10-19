import { redirect } from "next/navigation";
import { btnPrimary, input } from "@/components/styles";
import { isAdmin } from "@/lib/require-admin";
import { login } from "./actions";

type Props = { searchParams: Promise<{ error?: string; next?: string }> };

const LoginPage = async ({ searchParams }: Props) => {
	// Đã đăng nhập rồi thì không cần hiện form nữa
	if (await isAdmin()) redirect("/jobs");

	const { error, next } = await searchParams;

	return (
		<main className="mx-auto w-full max-w-84 px-4 pt-[8vh]">
			<h1 className="mb-6 text-center text-[24px] font-normal text-wp-title">Career Admin</h1>

			<form action={login} className="space-y-4 border border-wp-border bg-white p-6 shadow-sm">
				<input type="hidden" name="next" value={next ?? ""} />
				{error && (
					<p role="alert" className="border-l-4 border-wp-danger bg-white px-3 py-2 shadow-sm">
						<strong>Error:</strong> The password you entered is incorrect.
					</p>
				)}
				<label className="block">
					<span className="mb-1 block text-[14px]">Password</span>
					<input type="password" name="password" required autoFocus autoComplete="current-password" className={`${input} text-[18px]`} />
				</label>
				<button type="submit" className={`${btnPrimary} float-right`}>
					Log In
				</button>
				<div className="clear-both" />
			</form>
		</main>
	);
};

export default LoginPage;
