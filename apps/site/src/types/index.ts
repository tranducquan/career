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
	id: string | number;
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
	logo?: CompanyType["logo"];
	companyInfo?: CompanyInfoType;
	featured?: boolean;
	location?: string;
	remote?: boolean;
	type: string;
	salary?: string; // dùng cho card ở trang danh sách, ví dụ "$30K-$35K/month"
	salaryRange?: string; // dùng ở trang chi tiết, ví dụ "$100,000 - $120,000"
	salaryType?: string; // ví dụ "Yearly salary"
	level?: string; // ví dụ "Entry Level"
	education?: string;
	experience?: string;
	postedAt?: string;
	deadline?: string;
	description: string; // tách đoạn bằng "\n\n"
	responsibilities?: string[];
	requirements?: string[];
	desirable?: string[]; // mục "Desirable"
	benefits?: string[]; // bullet ở cột trái
	perks?: string[]; // tag xanh trong card "Job Benefits"
	tags?: string[]; // "Job tags"
};

export type FaqItemType = { question: string; answer: string };

export type FaqGroupType = { title: string; items: FaqItemType[] };

export type PostType = {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	image: string;
	date: string;
	comments: number;
	category: string;
	author: {
		name: string;
		avatar: string;
	};
	tags: string[];
};
