import { Link } from "react-router";
import { css } from "styled-system/css";
import { AnchorLike } from "~/components/anchor-like";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { makePageTitle } from "~/utils/title";
import { AboutTeams } from "./internal/components/teams";
import AboutTCE from "./internal/components/tech-circle-expo";

export default function About() {
	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/about/", label: "わたしたちについて", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["わたしたちについて"])}</title>
			<HeroImg />
			<Breadcrumb items={breadcrumbItems} />
			<H1>わたしたちについて</H1>
			<p>
				Maximum は、{" "}
				<ExternalLink href="https://icpc.global/">
					国際大学対抗プログラミングコンテスト (ICPC)
				</ExternalLink>{" "}
				へ参加し、良い成績を挙げるために 2000
				年に成立した、埼玉大学公認のプログラミング研究会です。
			</p>
			<p>
				情報工学科の学生はもちろん、他学部・他学科の学生も多く所属しており、プログラミングに興味がある学生なら誰でも参加できます。
				年度途中からの参加も大歓迎です！ 詳しくは{" "}
				<AnchorLike>
					<Link to="/join/">入会案内</Link>
				</AnchorLike>{" "}
				ページをご確認ください。
			</p>
			<p>2025 年度のメンバー 61 人の所属内訳は以下のようになっています。</p>
			<ul
				className={css({
					listStyleType: "disc",
					paddingLeft: 8,
					marginTop: 2,
					marginBottom: 4,
				})}
			>
				<li>工学部 情報工学科: 42 人 (B4 x2, B3 x8, B2 x12, B1 x20)</li>
				<li>工学部 機械工学科: 4 人 (B3 x3, B1 x1)</li>
				<li>工学部 環境社会デザイン学科: 1 人 (B2 x1)</li>
				<li>理学部 基礎化学科: 1 人 (B1 x1)</li>
				<li>理学部 生体制御学科: 1 人 (B1 x1)</li>
				<li>理学部 物理学科: 1 人 (B3 x1)</li>
				<li>経済学部: 2 人 (B2 x1, B1 x1)</li>
				<li>大学院 理工学研究科: 5 人 (M1 x5)</li>
				<li>卒業生: 4 人 (情報工学科卒業 3 人、教育学部卒業 1 人)</li>
			</ul>
			<AboutTeams />
			<AboutTCE />
		</>
	);
}
