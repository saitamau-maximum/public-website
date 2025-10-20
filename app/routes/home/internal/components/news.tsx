import { Link } from "react-router";
import { css } from "styled-system/css";
import { AnchorLike } from "~/components/anchor-like";
import { ArticleCard } from "~/components/article-card";
import { H2 } from "~/components/heading";
import type { NewsArticle } from "~/utils/articles";

interface Props {
	newsList: readonly NewsArticle[];
}

export const HomeNews = ({ newsList }: Props) => {
	return (
		<section>
			<H2>新着情報</H2>
			<p>サークルの活動内容やイベント情報などをお知らせします。 (最新 2 件)</p>
			<ul
				className={css({
					marginTop: 4,
					marginBottom: 4,
					display: "flex",
					gap: 4,
					flexWrap: "wrap",
					flexDirection: "row",
					justifyContent: "center",
					width: "full",
					mdDown: {
						flexDirection: "column",
					},
				})}
			>
				{newsList.map((news) => {
					const articlePath = `/news/${news.year}/${news.slug}/`;
					return (
						<li key={articlePath} className={css({ maxWidth: "full" })}>
							<ArticleCard article={news} path={articlePath} />
						</li>
					);
				})}
			</ul>
			<p>
				ほかのお知らせは、{" "}
				<Link to="/news/">
					<AnchorLike>お知らせ一覧</AnchorLike>
				</Link>{" "}
				ページからご覧いただけます。
			</p>
		</section>
	);
};
