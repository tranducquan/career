import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import JobCard from "../cards/job-card";
import { getFeaturedJobs } from "@/lib/jobs";
import Section from "../layout/section";

const JOBS_LIMIT = 12;

const JobsSection = async () => {
	const featuredJobs = await getFeaturedJobs(JOBS_LIMIT);
	if (featuredJobs.length === 0) return null;

	return (
		<Section className="pb-0!">
			<Container>
				<SectionHeading title="Featured Jobs" href="/jobs" />
				<ul className="grid gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{featuredJobs.map((job) => (
						<li key={job.id}>
							<JobCard job={job} layout="vertical" />
						</li>
					))}
				</ul>
			</Container>
		</Section>
	);
};

export default JobsSection;
