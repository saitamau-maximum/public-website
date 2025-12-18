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
import type kaggleSchema from "~/schema/achievements/kaggle.schema";
import { makePageTitle } from "~/utils/title";
import { ReportsNote } from "../internal/components/reports-note";

export const loader = async () => {
	// readFile が使えないので raw import で代替
	const kaggleYamlData = (await import("~/data/achievements/kaggle.yml?raw"))
		.default;
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
			{/* <ReportsNote /> */}
			{Object.entries(kaggleData).map(([key, data]) => (
				<section key={key}>
					<H2>{data.title}</H2>
					<p>
						{data.description}
						<br />
						<ExternalLink href={data.url}>コンペティションページ</ExternalLink>
					</p>
					<H3>成績</H3>
					<Table.Root>
						<thead>
							<Table.Tr>
								<Table.Th>チーム名</Table.Th>
								<Table.Th>順位</Table.Th>
								<Table.Th>メンバー</Table.Th>
							</Table.Tr>
						</thead>
						<tbody>
							{data.teams.map((team) => (
								<Table.Tr key={team.name}>
									<Table.Td>{team.name}</Table.Td>
									<Table.Td>
										{team.medal === "gold" ? (
											<img
												src="/images/kaggle-medal-gold.png"
												alt="金メダル"
												className={css({
													display: "inline-block",
													verticalAlign: "text-bottom",
													margin: 1,
												})}
											/>
										) : team.medal === "silver" ? (
											<img
												src="/images/kaggle-medal-silver.png"
												alt="銀メダル"
												className={css({
													display: "inline-block",
													verticalAlign: "text-bottom",
													margin: 1,
												})}
											/>
										) : team.medal === "bronze" ? (
											<img
												src="/images/kaggle-medal-bronze.png"
												alt="銅メダル"
												className={css({
													display: "inline-block",
													verticalAlign: "text-bottom",
													margin: 1,
												})}
											/>
										) : (
											""
										)}
										{team.rank}
									</Table.Td>
									<Table.Td>
										{team.members.map((member, index) => (
											<>
												<span key={member}>{member}</span>
												{index < team.members.length - 1 && ", "}
											</>
										))}
									</Table.Td>
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
