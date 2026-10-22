import Container from "@/components/layout/container";

const bar = "animate-pulse rounded bg-gray-200";

const JobsSkeleton = () => (
	<>
		<section className="bg-gray-100 pb-6">
			<Container>
				{/* Thanh search */}
				<div className="h-16 animate-pulse rounded-xl bg-white shadow-sm" />
				{/* Popular searches */}
				<div className="mt-5 flex gap-3">
					{Array.from({ length: 6 }, (_, i) => (
						<div key={i} className={`${bar} h-7 w-20`} />
					))}
				</div>
			</Container>
		</section>

		<section className="py-6 md:py-10">
			<Container>
				{/* Số kết quả + toolbar */}
				<div className="mb-6 flex items-center justify-between gap-4">
					<div className={`${bar} h-5 w-32`} />
					<div className={`${bar} h-12 w-72`} />
				</div>

				{/* Thẻ job */}
				<ul className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
					{Array.from({ length: 9 }, (_, i) => (
						<li key={i} className="h-44 animate-pulse rounded-xl border border-gray-100 bg-gray-50" />
					))}
				</ul>
			</Container>
		</section>
	</>
);

export default JobsSkeleton;
