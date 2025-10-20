import { useLoaderData } from "react-router";
import { css } from "styled-system/css";
import { getNewsArticles } from "~/utils/articles";
import type { Route } from "./+types/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
	const article = (await getNewsArticles()).filter(
		(article) => article.year === params.year && article.slug === params.slug,
	);
	if (article.length !== 1) {
		throw new Response("Not Found", { status: 404 });
	}

	return {
		year: params.year,
		slug: params.slug,
		article: article[0],
	};
};

export default function NewsArticle() {
	const { year, slug, article } = useLoaderData<typeof loader>();

	return (
		<>
			<h1 className={css({ fontSize: "xl", fontWeight: "bold" })}>News</h1>
			<p>
				{year}, {slug}
			</p>
			<pre>{JSON.stringify(article, null, 2)}</pre>
		</>
	);
}
