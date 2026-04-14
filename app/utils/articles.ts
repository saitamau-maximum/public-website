import * as v from "valibot";
import { VFile } from "vfile";
import { matter } from "vfile-matter";

export const newsArticleFrontmatterSchema = v.object({
	title: v.pipe(v.string(), v.nonEmpty("タイトルを入力してください")),
	createdAt: v.pipe(
		v.string(),
		v.isoDate("日付の形式が正しくありません"),
		v.toDate(),
	),
	updatedAt: v.pipe(
		v.string(),
		v.isoDate("日付の形式が正しくありません"),
		v.toDate(),
	),
	description: v.optional(v.string()),
	group: v.optional(v.string()),
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

	// fs での読み込みはできないので import.meta.glob を使って記事一覧を取得する
	const articleModules = import.meta.glob("/docs/news/*/*/index.md", {
		query: "?raw",
		import: "default",
		eager: true,
	});

	for (const fullPath in articleModules) {
		const [_empty, _docs, _news, year, slug, _indexMd] = fullPath.split("/");
		const fileContent = articleModules[fullPath] as string;
		const vfile = new VFile(fileContent);
		matter(vfile);
		const { matter: data } = vfile.data;

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
