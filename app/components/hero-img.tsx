import { css } from "styled-system/css";

interface Props {
	src?: string;
}

export const HeroImg = ({ src = "/heros/hero.avif" }: Props) => {
	return (
		<img
			src={src}
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
