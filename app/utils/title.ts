import { SITE_TITLE, SITE_TITLE_DELIMITER } from "~/constants/site-config";

export const makePageTitle = (title: string[]) => {
	return [...title, SITE_TITLE]
		.filter((t) => Boolean(t))
		.join(SITE_TITLE_DELIMITER);
};
