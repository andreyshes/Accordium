import { notFound } from "next/navigation";
import { getContract } from "@/app/contracts/actions/getContracts";
import ContractStatusBadge, {
	ContractStatus,
} from "@/app/contracts/ContractStatusBadge";
import SignaturesPanel from "./SignaturesPanel";
import DeleteContractButton from "./DeleteContractButton";
import ActivityTimeline from "@/app/contracts/[id]/ActivityTimeline";
import { User, Calendar } from "lucide-react";
import BackButton from "./BackButton";
import ContractPDFViewer from "@/app/contracts/components/ContractPDFViewer";
import DownloadPdfButton from "./DownloadPdfButton";
export default async function ContractDetailPage(props: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await props.params;

	const contract = await getContract(id);

	if (!contract) return notFound();

	return (
		<div className="max-w-5xl mx-auto p-8 space-y-10">
			<BackButton />
			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 ">
						{contract.title}
					</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
						Contract ID: {contract.id}
					</p>
				</div>
				<ContractStatusBadge
					status={contract.status as ContractStatus}
					className="text-base px-3 py-1"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				<div className="lg:col-span-2 space-y-8">
					<div className="border rounded-lg p-6 bg-white">
						<h2 className="text-lg font-semibold mb-4">Contract PDF</h2>
						<ContractPDFViewer
							pdfUrl={contract.pdf_url}
							pdfPath={contract.pdf_path}
						/>
					</div>

					<DownloadPdfButton contractId={contract.id} />

					<div className="border rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4">Metadata</h2>
						<div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
							{Object.keys(contract.metadata || {}).length === 0 ? (
								<p className="text-gray-500">No metadata assigned</p>
							) : (
								Object.entries(contract.metadata).map(([key, value]) => (
									<div
										key={key}
										className="flex justify-between border-b border-gray-200 dark:border-gray-800 py-2"
									>
										<span className="font-medium">{key}</span>
										<span>{String(value)}</span>
									</div>
								))
							)}
						</div>
					</div>

					<div className="border rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4">Activity</h2>
						<ActivityTimeline items={contract.activity} />
					</div>
				</div>

				{/* Right Column */}
				<div className="space-y-6">
					{/* Participants */}
					<div className="border rounded-lg p-6">
						<h2 className="text-lg font-semibold mb-4">Participants</h2>

						<div className="flex items-center gap-3 mb-4">
							<User className="h-5 w-5 text-gray-500" />
							<div>
								<p className="font-medium">Owner</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{contract.owner?.full_name ||
										contract.owner?.email ||
										"Unknown"}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<User className="h-5 w-5 text-gray-500" />
							<div>
								<p className="font-medium">Signer</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{contract.signer?.full_name ||
										contract.signer?.email ||
										"Not assigned"}
								</p>
							</div>
						</div>
					</div>

					{/* Details */}
					<div className="border rounded-lg p-6 space-y-3">
						<h2 className="text-lg font-semibold mb-4">Details</h2>

						<div className="flex items-center gap-2 text-sm">
							<Calendar className="h-4 w-4 text-gray-500" />
							Created: {new Date(contract.created_at).toLocaleDateString()}
						</div>

						<div className="flex items-center gap-2 text-sm">
							<Calendar className="h-4 w-4 text-gray-500" />
							Updated: {new Date(contract.updated_at).toLocaleDateString()}
						</div>

						{contract.due_date && (
							<div className="flex items-center gap-2 text-sm text-red-500 font-medium">
								<Calendar className="h-4 w-4" /> Due by: {contract.due_date}
							</div>
						)}
					</div>

					<SignaturesPanel contract={contract} />
					<DeleteContractButton contractId={contract.id} />
				</div>
			</div>
		</div>
	);
}
