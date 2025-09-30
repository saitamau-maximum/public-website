import { css } from "styled-system/css";
import { H1 } from "~/components/heading";
import { HomeAboutUs } from "./internal/components/about-us";
import { HomeWhatWeMade } from "./internal/components/what-we-made";

export default function Home() {
	return (
		<>
			<img
				src="/hero.avif"
				alt=""
				className={css({
					maxWidth: "100%",
					width: "1280px",
					margin: "auto",
					display: "block",
					borderRadius: "md",
				})}
			/>
			<H1
				css={{
					marginTop: 2,
					marginBottom: 2,
					textAlign: "center",
					display: "flex",
					gap: 1,
					justifyContent: "center",
					mdDown: {
						flexDirection: "column",
					},
				}}
			>
				<span
					className={css({
						mdDown: {
							fontSize: "md",
						},
					})}
				>
					埼玉大学プログラミングサークル
				</span>
				<span>Maximum</span>
			</H1>
			<HomeAboutUs />
			<HomeWhatWeMade />
		</>
	);
}
