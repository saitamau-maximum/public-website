import { Link } from "react-router";
import { css } from "styled-system/css";
import type { NewsArticle } from "~/utils/articles";
import { AnchorLike } from "./anchor-like";
import { Card } from "./card";

interface Props {
	article: NewsArticle;
	path: string;
}

const NoImagePlaceholder = () => {
	return (
		<div
			className={css({
				width: "full",
				aspectRatio: "16 / 9",
				borderRadius: "md",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "gray.300",
				backgroundGradient: "primary",
				padding: 0,
				pointerEvents: "none",
				userSelect: "none",
			})}
			aria-hidden="true"
			role="img"
			aria-label="No Image Available"
		>
			<div
				className={css({
					width: "full",
					height: "full",
					borderRadius: "md",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "2xl",
					fontWeight: "bold",
					backgroundColor: "rgba(0, 0, 0, 0.1)",
					color: "white",
				})}
			>
				No Image
			</div>
		</div>
	);
};

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
