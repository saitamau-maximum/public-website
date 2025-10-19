import { Info } from "react-feather";
import { css } from "styled-system/css";

export const ReportsNote = () => {
	return (
		<div
			className={css({
				marginTop: 4,
				marginBottom: 4,
				borderColor: "blue.600",
				borderStyle: "solid",
				borderWidth: 1,
				borderLeftWidth: 6,
				padding: "0.25rem 1rem",
				paddingBottom: 1,
				backgroundColor: "white",
			})}
		>
			<p
				className={css({
					fontWeight: "bold",
					display: "flex",
					alignItems: "center",
					color: "blue.600",
				})}
			>
				<Info className={css({ display: "inline-block", marginRight: 2 })} />
				参加記について
			</p>
			<p>
				参加記は Maximum メンバーが個人で執筆・公開しているもので、 Maximum
				の公式見解を示すものではありません。
				また、各メンバーが管理する外部サイトへ遷移することがあります。
				あらかじめご理解・ご了承ください。
			</p>
		</div>
	);
};
