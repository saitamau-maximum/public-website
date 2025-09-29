import { Outlet } from "react-router";
import { cq } from "styled-system/patterns";

export default function Root() {
	return (
		<div className={cq({ name: "main" })}>
			<Outlet />
		</div>
	);
}
