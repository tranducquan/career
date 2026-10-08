import { cn } from "@/lib/cn";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

const Container = ({ children, className, ...props }: Props) => {
	return (
		<div className={cn("app-container", className)} {...props}>
			{children}
		</div>
	);
};

export default Container;
