import React from "react";

import styles from "./historyTimestamps.module.scss";

interface HistoryTimestampsProps {
	fromYear: number;
	toYear: number;
}

const intervalDuration = 750;

function HistoryTimestamps({ fromYear, toYear }: HistoryTimestampsProps) {
	const prevProps = React.useRef<[number, number]>([fromYear, toYear]); //init
	const fromDateRef = React.useRef<HTMLParagraphElement>(null);
	const toDateRef = React.useRef<HTMLParagraphElement>(null);
	React.useEffect(() => {
		const diffFromYear =
			prevProps.current[0] - fromYear === 0
				? intervalDuration
				: Math.abs(prevProps.current[0] - fromYear);
		const diffToYear =
			prevProps.current[1] - toYear === 0
				? intervalDuration
				: Math.abs(prevProps.current[1] - toYear);

		const animationDurationFromYear = Math.floor(
			intervalDuration / diffFromYear
		);
		const animationDurationToYear = Math.floor(intervalDuration / diffToYear);

		let [startFromYearValue, startToYearValue] = prevProps.current;

		let fromYearInterval: ReturnType<typeof setInterval>;
		let toYearInterval: ReturnType<typeof setInterval>;

		const intervalFunctionStartYear = (type: "incr" | "decr") => {
			return function () {
				startFromYearValue += type === "incr" ? 1 : -1;
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				fromDateRef.current!.textContent = startFromYearValue.toString();
				if (startFromYearValue === fromYear) {
					clearInterval(fromYearInterval);
				}
			};
		};

		const intervalFunctionToYear = (type: "incr" | "decr") => {
			return function () {
				startToYearValue += type === "incr" ? 1 : -1;
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				toDateRef.current!.textContent = startToYearValue.toString();
				if (startToYearValue === toYear) {
					clearInterval(toYearInterval);
				}
			};
		};

		if (prevProps.current[0] - fromYear < 0) {
			fromYearInterval = setInterval(
				intervalFunctionStartYear("incr"),
				animationDurationFromYear
			);
		}

		if (prevProps.current[0] - fromYear > 0) {
			fromYearInterval = setInterval(
				intervalFunctionStartYear("decr"),
				animationDurationFromYear
			);
		}

		if (prevProps.current[1] - toYear < 0) {
			toYearInterval = setInterval(
				intervalFunctionToYear("incr"),
				animationDurationToYear
			);
		}

		if (prevProps.current[1] - toYear > 0) {
			toYearInterval = setInterval(
				intervalFunctionToYear("decr"),
				animationDurationToYear
			);
		}

		prevProps.current = [fromYear, toYear];
		return () => {
			clearInterval(fromYearInterval);
			clearInterval(toYearInterval);
		};
	}, [fromYear, toYear]);
	return (
		<div className={styles["years-timestamp"]}>
			<div className={styles["years-timestamp__text"]}>
				<p ref={fromDateRef} className={styles["years-timestamp__left"]}>
					{prevProps.current[0]}
				</p>
				<p ref={toDateRef} className={styles["years-timestamp__right"]}>
					{prevProps.current[1]}
				</p>
			</div>
		</div>
	);
}

export default HistoryTimestamps;
