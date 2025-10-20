import { Link } from "react-router";
import type { NewsArticle } from "~/utils/articles";
import { AnchorLike } from "./anchor-like";
import { Card } from "./card";

interface Props {
	article: NewsArticle;
	path: string;
}

export const ArticleCard = ({ article, path }: Props) => {
	return (
		<Card.Root>
			{article.image && (
				<Card.Image
					src={`${path}${article.image}`}
					alt={`${article.title} のサムネイル画像`}
				/>
			)}
			<Card.Title>{article.title}</Card.Title>
			<Card.Body>
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
