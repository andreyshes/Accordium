"use server";

import { supabaseServer } from "@/app/lib/supabaseServer";
import { createClient } from "@supabase/supabase-js";

export async function deleteAccount() {
	const supabase = supabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!serviceKey) {
		throw new Error("Missing service role key");
	}

	// Cleanup user-owned data
	type SupabaseResponse = { error: Error | null };

	const deletions: SupabaseResponse[] = await Promise.all([
		supabase.from("contracts").delete().eq("owner_id", user.id),
		supabase.from("clients").delete().eq("owner_id", user.id),
		supabase.from("user_templates").delete().eq("owner_id", user.id),
		supabase.from("profiles").delete().eq("id", user.id),
		supabase.from("user_settings").delete().eq("user_id", user.id),
	]);

	const failed = deletions.find((result) => result.error);

	if (failed?.error) {
		throw failed.error;
	}

	const adminClient = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		serviceKey,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		}
	);

	const { error } = await adminClient.auth.admin.deleteUser(user.id);

	if (error) {
		throw error;
	}

	return { success: true };
}
