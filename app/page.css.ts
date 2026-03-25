import { style } from "@vanilla-extract/css";
import { theme } from "./layout.css";

export const page = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: theme.gap,
	padding: theme.padding,
});
