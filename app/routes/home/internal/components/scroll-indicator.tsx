import { ChevronsUp } from "react-feather";
import { css } from "styled-system/css";

export const ScrollIndicator = () => {
	return (
		<p
			className={css({
				marginTop: 0,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: 2,
				color: "green.700",
			})}
			aria-hidden="true"
		>
			Scroll!
			<ChevronsUp
				className={css({
					animation: "bounce",
					rotate: "auto",
					rotateX: "90deg",
				})}
			/>
		</p>
	);
};
