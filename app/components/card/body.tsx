import type { ComponentPropsWithRef } from "react";
import { css, cx } from "styled-system/css";

import type { WithCSSProps } from "~/types/with-css-props";

export const CardBody = ({
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
						width: "100%",
					},
					customCSS,
				),
				className,
			)}
		/>
	);
};
