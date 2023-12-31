import React from "react";

import styles from "./slide.module.scss";

interface HistorySlideProps {
	year: number;
	text: string;
	wrapperClassName?: string;
}

function Slide({ year, text, wrapperClassName = "" }: HistorySlideProps) {
	return (
		<div className={`${styles.slide} ${wrapperClassName}`}>
			<p className={styles.slide__year}>{year}</p>
			<div className={styles.slide__text}>{text}</div>
		</div>
	);
}

export default Slide;
