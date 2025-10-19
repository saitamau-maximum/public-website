import { Outlet } from "react-router";
import { css } from "styled-system/css";

export default function AchievementsLayout() {
	return (
		<>
			<Outlet />
			<p className={css({ fontSize: "sm" })}>
				各種大会のロゴは、大会の公式ページより引用しています。
				著作権はそれぞれの大会運営団体に帰属します。
			</p>
		</>
	);
}
