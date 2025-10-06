import type { ReactNode } from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigation,
} from "react-router";
import { css } from "styled-system/css";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { LoadingSpinner } from "./components/loading-spinner";
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
	// https://reactrouter.com/start/framework/pending-ui
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

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
					color: "gray.600",
					backgroundGradient: "primary",
					backgroundRepeat: "no-repeat",
					width: "100%",
					minHeight: "100dvh",
					display: "flex",
					flexDirection: "column",
					lineHeight: 1.7,
					letterSpacing: "0.04em",
				})}
			>
				<Header />
				<div
					className={css({
						marginTop: "headerHeight",
						padding: 4,
						flexGrow: 1,
						overflowX: "hidden",
						"& p": { marginTop: 2, marginBottom: 2 },
						"& blockquote": {
							marginTop: 2,
							marginBottom: 2,
							paddingLeft: 5,
							position: "relative",
							_before: {
								position: "absolute",
								left: 1,
								top: 0,
								content: '""',
								display: "inline-block",
								width: 1,
								height: "100%",
								backgroundGradient: "primary",
							},
						},
						// header ぶんの高さだけスクロール位置をずらす
						"& *": { scrollMarginTop: "headerHeight" },
					})}
				>
					<div
						className={css({
							backgroundColor: "gray.50",
							borderRadius: "md",
							padding: 4,
							overflowX: "hidden",
						})}
					>
						<main
							className={css({
								maxWidth: "5xl", // 1024px
								margin: "auto",
							})}
						>
							{children}
						</main>
					</div>
				</div>
				<Footer />
				<LoadingSpinner showing={isNavigating} />
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
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 6,
					justifyContent: "center",
					padding: 6,
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
		</>
	);
}
