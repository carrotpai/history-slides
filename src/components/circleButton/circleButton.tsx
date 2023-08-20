import React from "react";

import styles from "./circleButton.module.scss";
import { useHistoryState } from "../../store/store";
import { shallow } from "zustand/shallow";

interface CircleButtonProps {
	buttonsAmount: number;
	radius: number;
	order: number;
	active?: boolean;
	label?: string;
}

function CircleButton({
	radius,
	order,
	buttonsAmount,
	active,
	label,
}: CircleButtonProps) {
	const [isVisible, setIsVisible] = React.useState(false);
	const {
		currentPage,
		isTransitioning,
		setCurrentPage,
		setCircleRotate,
		setIsTransitioning,
	} = useHistoryState(
		(state) => ({
			currentPage: state.currentPage,
			isTransitioning: state.isTransitioning,
			setCurrentPage: state.setCurrentPage,
			setCircleRotate: state.setCircleRotate,
			setIsTransitioning: state.setIsTransitioning,
		}),
		shallow
	);

	const vars = {
		"--m": buttonsAmount,
		"--r": `${radius}px`,
		"--i": order,
		pointerEvents: isTransitioning ? "none" : "auto",
	} as React.CSSProperties;
	return (
		<div className={styles.buttonWrapper}>
			<div
				onClick={() => {
					let rightRot = order - 1 - currentPage;
					if (rightRot < 0) {
						rightRot = buttonsAmount + rightRot;
					}
					let leftRot = currentPage - (order - 1);
					if (leftRot < 0) {
						leftRot = buttonsAmount + leftRot;
					}
					if (leftRot < rightRot) {
						setCircleRotate(-1 * leftRot);
					} else {
						setCircleRotate(rightRot);
					}
					setCurrentPage(order - 1);
					setIsTransitioning();
				}}
				onMouseEnter={() => {
					setIsVisible(true);
				}}
				onMouseLeave={() => setIsVisible(false)}
				style={vars}
				className={`${styles.circleButton} ${active && styles.active}`}
			>
				{(isVisible || active) && (
					<span className={styles.circleButton__order}>{order}</span>
				)}
				<p
					className={`${styles.circleButton__text} ${
						active && styles.active_text
					}`}
				>
					{active && `${label}`}
				</p>
			</div>
		</div>
	);
}

export default CircleButton;
