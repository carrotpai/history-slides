import React, { useEffect } from "react";
import HistorySlider from "../historySlider/historySlider";
import HistoryTimestamps from "../historyTimestamps/historyTimestamps";
import HistoryCircle from "../historyCircle/historyCircle";
import { ReactComponent as GradientLine } from "../../assets/icons/gradient-line.svg";

import { sliderData } from "../../constants/data";
import { useHistoryState } from "../../store/store";

import styles from "./history.module.scss";

function History() {
	const currentPage = useHistoryState((state) => state.currentPage);
	useEffect(() => {
		console.log(sliderData[currentPage]);
	}, [currentPage]);
	const [fromYear, toYear] = [
		sliderData[currentPage].slides[0].year,
		sliderData[currentPage].slides.slice(-1)[0].year,
	];
	return (
		<section className={styles["history-section"]}>
			<div className={styles["history-section__title"]}>
				<div className={styles["history-section__gradient"]}>
					<GradientLine />
				</div>
				<p>Исторические даты</p>
			</div>
			<HistoryCircle currentPage={currentPage} buttonsAmount={6} />
			<HistoryTimestamps fromYear={fromYear} toYear={toYear} />
			<div className='history-section__slider'>
				<HistorySlider sliderSlices={sliderData} />
			</div>
		</section>
	);
}

export default History;
