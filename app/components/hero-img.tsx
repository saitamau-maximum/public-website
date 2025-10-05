import { css } from "styled-system/css";

export const HeroImg = () => {
	return (
		<img
			src="/hero.avif"
			alt=""
			loading="eager"
			className={css({
				maxWidth: "100%",
				width: "1280px",
				margin: "auto",
				display: "block",
				borderRadius: "md",
			})}
		/>
	);
};
