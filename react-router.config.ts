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
			// SSR 必要ないページは Prerender しておく
			"/",
			// "/about/", // SSR
			"/qa/",
			"/join/",
			"/news/",
			...newsArticles.flatMap((article) => [
				`/news/${article.year}/`,
				`/news/${article.year}/${article.slug}/`,
			]),
			// "/achievements/", // SSR
			"/achievements/icpc/",
			"/achievements/isucon/",
			"/achievements/wsh/",
			"/achievements/icfpc/",
			"/achievements/kaggle/",
			"/achievements/ute1/",
			"/achievements/kanto-police-ctf/",
		];
	},
} satisfies Config;
