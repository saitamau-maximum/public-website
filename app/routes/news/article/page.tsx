import { parseMarkdownToHTML } from "@saitamau-maximum/markdown-processor/server";
import matter from "gray-matter";
import { useLoaderData } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { H1 } from "~/components/heading";
import { getNewsArticles } from "~/utils/articles";
import { toISODateString } from "~/utils/date";
import { makePageTitle } from "~/utils/title";
import type { Route } from "./+types/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
	const articles = (await getNewsArticles()).filter(
		(article) => article.year === params.year && article.slug === params.slug,
	);
	if (articles.length !== 1) {
		throw new Response("Not Found", { status: 404 });
	}

	const article = articles[0];
	const rawContent = article.content;

	// getNewsArticles で既に存在確認と一意性の確認をしているため !rawContent はあり得ないが念のため
	if (!rawContent) {
		throw new Response("Not Found", { status: 404 });
	}

	const { content } = matter(rawContent);

	// shikijs の読み込みでエラー吐いてるのでいったん md をそのまま返す
	// const { content: html } = await parseMarkdownToHTML(content);
	const html = content;
	return {
		year: params.year,
		slug: params.slug,
		article,
		html,
	};
};

export default function NewsArticle() {
	const { year, slug, article, html } = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/news/", label: "お知らせ一覧" },
		{ href: `/news/${year}/`, label: `${year} 年` },
		{ href: `/news/${year}/${slug}/`, label: article.title, active: true },
	];

	return (
		<>
			<title>{makePageTitle([article.title, "お知らせ"])}</title>
			<Breadcrumb items={breadcrumbItems} />
			<H1>{article.title}</H1>
			{article.description && <p>{article.description}</p>}
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
			<p>Group: {article.group}</p>
			{/* TODO: スタイルをあてる */}
			{/** biome-ignore lint/security/noDangerouslySetInnerHtml: docs からの信頼できる記事を表示させる前提のため */}
			<article dangerouslySetInnerHTML={{ __html: html }} />
		</>
	);
}
