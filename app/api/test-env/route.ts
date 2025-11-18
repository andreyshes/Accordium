import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		NEXT_PUBLIC_SUPABASE_CONTRACTS_BUCKET:
			process.env.NEXT_PUBLIC_SUPABASE_CONTRACTS_BUCKET,
	});
}
