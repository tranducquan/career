import { Facebook, X, Gmail2026 } from "@thesvg/react";
import CopyLinkButton from "../ui/copy-link-button";

type Props = { url: string; title: string };

const ShareButtons = ({ url, title }: Props) => {
	const u = encodeURIComponent(url);
	const t = encodeURIComponent(title);

	const links = [
		{ label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
		{ label: "Twitter", icon: X, href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
		{ label: "Email", icon: Gmail2026, href: `mailto:?subject=${t}&body=${u}` },
	];

	return (
		<div className="flex flex-wrap items-center gap-2">
			<CopyLinkButton url={url} />
			{links.map(({ label, icon: Icon, href }) => (
				<a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`} className="flex size-10 items-center justify-center rounded-md bg-primary-50 text-primary-500 transition-colors hover:bg-gray-300 hover:text-white">
					<Icon aria-hidden className="size-5" />
				</a>
			))}
		</div>
	);
};

export default ShareButtons;
