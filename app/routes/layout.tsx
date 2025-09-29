import { Outlet } from "react-router";
import { css } from "styled-system/css";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

export default function Root() {
	return (
		<div
			className={css({
				backgroundGradient: "primary",
				backgroundRepeat: "no-repeat",
				width: "100%",
				minHeight: "100dvh",
				display: "flex",
				flexDirection: "column",
			})}
		>
			<Header />
			<main
				className={css({
					marginTop: "headerHeight",
					padding: 4,
					flexGrow: 1,
				})}
			>
				<div
					className={css({
						backgroundColor: "gray.50",
						borderRadius: "md",
						padding: 4,
					})}
				>
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
}
