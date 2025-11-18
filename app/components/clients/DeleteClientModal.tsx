"use client";

import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteClientModal({
	clientId,
	onClose,
}: {
	clientId: string;
	onClose: () => void;
}) {
	const router = useRouter();
	const supabase = createSupabaseBrowserClient();
	const [loading, setLoading] = useState(false);

	async function handleDelete() {
		setLoading(true);

		const { error } = await supabase
			.from("clients")
			.delete()
			.eq("id", clientId);

		setLoading(false);

		if (error) {
			toast.error("Failed to delete client");
		} else {
			toast.success("Client deleted");
			onClose();
			router.push("/dashboard/clients");
			router.refresh();
		}
	}

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999">
			<div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative animate-fadeIn">
				<button
					className="absolute top-3 right-3 text-gray-500 hover:text-black"
					onClick={onClose}
				>
					<X size={22} />
				</button>

				<h2 className="text-xl font-semibold text-gray-900 mb-3">
					Delete Client?
				</h2>
				<p className="text-gray-600 mb-6">
					This action is permanent and cannot be undone.
				</p>

				<div className="flex justify-end gap-3">
					<button
						className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
						onClick={onClose}
					>
						Cancel
					</button>

					<button
						onClick={handleDelete}
						disabled={loading}
						className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50"
					>
						{loading ? (
							<Loader2 size={18} className="animate-spin" />
						) : (
							"Delete"
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
