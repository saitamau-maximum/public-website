import { load } from "js-yaml";
import type { FromSchema } from "json-schema-to-ts";
import { useLoaderData } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { Table } from "~/components/table";
import { UnorderedList } from "~/components/unordered-list";
import type ute1Schema from "~/schema/achievements/icpc.schema";
import { makePageTitle } from "~/utils/title";
import { ReportsNote } from "../internal/components/reports-note";

export const loader = async () => {
	// fs での取得ができないため、 Vite raw import 機能でデータを読み込む
	// (Workers 内では Virtual File System が使われており、ローカルファイルシステムにアクセスできないので)
	// ref: https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/
	const ute1YamlData = (await import("~/data/achievements/ute1.yml?raw"))
		.default;
	const ute1Data = load(ute1YamlData) as FromSchema<typeof ute1Schema>;
	return { ute1Data };
};

export default function AchievementsUte1() {
	const { ute1Data } = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/achievements/", label: "活動実績" },
		{ href: "/achievements/ute1/", label: "UTE-1", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["UTE-1 での活動実績"])}</title>
			<HeroImg src="/heros/ute1.avif" />
			<Breadcrumb items={breadcrumbItems} />
			<H1>UTE-1 での活動実績</H1>
			<p>
				UTE-1 は、株式会社ウルシステムズが主催する、 Web
				アプリケーション開発のバグ修正やセキュリティなどの技術を期間内にどれだけ発揮できるかを競う、バックエンドメインの大会です。
			</p>
			<ReportsNote />
			{Object.entries(ute1Data)
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
