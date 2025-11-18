import { supabaseServer } from "@/app/lib/supabaseServer";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Topbar from "@/app/components/dashboard/Topbar";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = supabaseServer();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) redirect("/auth/login");

	return (
		<div>
			<Topbar />
			<Sidebar />
			<main className="ml-64 mt-24 p-8">{children}</main>
		</div>
	);
}
