import { cn } from "@/lib/cn";

type Props = React.ComponentPropsWithoutRef<"section"> & {
	bordered?: boolean;
};

const Section = ({ bordered = false, className, ...props }: Props) => <section className={cn("py-12 md:py-20 lg:py-24", bordered && "border-b border-gray-100", className)} {...props} />;

export default Section;
