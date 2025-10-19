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
	...prefix("news", [index("routes/news/page.tsx")]),
	...prefix("achievements", [
		layout("routes/achievements/layout.tsx", [
			index("routes/achievements/home/page.tsx"),
			route("icpc", "routes/achievements/icpc/page.tsx"),
		]),
	]),
] satisfies RouteConfig;
