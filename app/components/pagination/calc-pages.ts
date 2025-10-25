// Pagination の表示ロジック
// お気持ち:
// - モバイルの見た目がいいので高々 7 個にしたい
// - currentPage が変更された時の表示を連続的にしたい
// - 最初と最後のページは必ず表示したい
// - 現在のページの前後 1 ページは表示したい
// - 間が空く場合は省略記号を表示したい

// TODO: テストを書く
// calcPaginationPages(1, 1) => [1]
// calcPaginationPages(1, 5) => [1, 2, 3, 4, 5]
// calcPaginationPages(1, 15) => [1, 2, 3, 4, 5, "ellipsis-end", 15]
// calcPaginationPages(4, 15) => [1, 2, 3, 4, 5, "ellipsis-end", 15]
// calcPaginationPages(5, 15) => [1, "ellipsis-start", 4, 5, 6, "ellipsis-end", 15]
// calcPaginationPages(8, 15) => [1, "ellipsis-start", 7, 8, 9, "ellipsis-end", 15]
// calcPaginationPages(11, 15) => [1, "ellipsis-start", 10, 11, 12, "ellipsis-end", 15]
// calcPaginationPages(12, 15) => [1, "ellipsis-start", 11, 12, 13, 14, 15]
// calcPaginationPages(15, 15) => [1, "ellipsis-start", 11, 12, 13, 14, 15]

type PageItem = number | "ellipsis-start" | "ellipsis-end";

export const calcPaginationPages = (
	currentPage: number,
	maxPage: number,
): PageItem[] => {
	// 7 ページ以下なら全部表示
	if (maxPage <= 7) {
		return new Array(maxPage).fill(0).map((_, i) => i + 1);
	}

	// currentPage が前の方にある場合
	if (currentPage <= 4) {
		return [1, 2, 3, 4, 5, "ellipsis-end", maxPage];
	}

	// currentPage が後ろの方にある場合
	if (currentPage >= maxPage - 3) {
		return [
			1,
			"ellipsis-start",
			maxPage - 4,
			maxPage - 3,
			maxPage - 2,
			maxPage - 1,
			maxPage,
		];
	}

	return [
		1,
		"ellipsis-start",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"ellipsis-end",
		maxPage,
	];
};
