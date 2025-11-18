"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { generateContractPDF } from "@/app/lib/pdf/generateContractPDF";
import { logActivity } from "@/app/contracts/actions/logActivity";

const CONTRACTS_BUCKET =
	process.env.NEXT_PUBLIC_SUPABASE_CONTRACTS_BUCKET ?? "contracts";

function normalizeBaseUrl(url: string | undefined) {
	if (!url) return "";
	return url.endsWith("/") ? url.slice(0, -1) : url;
}

function buildPublicUrl(path: string) {
	const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
	return `${base}/storage/v1/object/public/${CONTRACTS_BUCKET}/${path}`;
}

function extractStoragePath(pdfUrl: string | null) {
	if (!pdfUrl) return null;
	const base = normalizeBaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
	const publicPrefix = `${base}/storage/v1/object/public/${CONTRACTS_BUCKET}/`;

	if (pdfUrl.startsWith(publicPrefix)) {
		return pdfUrl.slice(publicPrefix.length);
	}

	// If the stored value already looks like a relative path, just use it.
	if (!pdfUrl.includes("://")) {
		return pdfUrl.replace(/^\/+/, "");
	}

	return null;
}

export async function ensureContractPdf(contractId: string) {
	if (!contractId) throw new Error("Missing contract id");

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

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) throw new Error("Unauthorized");

	const { data: contract, error } = await supabase
		.from("contracts")
		.select("*")
		.eq("id", contractId)
		.eq("owner_id", user.id)
		.single();

	if (error || !contract) {
		throw new Error("Contract not found");
	}

	let pdfUrl: string | null = contract.pdf_url;
	let storagePath = extractStoragePath(pdfUrl);

	if (!pdfUrl || !storagePath) {
		const pdfBuffer = await generateContractPDF(
			contract.title ?? "Contract",
			contract.content ?? ""
		);

		const objectPath = `${contract.owner_id}/${randomUUID()}.pdf`;

		const { error: uploadError } = await supabase.storage
			.from(CONTRACTS_BUCKET)
			.upload(objectPath, pdfBuffer, {
				cacheControl: "3600",
				upsert: true,
				contentType: "application/pdf",
			});

		if (uploadError) {
			console.error("PDF upload failed", uploadError);
			throw new Error("Failed to store regenerated PDF");
		}

		pdfUrl = buildPublicUrl(objectPath);
		storagePath = objectPath;

		await supabase.from("contracts").update({ pdf_url: pdfUrl }).eq("id", contractId);

		await logActivity({
			contractId,
			type: "file_uploaded",
			message: "Contract PDF regenerated",
		});
	}

	if (!storagePath) {
		return { url: pdfUrl };
	}

	const { data: signed, error: signedError } = await supabase.storage
		.from(CONTRACTS_BUCKET)
		.createSignedUrl(storagePath, 60 * 60);

	if (signedError || !signed?.signedUrl) {
		return { url: pdfUrl };
	}

	return { url: signed.signedUrl };
}
