import { ExternalLink } from "~/components/external-link";
import { H2 } from "~/components/heading";
import { MAXIMUM_TWITTER_URL } from "~/constants/social-link";

export const HomeContact = () => {
	return (
		<section>
			<H2>お問い合わせ</H2>
			<p>
				Maximum へのお問い合わせは、以下 Twitter (現 X) の DM
				までお願いいたします。 広報担当が対応いたします。
			</p>
			<p>
				<ExternalLink href={MAXIMUM_TWITTER_URL}>
					埼玉大学プログラミングサークル Maximum (@
					{MAXIMUM_TWITTER_URL.split(".com/")[1]})
				</ExternalLink>
			</p>
			<p>
				<strong>企業・団体様へ</strong>
				<br />
				弊サークル内部でのサークルやキャリアの情報共有の観点から、基本的に外部サークルや企業との長期連携はお断りさせていただくという方針を取らせていただいております。
				あらかじめご了承ください。
			</p>
		</section>
	);
};
