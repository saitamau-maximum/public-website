import { H2 } from "~/components/heading";
import { AboutTeamsCompro } from "./compro";
import { AboutTeamsCtf } from "./ctf";
import { AboutTeamsWeb } from "./web";

export const AboutTeams = () => {
	return (
		<section>
			<H2>班活動</H2>
			<p>
				設立時は競技プログラミングを主な活動としていました。 活動の幅が広がり、
				2025 年度では以下の 7 つの班が活動しています。
				レベルや興味に応じて、複数の班に所属することも可能です。
			</p>
			<p>
				プログラミング初学者については、競技プログラミング班・ Web
				研究会で基礎を学んだあと、ほかの班に所属することを推奨しています。
				もちろん、最初からほかの班に所属することも可能です。
			</p>
			<AboutTeamsCompro />
			<AboutTeamsWeb />
			<AboutTeamsCtf />
		</section>
	);
};
