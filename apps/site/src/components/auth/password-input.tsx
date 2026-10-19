// components/auth/password-input.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type">;

const PasswordInput = ({ className, containerClassName, ...props }: PasswordInputProps) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className={cn("relative", containerClassName)}>
			<Input {...props} type={visible ? "text" : "password"} className={cn("h-12 pr-12", className)} />
			<button type="button" onClick={() => setVisible((v) => !v)} aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} className="absolute top-0 right-0 flex h-12 w-12 items-center justify-center text-gray-500 transition-colors hover:text-gray-900">
				{visible ? <EyeOff aria-hidden className="size-5" /> : <Eye aria-hidden className="size-5" />}
			</button>
		</div>
	);
};

export default PasswordInput;
