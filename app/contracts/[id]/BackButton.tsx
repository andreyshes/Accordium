"use client";

import { ArrowBigLeft } from "lucide-react";

export default function BackButton() {
	return (
		<ArrowBigLeft
			className="h-6 w-6 text-black cursor-pointer hover:text-gray-700 transition"
			onClick={() => window.history.back()}
		/>
	);
}
