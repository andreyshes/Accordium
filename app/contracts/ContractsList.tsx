"use client";

import { useState } from "react";
import ContractCard from "./ContractCard";
import ContractSearch from "./ContractSearch";
import { Contract } from "@/types/Contract";

interface Props {
	ownerId: string;
	initialContracts: Contract[];
}

export default function ContractsList({ ownerId, initialContracts }: Props) {
	const [contracts, setContracts] = useState<Contract[]>(initialContracts);

	async function handleSearch(query: string) {
		const res = await fetch(
			`/api/contracts/search?q=${query}&owner=${ownerId}`
		);
		const json = await res.json();

		if (json.contracts) {
			setContracts(json.contracts as Contract[]);
		}
	}

	return (
		<div className="space-y-6">
			<ContractSearch onSearch={handleSearch} />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{contracts.map((c) => (
					<ContractCard key={c.id} contract={c} />
				))}
			</div>

			{contracts.length === 0 && (
				<p className="text-center text-gray-500 py-10">No contracts found.</p>
			)}
		</div>
	);
}
