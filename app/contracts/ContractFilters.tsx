"use client";

import React from "react";
import { X } from "lucide-react";
import clsx from "clsx";

export interface ContractFiltersState {
	status?: string;
	category?: string;
	tag?: string;
}

interface Props {
	filters: ContractFiltersState;
	categories?: string[];
	tags?: string[];
	onChange: (filters: ContractFiltersState) => void;
	onClear: () => void;
}

export default function ContractFilters({
	filters,
	categories = [],
	tags = [],
	onChange,
	onClear,
}: Props) {
	function updateFilter(key: keyof ContractFiltersState, value: string) {
		onChange({
			...filters,
			[key]: value || undefined,
		});
	}

	const hasFilters = Boolean(filters.status || filters.category || filters.tag);

	return (
		<div
			className={clsx(
				"w-full rounded-lg border border-gray-200 dark:border-gray-800",
				"bg-white dark:bg-gray-900 p-4 mb-6",
				"flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
			)}
		>
			{/* Status Filter */}
			<select
				value={filters.status ?? ""}
				onChange={(e) => updateFilter("status", e.target.value)}
				className={
					"px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
				}
			>
				<option value="">All Statuses</option>
				<option value="draft">Draft</option>
				<option value="pending">Pending</option>
				<option value="signed">Signed</option>
				<option value="rejected">Rejected</option>
			</select>

			<select
				value={filters.category ?? ""}
				onChange={(e) => updateFilter("category", e.target.value)}
				className={
					"px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
				}
			>
				<option value="">All Categories</option>
				{categories.map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>

			<select
				value={filters.tag ?? ""}
				onChange={(e) => updateFilter("tag", e.target.value)}
				className={
					"px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
				}
			>
				<option value="">All Tags</option>
				{tags.map((tag) => (
					<option key={tag} value={tag}>
						{tag}
					</option>
				))}
			</select>

			{hasFilters && (
				<button
					onClick={onClear}
					className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:underline"
				>
					<X className="h-4 w-4" /> Clear Filters
				</button>
			)}
		</div>
	);
}
