import {
	index,
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
	...prefix("achievements", [index("routes/achievements/home/page.tsx")]),
] satisfies RouteConfig;
