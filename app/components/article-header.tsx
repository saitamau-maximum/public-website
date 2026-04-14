import { css } from "styled-system/css";
import { H1 } from "~/components/heading";
import type { NewsArticle } from "~/utils/articles";
import { toISODateString } from "~/utils/date";

export const ArticleHeader = ({ article }: { article: NewsArticle }) => {
	return (
		<>
			<H1>{article.title}</H1>
			{article.description && (
				<p
					className={css({
						color: "gray.600",
					})}
				>
					{article.description}
				</p>
			)}
			<div
				className={css({
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					gap: 4,
					fontSize: "sm",
					color: "gray.600",
				})}
			>
				<p>
					作成日:{" "}
					<time dateTime={toISODateString(article.createdAt)}>
						{toISODateString(article.createdAt)}
					</time>
				</p>
				<p>
					最終更新日:{" "}
					<time dateTime={toISODateString(article.updatedAt)}>
						{toISODateString(article.updatedAt)}
					</time>
				</p>
			</div>
			<hr
				className={css({
					borderColor: "gray.300",
				})}
			/>
		</>
	);
};
