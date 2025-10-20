import { readFile } from "node:fs/promises";
import { load } from "js-yaml";
import type { FromSchema } from "json-schema-to-ts";
import { useLoaderData } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { Table } from "~/components/table";
import { UnorderedList } from "~/components/unordered-list";
import type kaggleSchema from "~/schema/achievements/icpc.schema";
import { resolveFromProjectRoot } from "~/utils/resolve-from-project-root";
import { makePageTitle } from "~/utils/title";
import { ReportsNote } from "../internal/components/reports-note";

export const loader = async () => {
	const kaggleYamlData = await readFile(
		resolveFromProjectRoot("app", "data", "achievements", "kaggle.yml"),
		"utf-8",
	);
	const kaggleData = load(kaggleYamlData) as FromSchema<typeof kaggleSchema>;
	return { kaggleData };
};

export default function AchievementsKaggle() {
	const { kaggleData } = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/achievements/", label: "活動実績" },
		{ href: "/achievements/kaggle/", label: "Kaggle", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["Kaggle での活動実績"])}</title>
			<HeroImg src="/heros/kaggle.avif" />
			<Breadcrumb items={breadcrumbItems} />
			<H1>Kaggle での活動実績</H1>
			<p>
				<ExternalLink href="https://www.kaggle.com/">Kaggle</ExternalLink>
				(カグル)
				とは、機械学習やデータサイエンスの分野で世界中のデータサイエンティストが参加する、
				Google 社が運営するオンラインプラットフォームです。
			</p>
			<p>
				Maximum では、メンバーが Kaggle
				で開催されるさまざまなコンペティションに参加しています。
			</p>
			<ReportsNote />
			{Object.entries(kaggleData)
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
