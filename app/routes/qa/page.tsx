import { Link } from "react-router";
import { AnchorLike } from "~/components/anchor-like";
import { Breadcrumb } from "~/components/breadcrumb";
import { ExternalLink } from "~/components/external-link";
import { H1 } from "~/components/heading";
import { HeroImg } from "~/components/hero-img";
import { MAXIMUM_TWITTER_URL } from "~/constants/social-link";
import { makePageTitle } from "~/utils/title";
import { QaItem } from "./internal/components/qa-item";

export default function QA() {
	const breadcrumbItems = [
		{ href: "/", label: "ホーム" },
		{ href: "/qa/", label: "よくあるご質問", active: true },
	];

	return (
		<>
			<title>{makePageTitle(["よくあるご質問"])}</title>
			<HeroImg />
			<Breadcrumb items={breadcrumbItems} />
			<H1>よくあるご質問</H1>
			<p>
				入会にあたって、よくいただくご質問をまとめました。
				こちらで解決しない場合は、 Twitter (現 X) の DM
				へなんでもお気軽にご質問ください！{" "}
				<ExternalLink href={MAXIMUM_TWITTER_URL}>
					埼玉大学プログラミングサークル Maximum (@
					{MAXIMUM_TWITTER_URL.split(".com/")[1]})
				</ExternalLink>
			</p>
			<ul>
				<QaItem.Root>
					<QaItem.Question>プログラミング初心者なんですが...</QaItem.Question>
					<QaItem.Answer>
						Maximum
						ではプログラミングの初歩を学ぶ初心者向け講習会を定期的に行っていますので、そちらに参加していただければ問題ありません！
						実際、大学からプログラミングを始めたメンバーがほとんどです。
					</QaItem.Answer>
				</QaItem.Root>
				<QaItem.Root>
					<QaItem.Question>時間が取れないのですが...</QaItem.Question>
					<QaItem.Answer>
						メンバーが一堂に会する機会は多くなく、連絡は基本的に Discord
						で行っています。
						そのため、講習会に毎回参加することはできなくても、コミュニケーションをとったりメンバー用資料を閲覧したりすることで後れを取り戻すことができます。
					</QaItem.Answer>
				</QaItem.Root>
				<QaItem.Root>
					<QaItem.Question>活動の成果は？</QaItem.Question>
					<QaItem.Answer>
						<AnchorLike>
							<Link to="/achievements/">活動実績</Link>
						</AnchorLike>{" "}
						ページをご覧ください！
					</QaItem.Answer>
				</QaItem.Root>
				<QaItem.Root>
					<QaItem.Question>活動内容を教えてください！</QaItem.Question>
					<QaItem.Answer>
						<AnchorLike>
							<Link to="/about/">わたしたちについて</Link>
						</AnchorLike>{" "}
						ページをご覧ください。 競技プログラミングや Web を中心に、 2025
						年度からは CTF や広義 AI
						などの新しい活動班も加わり、幅広い分野に挑戦できるサークルになりました！
					</QaItem.Answer>
				</QaItem.Root>
				<QaItem.Root>
					<QaItem.Question>会費はかかる？</QaItem.Question>
					<QaItem.Answer>
						月額 250 円で、入会時点での残りの年度の活動月分を一括徴収します。
						例えば、 4 月に入会した場合は 250 円 × 12 ヶ月分 = 3,000 円、 5
						月に入会した場合は 250 円 × 11 ヶ月分 = 2,750
						円、...といった具合です。
						なお、一度納入いただいた会費は、理由の如何を問わず返金はできませんので、あらかじめご了承ください。
					</QaItem.Answer>
				</QaItem.Root>
				<QaItem.Root>
					<QaItem.Question>情報工学科じゃないけど入れる？</QaItem.Question>
					<QaItem.Answer>
						独習がメインな部分もあり、ほかのメンバーと大きな差はないようです。
						実は、情報工学科が半数以下の年もありますし、他学科のメンバーも多数在籍しています。
						所属学部・学科内訳は{" "}
						<AnchorLike>
							<Link to="/about/">わたしたちについて</Link>
						</AnchorLike>{" "}
						ページに記載がありますので、そちらもご覧ください。
						基本、入部者は歓迎するので興味があればぜひお声がけください！
					</QaItem.Answer>
				</QaItem.Root>
				<QaItem.Root>
					<QaItem.Question>
						どんな練習をしているんですか？ (競技プログラミング班)
					</QaItem.Question>
					<QaItem.Answer>
						<ExternalLink href="https://atcoder.jp/">AtCoder</ExternalLink>{" "}
						という、毎週末に競技プログラミングコンテストを開催している企業があるので、主にそこの問題を解きます。
						まず "AtCoder Beginner Contest (ABC)"
						に参加して競技プログラミングに慣れましょう。
					</QaItem.Answer>
				</QaItem.Root>
				<QaItem.Root>
					<QaItem.Question>使う言語は？</QaItem.Question>
					<QaItem.Answer>
						基本的には独習となるため、特に言語の強制などはしていません。
						ですが、競技プログラミング班の講習で主に用いるのは C++
						で、これを推奨しています。
						その他の言語も、活動班によっては用いているところもあります (Web
						研究会では HTML, CSS, JavaScript、 CTF 班では Python、など)。
						メンバーによってはさまざまな言語を使い分けている人もいるので、興味があればぜひ聞いてみてください！
					</QaItem.Answer>
				</QaItem.Root>
				<QaItem.Root>
					<QaItem.Question>人数はどのくらい？</QaItem.Question>
					<QaItem.Answer>
						<AnchorLike>
							<Link to="/about/">わたしたちについて</Link>
						</AnchorLike>{" "}
						ページに記載があるように、 2025 年度の現人数は 60 人強です。
						女子のメンバーもいます。 学部学科・男女関係なく歓迎しています！
					</QaItem.Answer>
				</QaItem.Root>
			</ul>
		</>
	);
}
