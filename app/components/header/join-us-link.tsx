import { Link } from "react-router";
import { css } from "styled-system/css";

export const JoinUsLink = () => {
	return (
		<Link
			className={css({
				marginLeft: -0.5,
				paddingTop: 1,
				paddingBottom: 1,
				paddingLeft: 4,
				paddingRight: 4,
				backgroundGradient: "primary",
				color: "white",
				borderRadius: "full",
				fontWeight: "bold",
				_hover: { textDecoration: "underline" },
			})}
			to="/join/"
		>
			Join Us!
		</Link>
	);
};
