import { ExternalLink } from "~/components/external-link";
import { H2 } from "~/components/heading";

export default function AboutTCE() {
	return (
		<section>
			<H2>Tech Circle Expo</H2>
			<p>
				<ExternalLink href="https://tech-circle-expo.connpass.com/">
					Tech Circle Expo
				</ExternalLink>{" "}
				は、電気通信大学の技術系サークル MMA
				が創設した、大学横断型技術系サークル交流イベントです。
				十数の大学から技術系サークルが参加しています。
			</p>
			<p>
				10 分ほどの LT (ライトニングトーク) を通して、 Tech Circle Expo
				に参加するサークルの活動を発信したり、他団体の活動から知見を深めたりすることを目的としています。
				また、対面開催であるため、同じ場所に集まることで発生する交流や「つながり」を作る機会の提供も目的としています。
			</p>
			<p>
				Maximum も Tech Circle Expo
				に参加しており、メンバーへの積極的な参加を促しています。
			</p>
		</section>
	);
}
