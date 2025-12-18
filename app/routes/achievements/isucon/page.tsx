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
import type isuconSchema from "~/schema/achievements/isucon.schema";
import { makePageTitle } from "~/utils/title";
import { ReportsNote } from "../internal/components/reports-note";

export const loader = async () => {
	// readFile が使えないので raw import で代替
	const isuconYamlData = (await import("~/data/achievements/isucon.yml?raw"))
		.default;
	const isuconData = load(isuconYamlData) as FromSchema<typeof isuconSchema>;
	return { isuconData };
};

export default function AchievementsIsucon() {
	const { isuconData } = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/achievements/", label: "活動実績" },
		{ href: "/achievements/isucon/", label: "ISUCON", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["ISUCON での活動実績"])}</title>
			<HeroImg src="/heros/isucon.avif" />
			<Breadcrumb items={breadcrumbItems} />
			<H1>ISUCON での活動実績</H1>
			<p>
				<ExternalLink href="https://isucon.net/">
					ISUCON (Iikanjini Speed Up Contest)
				</ExternalLink>{" "}
				とは、 LINE
				ヤフー株式会社が主催する、バックエンドメインのコンテストです。
				与えられた Web
				サービスのパフォーマンスを改善し、どれだけ高速化できるかを競います。
				最大 3 人のチームを組み、制限時間内にスコアを競い合います。
			</p>
			<p>
				Maximum では 2023 年度の ISUCON13 から参加しており、上位 30
				位として入賞するなどの実績を挙げています。
			</p>
			<p>
				学生チーム内順位は、学生のみで構成されたチームの中での順位を示しています。
				大会公式のランキングに記載されていない場合は「非公表」としています。
			</p>
			<ReportsNote />
			{Object.entries(isuconData)
				// 年度降順で表示
				.sort((a, b) => Number.parseInt(b[0], 10) - Number.parseInt(a[0], 10))
				.map(([year, data]) => (
					<section key={year}>
						<H2>{data.title}</H2>
						<p>{data.description}</p>
						<H3>成績</H3>
						<Table.Root>
							<thead>
								<Table.Tr>
									<Table.Th>チーム名</Table.Th>
									<Table.Th>スコア</Table.Th>
									<Table.Th>順位</Table.Th>
									<Table.Th>学生チーム内順位</Table.Th>
									<Table.Th>備考</Table.Th>
								</Table.Tr>
							</thead>
							<tbody>
								{data.teams.map((team) => (
									<Table.Tr key={team.name}>
										<Table.Td>{team.name}</Table.Td>
										<Table.Td>{team.score.toLocaleString()}</Table.Td>
										<Table.Td>{team.rank}</Table.Td>
										<Table.Td>{team.sturank}</Table.Td>
										<Table.Td>{team.note}</Table.Td>
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
