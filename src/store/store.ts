import { createWithEqualityFn } from "zustand/traditional";

interface HistoryStateType {
	currentPage: number;
	circleRotate: number;
	isTransitioning: boolean;
	setCurrentPage: (page: number) => void;
	setCircleRotate: (diff: number) => void;
	setIsTransitioning: () => void;
}

export const useHistoryState = createWithEqualityFn<HistoryStateType>(
	(set) => ({
		currentPage: 0,
		circleRotate: 0,
		isTransitioning: false,
		setCurrentPage: (page: number) =>
			set((state) => ({ ...state, currentPage: page })),
		setCircleRotate: (diff: number) =>
			set((state) => ({ ...state, circleRotate: state.circleRotate + diff })),
		setIsTransitioning: () => {
			set((state) => ({ ...state, isTransitioning: true }));
			//isTransitioning ставит pointer-event: none, поэтому повторный вызов во время таймаута невозможен (за исключением демонтирования)
			setTimeout(
				() => set((state) => ({ ...state, isTransitioning: false })),
				500
			);
		},
	}),
	Object.is
);
