import Container from "@/components/layout/container";
import Section from "@/components/layout/section";

const gridCols = "lg:grid-cols-[1fr_28rem] lg:gap-10 xl:grid-cols-[1fr_32rem] xl:gap-14";
const block = "rounded bg-gray-100";

const Lines = ({ count }: { count: number }) => (
	<div className="space-y-2.5">
		{Array.from({ length: count }, (_, i) => (
			<div key={i} className={`h-4 ${block} ${i === count - 1 ? "w-3/5" : "w-full"}`} />
		))}
	</div>
);

const TextSection = ({ lines }: { lines: number }) => (
	<div className="space-y-4">
		<div className={`h-5 w-44 ${block}`} />
		<Lines count={lines} />
	</div>
);

const JobDetailFallback = () => (
	<Section aria-hidden className="pt-0!">
		<Container>
			<div className="animate-pulse motion-reduce:animate-none">
				<div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-10">
					<div className="flex items-center gap-4 md:gap-6">
						<div className="size-17 shrink-0 rounded-full bg-gray-100 md:size-20" />
						<div className="space-y-3">
							<div className={`h-7 w-64 max-w-full md:w-80 ${block}`} />
							<div className="flex items-center gap-2.5">
								<div className={`h-4 w-28 ${block}`} />
								<div className="h-5 w-16 rounded-xs bg-gray-100" />
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="size-12 rounded-md bg-gray-100" />
						<div className="h-12 w-36 rounded-md bg-gray-100" />
					</div>
				</div>

				<div className={`grid gap-8 ${gridCols}`}>
					{/* Cột trái: các mục cách nhau bằng đường kẻ, giống bản thật */}
					<div className="min-w-0 divide-y divide-gray-200 *:py-8 *:first:pt-0 *:last:pb-0">
						<TextSection lines={5} />
						<TextSection lines={3} />
						<TextSection lines={3} />
						<TextSection lines={2} />
					</div>

					{/* Cột phải: Salary/Location + Job Overview */}
					<div className="space-y-6">
						<div className="h-32 rounded-lg border border-gray-200" />

						<div className="rounded-lg border border-gray-200">
							<div className="p-4 md:p-6">
								<div className={`mb-5 h-5 w-32 ${block}`} />
								<div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
									{Array.from({ length: 5 }, (_, i) => (
										<div key={i} className="space-y-3">
											<div className="size-6 rounded bg-gray-100" />
											<div className={`h-3 w-16 ${block}`} />
											<div className={`h-4 w-24 ${block}`} />
										</div>
									))}
								</div>
							</div>

							<div className="space-y-6 border-t border-gray-200 p-4 md:p-6">
								<div>
									<div className={`mb-5 h-5 w-36 ${block}`} />
									<div className="flex flex-wrap gap-2">
										<div className="h-10 w-36 rounded-sm bg-gray-100" />
										{Array.from({ length: 4 }, (_, i) => (
											<div key={i} className="size-10 rounded-sm bg-gray-100" />
										))}
									</div>
								</div>
								<div>
									<div className={`mb-5 h-5 w-28 ${block}`} />
									<div className="flex flex-wrap gap-2.5">
										{[20, 24, 16, 28].map((w) => (
											<div key={w} className="h-9 rounded-sm bg-gray-100" style={{ width: `${w * 4}px` }} />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	</Section>
);

export default JobDetailFallback;
