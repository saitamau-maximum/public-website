import { css } from "styled-system/css";
import { ExternalLink } from "~/components/external-link";
import { H3, H4 } from "~/components/heading";
import { UnorderedList } from "~/components/unordered-list";
import { Spoiler } from "../spoiler";

export const AboutTeamsCompro = () => {
	return (
		<>
			<H3>競技プログラミング班</H3>
			<H4>競技プログラミングとは？</H4>
			<p>
				皆さんご存じの通り、コンピュータはとても高速に計算してくれます。
				しかし、その速さには限界があり、世界中の多くの問題は、そのままコンピュータで解くと数万年・数億年単位の時間を要すると言われています。
				そこで、こういった問題の答えを「高速かつ正確に」出すための工夫を行って、プログラムとして記述するのが競技プログラミングです。
			</p>
			<H4>例題を解いてみよう！</H4>
			<p>それでは例題として、以下の問題を考えてみましょう。</p>
			<blockquote>
				A さんは、 0 歳以上 100 歳以下です。 A
				さんに何か質問すると、「Yes」か「No」で答えてくれます。 A
				さんの年齢を当ててください。
			</blockquote>
			<p>
				当然、「0 歳ですか？」「1 歳ですか？」 ... と 1
				つずつ質問していくと、いつかは正解にたどり着きますが、時間がかかってしまいます。
				この問題を効率的に解く、つまり質問の回数を少なくして年齢を当てるためにはどうすればよいでしょうか？
			</p>
			<p className={css({ fontSize: "sm" })}>
				( 以下、ネタバレ防止のために一部を隠しています。
				タップ・クリックすると表示されます。
				ぜひ自分で考えながら読み進めてください！ )
			</p>
			<p>
				解答の 1 つとして、「
				<Spoiler>
					50 歳 <strong>以上</strong> ですか？
				</Spoiler>
				」などと質問することを繰り返していく方法が挙げられます。 この方法では、
				最大 <Spoiler>7</Spoiler> 回の質問で答えを特定できます。 例えば、 A
				さんが 19 歳だった場合、「
				<Spoiler>
					50 以上 No → 25 以上 No → 13 以上 Yes → 19 以上 Yes → 22 以上 No → 20
					以上 No。 よって 19 以上 20 未満、すなわち 19 歳
				</Spoiler>
				」と答えを導き出せます。 詳しくは、 <Spoiler>二分探索</Spoiler>{" "}
				で調べてみてください。
			</p>
			<p>
				このように、与えられた問題を効率的に解くための工夫を考え、プログラムとして記述するのが競技プログラミングです。
			</p>
			<H4>何をしているの？</H4>
			<p>
				国際大学対抗プログラミングコンテスト (ICPC)
				に参加し、良い成績を上げるための活動を行っています。 例えば、週 2
				回の勉強会を行ったり、 ICPC の過去問を解いたり、{" "}
				<ExternalLink href="https://atcoder.jp/">AtCoder</ExternalLink>{" "}
				という競技プログラミングのサイトで定期的に開催されるコンテストに参加したりしています。
			</p>
			<p>
				また、不定期ですが Maximum-Cup というコンテストを開催しています。
				現在もアクセスできる過去の開催分は以下の通りです。
				興味があればぜひ問題を解いてみてください！
			</p>
			<UnorderedList>
				<li>
					<ExternalLink href="https://atcoder.jp/contests/maximum-cup-2013">
						Maximum-Cup 2013
					</ExternalLink>
				</li>
				<li>
					<ExternalLink href="https://atcoder.jp/contests/maximum-cup-2018">
						Maximum-Cup 2018
					</ExternalLink>
				</li>
				<li>
					<ExternalLink href="https://atcoder.jp/contests/maximum-cup-2023">
						Maximum-Cup 2023
					</ExternalLink>
				</li>
				<li>
					<ExternalLink href="https://mofecoder.com/contests/maximum_cup_2024">
						Maximum-Cup 2024
					</ExternalLink>
				</li>
			</UnorderedList>
		</>
	);
};
