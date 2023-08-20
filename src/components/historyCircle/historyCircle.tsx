import React from "react";

import styles from "./historyCircle.module.scss";
import CircleButton from "../circleButton/circleButton";
import { useHistoryState } from "../../store/store";

interface HistoryCircleProps {
	currentPage: number;
	buttonsLabels: string[];
}

function HistoryCircle({
	buttonsLabels = [],
	currentPage,
}: HistoryCircleProps) {
	const circleRotate = useHistoryState((state) => state.circleRotate);
	const vars = {
		"--rot": circleRotate,
		"--m": buttonsLabels.length,
	} as React.CSSProperties;
	return (
		<div>
			<div className={styles.circle} />
			<div style={vars} className={styles["button-container"]}>
				{buttonsLabels.map((label, i) => (
					<CircleButton
						key={`circle-button-${i}`}
						buttonsAmount={buttonsLabels.length}
						radius={270}
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
