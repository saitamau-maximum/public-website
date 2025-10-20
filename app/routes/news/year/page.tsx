import { useLoaderData } from "react-router";
import { css } from "styled-system/css";
import { getNewsArticles } from "~/utils/articles";
import type { Route } from "./+types/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
	const articles = (await getNewsArticles()).filter(
		(article) => article.year === params.year,
	);
	if (articles.length === 0) {
		throw new Response("Not Found", { status: 404 });
	}

	return {
		year: params.year,
		articles,
	};
};

export default function NewsYear() {
	const { year, articles } = useLoaderData<typeof loader>();

	return (
		<>
			<h1 className={css({ fontSize: "xl", fontWeight: "bold" })}>News</h1>
			<p>Year: {year}</p>
			<ul>
				{articles.map((article) => (
					<li key={article.slug}>
						{article.title} - {article.createdAt}
					</li>
				))}
			</ul>
		</>
	);
}
