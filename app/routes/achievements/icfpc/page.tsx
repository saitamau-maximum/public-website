import { load } from "js-yaml";
import type { FromSchema } from "json-schema-to-ts";
import { useLoaderData } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { Table } from "~/components/table";
import { UnorderedList } from "~/components/unordered-list";
import type icfpcSchema from "~/schema/achievements/icfpc.schema";
import { makePageTitle } from "~/utils/title";
import { ReportsNote } from "../internal/components/reports-note";

export const loader = async () => {
	// readFile が使えないので raw import で代替
	const icfpcYamlData = (await import("~/data/achievements/icfpc.yml?raw"))
		.default;
	const icfpcData = load(icfpcYamlData) as FromSchema<typeof icfpcSchema>;
	return { icfpcData };
};

export default function AchievementsIcfpc() {
	const { icfpcData } = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/achievements/", label: "活動実績" },
		{ href: "/achievements/icfpc/", label: "ICFPC", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["ICFPC での活動実績"])}</title>
			<HeroImg src="/heros/icfpc.avif" />
			<Breadcrumb items={breadcrumbItems} />
			<H1>ICFPC での活動実績</H1>
			<p>
				ICFPC は、 ACM SIGPLAN 国際関数型言語学会 (ICFP)
				に併設されるコンテストです。
				各年のテーマに基づく問題を解決するプログラムを作成し、競い合う大会です。
			</p>
			{/* <ReportsNote /> */}
			{Object.entries(icfpcData)
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
								<H3>作業リポジトリ等</H3>
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
