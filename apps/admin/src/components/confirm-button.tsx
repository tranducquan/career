"use client";

type Props = {
	message: string;
	className?: string;
	children: React.ReactNode;
};

const ConfirmButton = ({ message, className, children }: Props) => (
	<button
		type="submit"
		className={className}
		onClick={(event) => {
			if (!window.confirm(message)) event.preventDefault();
		}}
	>
		{children}
	</button>
);

export default ConfirmButton;
