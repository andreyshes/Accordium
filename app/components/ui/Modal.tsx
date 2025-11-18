export function Modal({
	open,
	title,
	message,
	onClose,
}: {
	open: boolean;
	title: string;
	message: string;
	onClose: () => void;
}) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-xl">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
					{title}
				</h2>

				<p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

				<button
					className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					onClick={onClose}
				>
					OK
				</button>
			</div>
		</div>
	);
}
