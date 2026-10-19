import { useId } from "react";
import { cn } from "@/lib/cn";

// Xuất ra để dùng cho các control khác (select, ô tìm kiếm...) cho đồng bộ giao diện
export const controlStyles = "w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm md:text-base text-gray-900 outline-none transition-colors placeholder:text-gray-400 hover:border-primary-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/20";

type FieldProps = {
	placeholder: string; // bắt buộc: đồng thời là tên truy cập (aria-label) của ô
	error?: string;
	hint?: string;
	containerClassName?: string;
};

const describedBy = (id: string, error?: string, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

type ShellProps = Pick<FieldProps, "error" | "hint" | "containerClassName"> & { id: string; children: React.ReactNode };

const Shell = ({ id, error, hint, containerClassName, children }: ShellProps) => (
	<div className={containerClassName}>
		{children}

		{error ? (
			<p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
				{error}
			</p>
		) : hint ? (
			<p id={`${id}-hint`} className="mt-1.5 text-xs text-gray-500">
				{hint}
			</p>
		) : null}
	</div>
);

// Thêm dấu * vào placeholder khi ô bắt buộc
const withRequiredMark = (placeholder: string, required?: boolean) => (required ? `${placeholder} *` : placeholder);

type InputProps = FieldProps & Omit<React.ComponentProps<"input">, "placeholder">;

export const Input = ({ placeholder, error, hint, containerClassName, className, id: idProp, ...props }: InputProps) => {
	const autoId = useId();
	const id = idProp ?? autoId;

	return (
		<Shell id={id} error={error} hint={hint} containerClassName={containerClassName}>
			<input {...props} id={id} placeholder={withRequiredMark(placeholder, props.required)} aria-label={placeholder} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} className={cn(controlStyles, className)} />
		</Shell>
	);
};

type TextareaProps = FieldProps & Omit<React.ComponentProps<"textarea">, "placeholder">;

export const Textarea = ({ placeholder, error, hint, containerClassName, className, id: idProp, rows = 5, ...props }: TextareaProps) => {
	const autoId = useId();
	const id = idProp ?? autoId;

	return (
		<Shell id={id} error={error} hint={hint} containerClassName={containerClassName}>
			<textarea {...props} id={id} rows={rows} placeholder={withRequiredMark(placeholder, props.required)} aria-label={placeholder} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} className={cn(controlStyles, "resize-y", className)} />
		</Shell>
	);
};
