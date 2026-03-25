import { createTheme, globalStyle, style } from "@vanilla-extract/css";

export const [themeClass, theme] = createTheme({
	color: {
		brand: "#0074c7",
		accent: "#dd0033",
		background: "#1e1e1e",
		text: "#e1e1e1",
	},
	gap: "8px",
	padding: "8px",
	border: "3px",
	borderRadius: "5px",
});

globalStyle("*", {
	margin: 0,
	padding: 0,
	boxSizing: "border-box",
});

globalStyle("body,html", {
	margin: 0,
	padding: 0,

	backgroundColor: theme.color.background,
	color: theme.color.text,
});

globalStyle("a", {
	color: theme.color.brand,
	textDecoration: theme.color.accent,
});
