import type { ReactNode } from "react";
import { css } from "styled-system/css";

export const WarningBox = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className={css({
				backgroundColor: "yellow.50",
				color: "yellow.700",
				padding: 4,
				borderRadius: 4,
				borderColor: "yellow.300",
				borderWidth: 1,
				borderStyle: "solid",
			})}
		>
			{children}
		</div>
	);
};
