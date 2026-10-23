import { Star } from "lucide-react";

const FeaturedBadge = () => (
	<span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-600">
		<Star aria-hidden className="size-3 fill-current" />
		Featured
	</span>
);

export default FeaturedBadge;
