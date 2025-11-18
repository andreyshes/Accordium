import Link from "next/link";
import { FileText, Calendar, Tag } from "lucide-react";
import ContractStatusBadge, { ContractStatus } from "./ContractStatusBadge";
import { Contract } from "@/types/Contract";
import clsx from "clsx";

type ContractCardProps = {
	contract: Contract;
};

export default function ContractCard({ contract }: ContractCardProps) {
	return (
		<Link
			href={`/contracts/${contract.id}`}
			className={clsx(
				"group block rounded-xl border text-black border-gray-200 dark:border-gray-800 p-5",
				"bg-white shadow-sm hover:shadow-md",
				"transition-all duration-200 hover:-translate-y-0.5"
			)}
		>
			<div className="flex items-start justify-between mb-3">
				<h3 className="text-lg font-semibold text-black group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
					{contract.title}
				</h3>
				{contract.pdf_url && <FileText className="w-5 h-5 text-gray-400" />}
			</div>

			{contract.category && (
				<div className="flex items-center gap-2 mb-3 text-sm text-gray-500 ">
					<Tag className="w-4 h-4 b" />
					<span className="line-clamp-1 border-black ">
						{contract.category}
					</span>
				</div>
			)}

			{contract.tags && contract.tags.length > 0 && (
				<div className="flex flex-wrap gap-1 mb-3">
					{contract.tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-0.5 text-xs rounded-md bg-gray-100 border-bg-black text-gray-700 font-bold border-gray-200"
						>
							{tag}
						</span>
					))}
				</div>
			)}

			<div className="flex items-center justify-between mt-4">
				<ContractStatusBadge status={contract.status} />

				<div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
					<Calendar className="w-4 h-4 mr-1" />
					{new Date(contract.updated_at).toLocaleDateString(undefined, {
						month: "short",
						day: "numeric",
						year: "numeric",
					})}
				</div>
			</div>
		</Link>
	);
}
