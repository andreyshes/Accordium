import { supabaseServer } from "@/app/lib/supabaseServer";
import ClientDetailsView from "@/app/components/clients/ClientDetailsView";
import { redirect } from "next/navigation";

export default async function ClientDetailsPage(props: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await props.params;

	const supabase = supabaseServer();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/auth/login");
	}

	const { data: client } = await supabase
		.from("clients")
		.select("*")
		.eq("id", id)
		.eq("owner_id", user!.id)
		.single();

	return <ClientDetailsView client={client} />;
}
