import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { css } from "styled-system/css";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { classifyError } from "./utils/classify-error";

export const links: Route.LinksFunction = () => [
	{
		rel: "icon",
		href: "/logos/maximum-icon.svg",
		type: "image/svg+xml",
	},
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap",
	},
	{ rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>埼玉大学プログラミングサークル Maximum</title>
				<Meta />
				<Links />
			</head>
			<body
				className={css({
					fontFamily: '"Noto Sans JP", sans-serif',
					width: "100%",
					minHeight: "100%",
					color: "gray.800",
				})}
			>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const { status_code, error_title, error_message } = classifyError(error) ?? {
		status_code: 500,
		error_title: "Unexpected Error",
		error_message: "予期しないエラーが発生しました。",
	};

	const pageTitle = `${status_code} ${error_title} | 埼玉大学プログラミングサークル Maximum`;

	return (
		<>
			<title>{pageTitle}</title>
			<div
				className={css({
					margin: "6",
					width: "calc(100% - token(spacing.6) * 2)",
					height: "calc(100dvh - token(spacing.6) * 2)",
					overflow: "hidden",
					background: "white",
					borderRadius: "md",
					lgDown: {
						margin: "4",
						width: "calc(100% - token(spacing.4) * 2)",
						height: "calc(100dvh - token(spacing.4) * 2)",
					},
					mdDown: {
						margin: "2",
						width: "calc(100% - token(spacing.2) * 2)",
						height: "calc(100dvh - token(spacing.2) * 2)",
					},
				})}
			>
				<div
					className={css({
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "6",
						justifyContent: "center",
						height: "100%",
						color: "gray.600",
						paddingLeft: "4",
						paddingRight: "4",
					})}
				>
					<h1
						className={css({
							fontSize: "6xl",
							fontWeight: "bold",
						})}
					>
						{status_code}
					</h1>
					<p
						className={css({
							fontSize: "2xl",
							fontWeight: "bold",
						})}
					>
						{error_title}
					</p>
					<p>{error_message}</p>
				</div>
			</div>
		</>
	);
}
