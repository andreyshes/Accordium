"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createUserTemplate(input: {
	title: string;
	description?: string;
	category?: string;
	body: string;
}) {
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

	if (!user) throw new Error("Not authenticated");

	const { data, error } = await supabase
		.from("user_templates")
		.insert({
			title: input.title,
			description: input.description,
			category: input.category,
			body: input.body,
			owner_id: user.id,
		})
		.select()
		.single();

	if (error) throw new Error(error.message);

	return data;
}
