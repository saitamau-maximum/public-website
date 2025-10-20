import {
	index,
	layout,
	prefix,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home/page.tsx"),
	route("about", "routes/about/page.tsx"),
	route("qa", "routes/qa/page.tsx"),
	route("join", "routes/join/page.tsx"),
	...prefix("news", [
		index("routes/news/home/page.tsx"),
		route(":year", "routes/news/year/page.tsx"),
		route(":year/:slug", "routes/news/article/page.tsx"),
	]),
	...prefix("achievements", [
		layout("routes/achievements/layout.tsx", [
			index("routes/achievements/home/page.tsx"),
			route("icpc", "routes/achievements/icpc/page.tsx"),
			route("isucon", "routes/achievements/isucon/page.tsx"),
			route("wsh", "routes/achievements/wsh/page.tsx"),
			route("icfpc", "routes/achievements/icfpc/page.tsx"),
			route("kaggle", "routes/achievements/kaggle/page.tsx"),
			route("ute1", "routes/achievements/ute1/page.tsx"),
		]),
	]),
] satisfies RouteConfig;
