import { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export type Testimonial = {
	id: string;
	name: string;
	role: string;
	avatar: string;
	content: string;
	rating: number; // 1-5
};

export type CategoryType = {
	id: string;
	name: string;
	icon: LucideIcon;
	count: number;
	href: string;
};

export type VacancyType = {
	id: string;
	name: string;
	count: number;
	href: string;
};

export type CompanyType = {
	id: string;
	name: string;
	location: string;
	href: string;
	featured?: boolean;
	logo: ComponentType<SVGProps<SVGSVGElement>>;
};
