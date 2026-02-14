import { Link } from "react-router";
import { css } from "styled-system/css";
import type { NewsArticle } from "~/utils/articles";
import { toISODateString } from "~/utils/date";
import { AnchorLike } from "./anchor-like";
import { Card } from "./card";
import { NoImagePlaceholder } from "./no-image";

interface Props {
	article: NewsArticle;
	path: string;
}

export const ArticleCard = ({ article, path }: Props) => {
	return (
		<Card.Root>
			{article.image ? (
				<Card.Image
					src={`${path}${article.image}`}
					alt={`${article.title} のサムネイル画像`}
				/>
			) : (
				<NoImagePlaceholder />
			)}
			<Card.Title>{article.title}</Card.Title>
			<Card.Body>
				<p
					className={css({
						fontSize: "sm",
					})}
				>
					公開日:{" "}
					<time dateTime={toISODateString(article.createdAt)}>
						{toISODateString(article.createdAt)}
					</time>
				</p>
				{article.description && <p>{article.description}</p>}
				<p>
					<Link to={path}>
						<AnchorLike>このお知らせを読む</AnchorLike>
					</Link>
				</p>
			</Card.Body>
		</Card.Root>
	);
};
