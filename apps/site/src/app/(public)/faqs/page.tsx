import type { Metadata } from "next";
import Container from "@/components/layout/container";
import Accordion from "@/components/ui/accordion";
import { faqs } from "@/data";
import Section from "@/components/layout/section";

export const metadata: Metadata = {
	title: "Câu hỏi thường gặp",
	description: "Giải đáp các thắc mắc thường gặp về tài khoản, việc làm và tuyển dụng.",
};

// Dữ liệu có cấu trúc để Google hiển thị câu hỏi ngay trên kết quả tìm kiếm
const jsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs
		.flatMap((group) => group.items)
		.map(({ question, answer }) => ({
			"@type": "Question",
			name: question,
			acceptedAnswer: { "@type": "Answer", text: answer },
		})),
};

const FaqsPage = () => (
	<div id="faqs-page">
		<Section>
			<Container>
				<div className="mx-auto max-w-2xl space-y-12">
					{faqs.map((group) => (
						<section key={group.title}>
							<h2 className="mb-6 text-xl md:text-2xl font-medium text-gray-900">{group.title}</h2>
							<Accordion items={group.items} />
						</section>
					))}
				</div>
			</Container>
		</Section>

		<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
	</div>
);

export default FaqsPage;
