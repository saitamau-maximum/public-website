import type { ComponentProps } from "react";
import { css, cx } from "styled-system/css";

type Props = ComponentProps<"th">;

export const Th = ({ children, className, ...props }: Props) => {
	return (
		<th
			className={cx(
				css({
					padding: 2,
					fontWeight: 600,
					backgroundColor: "gray.100",
					color: "gray.600",
					whiteSpace: "nowrap",
					borderBottomWidth: 1,
					borderBottomStyle: "solid",
					borderBottomColor: "gray.200",
				}),
				className,
			)}
			{...props}
		>
			{children}
		</th>
	);
};
