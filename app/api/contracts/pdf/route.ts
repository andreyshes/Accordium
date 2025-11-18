import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const path = searchParams.get("path");

		if (!path) {
			return NextResponse.json(
				{ error: "Missing file storage path" },
				{ status: 400 }
			);
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
			return NextResponse.json(
				{ error: "Failed to create signed URL" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ signedUrl: data.signedUrl });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
