import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";
import { ScrollIndicator } from "./scroll-indicator";

export const CardCarouselUl = ({ children }: PropsWithChildren) => {
	return (
		<>
			<ul
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
