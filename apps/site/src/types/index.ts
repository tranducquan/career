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

export type CompanyInfoType = {
	tagline?: string;
	founded?: string;
	orgType?: string;
	size?: string;
	phone?: string;
	email?: string;
	website?: string;
	socials?: { facebook?: string; twitter?: string; instagram?: string; youtube?: string };
};

export type JobType = {
	id: number | string;
	title: string;
	company: string;
	companyInfo?: CompanyInfoType;
	featured?: boolean;
	location: string;
	type: string;
	salary?: string;
	education?: string;
	experience?: string;
	postedAt?: string;
	deadline?: string;
	description: string; // tách đoạn bằng "\n\n"
	responsibilities?: string[];
	requirements?: string[];
	benefits?: string[];
};
