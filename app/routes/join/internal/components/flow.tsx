import { Link } from "react-router";
import { css } from "styled-system/css";
import { AnchorLike } from "~/components/anchor-like";
import { ExternalLink } from "~/components/external-link";
import { H2, H3 } from "~/components/heading";
import { MAXIMUM_TWITTER_URL } from "~/constants/social-link";
import { JoinFlowItem } from "./flow-item";

export const JoinFlow = () => {
	return (
		<section>
			<H2>入会の流れ</H2>
			<ol>
				<JoinFlowItem withArrow>
					<ExternalLink href={MAXIMUM_TWITTER_URL}>
						Twitter (現 X) の DM
					</ExternalLink>{" "}
					または{" "}
					<ExternalLink href="https://line.me/ti/g2/uLfSQMqkPI0NKLrWZ0nDs0d6wXZEJPe4wzSjFw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default">
						LINE OpenChat
					</ExternalLink>{" "}
					で入会希望を伝える
				</JoinFlowItem>
				<JoinFlowItem withArrow>
					<ExternalLink href="https://github.com/">GitHub</ExternalLink>{" "}
					アカウントを新規作成 または ログイン
				</JoinFlowItem>
				<JoinFlowItem withArrow>
					メンバーより発行される招待リンクで、{" "}
					<ExternalLink href="https://id.maximum.vc/">
						ポータルサイト
					</ExternalLink>{" "}
					に仮登録する
				</JoinFlowItem>
				<JoinFlowItem>サークル費の入金を行い、本登録を完了する</JoinFlowItem>
			</ol>
			<H3>補足・注意事項など</H3>
			<ul
				className={css({
					listStyleType: "disc",
					paddingLeft: 8,
					marginTop: 2,
					marginBottom: 4,
				})}
			>
				<li>
					GitHub アカウントは、入会後の活動において必須となります。
					もしアカウントをお持ちの場合は、利用規約違反となる可能性があるため、別アカウントを作成しないでください。
				</li>
				<li>
					(在学生向け) ポータルサイトへの登録時、学籍番号の入力を求めています。
					大学への書類提出の際に必要となるため、正しい番号を入力してください。
				</li>
				<li>
					サークル費は月額 250
					円で、入会時点での残りの年度の活動月分を一括徴収しています。
					詳しい計算方法や使用用途は、{" "}
					<AnchorLike>
						<Link to="/qa/">Q&A</Link>
					</AnchorLike>{" "}
					ページをご確認ください。
					対面での現金支払い、または銀行振込での支払いとなります。
				</li>
			</ul>
		</section>
	);
};
