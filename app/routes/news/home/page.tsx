import { useLoaderData, useSearchParams } from "react-router";
import { css } from "styled-system/css";
import { ArticleCard } from "~/components/article-card";
import { Breadcrumb } from "~/components/breadcrumb";
import { H1 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { Pagination } from "~/components/pagination";
import { getNewsArticles } from "~/utils/articles";
import { makePageTitle } from "~/utils/title";

export const loader = async () => {
	const newsArticles = await getNewsArticles();
	return {
		newsArticles: newsArticles.sort(
			// 新しい順に並び替え
			(a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
		),
	};
};

export default function News() {
	const { newsArticles: allNewsArticles } = useLoaderData<typeof loader>();
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number.parseInt(searchParams.get("page") || "1", 10);
	const itemsPerPage = 10;
	const lastPage = Math.ceil(allNewsArticles.length / itemsPerPage);

	const newsArticles = allNewsArticles.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage,
	);

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/news/", label: "お知らせ一覧", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["お知らせ一覧"])}</title>
			<HeroImg />
			<Breadcrumb items={breadcrumbItems} />
			<H1>お知らせ一覧</H1>
			<p>サークルの活動内容やイベント情報などをお知らせします。</p>
			<Pagination
				currentPage={page}
				maxPage={lastPage}
				onPageChange={(newPage) => {
					setSearchParams({
						page: newPage.toString(),
					});
				}}
			/>
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
				{newsArticles.map((article) => {
					const newsPath = `/news/${article.year}/${article.slug}/`;
					return (
						<li key={newsPath} className={css({ maxWidth: "full" })}>
							<ArticleCard article={article} path={newsPath} />
						</li>
					);
				})}
			</ul>
		</>
	);
}
