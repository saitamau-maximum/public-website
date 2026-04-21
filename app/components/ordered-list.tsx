import type { ReactNode } from "react";
import { css } from "styled-system/css";

interface Props {
	children?: ReactNode;
}

export const OrderedList = ({ children }: Props) => {
	return (
		<ol
			className={css({
				listStyleType: "decimal",
				paddingLeft: 8,
				marginTop: 2,
				marginBottom: 4,
			})}
		>
			{children}
		</ol>
	);
};
