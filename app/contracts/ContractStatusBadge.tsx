import clsx from "clsx";

export type ContractStatus = "draft" | "pending" | "signed" | "rejected";

interface Props {
	status: ContractStatus;
	className?: string;
}

const STATUS_STYLES: Record<ContractStatus, string> = {
	draft:
		"bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
	pending:
		"bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700",
	signed:
		"bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700",
	rejected:
		"bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700",
};

export function ContractStatusBadge({ status, className }: Props) {
	return (
		<span
			className={clsx(
				"inline-flex items-center px-2 py-1 text-xs font-medium rounded-md transition-colors",
				STATUS_STYLES[status],
				className
			)}
		>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}

export default ContractStatusBadge;
