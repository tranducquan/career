import Link from "next/link";

type Props = {
	page: number;
	totalPages: number;
	basePath: string;
	// Các tham số cần giữ lại khi chuyển trang, ví dụ { q: "google" }
	params?: Record<string, string | undefined>;
};

const Pagination = ({ page, totalPages, basePath, params = {} }: Props) => {
	if (totalPages <= 1) return null;

	const href = (target: number) => {
		const search = new URLSearchParams();
		for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
		if (target > 1) search.set("page", String(target));
		const query = search.toString();
		return query ? `${basePath}?${query}` : basePath;
	};

	return (
		<nav className="mt-4 flex items-center gap-4" aria-label="Pagination">
			{page > 1 ? (
				<Link href={href(page - 1)} className="underline">
					Previous
				</Link>
			) : (
				<span className="text-gray-400">Previous</span>
			)}
			<span>
				Page {page} of {totalPages}
			</span>
			{page < totalPages ? (
				<Link href={href(page + 1)} className="underline">
					Next
				</Link>
			) : (
				<span className="text-gray-400">Next</span>
			)}
		</nav>
	);
};

export default Pagination;
