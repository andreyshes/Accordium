"use client";

import { useTransition } from "react";
import { FileText, Loader2 } from "lucide-react";
import { ensureContractPdf } from "@/app/contracts/actions/ensureContractPdf";
import { toast } from "sonner";

interface DownloadPdfButtonProps {
	contractId: string;
}

export default function DownloadPdfButton({
	contractId,
}: DownloadPdfButtonProps) {
	const [isPending, startTransition] = useTransition();

	const handleClick = () => {
		startTransition(async () => {
			try {
				const result = await ensureContractPdf(contractId);
				if (result?.url) {
					window.open(result.url, "_blank", "noopener,noreferrer");
				} else {
					toast.error("Unable to download PDF");
				}
			} catch (err) {
				console.error(err);
				toast.error("Failed to prepare PDF");
			}
		});
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={isPending}
			className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm disabled:opacity-60"
		>
			{isPending ? (
				<>
					<Loader2 className="w-4 h-4 animate-spin" />
					Preparing PDF...
				</>
			) : (
				<>
					<FileText size={16} />
					Download PDF
				</>
			)}
		</button>
	);
}
