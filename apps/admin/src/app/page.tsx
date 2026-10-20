import Link from "next/link";
import { listCategories } from "@repo/db/admin";
import { requireAdmin } from "@/lib/require-admin";

const cardClass = "border border-wp-border bg-white";
const buttonClass = "inline-flex items-center bg-wp-accent px-3 py-1.5 text-sm text-white hover:opacity-90";
const linkClass = "text-wp-accent hover:underline";

const AdminHome = async () => {
	await requireAdmin();

	const { total: categoryCount } = await listCategories({ page: 1 });

	return (
		<div>
			<h1 className="my-4 text-[23px] font-normal text-wp-title">Dashboard</h1>
			{/* Khung chào mừng */}
			<section className={`${cardClass} border-l-4 border-l-wp-accent`}>
				<div className="border-b border-wp-border px-5 py-4">
					<h2 className="text-xl font-medium text-wp-title">Welcome to Career Admin!</h2>
					<p className="mt-1 text-sm text-wp-title">We&rsquo;ve gathered some links to help you get started.</p>
				</div>
				<div className="grid gap-6 p-5 md:grid-cols-3">
					<div>
						<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-wp-title">Get Started</h3>
						<Link href="/jobs/new" className={buttonClass}>
							Add your first job
						</Link>
						<p className="mt-3 text-sm text-wp-title">
							or{" "}
							<Link href="/companies/new" className={linkClass}>
								add a company
							</Link>
						</p>
					</div>

					<div>
						<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-wp-title">Next Steps</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="/jobs" className={linkClass}>
									Manage jobs
								</Link>
							</li>
							<li>
								<Link href="/companies" className={linkClass}>
									Manage companies
								</Link>
							</li>
							<li>
								<Link href="/categories" className={linkClass}>
									Organize categories
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-wp-title">More Actions</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="/jobs/new" className={linkClass}>
									Write a new job post
								</Link>
							</li>
							<li>
								<Link href="/categories/new" className={linkClass}>
									Create a category
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Quick links */}
			<div className="mt-5 grid gap-5 md:grid-cols-3">
				{[
					{ label: "Jobs", href: "/jobs" },
					{ label: "Companies", href: "/companies" },
					{ label: "Categories", href: "/categories" },
				].map(({ label, href }) => (
					<Link key={href} href={href} className={`${cardClass} px-4 py-4 text-sm font-medium text-wp-title hover:border-wp-accent hover:text-wp-accent`}>
						{label}
					</Link>
				))}
			</div>

			<section className={`${cardClass} mt-5`}>
				<h2 className="border-b border-wp-border px-4 py-3 text-sm font-medium text-wp-title">At a Glance</h2>
				<ul className="grid grid-cols-2 gap-2 p-4 text-sm md:grid-cols-3">
					<li>
						<Link href="/categories" className={linkClass}>
							{categoryCount} {categoryCount === 1 ? "Category" : "Categories"}
						</Link>
					</li>
					{/* Jobs, Companies: thêm tương tự khi có hàm đếm */}
				</ul>
			</section>
		</div>
	);
};

export default AdminHome;
