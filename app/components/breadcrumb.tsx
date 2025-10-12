import { ChevronRight, Home } from "react-feather";
import { Link } from "react-router";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { css } from "styled-system/css";
import { SITE_HOST } from "~/constants/site-config";
import { AnchorLike } from "./anchor-like";

interface Props {
	items: { href: string; label: string; active?: boolean }[];
}

export const Breadcrumb = ({ items }: Props) => {
	const breadcrumbJsonLD: WithContext<BreadcrumbList> = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.label,
			item: `${SITE_HOST}${item.href}`,
		})),
	};

	return (
		<nav
			aria-label="Breadcrumb"
			className={css({
				marginTop: 2,
				marginBottom: 2,
				paddingTop: 2,
				paddingBottom: 2,
				maxWidth: "full",
				overflowX: "auto",
			})}
		>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: breadcrumbJsonLD はユーザー入力ではないので、 XSS の心配はない
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLD) }}
			/>
			<ol
				className={css({
					display: "flex",
					alignItems: "center",
					gap: 2,
					flexWrap: "nowrap",
				})}
			>
				{items.map((item, index) => (
					<li
						key={item.href}
						className={css({
							display: "flex",
							alignItems: "center",
							gap: 2,
							textWrap: "nowrap",
						})}
					>
						{item.active ? (
							// biome-ignore lint/a11y/useSemanticElements: active = true の場合、 ↓
							// biome-ignore lint/a11y/useFocusableInteractive: 現在のページを示すための要素なのでリンクにしない
							<span aria-current="page" role="link" aria-disabled="true">
								{item.label}
							</span>
						) : (
							<>
								{/* index === 0 なら href="/" を前提にアイコンを配置 */}
								{index === 0 && <Home />}
								<AnchorLike>
									<Link to={item.href}>{item.label}</Link>
								</AnchorLike>
								<ChevronRight size={16} aria-hidden="true" />
							</>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};
