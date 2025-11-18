"use server";

import { randomUUID } from "crypto";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { logActivity } from "@/app/contracts/actions/logActivity";
import { generateContractPDF } from "@/app/lib/pdf/generateContractPDF";

export interface CreateContractInput {
	title: string;
	signerId?: string;
	category?: string;
	tags?: string[];
	metadata?: Record<string, unknown>;
	dueDate?: string;
	pdfFile?: File | string | null;
	body?: string | null;
}

const CONTRACTS_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_CONTRACTS_BUCKET;

if (!CONTRACTS_BUCKET) {
	throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_CONTRACTS_BUCKET");
}

function isFileLike(file: unknown): file is File {
	return (
		typeof file === "object" &&
		file !== null &&
		"arrayBuffer" in file &&
		typeof (file as File).arrayBuffer === "function"
	);
}

export async function createContract(input: CreateContractInput) {
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

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error("Unauthorized");

	const {
		title,
		signerId,
		category,
		tags = [],
		metadata = {},
		dueDate,
		body = "",
		pdfFile,
	} = input;

	if (!title.trim()) throw new Error("Title is required");

	const ownerId = user.id;

	let finalPdfBuffer: Buffer;

	if (pdfFile && isFileLike(pdfFile)) {
		finalPdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
	} else {
		try {
			finalPdfBuffer = await generateContractPDF(title, body ?? "");
		} catch (err) {
			console.error("PDF generation error:", err);
			throw new Error("Failed to auto-generate PDF");
		}
	}

	const objectPath = `${ownerId}/${randomUUID()}.pdf`;

	const { error: uploadError } = await supabase.storage
		.from(CONTRACTS_BUCKET!)
		.upload(objectPath, finalPdfBuffer, {
			cacheControl: "3600",
			upsert: true,
			contentType: "application/pdf",
		});

	if (uploadError) {
		console.error("Storage upload failed:", uploadError);
		throw new Error("Could not upload PDF to Supabase Storage");
	}

	const pdf_path = objectPath;
	const pdf_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${CONTRACTS_BUCKET}/${objectPath}`;

	// --------------------------------------------
	// 3️⃣ Insert the contract record
	// --------------------------------------------
	const { data, error } = await supabase
		.from("contracts")
		.insert({
			title,
			owner_id: ownerId,
			signer_id: signerId || null,
			category: category || null,
			tags,
			metadata,
			due_date: dueDate || null,
			content: body || null,
			status: "draft",
			pdf_url,
			pdf_path,
		})
		.select()
		.single();

	if (error) {
		console.error("Failed to create contract:", error);
		throw new Error(`Failed to create contract: ${error.message}`);
	}

	await logActivity({
		contractId: data.id,
		type: "created",
		message: `Contract '${title}' created by ${ownerId}`,
	});

	return data;
}
