import { css } from "styled-system/css";

export const Header = () => {
	return (
		<header
			className={css({
				backgroundColor: "white",
				position: "fixed",
				zIndex: "token(zIndex.header)",
				top: 0,
				left: 0,
				width: "100%",
				height: "token(spacing.headerHeight)",
			})}
		>
			Header
		</header>
	);
};
