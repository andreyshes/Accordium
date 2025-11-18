export default function Loading() {
	return (
		<div className="p-8">
			<div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse" />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-4">
					<div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
					<div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
				</div>

				<div className="space-y-4">
					<div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
					<div className="space-y-3">
						<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
						<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
						<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
					</div>
					<div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
				</div>
			</div>
		</div>
	);
}
