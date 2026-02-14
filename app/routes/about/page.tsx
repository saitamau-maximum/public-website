import { Link, useLoaderData } from "react-router";
import { AnchorLike } from "~/components/anchor-like";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import type { AffiliationsSummary } from "~/types/idp";
import { makePageTitle } from "~/utils/title";
import MembersAffiliations from "./internal/components/member-affiliations-table";
import { AboutTeams } from "./internal/components/teams";
import AboutTCE from "./internal/components/tech-circle-expo";

export const loader = async () => {
	const currentYear = new Date().getFullYear();
	const currentFY = currentYear - (new Date().getMonth() < 4 ? 1 : 0);

	const DATA_URL = "https://api.id.maximum.vc/public/affiliations-summary";
	const affiliations = await fetch(DATA_URL).then((res) =>
		res.json<AffiliationsSummary>(),
	);

	return {
		currentFY,
		affiliations,
	};
};

export default function About() {
	const data = useLoaderData<typeof loader>();

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
			<MembersAffiliations
				currentFY={data.currentFY}
				affiliations={data.affiliations}
			/>
			<AboutTeams />
			<AboutTCE />
		</>
	);
}
