"use client";

import { useState } from "react";
import EditClientModal from "@/app/components/clients/EditClientModal";
import DeleteClientModal from "@/app/components/clients/DeleteClientModal";
import {
	ArrowLeft,
	Mail,
	Phone,
	Building2,
	User2,
	Pencil,
	Trash2,
} from "lucide-react";
import Link from "next/link";

type Client = {
	id: string;
	name: string;
	email?: string | null;
	phone?: string | null;
	company_name?: string | null;
	notes?: string | null;
	created_at: string;
};

export default function ClientDetailsView({
	client,
}: {
	client: Client | null;
}) {
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	if (!client) {
		return (
			<div className="max-w-4xl mx-auto px-8 py-10">
				<h1 className="text-xl font-semibold">Client Not Found</h1>
				<p className="text-gray-500 mt-2">
					This client does not exist or was removed.
				</p>
				<Link
					href="/dashboard/clients"
					className="mt-4 inline-block text-gray-900 hover:underline"
				>
					Back to Clients
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto px-8 py-10 space-y-10">
			<Link
				href="/dashboard/clients"
				className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
			>
				<ArrowLeft size={18} />
				Back to Clients
			</Link>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-6">
					<div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold text-gray-800">
						{client.name.charAt(0)}
					</div>

					<div>
						<h1 className="text-3xl font-semibold tracking-tight">
							{client.name}
						</h1>
						<p className="text-gray-500 mt-1 text-sm">Client ID: {client.id}</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<button
						onClick={() => setShowEdit(true)}
						className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
					>
						<Pencil size={16} />
						Edit
					</button>

					<button
						onClick={() => setShowDelete(true)}
						className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
					>
						<Trash2 size={16} />
						Delete
					</button>
				</div>
			</div>

			{/* Info Card */}
			<div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">
				<h2 className="text-xl font-semibold text-gray-900">
					Client Information
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="flex items-center gap-3 text-gray-700">
						<Mail size={18} className="text-gray-500" />
						{client.email || <span className="text-gray-400">No email</span>}
					</div>

					<div className="flex items-center gap-3 text-gray-700">
						<Phone size={18} className="text-gray-500" />
						{client.phone || <span className="text-gray-400">No phone</span>}
					</div>

					<div className="flex items-center gap-3 text-gray-700">
						<Building2 size={18} className="text-gray-500" />
						{client.company_name || (
							<span className="text-gray-400">No company</span>
						)}
					</div>

					<div className="flex items-center gap-3 text-gray-700">
						<User2 size={18} className="text-gray-500" />
						Added: {new Date(client.created_at).toLocaleDateString()}
					</div>
				</div>

				{/* Notes */}
				<div className="mt-6">
					<h3 className="font-medium text-gray-800 mb-2">Notes</h3>
					<p className="text-gray-600 leading-relaxed">
						{client.notes || (
							<span className="text-gray-400">No notes added.</span>
						)}
					</p>
				</div>
			</div>

			{/* Modals */}
			{showEdit && (
				<EditClientModal client={client} onClose={() => setShowEdit(false)} />
			)}
			{showDelete && (
				<DeleteClientModal
					clientId={client.id}
					onClose={() => setShowDelete(false)}
				/>
			)}
		</div>
	);
}
