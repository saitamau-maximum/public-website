import { Fragment, type ReactNode } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { ExternalLink } from "~/components/external-link";
import { H2, H3, H4 } from "~/components/heading";

export const html2elem = (html: string): ReactNode => {
	return unified()
		.use(rehypeParse, { fragment: true })
		.use(rehypeReact, {
			Fragment,
			jsx,
			jsxs,
			components: {
				h2: H2,
				h3: H3,
				h4: H4,
				a: ExternalLink,
			},
		})
		.processSync(html).result;
};
