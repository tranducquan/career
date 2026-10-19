import Link from "next/link";

type Props = {
	page: number;
	totalPages: number;
	total: number;
	basePath: string;
	// Các tham số cần giữ lại khi chuyển trang, ví dụ { q: "google", status: "draft" }
	params?: Record<string, string | undefined>;
};

const box = "inline-flex size-[30px] items-center justify-center border text-[16px] leading-none";

const Pagination = ({ page, totalPages, total, basePath, params = {} }: Props) => {
	const href = (target: number) => {
		const search = new URLSearchParams();
		for (const [key, value] of Object.entries(params)) if (value) search.set(key, value);
		if (target > 1) search.set("page", String(target));
		const query = search.toString();
		return query ? `${basePath}?${query}` : basePath;
	};

	const arrow = (label: string, symbol: string, target: number, enabled: boolean) =>
		enabled ? (
			<Link href={href(target)} aria-label={label} className={`${box} border-wp-border bg-[#f6f7f7] text-wp-accent hover:border-wp-accent hover:bg-white`}>
				{symbol}
			</Link>
		) : (
			<span aria-hidden className={`${box} border-[#dcdcde] bg-[#f6f7f7] text-[#a7aaad]`}>
				{symbol}
			</span>
		);

	return (
		<div className="flex items-center justify-end gap-2 py-2 text-[13px]">
			<span className="text-[#50575e]">
				{total} {total === 1 ? "item" : "items"}
			</span>
			{totalPages > 1 && (
				<nav aria-label="Pagination" className="flex items-center gap-1">
					{arrow("First page", "«", 1, page > 1)}
					{arrow("Previous page", "‹", page - 1, page > 1)}
					<span className="px-1">
						{page} of {totalPages}
					</span>
					{arrow("Next page", "›", page + 1, page < totalPages)}
					{arrow("Last page", "»", totalPages, page < totalPages)}
				</nav>
			)}
		</div>
	);
};

export default Pagination;
