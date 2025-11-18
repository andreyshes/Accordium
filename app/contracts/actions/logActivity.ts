"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export type ActivityType =
	| "created"
	| "updated"
	| "status_changed"
	| "signed"
	| "comment_added"
	| "file_uploaded"
	| "ai_analysis";

export interface LogActivityInput {
	contractId: string;
	type: ActivityType;
	message: string;
}

export async function logActivity(input: LogActivityInput) {
	const cookieStore = cookies();

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get: async (name) => (await cookieStore).get(name)?.value,
			},
		}
	);

	const { contractId, type, message } = input;

	if (!contractId) throw new Error("Missing contractId");
	if (!type) throw new Error("Missing activity type");
	if (!message) throw new Error("Missing activity message");

	const { error } = await supabase.from("contract_activity").insert({
		contract_id: contractId,
		type,
		message,
	});

	if (error) {
		console.error("Failed to log activity:", error);
		throw new Error(`Failed to log activity: ${error.message}`);
	}

	return { success: true };
}
