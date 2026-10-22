import Markdown from "react-markdown";

const JobDescription = ({ text }: { text: string }) => (
	<div className="space-y-4 text-sm leading-relaxed text-gray-500 md:text-base">
		<Markdown
			components={{
				h1: (p) => <h3 className="text-lg font-medium text-gray-900" {...p} />,
				h2: (p) => <h3 className="text-lg font-medium text-gray-900" {...p} />,
				h3: (p) => <h4 className="text-base font-medium text-gray-900" {...p} />,
				ul: (p) => <ul className="list-disc space-y-1.5 pl-5 marker:text-gray-500" {...p} />,
				ol: (p) => <ol className="list-decimal space-y-1.5 pl-5 marker:text-gray-500" {...p} />,
				strong: (p) => <strong className="font-semibold text-gray-900" {...p} />,
				a: (p) => <a className="text-primary-500 hover:underline" target="_blank" rel="noopener noreferrer" {...p} />,
			}}
		>
			{text}
		</Markdown>
	</div>
);

export default JobDescription;
