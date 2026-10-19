import { Facebook, Google } from "@thesvg/react";

type SocialButtonsProps = {
	action: "Sign up" | "Sign in";
	dividerLabel?: string;
};

const SocialButtons = ({ action, dividerLabel = "OR" }: SocialButtonsProps) => {
	const base = "flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:border-primary-500 hover:bg-gray-50";
	return (
		<div>
			<div className="flex items-center gap-4 text-xs text-gray-500">
				<span className="h-px flex-1 bg-gray-200" />
				{dividerLabel}
				<span className="h-px flex-1 bg-gray-200" />
			</div>

			<div className="mt-6 grid gap-3 sm:grid-cols-2">
				{/* TODO: thay bằng signIn("facebook") / signIn("google") của thư viện auth */}
				<button type="button" className={base}>
					<Facebook aria-hidden className="size-5" />
					{action} with Facebook
				</button>
				<button type="button" className={base}>
					<Google aria-hidden className="size-5" />
					{action} with Google
				</button>
			</div>
		</div>
	);
};

export default SocialButtons;
