import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/require-admin";

const Home = async () => {
	if (!(await isAdmin())) redirect("/login");

	return (
		<div>
			<h1>Chào mừng đến trang quản trị</h1>
			<p>Chọn một mục bên dưới hoặc trong menu bên trái để bắt đầu.</p>

			<fieldset className="mt-6 max-w-md">
				<ul className="space-y-2">
					<li>
						<Link href="/jobs">Jobs</Link> – quản lý danh sách việc làm
					</li>
					<li>
						<Link href="/companies">Companies</Link> – quản lý danh sách công ty
					</li>
				</ul>
			</fieldset>
		</div>
	);
};

export default Home;
