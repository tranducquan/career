"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { question: string; answer: string };

const Accordion = ({ items }: { items: Item[] }) => {
	const [open, setOpen] = useState<number | null>(null);
	const baseId = useId();

	return (
		<div className="space-y-6">
			{items.map(({ question, answer }, i) => {
				const isOpen = open === i;
				const buttonId = `${baseId}-button-${i}`;
				const panelId = `${baseId}-panel-${i}`;

				return (
					<div key={question} className={cn("rounded-lg border border-gray-200 bg-white transition", isOpen && "shadow-lg")}>
						<h3>
							<button type="button" id={buttonId} aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? null : i)} className={cn("flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-medium transition-colors md:text-lg", isOpen ? "text-blue-600" : "text-gray-900")}>
								{question}
								<Plus aria-hidden className={cn("size-5 shrink-0 transition-transform", isOpen ? "rotate-45 text-gray-900" : "text-gray-400")} />
							</button>
						</h3>

						<div id={panelId} role="region" aria-labelledby={buttonId} inert={!isOpen} className={cn("grid transition-[grid-template-rows]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
							<div className="overflow-hidden">
								<p className="border-t border-gray-200 p-5 text-sm md:text-base leading-relaxed text-gray-500">{answer}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Accordion;
