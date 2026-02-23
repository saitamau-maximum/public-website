import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { css } from "styled-system/css";
import { calcPaginationPages } from "./calc-pages";
import { PaginationEllipsis } from "./ellipsis";
import { PaginationItem } from "./item";
import { buttonStyle } from "./style";

interface Props {
	currentPage: number;
	maxPage: number;
	onPageChange?: (page: number) => void;
}

export const Pagination = ({ currentPage, maxPage, onPageChange }: Props) => {
	const [pages, setPages] = useState(calcPaginationPages(currentPage, maxPage));

	useEffect(() => {
		setPages(calcPaginationPages(currentPage, maxPage));
	}, [currentPage, maxPage]);

	return (
		<nav aria-label="ページネーション">
			<ul
				className={css({
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 2,
					marginTop: 4,
					marginBottom: 4,
				})}
			>
				<li>
					<button
						type="button"
						onClick={() => {
							onPageChange?.(Math.max(1, currentPage - 1));
						}}
						tabIndex={0}
						aria-label="前のページへ"
						disabled={currentPage === 1}
						className={buttonStyle({ type: "arrowButton" })}
					>
						<ChevronLeft />
					</button>
				</li>
				{pages.map((page) => {
					if (page === "ellipsis-start" || page === "ellipsis-end") {
						return <PaginationEllipsis key={page} />;
					}
					return (
						<PaginationItem
							key={page}
							page={page}
							currentPage={currentPage}
							onPageChange={onPageChange}
						/>
					);
				})}
				<li>
					<button
						type="button"
						onClick={() => {
							onPageChange?.(Math.min(maxPage, currentPage + 1));
						}}
						tabIndex={0}
						aria-label="次のページへ"
						disabled={currentPage === maxPage}
						className={buttonStyle({ type: "arrowButton" })}
					>
						<ChevronRight />
					</button>
				</li>
			</ul>
		</nav>
	);
};
