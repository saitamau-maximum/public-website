import { MoreHorizontal } from "react-feather";
import { css } from "styled-system/css";

export const PaginationEllipsis = () => {
	return (
		<li>
			<span
				className={css({
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: 4,
					height: 4,
					borderRadius: "md",
					color: "gray.400",
				})}
			>
				<MoreHorizontal size={16} />
			</span>
		</li>
	);
};
