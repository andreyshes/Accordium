import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";
import { Contract } from "@/types/Contract";
import { ContractStatus } from "@/app/contracts/ContractStatusBadge";

export async function GET(req: Request) {
	const supabase = supabaseServer();
	const { searchParams } = new URL(req.url);

	const q = searchParams.get("q") || "";
	const owner = searchParams.get("owner");

	let query = supabase
		.from("contracts")
		.select("*")
		.eq("owner_id", owner)
		.order("created_at", { ascending: false });

	if (q.trim()) {
		query = query.ilike("title", `%${q}%`);
	}

	const { data, error } = await query;

	if (error) return NextResponse.json({ error }, { status: 500 });

	const allowedStatuses: ContractStatus[] = [
		"draft",
		"pending",
		"signed",
		"rejected",
	];

	function mapContract(c: any): Contract {
		return {
			...c,
			status: allowedStatuses.includes(c.status) ? c.status : "draft",
		};
	}

	return NextResponse.json({
		contracts: (data ?? []).map(mapContract),
	});
}
