import { useLoaderData } from "react-router";
import { css } from "styled-system/css";
import { H1 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { getNewsArticles } from "~/utils/articles";
import { HomeAboutUs } from "./internal/components/about-us";
import { HomeContact } from "./internal/components/contact";
import { HomeNews } from "./internal/components/news";
import { HomeWhatWeMade } from "./internal/components/what-we-made";

export const loader = async () => {
	const newsArticles = await getNewsArticles();
	return {
		newsArticles: newsArticles
			// createdAt 降順に並び変え
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			// 先頭 2 件だけ取得
			.slice(0, 2),
	};
};

export default function Home() {
	const { newsArticles } = useLoaderData<typeof loader>();

	return (
		<>
			<HeroImg />
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
			<HomeNews newsList={newsArticles} />
			<HomeContact />
		</>
	);
}
