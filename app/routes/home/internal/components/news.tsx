import { Link } from "react-router";
import { css } from "styled-system/css";
import { AnchorLike } from "~/components/anchor-like";
import { Card } from "~/components/card";
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
							<Card.Root>
								{news.image && (
									<Card.Image
										src={`${articlePath}${news.image}`}
										alt={`${news.title} のサムネイル画像`}
									/>
								)}
								<Card.Title>{news.title}</Card.Title>
								<Card.Body>
									{news.description && <p>{news.description}</p>}
									<p>
										<Link to={articlePath}>
											<AnchorLike>このお知らせを読む</AnchorLike>
										</Link>
									</p>
								</Card.Body>
							</Card.Root>
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
