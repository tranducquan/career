// Bảng luôn ở dạng ngang và cuộn bên trong khung riêng, cả trang không bị kéo rộng ra.
// - Khung có chiều cao tối đa theo màn hình, nên thanh cuộn ngang luôn nằm trong tầm nhìn
//   (dùng chuột kéo thanh này, hoặc giữ Shift rồi lăn chuột).
// - Thanh cuộn được vẽ lại để luôn hiện, kể cả trên macOS khi dùng chuột.
// - Dòng tiêu đề dính ở trên, cột đầu dính bên trái, cột thao tác dính bên phải.

type WithChildren = { children: React.ReactNode; className?: string };

const scrollbar = "[&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [scrollbar-width:thin] [scrollbar-color:var(--color-gray-400)_var(--color-gray-100)]";

// relative: phần tử absolute bên trong (như sr-only) phải bị cắt theo khung cuộn này,
// nếu không nó nằm ở tận cuối bảng và kéo cả trang rộng ra
export const Table = ({ children }: WithChildren) => (
	<div className={`relative max-h-[max(20rem,calc(100dvh-16rem))] overflow-auto rounded border border-gray-200 ${scrollbar}`}>
		<table className="w-full min-w-max border-collapse text-left whitespace-nowrap">{children}</table>
	</div>
);

export const THead = ({ children }: WithChildren) => (
	<thead>
		<tr>{children}</tr>
	</thead>
);

type ThProps = WithChildren & {
	// primary: cột đầu (tên), actions: cột thao tác
	primary?: boolean;
	actions?: boolean;
};

// Ô tiêu đề dính ở trên. Ô nằm ở góc (cột đầu, cột thao tác) có z-index cao hơn để không bị ô khác đè
export const Th = ({ children, primary, actions, className = "" }: ThProps) => {
	const corner = primary ? "left-0 z-30" : actions ? "right-0 z-30" : "z-20";
	return <th className={`sticky top-0 bg-white py-2 pr-6 pl-3 font-medium shadow-[inset_0_-1px_0_var(--color-gray-300)] ${corner} ${className}`}>{children}</th>;
};

export const TBody = ({ children }: WithChildren) => <tbody>{children}</tbody>;

export const Tr = ({ children }: WithChildren) => <tr className="border-b border-gray-100 last:border-b-0">{children}</tr>;

type TdProps = WithChildren & {
	primary?: boolean;
	// Cắt chữ dài bằng dấu "...", đặt title để rê chuột xem đủ nội dung
	truncate?: boolean;
	title?: string;
};

export const Td = ({ children, primary, truncate, title, className = "" }: TdProps) => (
	<td title={title} className={`py-2.5 pr-6 pl-3 ${primary ? "sticky left-0 z-10 bg-white font-medium" : ""} ${truncate ? "max-w-64 truncate" : ""} ${className}`}>
		{children}
	</td>
);

// Cột thao tác dính ở mép phải khi cuộn ngang
export const ActionsTd = ({ children }: WithChildren) => (
	<td className="sticky right-0 z-10 bg-white py-2.5 pr-3 pl-4">
		<div className="flex items-center gap-4">{children}</div>
	</td>
);

export const EmptyRow = ({ colSpan, children }: { colSpan: number; children: React.ReactNode }) => (
	<tr>
		<td colSpan={colSpan} className="py-6 text-center text-gray-500">
			{children}
		</td>
	</tr>
);
