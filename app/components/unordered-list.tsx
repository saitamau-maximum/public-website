import type { ReactNode } from "react";
import { css } from "styled-system/css";

interface Props {
	children?: ReactNode;
}

export const UnorderedList = ({ children }: Props) => {
	return (
		<ul
			className={css({
				listStyleType: "disc",
				paddingLeft: 8,
				marginTop: 2,
				marginBottom: 4,
			})}
		>
			{children}
		</ul>
	);
};
