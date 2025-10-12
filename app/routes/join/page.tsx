import { Link } from "react-router";
import { css } from "styled-system/css";
import { AnchorLike } from "~/components/anchor-like";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { makePageTitle } from "~/utils/title";
import { JoinCondition } from "./internal/components/condition";
import { JoinFlow } from "./internal/components/flow";

export default function About() {
	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/join/", label: "入会案内", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["入会案内"])}</title>
			<HeroImg />
			<Breadcrumb items={breadcrumbItems} />
			<H1>入会案内</H1>
			<p>このページでは、 Maximum への入会の流れについて説明します。</p>
			<p>
				あらかじめ{" "}
				<AnchorLike>
					<Link to="/about/">わたしたちについて</Link>
				</AnchorLike>{" "}
				ページや{" "}
				<AnchorLike>
					<Link to="/qa/">Q&A</Link>
				</AnchorLike>{" "}
				ページをご覧いただくことをおすすめします！
			</p>
			<JoinCondition />
			<JoinFlow />
		</>
	);
}
