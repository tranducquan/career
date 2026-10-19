import { login } from "./actions";

type Props = { searchParams: Promise<{ error?: string; next?: string }> };

const LoginPage = async ({ searchParams }: Props) => {
	const { error, next } = await searchParams;

	return (
		<main className="mx-auto mt-24 max-w-xs px-4">
			<h1 className="mb-4 text-lg font-medium">Admin</h1>

			<form action={login} className="space-y-3">
				<input type="hidden" name="next" value={next ?? ""} />
				<label className="block">
					<span className="mb-1 block">Password</span>
					<input type="password" name="password" required autoFocus autoComplete="current-password" className="w-full rounded border border-gray-300 px-3 py-2" />
				</label>
				{error && <p className="text-red-600">Wrong password</p>}
				<button type="submit" className="rounded bg-black px-4 py-2 text-white">
					Sign in
				</button>
			</form>
		</main>
	);
};

export default LoginPage;
