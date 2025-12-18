import type { ReactNode } from "react";
import { css } from "styled-system/css";
import { ScrollIndicator } from "./scroll-indicator";

interface Props {
	ariaLabel: string;
	children: ReactNode;
}

export const CardCarouselUl = ({ children, ariaLabel }: Props) => {
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
						marginTop: 4,
						paddingBottom: 2,
						paddingLeft: "calc(50% - var(--cardWidth) / 2)",
						paddingRight: "calc(50% - var(--cardWidth) / 2)",
						scrollSnapType: "x mandatory",
						// 中央でリストが止まるようにする
						scrollPaddingLeft: "calc(50% - var(--cardWidth) / 2)",
						"& > li": {
							maxWidth: "full",
							scrollSnapAlign: "start",
						},
					})}
				>
					{children}
				</ul>
			</div>
			<ScrollIndicator />
		</>
	);
};
