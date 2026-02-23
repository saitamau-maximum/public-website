import { type ReactNode, useId } from "react";
import { css } from "styled-system/css";

interface Props {
	children?: ReactNode;
	withArrow?: boolean;
}

export const JoinFlowItem = ({ children, withArrow }: Props) => {
	const svgid = useId();

	return (
		<li className={css({ width: "full" })}>
			<span
				className={css({
					display: "inline-block",
					width: "full",
					backgroundColor: "white",
					padding: 4,
					textAlign: "center",
					borderRadius: "sm",
					boxShadow: "sm",
				})}
			>
				{children}
			</span>
			{withArrow && (
				<svg
					viewBox="0 0 24 24"
					width={24}
					height={24}
					aria-hidden="true"
					className={css({
						display: "block",
						margin: "1rem auto",
						transform: "rotate(180deg)",
					})}
				>
					<defs>
						<linearGradient id={svgid}>
							{/* 180deg 回転するので逆 */}
							<stop offset="0%" stopColor="#63C178" />
							<stop offset="100%" stopColor="#34AA8E" />
						</linearGradient>
					</defs>
					{/* feather icons の triangle */}
					<path
						d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
						fill={`url("#${svgid}")`}
					/>
				</svg>
			)}
		</li>
	);
};
