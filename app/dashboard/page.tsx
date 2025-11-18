import { supabaseServer } from "@/app/lib/supabaseServer";
import { Users, FileText, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";

export default async function DashboardPage() {
	const supabase = supabaseServer();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) redirect("/auth/login");

	const user_id = session.user.id;

	const { data: contracts } = await supabase
		.from("contracts")
		.select("*")
		.eq("owner_id", user_id)
		.order("created_at", { ascending: false });

	const { data: clients } = await supabase
		.from("clients")
		.select("*")
		.eq("owner_id", user_id)
		.order("created_at", { ascending: false });

	const { data: templates } = await supabase
		.from("templates")
		.select("*")
		.eq("owner_id", user_id)
		.order("created_at", { ascending: false });

	return (
		<div className="max-w-7xl mx-auto px-8 py-10 space-y-12">
			<h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>

			<div className="flex flex-wrap gap-4">
				<QuickAction
					label="New Contract"
					href="/contracts/new"
					icon={<FileText />}
				/>
				<QuickAction
					label="Add Client"
					href="/dashboard/clients/new"
					icon={<Users />}
				/>
				<QuickAction
					label="New Template"
					href="/dashboard/templates/new"
					icon={<Sparkles />}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<StatCard label="Contracts Created" value={contracts?.length ?? 0} />
				<StatCard label="Clients Added" value={clients?.length ?? 0} />
				<StatCard label="Templates Created" value={templates?.length ?? 0} />
			</div>

			<div className="space-y-4">
				<h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>

				<div className="rounded-xl border border-gray-200 bg-white shadow-sm">
					{getActivity(contracts ?? [], clients ?? []).length === 0 ? (
						<div className="p-6 text-gray-500 text-center">
							No recent activity yet.
						</div>
					) : (
						<ul className="divide-y divide-gray-200">
							{getActivity(contracts ?? [], clients ?? []).map(
								(item, index) => (
									<li key={index} className="p-4 flex items-center gap-4">
										<div className="p-3 rounded-full bg-gray-100 text-gray-700">
											{item.icon}
										</div>

										<div>
											<p className="font-medium text-gray-800">{item.text}</p>
											<p className="text-gray-500 text-sm">
												{item.dateLabel}
											</p>
										</div>
									</li>
								)
							)}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
			<h2 className="font-semibold text-gray-900 mb-2">{label}</h2>
			<p className="text-4xl font-bold text-gray-800">{value}</p>
		</div>
	);
}

function QuickAction({
	label,
	href,
	icon,
}: {
	label: string;
	href: string;
	icon: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm hover:bg-gray-800 transition shadow-sm"
		>
			{icon}
			{label}
		</Link>
	);
}

type ContractSummary = {
	id: string;
	title?: string | null;
	created_at: string;
};

type ClientSummary = {
	id: string;
	name: string;
	created_at: string;
};

type ActivityItem = {
	text: string;
	dateLabel: string;
	timestamp: number;
	icon: ReactNode;
};

function getActivity(
	contracts: ContractSummary[],
	clients: ClientSummary[]
): ActivityItem[] {
	const events: ActivityItem[] = [];

	contracts?.slice(0, 5).forEach((c) =>
		events.push({
			text: `Created contract: ${c.title ?? "Untitled Contract"}`,
			dateLabel: new Date(c.created_at).toLocaleString(),
			timestamp: new Date(c.created_at).getTime(),
			icon: <FileText size={18} />,
		})
	);

	clients?.slice(0, 5).forEach((cl) =>
		events.push({
			text: `Added new client: ${cl.name}`,
			dateLabel: new Date(cl.created_at).toLocaleString(),
			timestamp: new Date(cl.created_at).getTime(),
			icon: <Users size={18} />,
		})
	);

	return events.sort((a, b) => b.timestamp - a.timestamp);
}
