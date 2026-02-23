import { load } from "js-yaml";
import type { FromSchema } from "json-schema-to-ts";
import { useLoaderData } from "react-router";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1, H2, H3 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { Table } from "~/components/table";
import { UnorderedList } from "~/components/unordered-list";
import type wshSchema from "~/schema/achievements/wsh.schema";
import { makePageTitle } from "~/utils/title";
import { ReportsNote } from "../internal/components/reports-note";

export const loader = async () => {
	// readFile が使えないので raw import で代替
	const wshYamlData = (await import("~/data/achievements/wsh.yml?raw")).default;
	const wshData = load(wshYamlData) as FromSchema<typeof wshSchema>;
	return { wshData };
};

export default function AchievementsWsh() {
	const { wshData } = useLoaderData<typeof loader>();

	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/achievements/", label: "活動実績" },
		{ href: "/achievements/wsh/", label: "Web Speed Hackathon", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["Web Speed Hackathon での活動実績"])}</title>
			<HeroImg src="/heros/wsh.avif" />
			<Breadcrumb items={breadcrumbItems} />
			<H1>Web Speed Hackathon での活動実績</H1>
			<p>
				Web Speed Hackathon は、とても重たいサイトの Core Web Vitals
				を改善することを目的とした、株式会社サイバーエージェントが主催するコンテストです。
			</p>
			<p>
				Maximum では 2023 年 (2022 年度)
				からメンバーが参加しており、スコア順位で 1
				桁順位を獲得するなどの実績を挙げています。 また、 Maximum
				に所属している卒業生が作問に携わっています。
			</p>
			<ReportsNote />
			{Object.entries(wshData)
				// 年度降順で表示
				.sort((a, b) => Number.parseInt(b[0], 10) - Number.parseInt(a[0], 10))
				.map(([year, data]) => (
					<section key={year}>
						<H2>{year}</H2>
						<p>{data.description}</p>
						<H3>成績</H3>
						<Table.Root>
							<thead>
								<Table.Tr>
									<Table.Th>個人名</Table.Th>
									<Table.Th>最終順位</Table.Th>
									<Table.Th>
										スコア順位
										<br />
										(括弧内は学生内順位)
									</Table.Th>
									<Table.Th>備考</Table.Th>
								</Table.Tr>
							</thead>
							<tbody>
								{data.participants.map((team) => (
									<Table.Tr key={team.name}>
										<Table.Td>{team.name}</Table.Td>
										<Table.Td>{team.rank}</Table.Td>
										<Table.Td>{team.scorerank}</Table.Td>
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
