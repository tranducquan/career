"use client";

import { useSyncExternalStore } from "react";

const DAY = 86_400_000;
const subscribe = () => () => {};

const DaysRemaining = ({ deadline }: { deadline: string }) => {
	// null khi prerender/hydrate, tính thật khi đã ở client
	const days = useSyncExternalStore(
		subscribe,
		() => Math.ceil((new Date(deadline).getTime() - Date.now()) / DAY),
		() => null,
	);

	if (days === null) return null;
	if (days <= 0) return <>Expired</>;
	return (
		<>
			{days} {days === 1 ? "Day" : "Days"} Remaining
		</>
	);
};

export default DaysRemaining;
