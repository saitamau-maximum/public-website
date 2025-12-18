import { load } from "js-yaml";
import type { FromSchema } from "json-schema-to-ts";
import { useLoaderData } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { Table } from "~/components/table";
import { UnorderedList } from "~/components/unordered-list";
import type ute1Schema from "~/schema/achievements/ute1.schema";
import { makePageTitle } from "~/utils/title";
import { ReportsNote } from "../internal/components/reports-note";

export const loader = async () => {
	// readFile が使えないので raw import で代替
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
									<Table.Th>順位</Table.Th>
								</Table.Tr>
							</thead>
							<tbody>
								{data.teams.map((team) => (
									<Table.Tr key={team.name}>
										<Table.Td>{team.name}</Table.Td>
										<Table.Td>{team.rank}</Table.Td>
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
