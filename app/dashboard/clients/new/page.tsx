"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewClientPage() {
	const router = useRouter();
	const supabase = createSupabaseBrowserClient();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [company, setCompany] = useState("");
	const [notes, setNotes] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError("");

		if (!name.trim()) {
			const message = "Client name is required.";
			setError(message);
			toast.error(message);
			setLoading(false);
			return;
		}

		const { data: sessionData } = await supabase.auth.getUser();
		const user_id = sessionData?.user?.id;

		if (!user_id) {
			const message = "You must be logged in to add clients.";
			setError(message);
			toast.error(message);
			setLoading(false);
			return;
		}

		const { error: insertError } = await supabase.from("clients").insert({
			owner_id: user_id,
			name,
			email,
			phone,
			company_name: company,
			notes,
		});

		if (insertError) {
			setError(insertError.message);
			toast.error(insertError.message);
			setLoading(false);
			return;
		}

		toast.success("Client added");
		router.push("/dashboard/clients");
	}

	return (
		<div className="max-w-2xl mx-auto px-8 py-10">
			<Link
				href="/dashboard/clients"
				className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-6"
			>
				<ArrowLeft size={18} />
				Back to Clients
			</Link>

			<h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-4">
				Add Client
			</h1>
			<p className="text-gray-500 mb-8">
				Store detailed information about your client for easy access later.
			</p>

			<form
				onSubmit={handleSubmit}
				className="space-y-6 bg-white p-8 border border-gray-200 rounded-xl shadow-sm"
			>
				{/* Name */}
				<div className="flex flex-col gap-2">
					<label className="font-medium text-gray-700">Full Name *</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="John Doe"
						className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
					/>
				</div>

				{/* Email */}
				<div className="flex flex-col gap-2">
					<label className="font-medium text-gray-700">Email Address</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="john@example.com"
						className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
					/>
				</div>

				{/* Phone */}
				<div className="flex flex-col gap-2">
					<label className="font-medium text-gray-700">Phone Number</label>
					<input
						type="text"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="(555) 555-5555"
						className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
					/>
				</div>

				{/* Company */}
				<div className="flex flex-col gap-2">
					<label className="font-medium text-gray-700">Company Name</label>
					<input
						type="text"
						value={company}
						onChange={(e) => setCompany(e.target.value)}
						placeholder="Acme Corp."
						className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
					/>
				</div>

				{/* Notes */}
				<div className="flex flex-col gap-2">
					<label className="font-medium text-gray-700">Notes</label>
					<textarea
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						placeholder="Extra details about the client..."
						className="border border-gray-300 rounded-lg px-3 py-2 h-28 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
					/>
				</div>

				{error && <p className="text-red-600 text-sm">{error}</p>}

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? (
						<Loader2 className="animate-spin" size={20} />
					) : (
						"Add Client"
					)}
				</button>
			</form>
		</div>
	);
}
