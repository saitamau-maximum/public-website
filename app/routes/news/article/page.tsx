import { parseMarkdownToHTML } from "@saitamau-maximum/markdown-processor/server";
import { useLoaderData } from "react-router";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import { ArticleHeader } from "~/components/article-header";
import { Breadcrumb } from "~/components/breadcrumb";
import { getNewsArticles } from "~/utils/articles";
import { html2elem } from "~/utils/html2elem";
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

	const vfile = new VFile(rawContent);
	matter(vfile, { strip: true }); // frontmatter 部分を取り除く
	const content = String(vfile.value);
	const { content: html } = await parseMarkdownToHTML(content);

	return {
		year: params.year,
		slug: params.slug,
		article,
		html,
	};
};

export default function NewsArticle() {
	const { year, slug, article, html } = useLoaderData<typeof loader>();

	// HTML を React に変換する
	// hast から変換する手もあるが Prerender なので気にしない
	const articleElem = html2elem(html);

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
			<ArticleHeader article={article} />
			<article>{articleElem}</article>
		</>
	);
}
