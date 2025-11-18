import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
	title: "Accordium",
	description: "Your next generated contract awaits you",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-gray-50 text-gray-900">
				<Navbar />

				<div className="pt-20">{children}</div>
			</body>
		</html>
	);
}
