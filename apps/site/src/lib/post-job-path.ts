// lib/post-job.ts
export const POST_JOB_PATH = "/employer/post-job";

type SessionUser = { name: string; role: "candidate" | "employer" } | null;

export const getPostJobAction = (user: SessionUser) => {
	// Candidate không được đăng tin
	if (user?.role === "candidate") return null;

	return {
		href: user ? POST_JOB_PATH : `/login?redirect=${encodeURIComponent(POST_JOB_PATH)}`,
	};
};
