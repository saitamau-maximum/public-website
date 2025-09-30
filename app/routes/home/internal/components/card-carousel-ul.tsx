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
					scrollSnapType: "x mandatory",
					// 中央でリストが止まるようにする
					// min(50%, 14rem) は Card の width と合わせる
					scrollPaddingLeft: "calc(50% - min(50%, 14rem))",
					"& > li": {
						maxWidth: "full",
						scrollSnapAlign: "start",
					},
				})}
			>
				{children}
			</ul>
			<ScrollIndicator />
		</>
	);
};
