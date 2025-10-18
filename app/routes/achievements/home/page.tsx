import { useLoaderData } from "react-router";
import { css } from "styled-system/css";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { certifications } from "~/constants/certifications";
import type { CertificationItem } from "~/types/idp";
import { makePageTitle } from "~/utils/title";
import { CompetitionCard } from "./internal/components/competition-card";

export const loader = async () => {
	const DATA_URL = "https://api.id.maximum.vc/public/certifications";
	const certifications = await fetch(DATA_URL).then((res) =>
		res.json<CertificationItem[]>(),
	);
	return {
		certifications,
	};
};

export default function Achievements() {
	const data = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/achievements/", label: "活動実績", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["活動実績"])}</title>
			<HeroImg />
			<Breadcrumb items={breadcrumbItems} />
			<H1>活動実績</H1>
			<p>このページでは、 Maximum の活動実績についてご紹介します。</p>
			<section>
				<H2>保有資格等</H2>
				<p>
					現在所属しているメンバーが保有している資格や合格した試験について記載しています。
					自己申告制のため、実際の状況とは異なる場合があります。
				</p>
				{certifications.map((cert) => {
					const dataItem = data.certifications.find(
						(item) => item.id === cert.id,
					);
					if (!dataItem) return null;
					return (
						<div
							key={cert.id}
							className={css({
								backgroundColor: "white",
								boxShadow: "sm",
								borderRadius: "sm",
								padding: 4,
								marginTop: 4,
								marginBottom: 4,
							})}
						>
							<p
								className={css({
									fontSize: "xl",
									fontWeight: "bold",
									marginTop: 0,
									marginBottom: 0,
								})}
							>
								{cert.title}
							</p>
							<p>
								<strong>
									{dataItem.numberOfHolders} 人
									{cert.examination ? "合格" : "保有"}
								</strong>
							</p>
							<p
								className={css({
									marginBottom: 0,
								})}
							>
								{cert.description}
							</p>
						</div>
					);
				})}
			</section>
			<section>
				<H2>大会戦績</H2>
				<p>
					Maximum
					では、さまざまなプログラミングコンテストの大会に参加しています。
					こちらに記載されている大会以外にも、メンバーは個人・チームで多くの大会に参加しています。
				</p>
				<p>
					各カードをクリックすると、各大会の詳細な実績ページをご覧いただけます。
				</p>
				<CompetitionCard
					title="ICPC"
					standsFor="国際大学対抗プログラミングコンテスト"
					imageUrl="/images/icpc-icon.avif"
					to="/achievements/icpc/"
				>
					<p>
						ICPC は、同じ大学で 3 人 1
						組のチームを作り、チームでプログラミングと問題解決の能力を競う大会です。
						これまでに世界大会経験や、国内予選の継続的な突破といった好成績を収めています。
					</p>
					<ExternalLink href="https://icpc.global/">
						ICPC 公式サイト
					</ExternalLink>
				</CompetitionCard>
				<CompetitionCard
					title="ISUCON"
					standsFor="Iikanjini Speed Up Contest"
					imageUrl="/images/isucon-icon.avif"
					to="/achievements/isucon/"
				>
					<p>
						ISUCON は、与えられた Web サービスをどれだけ高速化できるかを競う、
						LINE ヤフー株式会社が主催するバックエンドメインのコンテストです。
					</p>
					<ExternalLink href="https://isucon.net/">
						ISUCON 公式サイト
					</ExternalLink>
				</CompetitionCard>
				<CompetitionCard
					title="Web Speed Hackathon"
					imageUrl="/images/wsh-icon.avif"
					to="/achievements/wsh/"
				>
					<p>
						Web Speed Hackathon は、とても重たいサイトの Core Web Vitals を 2
						日間でどれだけ向上させられるかを競う、株式会社サイバーエージェントが主催するフロントエンドメインの大会です。
					</p>
					<p className={css({ fontSize: "sm" })}>
						Core Web Vitals:
						表示速度や応答速度、画面のがたつきなど、ユーザー体験を測定する指標
					</p>
				</CompetitionCard>
				<CompetitionCard
					title="ICFPC"
					standsFor="ICFP (International Conference on Functional Programming) Contest"
					imageUrl="/images/icfpc-icon.avif"
					to="/achievements/icfpc/"
				>
					<p>
						ICFPC は、 ACM SIGPLAN 国際関数型言語学会 (ICFP)
						に併設されるコンテストで、各年のテーマに基づく問題を解決するプログラムを作成し、競い合う大会です。
					</p>
				</CompetitionCard>
				<CompetitionCard
					title="Kaggle"
					imageUrl="/images/kaggle-icon.avif"
					to="/achievements/kaggle/"
				>
					<p>
						Kaggle
						は、機械学習やデータサイエンスの分野で世界中のデータサイエンティストが参加するプラットフォームです。
					</p>
					<ExternalLink href="https://www.kaggle.com/">
						Kaggle 公式サイト
					</ExternalLink>
				</CompetitionCard>
				<CompetitionCard
					title="UTE-1"
					standsFor="ULTRA TAMAGO ENGINEER No.1"
					imageUrl="/images/ute1-icon.avif"
					to="/achievements/ute1/"
				>
					<p>
						UTE-1 は、株式会社ウルシステムズが主催する、 Web
						アプリケーション開発のバグ修正やセキュリティなどの技術を期間内にどれだけ発揮できるかを競う、バックエンドメインの大会です。
					</p>
				</CompetitionCard>
				<p className={css({ fontSize: "sm" })}>
					各種大会のロゴは、大会の公式ページより引用しています。
					著作権はそれぞれの大会運営団体に帰属します。
				</p>
			</section>
		</>
	);
}
