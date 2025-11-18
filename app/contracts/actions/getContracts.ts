"use server";

import { supabaseServer } from "@/app/lib/supabaseServer";

export interface ContractDetailUser {
	id: string;
	email: string | null;
	full_name: string | null;
}

export interface ContractDetail {
	id: string;
	title: string;
	status: string;
	pdf_url: string | null;
	pdf_path: string | null;
	category: string | null;
	tags: string[] | null;
	metadata: Record<string, unknown>;
	content: string | null;
	due_date: string | null;
	signed_at: string | null;
	created_at: string;
	updated_at: string;
	owner_id: string;
	signer_id: string | null;
	owner: ContractDetailUser | null;
	signer: ContractDetailUser | null;
	activity: {
		id: string;
		type: string;
		message: string;
		created_at: string;
	}[];
}

export async function getContract(
	contractId: string
): Promise<ContractDetail | null> {
	if (!contractId) throw new Error("Missing contractId");

	const supabase = supabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

	// 1. Fetch contract
	const { data: contract, error: contractError } = await supabase
		.from("contracts")
		.select("*")
		.eq("id", contractId)
		.eq("owner_id", user.id)
		.single();

	if (contractError) {
		console.error("Failed to fetch contract:", contractError);
		return null;
	}

	// 2. Fetch related owner profile
	let owner: ContractDetailUser | null = null;
	if (contract.owner_id) {
		const { data: ownerData } = await supabase
			.from("profiles")
			.select("id, email, full_name")
			.eq("id", contract.owner_id)
			.single();

		owner = ownerData ?? null;
	}

	// 3. Fetch related signer profile
	let signer: ContractDetailUser | null = null;
	if (contract.signer_id) {
		const { data: signerData } = await supabase
			.from("profiles")
			.select("id, email, full_name")
			.eq("id", contract.signer_id)
			.single();

		signer = signerData ?? null;
	}

	const { data: activity, error: activityError } = await supabase
		.from("contract_activity")
		.select("id, type, message, created_at")
		.eq("contract_id", contractId)
		.order("created_at", { ascending: false });

	if (activityError) {
		console.error("Failed to fetch activity timeline:", activityError);
	}

	return {
		...contract,
		owner,
		signer,
		activity: activity ?? [],
	} as ContractDetail;
}
