import React from "react";
import { useMediaQuery } from "usehooks-ts";
import CircleButton from "../circleButton/circleButton";
import { useHistoryState } from "../../store/store";

import styles from "./historyCircle.module.scss";

interface HistoryCircleProps {
	currentPage: number;
	buttonsLabels: string[];
}

function HistoryCircle({
	buttonsLabels = [],
	currentPage,
}: HistoryCircleProps) {
	const circleRotate = useHistoryState((state) => state.circleRotate);
	const smallDesktopMatch = useMediaQuery("(max-width: 1600px)");
	const laptopMatch = useMediaQuery("(max-width: 1280px)");

	const getRadius = () => {
		let rad = 270;
		if (smallDesktopMatch) {
			rad = 250;
		}
		if (laptopMatch) {
			rad = 180;
		}
		return rad;
	};

	const vars = {
		"--rot": circleRotate,
		"--m": buttonsLabels.length,
	} as React.CSSProperties;
	return (
		<div className={styles.circleWrapper}>
			<div className={styles.circle} />
			<div style={vars} className={styles["button-container"]}>
				{buttonsLabels.map((label, i) => (
					<CircleButton
						key={`circle-button-${i}`}
						buttonsAmount={buttonsLabels.length}
						radius={getRadius()}
						order={i + 1}
						active={i === currentPage}
						label={label}
					/>
				))}
			</div>
			<div className={`${styles.lines} ${styles["horizontal-line"]}`} />
			<div className={`${styles.lines} ${styles["vertical-line"]}`} />
		</div>
	);
}

export default HistoryCircle;
