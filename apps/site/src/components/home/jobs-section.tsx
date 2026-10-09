import Container from "../layout/container";
import SectionHeading from "../ui/section-heading";
import JobCard from "../cards/job-card";
import { jobs } from "@/data";

const JobsSection = () => {
	return (
		<section className="pt-16 md:pt-24">
			<Container>
				<SectionHeading title="Featured Jobs" href="#" />
				<ul className="space-y-4">
					{jobs.map((job) => (
						<li key={job.id}>
							<JobCard job={job} layout="horizontal" />
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default JobsSection;
