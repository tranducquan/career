import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import JobCard from "../cards/job-card";
import { jobs } from "@/data";

const JobsSection = () => {
	return (
		<section className="pt-16 md:pt-24">
			<Container>
				<SectionHeading title="Featured Jobs" href="#" />
				<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{jobs.slice(0, 6).map((job) => (
						<li key={job.id}>
							<JobCard job={job} layout="vertical" />
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default JobsSection;
