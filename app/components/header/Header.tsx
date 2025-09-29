import { useState } from "react";
import { Button } from "react-aria-components";
import { GitHub, Menu, Twitter, X, Youtube } from "react-feather";
import { css } from "styled-system/css";
import {
	GITHUB_BRAND_COLOR,
	TWITTER_BRAND_COLOR,
	YOUTUBE_BRAND_COLOR,
} from "~/constants/brand-color";
import { JoinUsLink } from "./JoinUsLink";

export const Header = () => {
	const [showingMenu, setShowingMenu] = useState(false);

	const handleMenuClick = () => {
		setShowingMenu((prev) => !prev);
	};

	const headerItems: [string, string][] = [
		["Home", "/"],
		["About", "/about/"],
		["News", "/news/"],
		["Q&A", "/qa/"],
		["Achievements", "/achievements/"],
	];

	return (
		<>
			<header
				className={css({
					backgroundColor: "white",
					position: "fixed",
					zIndex: "token(zIndex.header)",
					top: 0,
					left: 0,
					width: "100%",
					height: "token(spacing.headerHeight)",
					padding: 4,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					boxShadow: "md",
				})}
			>
				<img
					src="/logos/maximum-logo.svg"
					alt="Maximum Logo"
					className={css({
						height: "32px",
					})}
				/>

				{/* PC 向け */}
				<nav
					className={css({
						hideBelow: "md",
						display: "inline-flex",
						gap: 6,
						alignItems: "center",
					})}
				>
					{headerItems.map(([label, href]) => (
						<a
							key={href}
							href={href}
							className={css({
								_hover: { textDecoration: "underline" },
							})}
						>
							{label}
						</a>
					))}
					<JoinUsLink />
				</nav>

				{/* モバイル向け */}
				<Button
					className={css({ hideFrom: "md", height: 6, width: 6 })}
					onPress={handleMenuClick}
					aria-label={showingMenu ? "Close Menu" : "Open Menu"}
				>
					<Menu className={css({ display: showingMenu ? "none" : "block" })} />
					<X className={css({ display: !showingMenu ? "none" : "block" })} />
				</Button>
			</header>
			<div
				className={css({
					hideFrom: "md",
					position: "fixed",
					top: "token(spacing.headerHeight)",
					left: 0,
					width: "100%",
					height: "calc(100vh - token(spacing.headerHeight))",
					backdropFilter: "auto",
					backdropBlur: "md",
					backgroundColor: "rgba(255, 255, 255, 0.7)",
					boxShadow: "md",
					padding: 4,
					zIndex: "calc(token(zIndex.header) - 1)",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					// modal 時の背景をスクロールさせない
					touchAction: "none",
					overscrollBehavior: "contain",
					// アニメーション (ちなみに display: none だとアニメーションできない)
					transition: "all",
					transitionDuration: "500ms",
					opacity: showingMenu ? 1 : 0,
					visibility: showingMenu ? "visible" : "hidden",
				})}
			>
				<div>
					<nav
						className={css({
							display: "flex",
							flexDirection: "column",
							gap: 8,
							alignItems: "center",
						})}
					>
						{headerItems.map(([label, href]) => (
							<a
								key={href}
								href={href}
								className={css({
									fontSize: "lg",
									_hover: { textDecoration: "underline" },
								})}
							>
								{label}
							</a>
						))}
						<JoinUsLink />
						<div
							className={css({
								display: "flex",
								justifyContent: "center",
								gap: 8,
							})}
						>
							<a
								href="https://github.com/saitamau-maximum/"
								target="_blank"
								rel="noopener noreferrer"
								className={css({
									_hover: { color: "var(--brandColor)", transition: "all" },
								})}
								// @ts-expect-error: Object literal may only specify known properties, and '"--brandColor"' does not exist in type 'Properties<string | number, string & {}>'.
								style={{ "--brandColor": GITHUB_BRAND_COLOR }}
							>
								<GitHub />
							</a>
							<a
								href="https://twitter.com/Maximum03400346"
								target="_blank"
								rel="noopener noreferrer"
								className={css({
									_hover: { color: "var(--brandColor)", transition: "all" },
								})}
								// @ts-expect-error: Object literal may only specify known properties, and '"--brandColor"' does not exist in type 'Properties<string | number, string & {}>'.
								style={{ "--brandColor": TWITTER_BRAND_COLOR }}
							>
								<Twitter />
							</a>
							<a
								href="https://www.youtube.com/@saitama-maximum"
								target="_blank"
								rel="noopener noreferrer"
								className={css({
									_hover: { color: "var(--brandColor)", transition: "all" },
								})}
								// @ts-expect-error: Object literal may only specify known properties, and '"--brandColor"' does not exist in type 'Properties<string | number, string & {}>'.
								style={{ "--brandColor": YOUTUBE_BRAND_COLOR }}
							>
								<Youtube />
							</a>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
};
