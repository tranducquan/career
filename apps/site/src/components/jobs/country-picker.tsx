"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, X } from "lucide-react";
import CountryFlag from "../ui/country-flag";
import { cn } from "@/lib/cn";

export type CountryOption = { code: string; name: string; count: number };

type Props = {
	options: CountryOption[];
	value?: string;
	onChange: (code?: string) => void;
	onOpen?: () => void;
};

const CountryPicker = ({ options, value, onChange, onOpen }: Props) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const selected = options.find((o) => o.code === value);

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

	const pick = (code?: string) => {
		onChange(code);
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
				className={cn("flex h-12.5 w-full items-center gap-3 pr-10 pl-3 text-left text-base", selected && "pr-16")}
			>
				{selected ? <CountryFlag code={selected.code} /> : <Globe className="size-6 shrink-0 text-primary-500" strokeWidth={1.75} aria-hidden />}
				<span className={cn("min-w-0 flex-1 truncate", !selected && "text-gray-400")}>{selected ? selected.name : "Select Country"}</span>
			</button>

			{selected && (
				<button type="button" onClick={() => onChange(undefined)} aria-label="Clear country" className="absolute top-1/2 right-9 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-primary-500">
					<X className="size-4" aria-hidden />
				</button>
			)}
			<ChevronDown className={cn("pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-400 transition-transform", open && "rotate-180")} aria-hidden />

			{open && (
				<ul role="listbox" className="absolute top-full left-0 z-30 mt-5 max-h-75 w-full min-w-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
					<li role="option" aria-selected={!value}>
						<button type="button" onClick={() => pick(undefined)} className={cn(item, !value && "bg-primary-50 text-primary-500")}>
							<Globe className="size-5 shrink-0 text-gray-400" aria-hidden />
							All countries
						</button>
					</li>
					{options.map((o) => (
						<li key={o.code} role="option" aria-selected={o.code === value}>
							<button type="button" onClick={() => pick(o.code)} className={cn(item, o.code === value && "bg-primary-50 text-primary-500")}>
								<CountryFlag code={o.code} />
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

export default CountryPicker;
