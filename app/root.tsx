import type { ReactNode } from "react";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

export function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>hogefuga</title>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
