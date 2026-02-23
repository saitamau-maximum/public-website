import { css } from "styled-system/css";

export const NoImagePlaceholder = () => {
	return (
		<div
			className={css({
				containerType: "inline-size",
				width: "full",
				aspectRatio: "16 / 9",
				borderRadius: "md",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: "gray.300",
				backgroundGradient: "primary",
				padding: 0,
				pointerEvents: "none",
				userSelect: "none",
			})}
			aria-hidden="true"
			role="img"
			aria-label="画像がありません"
		>
			<div
				className={css({
					width: "full",
					height: "full",
					borderRadius: "md",
					fontSize: "7cqw",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontWeight: "bold",
					backgroundColor: "rgba(0, 0, 0, 0.1)",
					color: "white",
				})}
			>
				No Image
			</div>
		</div>
	);
};
