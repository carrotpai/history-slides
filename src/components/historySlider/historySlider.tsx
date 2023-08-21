import React from "react";
import { shallow } from "zustand/shallow";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useMediaQuery } from "usehooks-ts";

import { ReactComponent as TopButtonSvg } from "../../assets/icons/top-button.svg";
import { ReactComponent as SwiperButton } from "../../assets/icons/swiper-button.svg";
import { useHistoryState } from "../../store/store";
import { SlideDataType } from "../../types/types";
import Slide from "./slide/slide";

import styles from "./historySlider.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "./historySlide.scss";

interface SliderProps {
	slides: SlideDataType[];
	slicesLength: number;
	sliceOrder: number;
}

function HistorySlider({ slides, slicesLength, sliceOrder }: SliderProps) {
	const isMobile = useMediaQuery("(max-width: 1279px)");
	const [{ isBeginning, isEnd }, setSwiperState] = React.useState<{
		isBeginning: boolean;
		isEnd: boolean;
	}>({ isBeginning: true, isEnd: slides.length <= 3 });
	const [currentSlides, setCurrentSlides] =
		React.useState<SlideDataType[]>(slides);

	const swiperRef = React.useRef<SwiperRef>(null);
	const swiperContainerRef = React.useRef<HTMLDivElement>(null);
	const swiperPaginationRef = React.useRef<HTMLDivElement>(null);

	const { currentPage, setCurrentPage, setCircleRotate } = useHistoryState(
		(state) => ({
			currentPage: state.currentPage,
			setCurrentPage: state.setCurrentPage,
			setCircleRotate: state.setCircleRotate,
		}),
		shallow
	);

	React.useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		swiperRef.current!.swiper.activeIndex = currentSlides.length - 1;
	}, [isEnd]);

	//для анимаций fade
	React.useEffect(() => {
		swiperContainerRef.current?.classList.add(
			styles.swiper__container_inactive
		);
		swiperPaginationRef.current?.classList.add(
			styles.swiper__pagination_inactive
		);
		const timeout = setTimeout(() => {
			swiperContainerRef.current?.classList.remove(
				styles.swiper__container_inactive
			);
			swiperPaginationRef.current?.classList.remove(
				styles.swiper__pagination_inactive
			);
			setCurrentSlides(slides);
			swiperRef.current?.swiper.slideTo(0, 0);
		}, 400);
		return () => {
			clearTimeout(timeout);
		};
	}, [slides]);

	return (
		<div className={styles.wrapper}>
			<div className={styles["top-buttons"]}>
				<div ref={swiperPaginationRef} className={styles.swiper__pagination} />
				<p className={styles["top-buttons__text"]}>{`${
					currentPage + 1 >= 10
						? currentPage + 1
						: "0".concat((currentPage + 1).toString())
				}/${
					slicesLength >= 10
						? slicesLength
						: "0".concat(slicesLength.toString())
				}`}</p>
				<div className={styles["top-buttons__container"]}>
					<button
						onClick={() => {
							let nextPage = currentPage - 1;
							if (nextPage < 0) {
								nextPage = slicesLength - 1;
							}
							setCurrentPage(nextPage);
							setCircleRotate(-1);
						}}
						type='button'
						className={styles["top-buttons__left"]}
					>
						<TopButtonSvg />
					</button>
					<button
						onClick={() => {
							const nextPage = (currentPage + 1) % slicesLength;
							setCurrentPage(nextPage);
							setCircleRotate(1);
						}}
						type='button'
						className={styles["top-buttons__right"]}
					>
						<TopButtonSvg />
					</button>
				</div>
			</div>
			<div className={styles.swiper}>
				<button
					type='button'
					className={`${styles.swiper__button} ${styles.swiper__left} ${
						isBeginning && styles.swiper__button_inactive
					}`}
					onClick={() => {
						swiperRef.current?.swiper.slidePrev();
					}}
				>
					<SwiperButton />
				</button>
				<div ref={swiperContainerRef} className={`${styles.swiper__container}`}>
					<Swiper
						ref={swiperRef}
						modules={[Pagination]}
						pagination={{ el: swiperPaginationRef.current }}
						watchSlidesProgress
						breakpoints={{
							1280: {
								spaceBetween: 80,
								slidesPerView: 3,
							},
							0: {
								spaceBetween: 25,
								slidesPerView: "auto",
							},
						}}
						onReachEnd={(swiper) => {
							setSwiperState({
								isEnd: true,
								isBeginning: swiper?.activeIndex === 0,
							});
						}}
						onSlideChange={(swiper) => {
							setSwiperState({
								isEnd:
									swiper?.activeIndex ===
									currentSlides.length - (isMobile ? 1 : 3), // -slides per view
								isBeginning: swiper?.activeIndex === 0,
							});
						}}
					>
						{currentSlides.map((item, i) => (
							<SwiperSlide key={`slide-${i}`}>
								{({ isActive }) => {
									return (
										<Slide
											year={item.year}
											text={item.text}
											wrapperClassName={`${styles.slide} ${
												!isActive && !isEnd && styles.slide_inactive
											}`}
										/>
									);
								}}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<button
					type='button'
					className={`${styles.swiper__button} ${
						isEnd && styles.swiper__button_inactive
					}`}
					onClick={() => {
						swiperRef.current?.swiper.slideNext();
					}}
				>
					<SwiperButton />
				</button>
			</div>
		</div>
	);
}

export default HistorySlider;
