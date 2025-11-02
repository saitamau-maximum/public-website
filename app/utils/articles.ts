import matter from "gray-matter";
import * as v from "valibot";

export const newsArticleFrontmatterSchema = v.object({
	title: v.string(),
	createdAt: v.date(),
	updatedAt: v.date(),
	description: v.optional(v.string()),
	group: v.string(),
	image: v.optional(
		v.pipe(
			v.string(),
			v.endsWith(
				"-thumb.avif",
				"サムネイル画像は -thumb.avif 形式で指定してください",
			),
		),
	),
});

export type NewsArticle = {
	year: string;
	slug: string;
	content: string;
} & v.InferOutput<typeof newsArticleFrontmatterSchema>;

export const getNewsArticles = async () => {
	const articles: NewsArticle[] = [];

	// nodejs_compat を有効にしている + prerender とはいえ、 fs での読み込みはできない (???)
	// そのため import.meta.glob を使って記事一覧を取得する
	const articleModules = import.meta.glob("/docs/news/*/*/index.md", {
		query: "?raw",
		import: "default",
		eager: true,
	});

	for (const fullPath in articleModules) {
		const [_empty, _docs, _news, year, slug, _indexMd] = fullPath.split("/");
		const fileContent = articleModules[fullPath] as string;
		const { data } = matter(fileContent);

		const {
			success,
			output: frontmatter,
			issues,
		} = v.safeParse(newsArticleFrontmatterSchema, data);

		if (!success) {
			console.warn(`Invalid frontmatter: ${year}/${slug}`, issues);
			continue;
		}

		articles.push({
			year,
			slug,
			content: fileContent,
			title: frontmatter.title,
			createdAt: frontmatter.createdAt,
			updatedAt: frontmatter.updatedAt,
			description: frontmatter.description,
			group: frontmatter.group,
			image: frontmatter.image,
		});
	}

	return articles;
};
