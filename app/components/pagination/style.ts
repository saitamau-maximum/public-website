import { cva } from "styled-system/css";

export const buttonStyle = cva({
	base: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 8,
		height: 8,
		borderRadius: "md",
		cursor: "pointer",
		backgroundColor: "gray.100",
		fontWeight: "bold",
		_hover: {
			backgroundColor: "gray.200",
		},
		_disabled: {
			backgroundColor: "green.100",
			cursor: "default",
			_hover: {
				backgroundColor: "green.100",
			},
		},
	},
	variants: {
		type: {
			arrowButton: {
				cursor: "pointer",
				backgroundColor: "gray.100",
				_hover: {
					backgroundColor: "gray.200",
				},
				_disabled: {
					cursor: "default",
					color: "gray.400",
					backgroundColor: "gray.100",
					_hover: {
						backgroundColor: "gray.100",
					},
				},
			},
		},
	},
});
