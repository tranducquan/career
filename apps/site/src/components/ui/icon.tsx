import type { LucideIcon, LucideProps } from "lucide-react";

type Props = LucideProps & { icon: LucideIcon };

const Icon = ({ icon: Component, strokeWidth = 1.75, ...props }: Props) => <Component aria-hidden strokeWidth={strokeWidth} {...props} />;

export default Icon;
