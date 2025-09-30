import type { ComponentPropsWithRef } from "react";
import { css, cx } from "styled-system/css";

import type { WithCSSProps } from "~/types/with-css-props";

export const Card = ({
	css: customCSS,
	className,
	...props
}: WithCSSProps<ComponentPropsWithRef<"div">>) => {
	return (
		<div
			{...props}
			className={cx(
				css(
					{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: 2,
						borderRadius: "md",
						boxShadow: "md",
						padding: 4,
						borderStyle: "solid",
						borderWidth: 1,
						borderColor: "gray.200",
						width: "md",
						maxWidth: "full",
					},
					customCSS,
				),
				className,
			)}
		/>
	);
};
