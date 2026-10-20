import { Children } from "react";

type WithChildren = { children: React.ReactNode; className?: string };

// relative: phần tử absolute bên trong (như sr-only) phải bị cắt theo khung này,
// nếu không nó có thể kéo cả trang rộng ra
export const Table = ({ children }: WithChildren) => (
	<div className="relative overflow-x-auto border border-wp-border bg-white shadow-sm">
		<table className="w-full border-collapse text-left">{children}</table>
	</div>
);

export const THead = ({ children }: WithChildren) => (
	<thead>
		<tr className="border-b border-wp-border">{children}</tr>
	</thead>
);

// secondary: cột phụ, chỉ hiện từ màn hình md trở lên (trên điện thoại chỉ còn cột tiêu đề)
export const Th = ({ children, secondary, className = "" }: WithChildren & { secondary?: boolean }) => (
	<th scope="col" className={`px-3 py-2 text-sm font-normal text-wp-title ${secondary ? "hidden md:table-cell" : ""} ${className}`}>
		{children}
	</th>
);

export const TBody = ({ children }: WithChildren) => <tbody>{children}</tbody>;

// group: để hiện các liên kết thao tác khi rê chuột vào dòng; dòng lẻ có nền xám nhạt như WordPress
export const Tr = ({ children }: WithChildren) => <tr className="group odd:bg-[#f6f7f7]">{children}</tr>;

export const Td = ({ children, secondary, className = "" }: WithChildren & { secondary?: boolean }) => <td className={`px-3 py-2.5 align-top ${secondary ? "hidden md:table-cell" : ""} ${className}`}>{children}</td>;

// Các liên kết "Edit | Publish | Delete" dưới tiêu đề. Chỉ ẩn khi thiết bị có chuột và màn hình rộng (hiện khi rê chuột hoặc focus),
// còn lại (điện thoại, máy tính bảng) luôn hiện. Quy tắc nằm trong globals.css.
export const RowActions = ({ children }: { children: React.ReactNode }) => {
	const items = Children.toArray(children).filter(Boolean);
	return (
		<div className="row-actions mt-1 flex flex-wrap items-center text-sm leading-5">
			{items.map((item, index) => (
				<span key={index} className="inline-flex items-center">
					{index > 0 && <span className="px-1.5 text-[#a7aaad]">|</span>}
					{item}
				</span>
			))}
		</div>
	);
};

export const EmptyRow = ({ colSpan, children }: { colSpan: number; children: React.ReactNode }) => (
	<tr>
		<td colSpan={colSpan} className="px-3 py-4 text-wp-title">
			{children}
		</td>
	</tr>
);
