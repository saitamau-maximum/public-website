import { Card } from "~/components/card";
import { ExternalLink } from "~/components/external-link";
import { H2 } from "~/components/heading";
import { CardCarouselUl } from "./card-carousel-ul";

export const HomeWhatWeMade = () => {
	return (
		<section>
			<H2>制作したもの</H2>
			<p>
				サークルで用いるツールをはじめ、さまざまなシステムを作成しています。
				今ご覧になっているこのサイトもそのひとつです。
			</p>
			<p>
				ここに掲載しているものはほんの一部にすぎません。 もし興味があれば、{" "}
				<ExternalLink href="https://github.com/saitamau-maximum/">
					GitHub
				</ExternalLink>{" "}
				(コード共有サービス) もぜひ覗いてみてください！
			</p>
			<CardCarouselUl>
				<li>
					<Card.Root>
						<Card.Image
							src="/products/public-website.png"
							alt="Public Website のスクリーンショット"
						/>
						<Card.Title>Public Website</Card.Title>
						<Card.Body>
							<p>あなたが今ご覧になっている、この Web サイトです。</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Image
							src="/products/private-website.png"
							alt="Private Website のスクリーンショット"
						/>
						<Card.Title>Private Website</Card.Title>
						<Card.Body>
							<p>メンバー限定の資料がまとまったサイトです。</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Image
							src="/products/idp.png"
							alt="IdP のスクリーンショット"
						/>
						<Card.Title>IdP</Card.Title>
						<Card.Body>
							<p>
								Maximum の統一認証基盤・アカウント管理システムです。
								このシステムを使ってサークルアプリケーションの認証を行っています。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Image
							src="/products/course.png"
							alt="Course のスクリーンショット"
						/>
						<Card.Title>Course</Card.Title>
						<Card.Body>
							<p>サークルの講習時に用いている資料をまとめたサイトです。</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Image
							src="/products/leaderboard.png"
							alt="Leaderboard のスクリーンショット"
						/>
						<Card.Title>Leaderboard</Card.Title>
						<Card.Body>
							<p>
								サークル内模擬大会などにおいて、順位表やスコア推移を表示するシステムです。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
			</CardCarouselUl>
		</section>
	);
};
