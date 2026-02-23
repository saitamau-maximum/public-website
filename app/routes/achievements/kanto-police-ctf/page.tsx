import { load } from "js-yaml";
import type { FromSchema } from "json-schema-to-ts";
import { useLoaderData } from "react-router";
import { css } from "styled-system/css";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3 } from "~/components/heading";
// import { HeroImg } from "~/components/hero-img";
import { Table } from "~/components/table";
import { UnorderedList } from "~/components/unordered-list";
import type kantoPoliceCtfSchema from "~/schema/achievements/kanto-police-ctf.schema";
import { toISODateString } from "~/utils/date";
import { makePageTitle } from "~/utils/title";

export const loader = async () => {
	// readFile が使えないので raw import で代替
	const kantoPoliceCtfYamlData = (
		await import("~/data/achievements/kanto-police-ctf.yml?raw")
	).default;
	const kantoPoliceCtfData = load(kantoPoliceCtfYamlData) as FromSchema<
		typeof kantoPoliceCtfSchema
	>;
	return { kantoPoliceCtfData };
};

export default function AchievementsKantoPoliceCtf() {
	const { kantoPoliceCtfData } = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/achievements/", label: "活動実績" },
		{
			href: "/achievements/kanto-police-ctf/",
			label: "関東管区内警察合同 サイバーボランティア・学生 CTF 大会",
			active: true,
		},
	];

	return (
		<>
			<title>
				{makePageTitle([
					"関東管区内警察合同 サイバーボランティア・学生 CTF 大会 での活動実績",
				])}
			</title>
			{/* TODO: だれか画像つくって！ */}
			{/* <HeroImg src="/heros/kantoPoliceCtf.avif" /> */}
			<Breadcrumb items={breadcrumbItems} />
			<H1>
				関東管区内警察合同 サイバーボランティア・学生 CTF 大会 での活動実績
			</H1>
			<p>
				関東管区内警察合同 サイバーボランティア・学生 CTF 大会は、関東管区内の
				10 警察が合同で主催した CTF 大会です。
			</p>
			{Object.entries(kantoPoliceCtfData)
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
									<Table.Th>スコア</Table.Th>
									<Table.Th>順位</Table.Th>
									<Table.Th>備考</Table.Th>
								</Table.Tr>
							</thead>
							<tbody>
								{data.teams.map((team) => (
									<Table.Tr key={team.name}>
										<Table.Td>{team.name}</Table.Td>
										<Table.Td>{team.score}</Table.Td>
										<Table.Td>{team.rank}</Table.Td>
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
						{data.news && (
							<>
								<H3>関連ニュース記事</H3>
								<p>
									Archive.org に保存されている記事へのリンクを掲載しています。
								</p>
								<UnorderedList>
									{data.news.map((report) => (
										<li key={report.url} className={css({ marginBottom: 2 })}>
											{report.author}:{" "}
											<ExternalLink href={report.url}>
												{report.title}
											</ExternalLink>
											<br />
											<small>
												公開日:{" "}
												{toISODateString(new Date(report.publishedDate))} |
												アーカイブ日:{" "}
												{toISODateString(new Date(report.archivedDate))}
												{report.note && ` | ${report.note}`}
											</small>
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
