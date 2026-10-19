import Container from "@/components/layout/container";
import Logo from "@/components/layout/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex min-h-screen items-center bg-gray-100 py-12 md:py-20">
			<Container>
				<div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-10">
					<div className="text-center">
						<Logo />
					</div>
					<div className="mt-8">{children}</div>
				</div>
			</Container>
		</main>
	);
};

export default AuthLayout;
