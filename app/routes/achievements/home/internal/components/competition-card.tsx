import type { ReactNode } from "react";
import { Link } from "react-router";
import { css } from "styled-system/css";

interface Props {
	imageUrl: string;
	title: string;
	standsFor?: string;
	to: string;
	children: ReactNode;
}

export const CompetitionCard = ({
	imageUrl,
	title,
	standsFor,
	to,
	children,
}: Props) => {
	return (
		<Link to={to}>
			<div
				className={css({
					marginTop: 4,
					marginBottom: 4,
					padding: 4,
					display: "flex",
					gap: 6,
					alignItems: "center",
					backgroundColor: "white",
					boxShadow: "sm",
					borderRadius: "sm",
					mdDown: {
						flexDirection: "column",
					},
				})}
			>
				<img
					src={imageUrl}
					alt={`${title} ロゴ`}
					className={css({
						aspectRatio: "16/9",
						width: "auto",
						maxWidth: "100%",
						height: 28,
						objectFit: "cover",
						objectPosition: "center",
						borderRadius: "sm",
					})}
				/>
				<div>
					<p
						className={css({
							fontSize: "xl",
							fontWeight: "bold",
							lineHeight: 1.1,
						})}
					>
						{title}
						{standsFor && (
							<>
								<br />
								<span
									className={css({
										fontSize: "xs",
										fontWeight: "normal",
									})}
								>
									{standsFor}
								</span>
							</>
						)}
					</p>
					<div>{children}</div>
				</div>
			</div>
		</Link>
	);
};
