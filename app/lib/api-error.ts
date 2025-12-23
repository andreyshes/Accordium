import { NextResponse } from "next/server";
import type { ApiResponse } from "../../types/api-response";

export default function apiError(
	message: string,
	status = 400
): NextResponse<ApiResponse<null>> {
	return NextResponse.json(
		{
			success: false,
			error: message,
		},
		{ status }
	);
}
