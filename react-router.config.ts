import type { Config } from "@react-router/dev/config";
// ~/utils/articles だと参照できない？ので config.ts からの相対パスで指定
import { getNewsArticles } from "./app/utils/articles";

export default {
	future: {
		unstable_viteEnvironmentApi: true,
	},
	ssr: true,
	async prerender() {
		const newsArticles = await getNewsArticles();
		return [
			// ローカルファイル読み込み系は Pre-render する
			"/achievements/icpc/",
			"/achievements/isucon/",
			"/achievements/wsh/",
			"/achievements/icfpc/",
			"/achievements/kaggle/",
			"/achievements/ute1/",
			...newsArticles.map(
				(article) => `/news/${article.year}/${article.slug}/`,
			),
		];
	},
} satisfies Config;
