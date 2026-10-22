import type { Testimonial, VacancyType, FaqGroupType, PostType } from "@/types";

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

export const faqs: FaqGroupType[] = [
	{
		title: "Your Account",
		items: [
			{ question: "Donec in ipsumss sit amet mi tincidunt lacinia ut id risus.", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros." },
			{ question: "Donec in ipsum sit amet mi tincidunt lacinia ut id risus.", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros." },
			{ question: "Etiam rutrum ligula at dui tempor, eu tempus ligula tristique.", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros." },
			{ question: "Morbi vitae neque eu sapien aliquet rhoncus.", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros." },
		],
	},
	{
		title: "Employers and Jobs",
		items: [
			{ question: "Donec in ipsums sit amet mi tincidunt lacinia ut id risus.", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros." },
			{ question: "Etiam rutrum ligula at dui tempor, eu tempus ligulaa tristique.", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros." },
			{ question: "Morbi vitae neque eu sapienn aliquet rhoncus.", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros." },
		],
	},
	{
		title: "Candidate & Resume",
		items: [{ question: "Donecc in ipsums sit amet mi tincidunt lacinia ut id risus.", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros." }],
	},
];

export const posts: PostType[] = [
	{
		id: "1",
		slug: "proin-sit-amet-massa-eget-odio-consectetur-ultricies",
		title: "Proin sit amet massa eget odio consectetur ultricies.",
		excerpt: "Integer imperdiet mauris eget nisi ultrices, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
		content: `
			<p><strong>Check out these 20 cool fonts for your next web or graphic design project.</strong></p>
			<p>Their aesthetic nature influences people's perception of a brand...</p>
			<blockquote><p>Vintage meets vogue is the only way to describe this serif typeface.</p></blockquote>
			<h2>EB Garamond and Relative (free+paid).</h2>
			<p>Relative is an OpenType sans-serif font known for its range.</p>
			<img src="/images/post-content1.jpg" alt="" />
		`,
		image: "/images/post1.jpg",
		date: "Nov 12, 2021",
		comments: 25,
		category: "Career Advice",
		author: { name: "Robert Fox", avatar: "/images/person1.png" },
		tags: ["Career", "Interview", "Tips"],
	},
	{
		id: "2",
		slug: "how-to-write-a-resume-that-gets-noticed",
		title: "How to write a resume that gets noticed by recruiters.",
		excerpt: "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare.",
		content: "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate augue condimentum ornare.\n\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis sit amet id orci.\n\nDuis vestibulum bibendum dapibus. Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui.",
		image: "/images/post1.jpg",
		date: "Nov 18, 2021",
		comments: 12,
		category: "Resume",
		author: { name: "Bessie Cooper", avatar: "/images/person2.png" },
		tags: ["Resume", "CV", "Hiring"],
	},
	{
		id: "3",
		slug: "top-skills-employers-look-for-in-2021",
		title: "Top skills employers are looking for in a remote workforce.",
		excerpt: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis.",
		content: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse et magna quis nibh accumsan venenatis.\n\nMaecenas ac placerat metus, in faucibus est. Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui.\n\nSuspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante.",
		image: "/images/post1.jpg",
		date: "Dec 02, 2021",
		comments: 31,
		category: "Remote Work",
		author: { name: "Jane Cooper", avatar: "/images/person3.png" },
		tags: ["Remote", "Skills", "Workplace"],
	},
	{
		id: "4",
		slug: "negotiating-your-salary-with-confidence",
		title: "Negotiating your salary with confidence: a practical guide.",
		excerpt: "Donec in ipsum sit amet mi tincidunt lacinia ut id risus. Etiam rutrum ligula at dui tempor, eu tempus ligula tristique.",
		content: "Donec in ipsum sit amet mi tincidunt lacinia ut id risus. Etiam rutrum ligula at dui tempor, eu tempus ligula tristique.\n\nMorbi vitae neque eu sapien aliquet rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nFusce pretium lacus ac ex tempus, sed dictum libero lacinia. Cras velit mauris, venenatis vel posuere at, scelerisque sed eros.",
		image: "/images/post1.jpg",
		date: "Dec 09, 2021",
		comments: 8,
		category: "Salary",
		author: { name: "Robert Fox", avatar: "/images/person1.png" },
		tags: ["Salary", "Negotiation", "Career"],
	},
	{
		id: "5",
		slug: "building-a-strong-employer-brand",
		title: "Building a strong employer brand to attract top talent.",
		excerpt: "Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque. Integer imperdiet mauris eget nisi ultrices.",
		content: "Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque. Integer imperdiet mauris eget nisi ultrices.\n\nQuis hendrerit est consequat. Proin sit amet massa eget odio consectetur ultricies.\n\nDonec in ipsum sit amet mi tincidunt lacinia ut id risus. Etiam rutrum ligula at dui tempor.",
		image: "/images/post1.jpg",
		date: "Dec 15, 2021",
		comments: 19,
		category: "Employers",
		author: { name: "Bessie Cooper", avatar: "/images/person2.png" },
		tags: ["Employer", "Branding", "Hiring"],
	},
	{
		id: "6",
		slug: "ace-your-next-job-interview",
		title: "Ace your next job interview with these proven techniques.",
		excerpt: "Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante. Mauris convallis justo molestie metus aliquam lacinia.",
		content: "Suspendisse ut dui vulputate augue condimentum ornare. Morbi vitae tristique ante. Mauris convallis justo molestie metus aliquam lacinia.\n\nUt ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.\n\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
		image: "/images/post1.jpg",
		date: "Dec 21, 2021",
		comments: 42,
		category: "Interview",
		author: { name: "Jane Cooper", avatar: "/images/person3.png" },
		tags: ["Interview", "Tips", "Career"],
	},
];
