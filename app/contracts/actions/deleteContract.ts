"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteContract(contractId: string) {
	const cookieStore = await cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name) {
					return cookieStore.get(name)?.value;
				},
			},
		}
	);

	const { data: contract } = await supabase
		.from("contracts")
		.select("pdf_url")
		.eq("id", contractId)
		.single();

	if (contract?.pdf_url) {
		try {
			const filePath = contract.pdf_url.split("/contracts/")[1];

			await supabase.storage
				.from(process.env.NEXT_PUBLIC_SUPABASE_CONTRACTS_BUCKET!)
				.remove([filePath]);
		} catch (err) {
			console.warn("Failed to remove PDF:", err);
		}
	}

	await supabase.from("contracts").delete().eq("id", contractId);

	redirect("/contracts");
}
