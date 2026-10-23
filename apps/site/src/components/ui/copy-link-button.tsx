"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

const CopyLinkButton = ({ url }: { url: string }) => {
	const [copied, setCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(timer.current), []);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			clearTimeout(timer.current);
			timer.current = setTimeout(() => setCopied(false), 2000);
		} catch {
			// Trình duyệt chặn clipboard (http, hoặc chưa cấp quyền): bỏ qua, nút giữ nguyên
		}
	};

	return (
		<button type="button" onClick={copy} className="inline-flex h-10 min-w-36 items-center justify-center gap-2 rounded-md bg-primary-50 px-5 text-sm font-medium text-primary-500 transition-colors hover:bg-primary-500 hover:text-white">
			{copied ? <Check aria-hidden className="size-5" strokeWidth={1.75} /> : <LinkIcon aria-hidden className="size-5" strokeWidth={1.75} />}
			<span aria-live="polite">{copied ? "Copied!" : "Copy Link"}</span>
		</button>
	);
};

export default CopyLinkButton;
