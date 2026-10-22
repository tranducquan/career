"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Layers } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/cn";

export type CategoryOption = { slug: string; name: string; count: number; iconKey?: string };

type Props = {
	options: CategoryOption[];
	value?: string;
	onChange: (slug?: string) => void;
	onOpen?: () => void;
};

// Icon riêng của từng danh mục (tên Lucide dạng kebab-case), thiếu thì dùng "layers"
const CategoryIcon = ({ name, className }: { name?: string; className?: string }) => <DynamicIcon name={(name || "layers") as IconName} className={className} strokeWidth={1.75} aria-hidden />;

const CategoryPicker = ({ options, value, onChange, onOpen }: Props) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const selected = options.find((o) => o.slug === value);

	useEffect(() => {
		if (!open) return;
		const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		document.addEventListener("mousedown", onClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const pick = (slug?: string) => {
		onChange(slug);
		setOpen(false);
	};

	const item = "flex w-full cursor-pointer items-center gap-3 p-3 text-left text-sm hover:bg-primary-50";

	return (
		<div ref={ref} className="relative flex-1">
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => {
					if (!open) onOpen?.();
					setOpen((v) => !v);
				}}
				className="flex h-12 w-full items-center gap-3 px-3 text-left text-base"
			>
				<CategoryIcon name={selected?.iconKey} className="size-5 shrink-0 text-primary-500" />
				<span className={cn("min-w-0 flex-1 truncate", !selected && "text-gray-400")}>{selected ? selected.name : "Select Category"}</span>
				<ChevronDown className={cn("size-4 shrink-0 text-gray-400 transition-transform", open && "rotate-180")} aria-hidden />
			</button>

			{open && (
				<ul role="listbox" className="absolute top-full left-0 z-30 mt-4 max-h-72 w-full min-w-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
					<li role="option" aria-selected={!value}>
						<button type="button" onClick={() => pick(undefined)} className={cn(item, !value && "bg-primary-50 text-primary-500")}>
							<Layers className="size-5 shrink-0 text-gray-400" aria-hidden />
							All categories
						</button>
					</li>
					{options.map((o) => (
						<li key={o.slug} role="option" aria-selected={o.slug === value}>
							<button type="button" onClick={() => pick(o.slug)} className={cn(item, o.slug === value && "bg-primary-50 text-primary-500")}>
								<CategoryIcon name={o.iconKey} className="size-5 shrink-0 text-gray-400" />
								<span className="min-w-0 flex-1 truncate">{o.name}</span>
								<span className="text-xs text-gray-400">{o.count}</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CategoryPicker;
