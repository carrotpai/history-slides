import React from "react";
import { shallow } from "zustand/shallow";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { ReactComponent as TopButtonSvg } from "../../assets/icons/top-button.svg";
import { ReactComponent as SwiperButton } from "../../assets/icons/swiper-button.svg";
import { useHistoryState } from "../../store/store";
import { SliderSlices } from "../../types/types";

import styles from "./historySlider.module.scss";
import "swiper/css";

interface SliderProps {
	sliderSlices: Array<SliderSlices>;
}

function HistorySlider({ sliderSlices }: SliderProps) {
	const swiperRef = React.useRef<SwiperRef>(null);
	const currentPage = useHistoryState((state) => state.currentPage);
	return (
		<div>
			<div className={styles["top-buttons"]}>
				<p className={styles["top-buttons__text"]}>{`${currentPage + 1}/${
					sliderSlices.length
				}`}</p>
				<div className={styles["top-buttons__container"]}>
					<button type='button' className={styles["top-buttons__left"]}>
						<TopButtonSvg />
					</button>
					<button type='button' className={styles["top-buttons__right"]}>
						<TopButtonSvg />
					</button>
				</div>
			</div>
			<div className={styles.swiper}>
				<button
					type='button'
					className={`${styles.swiper__button} ${styles.swiper__left}`}
				>
					<SwiperButton />
				</button>
				<div className='swiper__container'>
					<Swiper></Swiper>
				</div>
				<button type='button' className={styles.swiper__button}>
					<SwiperButton />
				</button>
			</div>
		</div>
	);
}

export default HistorySlider;
