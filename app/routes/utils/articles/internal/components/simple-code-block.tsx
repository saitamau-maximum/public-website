import { css } from "styled-system/css";

export const SimpleCodeBlock = ({ code }: { code: string }) => {
	return (
		<pre
			className={css({
				backgroundColor: "gray.100",
				borderColor: "gray.300",
				borderWidth: 1,
				borderStyle: "solid",
				padding: 4,
				borderRadius: 4,
				overflowX: "auto",
				userSelect: "all",
			})}
		>
			{code}
		</pre>
	);
};
