import pandacss from "@pandacss/dev/postcss";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	css: {
		postcss: {
			plugins: [pandacss, autoprefixer],
		},
	},
	plugins: [tsconfigPaths(), cloudflareDevProxy(), reactRouter()],
});
