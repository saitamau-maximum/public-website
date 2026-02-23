import { cloudflare } from "@cloudflare/vite-plugin";
import pandacss from "@pandacss/dev/postcss";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	define: {
		// こうしないとビルドでコケる
		// ref: https://github.com/TanStack/router/issues/5213#issuecomment-3341078755 (tanstack/router だが同じエラー)
		"globalThis.Cloudflare.compatibilityFlags": {
			nodejs_compat: true,
		},
	},
	css: {
		postcss: {
			plugins: [pandacss, autoprefixer],
		},
	},
	plugins: [
		tsconfigPaths(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		reactRouter(),
		// build 時に	AssertionError: The WebSocket is undefined が出ることがあるための対策
		// ref: https://github.com/cloudflare/workers-sdk/issues/8909#issuecomment-3401112596
		{
			name: "cloudflare-vite-plugin-fix",
			configEnvironment(name, config) {
				const isDev = process.env.NODE_ENV === "development";
				if (name === "ssr" && !isDev) {
					delete config.dev;
				}
			},
		},
	],
	ssr: {
		noExternal: ["@saitamau-maximum/markdown-processor"],
	},
});
