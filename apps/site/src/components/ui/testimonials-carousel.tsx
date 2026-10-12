"use client";

import { useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { SwiperProps } from "swiper/react";
import TestimonialCard from "../cards/testimonial-card";
import { testimonials } from "@/data";

import "swiper/css";

const navBtn = "flex size-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm transition-colors hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-blue-600 md:size-12";

const swiperProps: SwiperProps = {
	modules: [Navigation, Pagination, Autoplay],
	slidesPerView: 1.08,
	spaceBetween: 16,
	autoplay: { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
	loop: testimonials.length >= 6,
	breakpoints: {
		640: { slidesPerView: 1.5, spaceBetween: 20 },
		768: { slidesPerView: 2, spaceBetween: 24 },
		1024: { slidesPerView: 3, spaceBetween: 24 },
	},
	navigation: { prevEl: ".testimonial-prev", nextEl: ".testimonial-next" },
	pagination: {
		el: ".testimonial-pagination",
		clickable: true,
		bulletClass: "testimonial-bullet",
		bulletActiveClass: "testimonial-bullet-active",
	},
};

const emptySubscribe = () => () => {};

// false khi prerender/hydrate, true khi đã ở client
const useIsClient = () =>
	useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);

const Skeleton = () => <div className="h-105 animate-pulse rounded-xl bg-white/60" />;

const TestimonialsCarousel = () => {
	const isClient = useIsClient();

	if (!isClient) return <Skeleton />;

	return (
		<>
			<Swiper {...swiperProps} className="px-1.5! pt-1.5! pb-2~">
				{testimonials.map((item) => (
					<SwiperSlide key={item.id} className="h-auto!">
						<TestimonialCard item={item} />
					</SwiperSlide>
				))}
			</Swiper>

			<div className="mt-6 flex items-center justify-center gap-4 md:mt-8 md:gap-7">
				<button type="button" aria-label="Previous testimonial" className={`testimonial-prev ${navBtn}`}>
					<ArrowLeft className="size-5" aria-hidden />
				</button>

				<div className="testimonial-pagination flex items-center gap-2" />

				<button type="button" aria-label="Next testimonial" className={`testimonial-next ${navBtn}`}>
					<ArrowRight className="size-5" aria-hidden />
				</button>
			</div>
		</>
	);
};

export default TestimonialsCarousel;
