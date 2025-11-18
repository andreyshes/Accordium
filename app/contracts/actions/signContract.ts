"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function signContract(
	contractId: string,
	role: "owner" | "signer"
) {
	const cookieStore = await cookies();
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{ cookies: { get: (n) => cookieStore.get(n)?.value } }
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error("Unauthorized");

	const update =
		role === "owner"
			? { owner_signed: true, owner_signed_at: new Date().toISOString() }
			: { signer_signed: true, signer_signed_at: new Date().toISOString() };

	const { error } = await supabase
		.from("contracts")
		.update(update)
		.eq("id", contractId);

	if (error) throw new Error(error.message);
}
