import type { ReactNode } from "react";
import { css } from "styled-system/css";

export const ErrorBox = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className={css({
				backgroundColor: "rose.50",
				color: "rose.700",
				padding: 4,
				borderRadius: 4,
				borderColor: "rose.300",
				borderWidth: 1,
				borderStyle: "solid",
			})}
		>
			{children}
		</div>
	);
};
