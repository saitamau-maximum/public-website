import type { ReactNode } from "react";
import { css } from "styled-system/css";

interface Props {
	children?: ReactNode;
}

export const QaRoot = ({ children }: Props) => {
	return (
		<li
			className={css({
				backgroundColor: "white",
				padding: 4,
				boxShadow: "sm",
				borderRadius: "sm",
				marginTop: 4,
				marginBottom: 4,
			})}
		>
			{children}
		</li>
	);
};
