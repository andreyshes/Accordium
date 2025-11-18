"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { Mail, Phone, Building2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Client = {
	id: string;
	user_id: string;
	name: string;
	email: string | null;
	phone: string | null;
	company_name: string | null;
	notes?: string | null;
	created_at: string;
};

export default function ClientsTable() {
	const supabase = createSupabaseBrowserClient();
	const [clients, setClients] = useState<Client[]>([]);
	const router = useRouter();
	const [userId, setUserId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 10;

	const [searchQuery, setSearchQuery] = useState("");
	const [filterCompany, setFilterCompany] = useState("all");

	const loadClients = useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			setClients([]);
			setUserId(null);
			setLoading(false);
			return;
		}

		setUserId(user.id);

		const { data, error } = await supabase
			.from("clients")
			.select("*")
			.eq("owner_id", user.id)
			.order("created_at", { ascending: false });

		if (error) {
			toast.error("Failed to load clients");
		}

		setClients(data ?? []);
		setLoading(false);
	}, [supabase]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		loadClients();
	}, [loadClients]);

	useEffect(() => {
		if (!userId) return;

		const channel = supabase
			.channel(`realtime-clients-${userId}`)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "clients",
					filter: `owner_id=eq.${userId}`,
				},
				loadClients
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel).catch(console.error);
		};
	}, [loadClients, supabase, userId]);

	const companyOptions = useMemo(() => {
		const names = clients
			.map((c) => c.company_name)
			.filter(Boolean) as string[];
		return ["all", ...new Set(names)];
	}, [clients]);

	const filteredClients = useMemo(() => {
		return clients.filter((client) => {
			const matchesSearch =
				client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				client.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(client.company_name &&
					client.company_name
						.toLowerCase()
						.includes(searchQuery.toLowerCase()));

			const matchesCompany =
				filterCompany === "all" || client.company_name === filterCompany;

			return matchesSearch && matchesCompany;
		});
	}, [clients, searchQuery, filterCompany]);

	const totalPages = Math.ceil(filteredClients.length / rowsPerPage);
	const startIndex = (currentPage - 1) * rowsPerPage;
	const currentRows = filteredClients.slice(
		startIndex,
		startIndex + rowsPerPage
	);

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	};

	const handleCompanyChange = (value: string) => {
		setFilterCompany(value);
		setCurrentPage(1);
	};

	return (
		<div className="bg-white border border-gray-200 rounded-xl shadow-sm">
			<div className="flex flex-wrap gap-4 justify-between items-center px-6 py-4 border-b bg-gray-50">
				<div className="relative w-full md:w-1/3">
					<Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
					<input
						type="text"
						placeholder="Search clients..."
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
						className="w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-gray-900"
					/>
				</div>

				<select
					value={filterCompany}
					onChange={(e) => handleCompanyChange(e.target.value)}
					className="px-3 py-2 border rounded-md text-sm bg-white"
				>
					{companyOptions.map((company) => (
						<option key={company} value={company}>
							{company === "all" ? "All Companies" : company}
						</option>
					))}
				</select>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="bg-gray-50">
						<tr className="text-left text-gray-600">
							<th className="px-6 py-3 font-medium">Client</th>
							<th className="px-6 py-3 font-medium">Contact</th>
							<th className="px-6 py-3 font-medium">Company</th>
							<th className="px-6 py-3 font-medium">Added</th>
						</tr>
					</thead>

					<tbody>
						{loading ? (
							Array.from({ length: 5 }).map((_, idx) => (
								<tr key={idx} className="border-t">
									<td className="px-6 py-4">
										<div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
									</td>
									<td className="px-6 py-4">
										<div className="space-y-2">
											<div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
											<div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
									</td>
									<td className="px-6 py-4">
										<div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
									</td>
								</tr>
							))
						) : currentRows.length === 0 ? (
							<tr>
								<td colSpan={4} className="py-12 text-center text-gray-500">
									No matching clients found.
								</td>
							</tr>
						) : (
							currentRows.map((client) => (
								<tr
									key={client.id}
									onClick={() => router.push(`/dashboard/clients/${client.id}`)}
									className="border-t hover:bg-gray-50 transition cursor-pointer"
								>
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-medium text-gray-700">
												{client.name.charAt(0).toUpperCase()}
											</div>
											<div>
												<p className="font-medium text-gray-900">
													{client.name}
												</p>
												<p className="text-gray-500 text-xs">
													Client ID: {client.id.slice(0, 6)}...
												</p>
											</div>
										</div>
									</td>

									<td className="px-6 py-4">
										<div className="flex flex-col gap-1">
											{client.email && (
												<div className="flex items-center gap-2 text-gray-700 text-sm">
													<Mail size={14} className="text-gray-500" />
													{client.email}
												</div>
											)}
											{client.phone && (
												<div className="flex items-center gap-2 text-gray-700 text-sm">
													<Phone size={14} className="text-gray-500" />
													{client.phone}
												</div>
											)}
										</div>
									</td>

									<td className="px-6 py-4 text-gray-800">
										<div className="flex items-center gap-2">
											<Building2 size={14} className="text-gray-500" />
											{client.company_name || "-"}
										</div>
									</td>

									<td className="px-6 py-4 text-gray-700">
										{new Date(client.created_at).toLocaleDateString()}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{filteredClients.length > rowsPerPage && (
				<div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
					<button
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((p) => p - 1)}
						className="px-3 py-1 border rounded-md text-sm disabled:opacity-40"
					>
						Previous
					</button>

					<p className="text-sm text-gray-600">
						Page {currentPage} of {totalPages}
					</p>

					<button
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage((p) => p + 1)}
						className="px-3 py-1 border rounded-md text-sm disabled:opacity-40"
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
