import type { Testimonial, CategoryType, VacancyType, CompanyType, JobType } from "@/types";

import { PenTool, CodeXml, TvMinimalPlay, Music, CirclePoundSterling, Cross, Database, Ad } from "lucide-react";
import { Slack, Github, Figma, Notion } from "@thesvg/react";

export const testimonials: Testimonial[] = [
	{
		id: "1",
		name: "Robert Fox",
		role: "Frontend Developer",
		avatar: "/images/person1.png",
		content: "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
		rating: 5,
	},
	{
		id: "2",
		name: "Bessie Cooper",
		role: "HR Manager, Tech Corp",
		avatar: "/images/person2.png",
		content: "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante",
		rating: 5,
	},
	{
		id: "3",
		name: "Jane Cooper",
		role: "UI/UX Designer",
		avatar: "/images/person3.png",
		content: "“Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci. Duis vestibulum bibendum dapibus.”",
		rating: 4,
	},
	{
		id: "4",
		name: "Robert Fox",
		role: "Frontend Developer",
		avatar: "/images/person1.png",
		content: "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
		rating: 5,
	},
	{
		id: "5",
		name: "Bessie Cooper",
		role: "HR Manager, Tech Corp",
		avatar: "/images/person2.png",
		content: "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante",
		rating: 5,
	},
	{
		id: "6",
		name: "Jane Cooper",
		role: "UI/UX Designer",
		avatar: "/images/person3.png",
		content: "“Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci. Duis vestibulum bibendum dapibus.”",
		rating: 4,
	},
	{
		id: "7",
		name: "Robert Fox",
		role: "Frontend Developer",
		avatar: "/images/person1.png",
		content: "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
		rating: 5,
	},
];

export const categories: CategoryType[] = [
	{
		id: "1",
		name: "Graphics & Design",
		icon: PenTool,
		count: 357,
		href: "#",
	},
	{
		id: "2",
		name: "Code & Programing",
		icon: CodeXml,
		count: 312,
		href: "#",
	},
	{
		id: "3",
		name: "Digital Marketing",
		icon: Ad,
		count: 297,
		href: "#",
	},
	{
		id: "4",
		name: "Video & Animation",
		icon: TvMinimalPlay,
		count: 247,
		href: "#",
	},
	{
		id: "5",
		name: "Music & Audio",
		icon: Music,
		count: 204,
		href: "#",
	},
	{
		id: "6",
		name: "Account & Finance",
		icon: CirclePoundSterling,
		count: 167,
		href: "#",
	},
	{
		id: "7",
		name: "Health & Care",
		icon: Cross,
		count: 125,
		href: "#",
	},
	{
		id: "8",
		name: "Data & Science",
		icon: Database,
		count: 57,
		href: "#",
	},
];

export const vacancies: VacancyType[] = [
	{
		id: "1",
		name: "Anesthesiologists",
		count: 45904,
		href: "#",
	},
	{
		id: "2",
		name: "Surgeons",
		count: 50364,
		href: "#",
	},
	{
		id: "3",
		name: "Obstetricians-Gynecologists",
		count: 4339,
		href: "#",
	},
	{
		id: "4",
		name: "Orthodontists",
		count: 20079,
		href: "#",
	},
	{
		id: "5",
		name: "Maxillofacial Surgeons",
		count: 74875,
		href: "#",
	},
	{
		id: "6",
		name: "Software Developer",
		count: 43359,
		href: "#",
	},
	{
		id: "7",
		name: "Psychiatrists",
		count: 18599,
		href: "#",
	},
	{
		id: "8",
		name: "Data Scientist",
		count: 28200,
		href: "#",
	},
	{
		id: "9",
		name: "Financial Manager",
		count: 61391,
		href: "#",
	},
	{
		id: "10",
		name: "Management Analysis",
		count: 93046,
		href: "#",
	},
	{
		id: "11",
		name: "Operations Research Analysis",
		count: 16627,
		href: "#",
	},
];

export const companies: CompanyType[] = [
	{ id: "1", name: "Slack", location: "United States", href: "#", featured: true, logo: Slack },
	{ id: "2", name: "GitHub", location: "United States", href: "#", logo: Github },
	{ id: "3", name: "Figma", location: "United Kingdom", href: "#", logo: Figma },
	{ id: "4", name: "Notion", location: "Canada", href: "#", logo: Notion },
];

export const jobs: JobType[] = [
	{
		id: 1,
		title: "Senior UX Designer",
		company: "Instagram",
		featured: true,
		location: "New York, USA",
		type: "Full Time",
		salary: "$50k-80k/month",
		education: "Graduation",
		experience: "10-15 Years",
		postedAt: "14 June, 2021",
		deadline: "14 July, 2021",
		companyInfo: {
			tagline: "Social networking service",
			founded: "March 21, 2006",
			orgType: "Private Company",
			size: "120-300 Employers",
			phone: "(406) 555-0120",
			email: "career@instagram.com",
			website: "https://instagram.com",
			socials: { facebook: "#", twitter: "#", instagram: "#", youtube: "#" },
		},
		description: "Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus.\n\nNam a nulla ante. Cras urna augue, mollis venenatis augue sed, porttitor aliquet nibh.",
		responsibilities: ["Quisque semper gravida est et consectetut.", "Curabitur blandit lorem velit, vitae pretium leo placerat eget.", "Morbi mattis in ipsum ac tempus."],
		requirements: ["Tối thiểu 5 năm kinh nghiệm thiết kế sản phẩm", "Thành thạo Figma"],
		benefits: ["Bảo hiểm sức khỏe", "Làm việc hybrid"],
	},
];
