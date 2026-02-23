import { Loader } from "react-feather";
import { css } from "styled-system/css";

interface Props {
	showing: boolean;
}

export const LoadingSpinner = ({ showing }: Props) => {
	return (
		<div
			className={css({
				display: "flex",
				textAlign: "center",
				position: "fixed",
				bottom: 8,
				right: 8,
				backgroundColor: "white",
				padding: 2,
				borderRadius: "md",
				boxShadow: "sm",
				alignItems: "center",
				gap: 2,
				visibility: showing ? "visible" : "hidden",
				zIndex: "token(zIndex.loader)",
			})}
		>
			<Loader className={css({ animation: "spin" })} />
		</div>
	);
};
