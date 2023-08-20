import React from "react";

import styles from "./historyCircle.module.scss";
import CircleButton from "../circleButton/circleButton";
import { useHistoryState } from "../../store/store";

interface HistoryCircleProps {
	buttonsAmount?: number;
	currentPage: number;
}

function HistoryCircle({ buttonsAmount = 0, currentPage }: HistoryCircleProps) {
	const circleRotate = useHistoryState((state) => state.circleRotate);
	const vars = {
		"--rot": circleRotate,
		"--m": buttonsAmount,
	} as React.CSSProperties;
	return (
		<div>
			<div className={styles.circle} />
			<div style={vars} className={styles["button-container"]}>
				{[...Array(buttonsAmount)].map((_, i) => (
					<CircleButton
						key={`circle-button-${i}`}
						buttonsAmount={buttonsAmount}
						radius={270}
						order={i + 1}
						active={i === currentPage}
						label='Наука'
					/>
				))}
			</div>
			<div className={`${styles.lines} ${styles["horizontal-line"]}`} />
			<div className={`${styles.lines} ${styles["vertical-line"]}`} />
		</div>
	);
}

export default HistoryCircle;
