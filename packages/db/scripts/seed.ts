import "dotenv/config";
import { count } from "drizzle-orm";
import { getDb } from "../src/client";
import { categories, companies, jobs, type NewJob } from "../src/schema";

const db = getDb();

// An toàn: chỉ seed khi database còn trống, không bao giờ xoá dữ liệu có sẵn
const [existing] = await db.select({ total: count() }).from(companies);
if ((existing?.total ?? 0) > 0) {
	console.log("Database đã có dữ liệu, bỏ qua seed.");
	process.exit(0);
}

const inserted = await db
	.insert(companies)
	.values([
		{ name: "Google Inc.", location: "United States", featured: true },
		{ name: "Microsoft Corporation", location: "United States", featured: true },
		{ name: "GitHub", location: "United States" },
		{ name: "Figma", location: "United Kingdom" },
		{ name: "Notion", location: "Canada" },
		{ name: "Slack", location: "United States" },
	])
	.returning({ id: companies.id, name: companies.name });

const insertedCategories = await db
	.insert(categories)
	.values([
		{ name: "Graphics & Design", slug: "graphics-design", iconKey: "pen-tool", sortOrder: 1 },
		{ name: "Code & Programming", slug: "code-programming", iconKey: "code-xml", sortOrder: 2 },
		{ name: "Digital Marketing", slug: "digital-marketing", iconKey: "megaphone", sortOrder: 3 },
		{ name: "Video & Animation", slug: "video-animation", iconKey: "tv-minimal-play", sortOrder: 4 },
		{ name: "Music & Audio", slug: "music-audio", iconKey: "music", sortOrder: 5 },
		{ name: "Account & Finance", slug: "account-finance", iconKey: "circle-pound-sterling", sortOrder: 6 },
		{ name: "Health & Care", slug: "health-care", iconKey: "cross", sortOrder: 7 },
		{ name: "Data & Science", slug: "data-science", iconKey: "database", sortOrder: 8 },
		{ name: "Business & Support", slug: "business-support", iconKey: "briefcase", sortOrder: 9 },
	])
	.returning({ id: categories.id, name: categories.name });

const categoryId = (name: string) => {
	const category = insertedCategories.find((item) => item.name === name);
	if (!category) throw new Error(`Không tìm thấy danh mục ${name}`);
	return category.id;
};

const companyId = (name: string) => {
	const company = inserted.find((item) => item.name === name);
	if (!company) throw new Error(`Không tìm thấy công ty ${name}`);
	return company.id;
};

type Seed = Omit<NewJob, "companyId" | "categoryId" | "status"> & { company: string; category: string };

