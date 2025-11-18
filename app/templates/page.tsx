"use client";

import { useState } from "react";
import { templates } from "./templateRegistry";
import { Search } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function TemplatesLibraryPage() {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("All");

	const categories = ["All", ...new Set(templates.map((t) => t.category))];

	const filtered = templates.filter((t) => {
		const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = category === "All" || t.category === category;

		return matchesSearch && matchesCategory;
	});

	return (
		<div className="max-w-6xl mx-auto py-12 px-6 space-y-10">
			<div>
				<h1 className="text-4xl font-bold tracking-tight mb-3">
					Contract Templates
				</h1>
				<p className="text-gray-600  max-w-2xl">
					Choose from professionally crafted, ready-to-use contract templates.
					Customize and generate with AI to fit your exact workflow.
				</p>
			</div>

			<div className="flex flex-wrap gap-4 items-center justify-between">
				<div className="relative w-full max-w-md">
					<Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search templates..."
						className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white "
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className="flex gap-2 overflow-x-auto py-2">
					{categories.map((c) => (
						<button
							key={c}
							onClick={() => setCategory(c)}
							className={clsx(
								"px-4 py-2 rounded-full text-sm font-medium transition",
								c === category
									? "bg-blue-600 text-white"
									: "bg-gray-100  text-gray-700  hover:bg-gray-200"
							)}
						>
							{c}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filtered.map((t) => (
					<Link
						key={t.slug}
						href={`/templates/${t.slug}`}
						className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition shadow-gray-200"
					>
						<div className="flex items-center gap-3 mb-4">
							<t.icon className="h-6 w-6 text-blue-600" />
							<h3 className="text-lg font-semibold">{t.title}</h3>
						</div>

						<p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
							{t.description}
						</p>

						<span className="text-blue-600 font-medium text-sm group-hover:underline">
							Open Template →
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}
