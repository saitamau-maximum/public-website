import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import matter from "gray-matter";
import * as v from "valibot";
import { resolveFromProjectRoot } from "./resolve-from-project-root";

export const newsArticleFrontmatterSchema = v.object({
	title: v.string(),
	createdAt: v.pipe(v.string(), v.isoDate()),
	updatedAt: v.pipe(v.string(), v.isoDate()),
	description: v.optional(v.string()),
	group: v.string(),
	image: v.optional(v.string()),
});

type NewsArticle = {
	year: string;
	slug: string;
} & v.InferOutput<typeof newsArticleFrontmatterSchema>;

export const getNewsArticles = async () => {
	const articlesDir = resolveFromProjectRoot("docs", "news");
	const articles: NewsArticle[] = [];

	const yearDirs = await readdir(articlesDir);
	for (const yearDir of yearDirs) {
		const yearDirPath = resolve(articlesDir, yearDir);
		const articleDirs = await readdir(yearDirPath);
		for (const articleDir of articleDirs) {
			const articleFile = resolve(yearDirPath, articleDir, "index.md");
			const fileContent = await readFile(articleFile, "utf-8");
			const { data } = matter(fileContent);

			const { success, output: frontmatter } = v.safeParse(
				newsArticleFrontmatterSchema,
				data,
			);

			if (!success) {
				console.warn(`Invalid frontmatter: ${yearDir}/${articleDir}`);
				continue;
			}

			articles.push({
				year: yearDir,
				slug: articleDir,
				title: frontmatter.title,
				createdAt: frontmatter.createdAt,
				updatedAt: frontmatter.updatedAt,
				description: frontmatter.description,
				group: frontmatter.group,
				image: frontmatter.image,
			});
		}
	}

	return articles;
};
