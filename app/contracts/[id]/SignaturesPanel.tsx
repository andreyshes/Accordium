"use client";

import { useTransition } from "react";
import { CheckCircle, CircleDashed, UserCheck } from "lucide-react";
import { signContract } from "@/app/contracts/actions/signContract";

type SignatureContract = {
	id: string;
	owner_signed?: boolean | null;
	signer_signed?: boolean | null;
	owner?: { email?: string | null } | null;
	signer?: { email?: string | null } | null;
};

export default function SignaturesPanel({
	contract,
}: {
	contract: SignatureContract;
}) {
	const [isPending, startTransition] = useTransition();

	const ownerSigned = contract.owner_signed;
	const signerSigned = contract.signer_signed;

	return (
		<div className="border rounded-xl p-6 bg-white shadow-sm space-y-5">
			<h2 className="text-xl font-semibold text-gray-900">Signatures</h2>

			<div className="space-y-4">
				{/* Owner */}
				<div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
					<div className="flex items-center gap-3">
						<UserCheck className="w-5 h-5 text-gray-500" />
						<div>
							<p className="text-sm font-medium text-gray-700">Owner</p>
							<p className="text-xs text-gray-500">
								{contract.owner?.email || "Unknown"}
							</p>
						</div>
					</div>

					<div
						className={`text-sm font-medium px-3 py-1 rounded-full ${
							ownerSigned
								? "bg-green-100 text-green-700 border border-green-200"
								: "bg-yellow-100 text-yellow-700 border border-yellow-200"
						}`}
					>
						{ownerSigned ? (
							<span className="flex items-center gap-1">
								<CheckCircle size={14} /> Signed
							</span>
						) : (
							<span className="flex items-center gap-1">
								<CircleDashed size={14} /> Pending
							</span>
						)}
					</div>
				</div>

				{/* Signer */}
				<div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50">
					<div className="flex items-center gap-3">
						<UserCheck className="w-5 h-5 text-gray-500" />
						<div>
							<p className="text-sm font-medium text-gray-700">Signer</p>
							<p className="text-xs text-gray-500">
								{contract.signer?.email || "Not Assigned"}
							</p>
						</div>
					</div>

					<div
						className={`text-sm font-medium px-3 py-1 rounded-full ${
							signerSigned
								? "bg-green-100 text-green-700 border border-green-200"
								: "bg-yellow-100 text-yellow-700 border border-yellow-200"
						}`}
					>
						{signerSigned ? (
							<span className="flex items-center gap-1">
								<CheckCircle size={14} /> Signed
							</span>
						) : (
							<span className="flex items-center gap-1">
								<CircleDashed size={14} /> Pending
							</span>
						)}
					</div>
				</div>
			</div>

			{/* Buttons */}
			<div className="flex gap-3 pt-2">
				<button
					disabled={isPending}
					onClick={() =>
						startTransition(() => signContract(contract.id, "owner"))
					}
					className="px-3 py-1.5 text-sm border border-gray-300 rounded-md
                   text-gray-700 hover:bg-gray-100 active:bg-gray-200
                   transition disabled:opacity-40"
				>
					Sign as Owner
				</button>

				<button
					disabled={isPending}
					onClick={() =>
						startTransition(() => signContract(contract.id, "signer"))
					}
					className="px-3 py-1.5 text-sm border border-gray-300 rounded-md
                   text-gray-700 hover:bg-gray-100 active:bg-gray-200
                   transition disabled:opacity-40"
				>
					Sign as Signer
				</button>
			</div>
		</div>
	);
}
