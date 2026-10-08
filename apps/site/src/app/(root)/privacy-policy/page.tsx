import type { Metadata } from "next";
import Container from "@/components/layout/container";

export const metadata: Metadata = {
	title: "Điều khoản & Chính sách | JobPlatform",
};

const sections = [
	{ id: "terms", title: "Terms & Condition" },
	{ id: "limitations", title: "Limitations" },
	{ id: "security", title: "Security" },
	{ id: "privacy", title: "Privacy Policy" },
];

const pad = (n: number) => String(n + 1).padStart(2, "0"); // 0 -> "01"

const Page = () => {
	return (
		<div id="privacy-page" className="py-24">
			<Container>
				<div className="grid grid-cols-4 gap-x-20 relative">
					<div className="col-span-full lg:col-span-3 flex flex-col gap-y-6 [&_h2:not(:first-child)]:mt-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-4">
						<h2 id="terms" className="font-medium text-4xl leading-normal">
							01. Terms & Condition
						</h2>
						<p>Praesent placerat dictum elementum. Nam pulvinar urna vel lectus maximus, eget faucibus turpis hendrerit. Sed iaculis molestie arcu, et accumsan nisi. Quisque molestie velit vitae ligula luctus bibendum. Duis sit amet eros mollis, viverra ipsum sed, convallis sapien. Donec justo erat, pulvinar vitae dui ut, finibus euismod enim. Donec velit tortor, mollis eu tortor euismod, gravida lacinia arcu.</p>
						<ul>
							<li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
							<li>Curabitur luctus sapien augue, mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.</li>
							<li>Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.</li>
							<li>Vestibulum rhoncus sagittis dolor vel finibus.</li>
							<li>Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.</li>
						</ul>

						<h2 id="limitations" className="font-medium text-4xl leading-normal">
							02. Limitations
						</h2>
						<p>In pretium est sit amet diam feugiat eleifend. Curabitur consectetur fringilla metus. Morbi hendrerit facilisis tincidunt. Sed condimentum lacinia arcu. Ut ut iaculis metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel erat elit. In vitae turpis tempor, accumsan sapien vitae, rutrum eros. Integer pulvinar mattis turpis, ac fermentum leo ullamcorper a. Nam finibus eros libero, sit amet mattis lacus tristique eu. Donec nec ex convallis, ultricies eros ut, mollis libero. Ut scelerisque lacus interdum consectetur sodales.</p>
						<ul>
							<li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
							<li>Curabitur luctus sapien augue, mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.</li>
							<li>Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.</li>
							<li>Vestibulum rhoncus sagittis dolor vel finibus.</li>
							<li>Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.</li>
						</ul>

						<h2 id="security" className="font-medium text-4xl leading-normal">
							03. Security
						</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ex neque, elementum eu blandit in, ornare eu purus. Fusce eu rhoncus mi, quis ultrices lacus. Phasellus id pellentesque nulla. Cras erat nisi, mattis et efficitur et, iaculis a lacus. Fusce gravida augue quis leo facilisis.</p>

						<h2 id="privacy" className="font-medium text-4xl leading-normal">
							04. Privacy Policy
						</h2>
						<p>Praesent placerat dictum elementum. Nam pulvinar urna vel lectus maximus, eget faucibus turpis hendrerit. Sed iaculis molestie arcu, et accumsan nisi. Quisque molestie velit vitae ligula luctus bibendum. Duis sit amet eros mollis, viverra ipsum sed, convallis sapien. Donec justo erat, pulvinar vitae dui ut, finibus euismod enim. Donec velit tortor, mollis eu tortor euismod, gravida lacinia arcu.</p>
						<ul>
							<li>In ac turpis mi. Donec quis semper neque. Nulla cursus gravida interdum.</li>
							<li>Curabitur luctus sapien augue, mattis faucibus nisl vehicula nec. Mauris at scelerisque lorem. Nullam tempus felis ipsum, sagittis malesuada nulla vulputate et.</li>
							<li>Aenean vel metus leo. Vivamus nec neque a libero sodales aliquam a et dolor.</li>
							<li>Vestibulum rhoncus sagittis dolor vel finibus.</li>
							<li>Integer feugiat lacus ut efficitur mattis. Sed quis molestie velit.</li>
						</ul>
						<p>Fusce rutrum mauris sit amet justo rutrum, ut sodales lorem ullamcorper. Aliquam vitae iaculis urna. Nulla vitae mi vel nisl viverra ullamcorper vel elementum est. Mauris vitae elit nec enim tincidunt aliquet. Donec ultrices nulla a enim pulvinar, quis pulvinar lacus consectetur. Donec dignissim, risus nec mollis efficitur, turpis erat blandit urna, eget elementum lacus lectus eget lorem.</p>
					</div>

					<div className="hidden lg:block">
						<dl className="sticky top-24 border-l border-gray-300 pl-6">
							<dt className="uppercase text-sm text-gray-500 mb-4">Table of Contents</dt>
							<dd className="space-y-2">
								{sections.map((section, i) => {
									return (
										<a key={i} href={`#${section.id}`} className="text-gray-900 cursor-pointer flex items-baseline gap-x-1">
											<span>{pad(i)}.</span>
											{section.title}
										</a>
									);
								})}
							</dd>
						</dl>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Page;
