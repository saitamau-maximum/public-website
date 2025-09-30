import type { ComponentPropsWithRef } from "react";
import { css, cx } from "styled-system/css";

import type { WithCSSProps } from "~/types/with-css-props";

export const AnchorLike = ({
	className,
	css: customCSS,
	...props
}: WithCSSProps<ComponentPropsWithRef<"span">>) => {
	return (
		<span
			{...props}
			className={cx(
				css(
					{
						color: "green.600",
						textDecoration: "underline",
						transition: "color",
						_hover: {
							color: "green.700",
						},
					},
					customCSS,
				),
				className,
			)}
		/>
	);
};
