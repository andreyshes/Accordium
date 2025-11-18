"use client";

import { useTransition, useState } from "react";
import { deleteContract } from "@/app/contracts/actions/deleteContract";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteContractButton({
	contractId,
}: {
	contractId: string;
}) {
	const [isPending, startTransition] = useTransition();
	const [confirmOpen, setConfirmOpen] = useState(false);

	return (
		<div className="border rounded-lg p-6 space-y-4 bg-white">
			<h2 className="font-semibold text-lg text-red-600">Danger Zone</h2>

			<button
				onClick={() => setConfirmOpen(true)}
				className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition text-sm font-medium w-full"
			>
				<Trash2 className="h-4 w-4" />
				Delete Contract
			</button>

			{confirmOpen && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-xl shadow-xl w-[350px] space-y-4">
						<h3 className="font-semibold text-lg">Delete Contract?</h3>
						<p className="text-sm text-gray-600">
							This action cannot be undone. The contract and its PDF will be
							permanently removed.
						</p>

						<div className="flex justify-end gap-2">
							<button
								onClick={() => setConfirmOpen(false)}
								className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition text-sm"
							>
								Cancel
							</button>

							<button
								onClick={() =>
									startTransition(() => deleteContract(contractId))
								}
								disabled={isPending}
								className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition text-sm flex items-center gap-2"
							>
								{isPending ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Trash2 className="h-4 w-4" />
								)}
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
