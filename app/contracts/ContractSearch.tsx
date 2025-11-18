"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";

interface ContractSearchProps {
	onSearch: (query: string) => void;
	placeholder?: string;
	initialValue?: string;
}

export default function ContractSearch({
	onSearch,
	placeholder = "Search contracts...",
	initialValue = "",
}: ContractSearchProps) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const timer = setTimeout(() => {
			onSearch(value.trim());
		}, 300);

		return () => clearTimeout(timer);
	}, [value, onSearch]);

	return (
		<div
			className={clsx(
				"relative w-full max-w-md",
				"transition-all duration-200"
			)}
		>
			<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />

			<input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				className={clsx(
					"w-full pl-10 pr-4 py-2.5",
					"rounded-lg border border-gray-300 dark:border-gray-700",
					"bg-white",
					"text-sm text-gray-900 ",
					"placeholder:text-gray-400 dark:placeholder:text-gray-500",
					"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
					"transition-all"
				)}
			/>
		</div>
	);
}
