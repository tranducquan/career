"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Props = {
	jobId: number | string;
	appearance?: "solid" | "plain";
	className?: string;
};

const SaveJobButton = ({ jobId, appearance = "solid", className }: Props) => {
	// Tạm dùng state, sau này thay bằng gọi API / lấy từ session (dùng jobId)
	const [saved, setSaved] = useState(false);

	const label = saved ? "Remove saved job" : "Save job";
	const toggle = () => setSaved((v) => !v);
	const icon = <Bookmark aria-hidden className={saved ? "fill-current" : undefined} />;

	if (appearance === "plain") {
		return (
			<button type="button" aria-label={label} aria-pressed={saved} onClick={toggle} className={cn("shrink-0 cursor-pointer transition-colors hover:text-blue-600 [&_svg]:size-6", saved ? "text-blue-600" : "text-gray-400", className)}>
				{icon}
			</button>
		);
	}

	return (
		<Button variant="light" size="icon" aria-label={label} aria-pressed={saved} onClick={toggle} className={cn("shrink-0 hover:text-white", className)}>
			{icon}
		</Button>
	);
};

export default SaveJobButton;
