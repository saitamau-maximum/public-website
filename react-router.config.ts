import type { Config } from "@react-router/dev/config";

export default {
	future: {
		unstable_viteEnvironmentApi: true,
	},
	ssr: true,
	prerender: [
		"/achievements/icpc/",
		"/achievements/isucon/",
		"/achievements/wsh/",
		"/achievements/icfpc/",
		"/achievements/kaggle/",
		"/achievements/ute1/",
	],
} satisfies Config;
