"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

type Client = {
	id: string;
	name: string;
	email?: string | null;
	phone?: string | null;
	company_name?: string | null;
	notes?: string | null;
};

export default function EditClientModal({
	client,
	onClose,
}: {
	client: Client;
	onClose: () => void;
}) {
	const supabase = createSupabaseBrowserClient();

	const [name, setName] = useState(client.name);
	const [email, setEmail] = useState(client.email || "");
	const [phone, setPhone] = useState(client.phone || "");
	const [company, setCompany] = useState(client.company_name || "");
	const [notes, setNotes] = useState(client.notes || "");

	const [loading, setLoading] = useState(false);

	async function handleUpdate(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const { error } = await supabase
			.from("clients")
			.update({
				name,
				email,
				phone,
				company_name: company,
				notes,
			})
			.eq("id", client.id);

		setLoading(false);

		if (error) {
			toast.error("Failed to update client");
		} else {
			toast.success("Client updated");
			onClose();
		}
	}

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999">
			<div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative animate-fadeIn">
				<button
					className="absolute top-3 right-3 text-gray-500 hover:text-black"
					onClick={onClose}
				>
					<X size={22} />
				</button>

				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					Edit Client
				</h2>

				<form onSubmit={handleUpdate} className="space-y-4">
					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Full Name</label>
						<input
							className="border border-gray-300 rounded-lg px-3 py-2"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Email</label>
						<input
							className="border border-gray-300 rounded-lg px-3 py-2"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Phone</label>
						<input
							className="border border-gray-300 rounded-lg px-3 py-2"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Company</label>
						<input
							className="border border-gray-300 rounded-lg px-3 py-2"
							value={company}
							onChange={(e) => setCompany(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-medium">Notes</label>
						<textarea
							className="border border-gray-300 rounded-lg px-3 py-2 h-24"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
					>
						{loading ? (
							<Loader2 className="animate-spin" size={20} />
						) : (
							"Save Changes"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
