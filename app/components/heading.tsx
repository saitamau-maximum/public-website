import type { ComponentPropsWithRef } from "react";
import { css, cx } from "styled-system/css";

import type { WithCSSProps } from "~/types/with-css-props";

export const H1 = ({
	className,
	css: customCss,
	...props
}: WithCSSProps<ComponentPropsWithRef<"h1">>) => {
	return (
		<h1
			{...props}
			className={cx(
				css(
					{
						fontSize: "2xl",
						fontWeight: "bold",
						marginTop: 10,
						marginBottom: 4,
					},
					customCss,
				),
				className,
			)}
		/>
	);
};

export const H2 = ({
	className,
	css: customCss,
	...props
}: WithCSSProps<ComponentPropsWithRef<"h2">>) => {
	return (
		<h2
			{...props}
			className={cx(
				css(
					{
						fontSize: "xl",
						fontWeight: "bold",
						marginTop: 8,
						marginBottom: 2,
					},
					customCss,
				),
				className,
			)}
		/>
	);
};
