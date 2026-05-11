import { cloudflare } from "@cloudflare/vite-plugin";
import pandacss from "@pandacss/dev/postcss";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";

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
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter()],
	ssr: {
		noExternal: ["@saitamau-maximum/markdown-processor"],
	},
});
