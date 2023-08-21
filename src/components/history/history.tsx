import React from "react";
import HistorySlider from "../historySlider/historySlider";
import HistoryTimestamps from "../historyTimestamps/historyTimestamps";
import HistoryCircle from "../historyCircle/historyCircle";
import { ReactComponent as GradientLine } from "../../assets/icons/gradient-line.svg";

import { sliderData } from "../../constants/data";
import { useHistoryState } from "../../store/store";

import styles from "./history.module.scss";

function History() {
	const currentPage = useHistoryState((state) => state.currentPage);
	const [fromYear, toYear] = [
		sliderData[currentPage].slides[0].year,
		sliderData[currentPage].slides.slice(-1)[0].year,
	];
	const buttonsLabels = sliderData.map((item) => item.sliceLabel);
	return (
		<section className={styles["history-section"]}>
			<div className={styles["history-section-wrapper"]}>
				<div className={styles["history-section__title"]}>
					<div className={styles["history-section__gradient"]}>
						<GradientLine />
					</div>
					<p>Исторические даты</p>
				</div>
				<HistoryCircle
					currentPage={currentPage}
					buttonsLabels={buttonsLabels}
				/>
				<HistoryTimestamps fromYear={fromYear} toYear={toYear} />
				<div className={styles["history-section__slider"]}>
					<HistorySlider
						sliceOrder={currentPage + 1}
						slides={sliderData[currentPage].slides}
						slicesLength={sliderData.length}
					/>
				</div>
			</div>
		</section>
	);
}

export default History;
