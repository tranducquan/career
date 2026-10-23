// Link tài khoản theo vai trò. Không có "use client" nên server và client đều import được.
export type Role = "candidate" | "employer";

export const accountLinks: Record<Role, { title: string; href: string }[]> = {
	candidate: [
		{ title: "Dashboard", href: "/candidate" },
		{ title: "Saved Jobs", href: "/candidate/saved" },
		{ title: "Applied Jobs", href: "/candidate/applications" },
		{ title: "Profile", href: "/candidate/profile" },
	],
	employer: [
		{ title: "Dashboard", href: "/employer" },
		{ title: "Post a Job", href: "/employer/jobs/new" },
		{ title: "My Jobs", href: "/employer/jobs" },
		{ title: "Company Profile", href: "/employer/company" },
	],
};

export const roleLabel: Record<Role, string> = { candidate: "Candidate", employer: "Employer" };
