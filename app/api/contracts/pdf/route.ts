import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import apiError from "@/app/lib/api-error";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const path = searchParams.get("path");

		if (!path) {
			return apiError("Missing file path", 400);
		}

		const bucket = process.env.NEXT_PUBLIC_SUPABASE_CONTRACTS_BUCKET!;
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

		const { data, error } = await supabase.storage
			.from(bucket)
			.createSignedUrl(path, 3600);

		if (error || !data) {
			console.error("Signed URL error:", error);
			return apiError("Failed to create signed url", 500);
		}

		return NextResponse.json({ signedUrl: data.signedUrl });
	} catch (err) {
		console.error(err);
		return apiError("Server error", 500);
	}
}
