import type { Metadata } from "next";
import "./layout.css";
import { themeClass } from "./layout.css";

export const metadata: Metadata = {
	title: "Health Risk Scoring Tool",
	description: "A tool for calculating health risk.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={themeClass}>
			<body>{children}</body>
		</html>
	);
}
