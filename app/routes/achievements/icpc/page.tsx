import { load } from "js-yaml";
import type { FromSchema } from "json-schema-to-ts";
import { useLoaderData } from "react-router";
import { css } from "styled-system/css";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { Table } from "~/components/table";
import { UnorderedList } from "~/components/unordered-list";
import type icpcSchema from "~/schema/achievements/icpc.schema";
import { makePageTitle } from "~/utils/title";

export const loader = async () => {
	// fs での取得ができないため、 Vite raw import 機能でデータを読み込む
	// (Workers 内では Virtual File System が使われており、ローカルファイルシステムにアクセスできないので)
	// ref: https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/
	const icpcYamlData = (await import("~/data/achievements/icpc.yml?raw"))
		.default;
	const icpcData = load(icpcYamlData) as FromSchema<typeof icpcSchema>;
	return { icpcData };
};

export default function AchievementsIcpc() {
	const { icpcData } = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/achievements/", label: "活動実績" },
		{ href: "/achievements/icpc/", label: "ICPC", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["ICPC での活動実績"])}</title>
			<HeroImg src="/heros/icpc.avif" />
			<Breadcrumb items={breadcrumbItems} />
			<H1>ICPC での活動実績</H1>
			<p>
				ICPC (International Collegiate Programming Contest /
				国際大学対抗プログラミングコンテスト) とは、 ICPC Foundation
				が主催するプログラミングコンテストです。 同じ大学で 3 人 1
				組のチームを作り、チームでプログラミングと問題解決の能力を競う大会です。
			</p>
			<p>
				ICPC には 2000
				年から出場し続けており、これまでにも世界大会経験や、国内予選の継続的な突破といった好成績を収める実績を挙げています。
			</p>
			<p>
				<strong>参加記について</strong>
				<br />
				参加記は Maximum メンバーが個人で執筆・公開しているもので、 Maximum
				の公式見解を示すものではありません。
				各メンバーが管理する外部サイトへ遷移することがあります。
				予めご了承ください。
			</p>
			{Object.entries(icpcData)
				// 年度降順で表示
				.sort((a, b) => Number.parseInt(b[0], 10) - Number.parseInt(a[0], 10))
				.map(([year, data]) => (
					<section key={year}>
						<H2>{year} 年度</H2>
						<H3>成績</H3>
						<Table.Root>
							<thead>
								<Table.Tr>
									<Table.Th>チーム名</Table.Th>
									<Table.Th>国内予選</Table.Th>
									<Table.Th>
										地区大会 大学別順位
										<br />
										(括弧内はチーム順位)
									</Table.Th>
									{Number.parseInt(year, 10) >= 2023 && (
										<Table.Th>Asia Pacific Championship</Table.Th>
									)}
									<Table.Th>World Finals</Table.Th>
								</Table.Tr>
							</thead>
							<tbody>
								{data.teams.map((team) => (
									<Table.Tr key={team.name}>
										<Table.Td>{team.name}</Table.Td>
										<Table.Td>{team.prelim}</Table.Td>
										<Table.Td>{team.regional}</Table.Td>
										{Number.parseInt(year, 10) >= 2023 && (
											<Table.Td>{team.playoff}</Table.Td>
										)}
										<Table.Td>{team.worldfinal}</Table.Td>
									</Table.Tr>
								))}
							</tbody>
						</Table.Root>
						{data.blogs && (
							<>
								<H3>参加記</H3>
								<UnorderedList>
									{data.blogs.map((report) => (
										<li key={report.url}>
											{report.author}:{" "}
											<ExternalLink href={report.url}>
												{report.title}
											</ExternalLink>
										</li>
									))}
								</UnorderedList>
							</>
						)}
					</section>
				))}
		</>
	);
}
