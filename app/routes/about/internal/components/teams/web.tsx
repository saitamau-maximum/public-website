import { Link } from "react-router";
import { AnchorLike } from "~/components/anchor-like";
import { ExternalLink } from "~/components/external-link";
import { H3, H4 } from "~/components/heading";

export const AboutTeamsWeb = () => {
	return (
		<>
			<H3>Web 研究会</H3>
			<H4>講習</H4>
			<p>
				Web サイトや Web
				サーバーを制作、構築、運用するための基礎を一通り学びます。 講習では
				HTML, CSS, JavaScript を触ります。 Web
				に関してはアウトプットこそ正義なので、「勉強する」よりも「作りながらその都度調べる」というフローで、効率の良い学習ができるようサポートします！
			</p>
			<H4>サイト制作・アプリ制作</H4>
			<p>
				一通り基礎を学び終えたら、実際に Twitter (現 X) や Note
				のような投稿ができるサービスを、自分たちで作ってもらいます。
			</p>
			<H4>パフォーマンスチューニング</H4>
			<p>
				Web の醍醐味は「制作」だけではありません。
				この世には「遅すぎる」や「セキュリティ的に危険」などの様々な問題を抱えたサイトがあります。
				こんなサイトを高速化したり安全に書き換えたりなどするのも、もちろん Web
				の範疇です。 一見競技性のない Web
				の分野でも、こういった問題を解決する力を競う大会がいくつか開催されており、そこに出場することを目標にトレーニングもします。
			</p>
			<p>
				LINE ヤフー株式会社主催の{" "}
				<ExternalLink href="https://isucon.net/">ISUCON</ExternalLink>{" "}
				や、株式会社サイバーエージェント主催の Web Speed Hackathon
				などに参加し、メンバーが上位入賞を果たしています。 詳しくは、{" "}
				<AnchorLike>
					<Link to="/achievements/">実績</Link>
				</AnchorLike>{" "}
				ページもご覧ください。
			</p>
		</>
	);
};
