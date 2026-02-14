import { css } from "styled-system/css";
import { Table } from "~/components/table";
import { UnorderedList } from "~/components/unordered-list";
import type { AffiliationsSummary } from "~/types/idp";

interface Props {
	currentFY: number;
	affiliations: AffiliationsSummary;
}

export default function MembersAffiliations({
	currentFY,
	affiliations,
}: Props) {
	const displayData = [
		{ name: "経済学部", key: "ED" },

		{ name: "理学部 物理学科", key: "RP" },
		{ name: "理学部 基礎科学科", key: "RC" },
		{ name: "理学部 分子生物学科", key: "RB" },
		{ name: "理学部 生体制御学科", key: "RR" },

		{ name: "工学部 機械工学・システムデザイン学科", key: "TM" },
		{ name: "工学部 電気電子物理工学科", key: "TE" },
		{ name: "工学部 情報工学科", key: "TI" },
		{ name: "工学部 環境社会デザイン学科", key: "TC" },
	];

	const getMemberCountByAff = (affKey: string) => {
		const b1 = affiliations[`B1-${affKey}`] ?? 0;
		const b2 = affiliations[`B2-${affKey}`] ?? 0;
		const b3 = affiliations[`B3-${affKey}`] ?? 0;
		const b4 = affiliations[`B4-${affKey}`] ?? 0;
		return [b1 + b2 + b3 + b4, b1, b2, b3, b4] as const;
	};

	const totalMembers = displayData.reduce<
		[number, number, number, number, number]
	>(
		([st, s1, s2, s3, s4], item) => {
			const [total, b1, b2, b3, b4] = getMemberCountByAff(item.key);
			return [st + total, s1 + b1, s2 + b2, s3 + b3, s4 + b4];
		},
		[0, 0, 0, 0, 0],
	);

	return (
		<>
			<p>
				{currentFY}{" "}
				年度の学部メンバーの所属・学年内訳は以下のようになっています。
			</p>
			<Table.Root>
				<Table.Tr>
					<Table.Th>＼</Table.Th>
					<Table.Th>B1</Table.Th>
					<Table.Th>B2</Table.Th>
					<Table.Th>B3</Table.Th>
					<Table.Th>B4</Table.Th>
					<Table.Th>合計</Table.Th>
				</Table.Tr>
				{displayData
					.sort((a, b) => {
						const countA = getMemberCountByAff(a.key);
						const countB = getMemberCountByAff(b.key);
						// 合計, B1, B2, ... の順で降順にソート
						for (let i = 0; i < countA.length; i++) {
							if (countA[i] !== countB[i]) return countB[i] - countA[i];
						}
						return 0;
					})
					.map((item) => {
						const [total, b1, b2, b3, b4] = getMemberCountByAff(item.key);
						if (total === 0) return null;
						return (
							<Table.Tr key={item.key}>
								<Table.Th>{item.name}</Table.Th>
								<Table.Td className={css({ textAlign: "center" })}>
									{b1}
								</Table.Td>
								<Table.Td className={css({ textAlign: "center" })}>
									{b2}
								</Table.Td>
								<Table.Td className={css({ textAlign: "center" })}>
									{b3}
								</Table.Td>
								<Table.Td className={css({ textAlign: "center" })}>
									{b4}
								</Table.Td>
								<Table.Td
									className={css({ textAlign: "center", fontWeight: "bold" })}
								>
									{total}
								</Table.Td>
							</Table.Tr>
						);
					})}
				<Table.Tr>
					<Table.Th>合計</Table.Th>
					<Table.Td
						className={css({ textAlign: "center", fontWeight: "bold" })}
					>
						{totalMembers[1]}
					</Table.Td>
					<Table.Td
						className={css({ textAlign: "center", fontWeight: "bold" })}
					>
						{totalMembers[2]}
					</Table.Td>
					<Table.Td
						className={css({ textAlign: "center", fontWeight: "bold" })}
					>
						{totalMembers[3]}
					</Table.Td>
					<Table.Td
						className={css({ textAlign: "center", fontWeight: "bold" })}
					>
						{totalMembers[4]}
					</Table.Td>
					<Table.Td
						className={css({ textAlign: "center", fontWeight: "bold" })}
					>
						{totalMembers[0]}
					</Table.Td>
				</Table.Tr>
			</Table.Root>
			<p>
				また、学部生以外のメンバーとして、大学院生や卒業生も所属しています。
			</p>
			<UnorderedList>
				{["M1", "M2", "D1", "D2", "D3"].map((affKey) => {
					const count = affiliations[`${affKey}`] ?? 0;
					if (count === 0) return null;
					return (
						<li key={affKey}>
							{affKey}: {count} 人
						</li>
					);
				})}
				<li>その他: {affiliations.unknown} 人</li>
			</UnorderedList>
			<p className={css({ fontSize: "sm" })}>
				Maximum のアカウント管理システムの情報をもとに表示しています。
				年度始めの 4 - 5
				月ごろについては、実際の所属状況と異なる可能性があります。
			</p>
		</>
	);
}
