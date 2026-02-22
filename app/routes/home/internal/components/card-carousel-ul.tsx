import {
	type MouseEventHandler,
	type ReactNode,
	useRef,
	useState,
} from "react";
import { css } from "styled-system/css";
import { ScrollIndicator } from "./scroll-indicator";

interface Props {
	ariaLabel: string;
	children: ReactNode;
}

export const CardCarouselUl = ({ children, ariaLabel }: Props) => {
	const scrollRef = useRef<HTMLUListElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isSnapEnabled, setIsSnapEnabled] = useState(true);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const snapTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

	const clearSnapTimeout = () => {
		if (snapTimeoutRef.current) {
			clearTimeout(snapTimeoutRef.current);
			snapTimeoutRef.current = null;
		}
	};

	const handleMouseDown: MouseEventHandler<HTMLUListElement> = (e) => {
		clearSnapTimeout();
		setIsDragging(true);
		setIsSnapEnabled(false);
		if (scrollRef.current) {
			// コンテナの左端からのクリック位置
			setStartX(e.pageX - scrollRef.current.offsetLeft);
			// クリックした時点でのスクロール位置
			setScrollLeft(scrollRef.current.scrollLeft);
		}
	};

	const handleMouseUp: MouseEventHandler<HTMLUListElement> = () => {
		clearSnapTimeout();
		setIsDragging(false);

		// scroll-snap を計算し、移動する
		// こうしないとドラッグ終了後のスクロールがスムーズにならないので
		if (scrollRef.current) {
			let nearestSnapPoint = 0;
			const scrollLeft = scrollRef.current.scrollLeft;
			const cardWidth = scrollRef.current.querySelector("li")?.clientWidth || 0;
			nearestSnapPoint = Math.round(scrollLeft / cardWidth) * (cardWidth + 16); // 16: gap
			scrollRef.current.scrollTo({
				left: nearestSnapPoint,
				behavior: "smooth",
			});
		}

		snapTimeoutRef.current = setTimeout(() => {
			// その後 scroll-snap を有効にする
			setIsSnapEnabled(true);
			snapTimeoutRef.current = null;
		}, 500);
	};

	const handleMouseMove: MouseEventHandler<HTMLUListElement> = (e) => {
		if (!isDragging || !scrollRef.current) return;
		e.preventDefault();
		clearSnapTimeout();
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX) * 1.5; // スクロールの速さを調整
		scrollRef.current.scrollLeft = scrollLeft - walk;
	};

	// ドラッグ中の画像の選択を防止するため
	const handleDragStart: MouseEventHandler<HTMLUListElement> = (e) => {
		e.preventDefault();
		clearSnapTimeout();
	};

	return (
		<>
			<span className={css({ srOnly: true })}>
				左右の矢印キーでコンテンツをスクロールできます。
			</span>
			<div
				className={css({
					"--cardWidth": "calc(min(100%, 28rem))",
					position: "relative",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "calc(min(5rem, 50% - var(--cardWidth) / 2))",
						height: "100%",
						backgroundGradient: "to-r",
						gradientFrom: "gray.50",
						gradientTo: "transparent",
						pointerEvents: "none",
					},
					"&::after": {
						content: '""',
						position: "absolute",
						top: 0,
						right: 0,
						width: "calc(min(5rem, 50% - var(--cardWidth) / 2))",
						height: "100%",
						backgroundGradient: "to-l",
						gradientFrom: "gray.50",
						gradientTo: "transparent",
						pointerEvents: "none",
					},
				})}
			>
				<ul
					aria-label={ariaLabel}
					// biome-ignore lint/a11y/noNoninteractiveTabindex: キーボード入力でもスクロールできるようにするため
					tabIndex={0}
					className={css({
						display: "flex",
						flexDirection: "row",
						gap: 4,
						flexWrap: "nowrap",
						overflowX: "auto",
						userSelect: "none",
						marginTop: 4,
						paddingBottom: 2,
						paddingLeft: "calc(50% - var(--cardWidth) / 2)",
						paddingRight: "calc(50% - var(--cardWidth) / 2)",
						// 中央でリストが止まるようにする
						scrollPaddingLeft: "calc(50% - var(--cardWidth) / 2)",
						"& > li": {
							maxWidth: "full",
							scrollSnapAlign: "start",
						},
					})}
					ref={scrollRef}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
					onMouseMove={handleMouseMove}
					onDragStart={handleDragStart}
					style={{
						cursor: isDragging ? "grabbing" : "grab",
						scrollBehavior: isDragging ? "auto" : "smooth",
						scrollSnapType: isSnapEnabled ? "x mandatory" : "none",
					}}
				>
					{children}
				</ul>
			</div>
			<ScrollIndicator />
		</>
	);
};
