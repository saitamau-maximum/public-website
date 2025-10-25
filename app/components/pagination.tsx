interface Props {
	currentPage: number;
	maxPage: number;
	onPageChange?: (page: number) => void;
}

export const Pagination = ({ currentPage, maxPage, onPageChange }: Props) => {
	// TODO: ちゃんとする
	return (
		<nav aria-label="Pagination Navigation">
			Page {currentPage} / {maxPage}{" "}
			<button
				type="button"
				onClick={() => {
					onPageChange?.(Math.max(1, currentPage - 1));
				}}
			>
				Prev
			</button>
			<button
				type="button"
				onClick={() => {
					onPageChange?.(Math.min(maxPage, currentPage + 1));
				}}
			>
				Next
			</button>
		</nav>
	);
};
