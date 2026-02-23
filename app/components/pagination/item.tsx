import { buttonStyle } from "./style";

interface Props {
	page: number;
	currentPage: number;
	onPageChange?: (page: number) => void;
}

export const PaginationItem = ({ currentPage, page, onPageChange }: Props) => {
	return (
		<li>
			<button
				type="button"
				onClick={() => {
					onPageChange?.(page);
				}}
				tabIndex={0}
				aria-label={`${page} ページ目へ`}
				disabled={currentPage === page}
				className={buttonStyle()}
			>
				{page}
			</button>
		</li>
	);
};