const seeds: Seed[] = [
	{
		company: "Google Inc.",
		title: "Senior UX Designer",
		category: "Graphics & Design",
		type: "Full Time",
		level: "Senior Level",
		location: "Dhaka, Bangladesh",
		featured: true,
		salary: "$100k-120k/year",
		salaryRange: "$100,000 - $120,000",
		salaryType: "Yearly salary",
		education: "Graduation",
		experience: "3+ Years",
		postedAt: "2026-09-14",
		deadline: "2026-11-14",
		description: "We partner with brands to help them grow, and we do the same with our people.\n\nOur designers, developers and strategists work together to push brands to the next level.",
		requirements: ["3+ years of product design experience", "Strong portfolio of shipped work", "Comfortable with Figma and design systems"],
		desirable: ["Experience with e-commerce platforms", "API platform experience"],
		benefits: ["Early finish on Fridays", "28 days holiday", "Healthcare package"],
		tags: ["Design", "UX", "Figma"],
	},
	{
		company: "Microsoft Corporation",
		title: "Software Engineer",
		category: "Code & Programming",
		type: "Full Time",
		level: "Mid Level",
		location: "US only",
		remote: true,
		salary: "$30K-$35K/month",
		salaryRange: "$30,000 - $35,000",
		salaryType: "Monthly salary",
		education: "Graduation",
		experience: "3-5 Years",
		postedAt: "2026-09-20",
		deadline: "2026-11-20",
		description: "Our team builds the services behind products used by millions of people every day.\n\nYou will design, build and maintain reliable backend systems.",
		requirements: ["3+ years of backend experience", "Experience designing distributed systems"],
		desirable: ["Experience with Kubernetes"],
		benefits: ["Stock purchase plan", "Health, dental and vision coverage"],
		tags: ["Backend", "Go", "Distributed systems"],
	},
	{
		company: "Microsoft Corporation",
		title: "Junior Graphic Designer",
		category: "Graphics & Design",
		type: "Part Time",
		level: "Entry Level",
		location: "New York, USA",
		salary: "$30K-$35K/month",
		salaryRange: "$30,000 - $35,000",
		salaryType: "Monthly salary",
		education: "Bachelor",
		experience: "1-2 Years",
		postedAt: "2026-09-25",
		deadline: "2026-11-25",
		description: "Join our marketing design team and help create visuals across web, print and social.",
		requirements: ["1+ year of graphic design experience", "Proficiency in Figma and Illustrator"],
		benefits: ["Mentorship from senior designers", "Flexible hours"],
		tags: ["Design", "Branding"],
	},
	{
		company: "GitHub",
		title: "Senior Backend Engineer",
		category: "Code & Programming",
		type: "Full Time",
		level: "Senior Level",
		location: "Worldwide",
		remote: true,
		featured: true,
		salary: "$130k-160k/year",
		salaryRange: "$130,000 - $160,000",
		salaryType: "Yearly salary",
		education: "Bachelor",
		experience: "5+ Years",
		postedAt: "2026-10-02",
		deadline: "2026-12-02",
		description: "Help scale the systems behind pull requests and code review.\n\nYou will own services end to end, from design through on-call.",
		requirements: ["5+ years of backend development", "Experience with Ruby on Rails or Go", "Strong knowledge of relational databases"],
		desirable: ["Experience with Git internals"],
		benefits: ["Fully remote with a home office stipend", "Unlimited paid time off"],
		tags: ["Backend", "Ruby", "Go", "MySQL"],
	},
	{
		company: "Figma",
		title: "Product Manager",
		category: "Business & Support",
		type: "Full Time",
		level: "Mid Level",
		location: "San Francisco, USA",
		salary: "$140k-175k/year",
		salaryRange: "$140,000 - $175,000",
		salaryType: "Yearly salary",
		education: "Bachelor",
		experience: "4-6 Years",
		postedAt: "2026-10-05",
		deadline: "2026-12-05",
		description: "Lead the roadmap for our collaboration features and turn customer problems into products people love.",
		requirements: ["4+ years of product management in SaaS", "Track record of shipping measurable impact"],
		benefits: ["Hybrid schedule", "Wellness stipend", "401(k) with company match"],
		tags: ["Product", "SaaS", "Roadmap"],
	},
	{
		company: "Notion",
		title: "Content Marketing Specialist",
		category: "Digital Marketing",
		type: "Contract",
		level: "Mid Level",
		location: "Toronto, Canada",
		salary: "$45/hour",
		salaryRange: "$45 - $60",
		salaryType: "Hourly rate",
		education: "Bachelor",
		experience: "2-3 Years",
		postedAt: "2026-10-07",
		deadline: "2026-12-07",
		description: "Grow our blog, templates library and newsletter with content that helps teams get more done.",
		requirements: ["2+ years in content marketing", "Strong portfolio of long-form articles", "Understanding of SEO"],
		benefits: ["Flexible working hours", "Possibility of extension to full-time"],
		tags: ["Marketing", "Content", "SEO"],
	},
	{
		company: "Slack",
		title: "Data Analyst",
		category: "Data & Science",
		type: "Full Time",
		level: "Mid Level",
		location: "Europe only",
		remote: true,
		featured: true,
		salary: "$85k-105k/year",
		salaryRange: "$85,000 - $105,000",
		salaryType: "Yearly salary",
		education: "Master",
		experience: "2-4 Years",
		postedAt: "2026-10-08",
		deadline: "2026-12-08",
		description: "Uncover how teams adopt and use our product, then present findings that shape what we build next.",
		requirements: ["2+ years in an analytics role", "Advanced SQL and Python or R", "Experience analysing A/B tests"],
		benefits: ["Remote within European time zones", "Co-working space allowance"],
		perks: ["Remote friendly", "Health Insurance", "Team retreat"],
		tags: ["Data", "SQL", "Python"],
	},
	{
		company: "Google Inc.",
		title: "Digital Marketing Intern",
		category: "Digital Marketing",
		type: "Internship",
		level: "Intern",
		location: "Mountain View, USA",
		salary: "$30/hour",
		salaryRange: "$30 - $35",
		salaryType: "Hourly rate",
		education: "Undergraduate",
		experience: "No experience",
		postedAt: "2026-10-09",
		deadline: "2026-11-09",
		description: "A 12 week internship running real campaigns across search, display and social, with a dedicated mentor.",
		requirements: ["Currently enrolled in a bachelor's or master's program", "Interest in digital marketing"],
		benefits: ["Dedicated mentor", "Housing stipend"],
		tags: ["Marketing", "Internship"],
	},
	{
		company: "Notion",
		title: "Customer Support Specialist",
		category: "Business & Support",
		type: "Part Time",
		level: "Entry Level",
		remote: true,
		salary: "$22/hour",
		salaryRange: "$22 - $28",
		salaryType: "Hourly rate",
		education: "High School",
		experience: "1-2 Years",
		postedAt: "2026-10-10",
		deadline: "2026-12-10",
		description: "Help customers get the most out of Notion by answering questions and escalating issues.\n\nThis part-time role covers weekend shifts and is open worldwide.",
		requirements: ["1+ year in customer support", "Clear written English", "Available for weekend shifts"],
		benefits: ["Work from anywhere", "Paid training"],
		tags: ["Support", "Customer service"],
	},
];

await db.insert(jobs).values(seeds.map(({ company, category, ...job }) => ({ ...job, companyId: companyId(company), categoryId: categoryId(category), status: "published" as const })));

console.log(`Đã thêm ${inserted.length} công ty, ${insertedCategories.length} danh mục và ${seeds.length} job.`);
