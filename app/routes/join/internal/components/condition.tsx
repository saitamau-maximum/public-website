import { css } from "styled-system/css";
import { H2 } from "~/components/heading";
import { UnorderedList } from "~/components/unordered-list";

export const JoinCondition = () => {
	return (
		<section>
			<H2>入会条件</H2>
			<p>以下の条件を満たせば、だれでもいつでも Maximum に入会できます。</p>
			<UnorderedList>
				<li>埼玉大学の学部生、大学院生、または卒業生であること</li>
				<li>プログラミングに興味があること</li>
			</UnorderedList>
			<p>学部学科は問いません。 年度途中からの入会も大歓迎です！</p>
			<p>
				埼玉大学に在籍している (していた)
				ことの確認ができない場合、入会をお断りすることがあります。
				なお、外部コラボレーターなどとして、例外的に上記条件を満たさない方の入会を認める場合があります。
			</p>
		</section>
	);
};
