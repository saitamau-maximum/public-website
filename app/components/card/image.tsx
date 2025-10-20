import type { ComponentPropsWithRef } from "react";
import { css, cx } from "styled-system/css";

import type { WithCSSProps } from "~/types/with-css-props";

export const CardImg = ({
	css: customCSS,
	className,
	alt,
	...props
}: WithCSSProps<ComponentPropsWithRef<"img">> & { alt: string }) => {
	return (
		<img
			{...props}
			alt={alt}
			className={cx(
				css(
					{
						width: "100%",
						aspectRatio: "16 / 9",
						objectFit: "cover",
						objectPosition: "center",
						borderRadius: "md",
						borderWidth: "1px",
						borderStyle: "solid",
						borderColor: "gray.300",
					},
					customCSS,
				),
				className,
			)}
		/>
	);
};
