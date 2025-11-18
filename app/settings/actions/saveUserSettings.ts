"use server";

import { supabaseServer } from "@/app/lib/supabaseServer";

export async function saveUserSettings(updates: Partial<UserSettings>) {
	const supabase = supabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error("Unauthorized");

	const { error } = await supabase.from("user_settings").upsert({
		user_id: user.id,
		...updates,
		updated_at: new Date().toISOString(),
	});

	if (error) throw error;

	return { success: true };
}

export interface UserSettings {
	notify_contract_signed: boolean;
	notify_contract_viewed: boolean;
	notify_due_date: boolean;
	dark_mode: boolean;
}
