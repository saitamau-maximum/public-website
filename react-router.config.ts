import type { Config } from "@react-router/dev/config";
// ~/utils/articles だと参照できないので config.ts からの相対パスで指定
import { getNewsArticles } from "./app/utils/articles";

export default {
	future: {
		v8_viteEnvironmentApi: true,
	},
	ssr: true,
	async prerender() {
		const newsArticles = await getNewsArticles();
		return [
			// ローカルファイル読み込み系は Pre-render する
			"/", // お知らせ (新着 2 件)
			"/achievements/icpc/", // 実績読み込み
			"/achievements/isucon/",
			"/achievements/wsh/",
			"/achievements/icfpc/",
			"/achievements/kaggle/",
			"/achievements/ute1/",
			// お知らせ
			"/news/",
			...newsArticles.flatMap((article) => [
				`/news/${article.year}/`,
				`/news/${article.year}/${article.slug}/`,
			]),
		];
	},
} satisfies Config;
