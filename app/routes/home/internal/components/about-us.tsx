import { Link } from "react-router";
import { AnchorLike } from "~/components/anchor-like";
import { Card } from "~/components/card";
import { ExternalLink } from "~/components/external-link";
import { H2 } from "~/components/heading";
import { CardCarouselUl } from "./card-carousel-ul";

export const HomeAboutUs = () => {
	return (
		<section>
			<H2>わたしたちについて</H2>
			<p>
				Maximum は、{" "}
				<ExternalLink href="https://icpc.global/">
					国際大学対抗プログラミングコンテスト (ICPC)
				</ExternalLink>{" "}
				へ参加し、良い成績を挙げるために 2000
				年に成立した、埼玉大学公認のプログラミング研究会です。 2025
				年度は競技プログラミング班と Web 研究会をはじめとして、以下の 7
				つの班が活動しています。
			</p>
			<CardCarouselUl ariaLabel="Maximum の各班の紹介">
				<li>
					<Card.Root>
						<Card.Title>競技プログラミング班</Card.Title>
						<Card.Body>
							<p>
								国際大学対抗プログラミングコンテスト (ICPC)
								に参加し、良い成績を上げるための活動を行っています。
								具体的には、 ICPC などの各種プログラミングコンテストへの参加、週
								2 回の勉強会などを行っています。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Title>Web 研究会</Card.Title>
						<Card.Body>
							<p>
								Web
								サイトを制作・構築・運用するための基礎を一通り学び、実際に自分たちでサービスを作ります。
								また、「遅すぎる」サイトを高速化する力を競う大会に出場することを目標にトレーニングも行っています。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Title>CTF 班</Card.Title>
						<Card.Body>
							<p>
								CTF (Capture The Flag)
								は、隠された「フラグ」という文字列をあらゆる手段で探し出すセキュリティの競技です。
								「攻撃は最大の防御」というイメージで、いわゆるハッキングの技術を学んで、攻撃者からシステムを守る力を身につけます。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Title>広義 AI 班</Card.Title>
						<Card.Body>
							<p>
								AtCoder Heuristic Contest (AHC) や ICFPC
								などで問われる「ルールベース」のものを含め、分類や予測などを行う人工知能の概要と仕組みなどを身に着けていきます。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Title>モバイルアプリ班</Card.Title>
						<Card.Body>
							<p>
								その名の通りモバイルアプリの開発を行っています。 Flutter
								を用いて開発を行い、週 1, 2 回の進捗共有を行い、活動開始から 3
								か月～半年でプロダクトの発表会を行います。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Title>ゲーム開発班</Card.Title>
						<Card.Body>
							<p>
								Web ゲームをメインに制作を行っています。
								まずは比較的簡単なパズルゲームから作り始め、シューティングや対戦型のボードゲームまで作れるようにすることを目標にしています。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
				<li>
					<Card.Root>
						<Card.Title>インフラ班</Card.Title>
						<Card.Body>
							<p>
								サーバーの運用・構築を中心に、インフラに関する勉強を行っています。
								サイトの公開までの手順を実際に行い、生じた疑問を調べながら解消することで概形を把握し、操作に慣れることを目的としています。
							</p>
						</Card.Body>
					</Card.Root>
				</li>
			</CardCarouselUl>
			<p>
				メンバーは Discord を活用して自由にコミュニケーションを取っています。
				オンライン・オフラインともに交流会、勉強会、サークル内模擬大会などの多彩なイベントを開催しています。
			</p>
			<p>
				詳しくは{" "}
				<Link to="/about/">
					<AnchorLike>サークルについて</AnchorLike>
				</Link>{" "}
				ページもご覧ください。
			</p>
			<p>
				すでに入会を決めている方は{" "}
				<Link to="/join/">
					<AnchorLike>入会案内</AnchorLike>
				</Link>{" "}
				ページから入会手続きをご確認ください。
			</p>
		</section>
	);
};
