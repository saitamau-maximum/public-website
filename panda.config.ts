import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
	// body の全体のスタイル
	body: {
		fontFamily: '"Noto Sans JP", sans-serif',
		color: "gray.600",
		backgroundGradient: "primary",
		backgroundRepeat: "no-repeat",
		width: "100%",
		minHeight: "100dvh",
		display: "flex",
		flexDirection: "column",
		lineHeight: 1.7,
		letterSpacing: "0.04em",
	},

	// main 配下の要素スタイル
	"main p": { marginTop: 2, marginBottom: 2 },
	"main blockquote": {
		marginTop: 2,
		marginBottom: 2,
		paddingLeft: 5,
		position: "relative",
		_before: {
			position: "absolute",
			left: 1,
			top: 0,
			content: '""',
			display: "inline-block",
			width: 1,
			height: "100%",
			backgroundGradient: "primary",
		},
	},
	"main code": {
		fontFamily: '"Noto Sans Mono", monospace',
		backgroundColor: "rose.50",
		color: "rose.900",
		padding: 0.5,
		borderRadius: "sm",
		fontSize: "0.9em",
	},
	// header ぶんの高さだけスクロール位置をずらす
	"main *": { scrollMarginTop: "headerHeight" },
});

export default defineConfig({
	globalCss,

	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ["./app/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			tokens: {
				gradients: {
					primary: {
						value: {
							type: "linear",
							placement: "to right bottom",
							stops: ["#34AA8E", "#63C178"],
						},
					},
				},
				spacing: {
					headerHeight: { value: "64px" },
				},
				zIndex: {
					header: { value: "50" },
					loader: { value: "60" },
				},
			},
		},
	},

	shorthands: false,
	minify: true,
	hash: true,

	// The output directory for your css system
	outdir: "styled-system",
});
