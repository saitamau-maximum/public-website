import { Link } from "react-router";
import { css } from "styled-system/css";
import { AnchorLike } from "~/components/anchor-like";
import { Card } from "~/components/card";
import { H2 } from "~/components/heading";

interface Props {
	newsList: ReadonlyArray<{
		slug: string;
		imgSrc: string;
		title: string;
		description: string;
		createdAt: string;
	}>;
}

export const HomeNews = ({ newsList }: Props) => {
	return (
		<>
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
				{newsList.map((news) => (
					<li key={news.slug} className={css({ maxWidth: "full" })}>
						<Card.Root>
							<Card.Image
								src={news.imgSrc}
								alt={`${news.title} のサムネイル画像`}
							/>
							<Card.Title>{news.title}</Card.Title>
							<Card.Body>
								<p>{news.description}</p>
								<p>
									<Link to={news.slug}>
										<AnchorLike>このお知らせを読む</AnchorLike>
									</Link>
								</p>
							</Card.Body>
						</Card.Root>
					</li>
				))}
			</ul>
			<p>
				ほかのお知らせは、{" "}
				<Link to="/news/">
					<AnchorLike>ニュース一覧</AnchorLike>
				</Link>{" "}
				ページからご覧いただけます。
			</p>
		</>
	);
};
