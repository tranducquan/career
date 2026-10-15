import { login } from "./actions";

type Props = { searchParams: Promise<{ error?: string; next?: string }> };

const LoginPage = async ({ searchParams }: Props) => {
	const { error, next } = await searchParams;

	return (
		<main className="mx-auto mt-24 max-w-xs px-4">
			<h1 className="text-center">Admin</h1>

			<form action={login}>
				<fieldset>
					<legend>Log in</legend>
					<input type="hidden" name="next" value={next ?? ""} />
					<label className="mb-3 block">
						<span className="mb-1 block">Password:</span>
						<input type="password" name="password" required autoFocus autoComplete="current-password" className="w-full" />
					</label>
					{error && <p className="mb-3 border border-red-600 bg-red-50 px-2 py-1 text-red-700">Wrong password</p>}

					<button type="submit" className="px-3">
						Go
					</button>
				</fieldset>
			</form>
		</main>
	);
};

export default LoginPage;
