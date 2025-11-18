import ClientsTable from "@/app/components/clients/ClientsTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ClientsPage() {
	return (
		<div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-semibold tracking-tight text-gray-900">
					Clients
				</h1>

				<Link
					href="/dashboard/clients/new"
					className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm hover:bg-gray-800 transition"
				>
					<Plus size={16} />
					Add Client
				</Link>
			</div>

			<ClientsTable />
		</div>
	);
}
