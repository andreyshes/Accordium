"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { logActivity } from "@/app/contracts/actions/logActivity";

export interface UpdateContractInput {
	contractId: string;
	title?: string;
	status?: string;
	signerId?: string | null;
	category?: string;
	tags?: string[];
	metadata?: Record<string, unknown>;
	dueDate?: string | null;
	pdfFile?: File | null;
}

export async function updateContract(input: UpdateContractInput) {
	const cookieStore = await cookies();
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get: (name) => cookieStore.get(name)?.value,
			},
		}
	);

	const { contractId } = input;
	if (!contractId) throw new Error("Missing contractId");

	// 1. Fetch existing contract to compare changes
	const { data: existing, error: fetchError } = await supabase
		.from("contracts")
		.select("*")
		.eq("id", contractId)
		.single();

	if (fetchError || !existing) throw new Error("Contract not found");

	const updates: Record<string, unknown> = {};
	const activityMessages: string[] = [];

	// Title changed
	if (input.title && input.title !== existing.title) {
		updates.title = input.title;
		activityMessages.push(
			`Title updated: '${existing.title}' → '${input.title}'`
		);
	}

	// Status changed
	if (input.status && input.status !== existing.status) {
		updates.status = input.status;
		activityMessages.push(
			`Status changed: '${existing.status}' → '${input.status}'`
		);
	}

	// Signer changed
	if (input.signerId !== undefined && input.signerId !== existing.signer_id) {
		updates.signer_id = input.signerId;
		activityMessages.push(
			`Signer changed: '${existing.signer_id ?? "none"}' → '${
				input.signerId ?? "none"
			}'`
		);
	}

	// Category changed
	if (input.category && input.category !== existing.category) {
		updates.category = input.category;
		activityMessages.push(
			`Category changed: '${existing.category}' → '${input.category}'`
		);
	}

	// Tags changed
	if (
		input.tags &&
		JSON.stringify(input.tags) !== JSON.stringify(existing.tags)
	) {
		updates.tags = input.tags;
		activityMessages.push(`Tags updated`);
	}

	// Metadata changed
	if (
		input.metadata &&
		JSON.stringify(input.metadata) !== JSON.stringify(existing.metadata)
	) {
		updates.metadata = input.metadata;
		activityMessages.push(`Metadata updated`);
	}

	// Due date changed
	if (input.dueDate !== undefined && input.dueDate !== existing.due_date) {
		updates.due_date = input.dueDate;
		activityMessages.push(
			`Due date changed: '${existing.due_date}' → '${input.dueDate}'`
		);
	}

	// TODO: handle pdf upload
	if (input.pdfFile) {
		// Placeholder for upload logic
		activityMessages.push("PDF file replaced");
	}

	// If no changes
	if (Object.keys(updates).length === 0) {
		return { unchanged: true };
	}

	// 2. Apply update
	const { data: updated, error: updateError } = await supabase
		.from("contracts")
		.update(updates)
		.eq("id", contractId)
		.select()
		.single();

	if (updateError) throw new Error(updateError.message);

	// 3. Log activities
	for (const msg of activityMessages) {
		await logActivity({ contractId, type: "updated", message: msg });
	}

	return updated;
}
