import type { ReactNode } from "react";
import { css } from "styled-system/css";

interface Props {
	children?: ReactNode;
}

export const QaQuestion = ({ children }: Props) => {
	return (
		<p
			className={css({
				display: "flex",
				flexWrap: "nowrap",
				gap: 4,
				marginBottom: 4,
			})}
		>
			<span
				className={css({
					fontWeight: "bold",
					fontSize: "2xl", // 1.5rem
					color: "green.600",
					display: "inline-block",
					width: 6,
					textAlign: "center",
					flexShrink: 0,
				})}
			>
				Q
			</span>
			<span
				className={css({
					display: "inline-block",
					// 1 行目の中央と Q の中央を合わせる
					// 1.5rem: Q の font-size、 1em: 要素の font-size、 1.7: line-height
					paddingTop: "calc((1.5rem - 1em) * 1.7 / 2)",
				})}
			>
				{children}
			</span>
		</p>
	);
};
