import type { CSSProperties } from "react";
import { GitHub, Twitter, Youtube } from "react-feather";
import { Link } from "react-router";
import { css } from "styled-system/css";
import {
	GITHUB_BRAND_COLOR,
	TWITTER_BRAND_COLOR,
	YOUTUBE_BRAND_COLOR,
} from "~/constants/brand-color";

import {
	MAXIMUM_GITHUB_URL,
	MAXIMUM_TWITTER_URL,
	MAXIMUM_YOUTUBE_URL,
} from "~/constants/social-link";

export const Footer = () => {
	const footerItems: [string, string][] = [
		["Home", "/"],
		["About", "/about/"],
		["News", "/news/"],
		["Q&A", "/qa/"],
		["Achievements", "/achievements/"],
		["Join", "/join/"],
	];

	return (
		<footer
			className={css({
				backgroundColor: "gray.800",
				color: "white",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: 4,
				paddingTop: 6,
				gap: 6,
				boxShadow: "md",
			})}
		>
			<Link to="/">
				<img
					src="/logos/maximum-logo-white.svg"
					alt="Maximum Logo"
					className={css({
						height: "32px",
					})}
				/>
			</Link>
			<nav
				className={css({
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: 6,
				})}
			>
				{footerItems.map(([label, href]) => (
					<Link
						key={href}
						to={href}
						className={css({
							_hover: { textDecoration: "underline" },
						})}
					>
						{label}
					</Link>
				))}
			</nav>
			<div
				className={css({
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: 6,
				})}
			>
				<a
					href={MAXIMUM_GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					className={css({
						_hover: { color: "var(--brandColor)", transition: "all" },
					})}
					style={{ "--brandColor": GITHUB_BRAND_COLOR } as CSSProperties}
				>
					<GitHub />
				</a>
				<a
					href={MAXIMUM_TWITTER_URL}
					target="_blank"
					rel="noopener noreferrer"
					className={css({
						_hover: { color: "var(--brandColor)", transition: "all" },
					})}
					style={{ "--brandColor": TWITTER_BRAND_COLOR } as CSSProperties}
				>
					<Twitter />
				</a>
				<a
					href={MAXIMUM_YOUTUBE_URL}
					target="_blank"
					rel="noopener noreferrer"
					className={css({
						_hover: { color: "var(--brandColor)", transition: "all" },
					})}
					style={{ "--brandColor": YOUTUBE_BRAND_COLOR } as CSSProperties}
				>
					<Youtube />
				</a>
			</div>
			<p className={css({ fontSize: "sm", textAlign: "center" })}>
				Copyright &copy; {new Date().getFullYear()} Programming Circle Maximum.
				All rights reserved.
			</p>
		</footer>
	);
};
