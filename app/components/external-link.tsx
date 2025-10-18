import type { ComponentPropsWithRef } from "react";
import { ExternalLink as ExternalLinkIcon } from "react-feather";
import { css, cx } from "styled-system/css";

import type { WithCSSProps } from "~/types/with-css-props";
import { AnchorLike } from "./anchor-like";

export const ExternalLink = ({
	className,
	css: customCSS,
	children,
	...props
}: WithCSSProps<ComponentPropsWithRef<"a">>) => {
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: リンククリック時の親要素伝播を防止したいので
		<a
			{...props}
			className={cx(css({ display: "inline" }, customCSS), className)}
			target="_blank"
			rel="noopener noreferrer"
			// biome-ignore lint/a11y/useValidAnchor: click イベントのためだけにリンクにボタン使うのはよくない
			onClick={(e) => e.stopPropagation()}
		>
			<AnchorLike>
				{children}
				<ExternalLinkIcon
					className={css({
						display: "inline",
						height: "1em",
						width: "1em",
						margin: "0.1em",
					})}
					aria-hidden="true"
				/>
			</AnchorLike>
		</a>
	);
};
