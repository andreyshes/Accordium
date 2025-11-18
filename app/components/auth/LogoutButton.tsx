"use client";

import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export default function LogoutButton() {
	const router = useRouter();
	const supabase = createSupabaseBrowserClient();

	async function handleLogout() {
		await supabase.auth.signOut();
		router.refresh();
	}

	return (
		<Button variant="outline" onClick={handleLogout}>
			Log out
		</Button>
	);
}
