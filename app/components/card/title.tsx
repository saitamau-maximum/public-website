import type { ComponentPropsWithRef } from "react";
import { css, cx } from "styled-system/css";

import type { WithCSSProps } from "~/types/with-css-props";

export const CardTitle = ({
	css: customCSS,
	className,
	...props
}: WithCSSProps<ComponentPropsWithRef<"p">>) => {
	return (
		<p
			{...props}
			className={cx(
				css(
					{
						width: "100%",
						fontWeight: "bold",
						fontSize: "lg",
						textAlign: "center",
						margin: 0,
						lineHeight: 1,
					},
					customCSS,
				),
				className,
			)}
		/>
	);
};
