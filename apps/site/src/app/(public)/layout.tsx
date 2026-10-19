import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Breadcrumb from "@/components/layout/breadcrumb";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<Breadcrumb />
			<main className="grow">{children}</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
