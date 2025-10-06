import { type ReactNode, useState } from "react";
import { css } from "styled-system/css";

interface Props {
	children: ReactNode;
}

export const Spoiler = ({ children }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	return isOpen ? (
		// biome-ignore lint/a11y/useSemanticElements: inline element with click handler
		<span
			className={css({
				backgroundColor: "gray.200",
				borderRadius: "md",
				paddingLeft: 1,
				paddingRight: 1,
			})}
			tabIndex={0}
			aria-expanded={isOpen}
			aria-disabled="true"
			role="button"
		>
			{children}
		</span>
	) : (
		// biome-ignore lint/a11y/useSemanticElements: inline element with click handler
		<span
			className={css({
				display: "inline",
				cursor: "pointer",
				userSelect: "none",
				color: "gray.600",
				backgroundColor: "gray.600",
				borderRadius: "md",
				paddingLeft: 1,
				paddingRight: 1,
				_hover: {
					backgroundColor: "gray.500",
					color: "gray.500",
				},
			})}
			tabIndex={0}
			onClick={() => setIsOpen(true)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					setIsOpen(true);
				}
			}}
			aria-expanded={isOpen}
			role="button"
			title="クリックしてネタバレを表示"
		>
			{children}
		</span>
	);
};
