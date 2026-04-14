import { parseMarkdownToHTML } from "@saitamau-maximum/markdown-processor/server";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLoaderData } from "react-router";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { css } from "styled-system/css";
import { unified } from "unified";
import { VFile } from "vfile";
import { matter } from "vfile-matter";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3, H4 } from "~/components/heading";
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
	const articleElem = unified()
		.use(rehypeParse, { fragment: true })
		.use(rehypeReact, {
			Fragment,
			jsx,
			jsxs,
			components: {
				h2: H2,
				h3: H3,
				h4: H4,
				a: ExternalLink,
			},
		})
		.processSync(html).result;

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
			<article>{articleElem}</article>
		</>
	);
}
