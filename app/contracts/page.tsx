import { supabaseServer } from "@/app/lib/supabaseServer";
import { redirect } from "next/navigation";
import Link from "next/link";
import ContractsList from "@/app/contracts/ContractsList";
import type { Contract } from "@/types/Contract";

const INITIAL_LIMIT = 30;

export default async function ContractsPage() {
	const supabase = supabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect("/auth/login");

	const { data: contracts, error } = await supabase
		.from("contracts")
		.select("*")
		.eq("owner_id", user.id)
		.order("created_at", { ascending: false })
		.limit(INITIAL_LIMIT);

	if (error) {
		console.error("Contracts fetch error:", error);
	}

	return (
		<div className="p-8 max-w-7xl mx-auto space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-semibold tracking-tight">Contracts</h1>

				<Link
					href="/contracts/new"
					className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
				>
					New Contract
				</Link>
			</div>

			<ContractsList
				ownerId={user.id}
				initialContracts={(contracts ?? []) as Contract[]}
			/>
		</div>
	);
}
