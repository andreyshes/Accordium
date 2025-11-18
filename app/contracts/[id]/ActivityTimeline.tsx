"use client";

import {
	Clock,
	Edit3,
	FileText,
	CheckCircle,
	AlertTriangle,
} from "lucide-react";

export interface ActivityItem {
	id: string;
	type: string;
	message: string;
	created_at: string;
}

interface Props {
	items: ActivityItem[] | null | undefined;
}

const ICON_MAP: Record<string, React.ReactNode> = {
	created: <FileText className="h-4 w-4 text-blue-500" />,
	updated: <Edit3 className="h-4 w-4 text-amber-500" />,
	status_changed: <CheckCircle className="h-4 w-4 text-green-500" />,
	signed: <CheckCircle className="h-4 w-4 text-green-600" />,
	file_uploaded: <FileText className="h-4 w-4 text-purple-500" />,
	ai_analysis: <AlertTriangle className="h-4 w-4 text-indigo-500" />,
};

export default function ActivityTimeline({ items }: Props) {
	if (!items || items.length === 0) {
		return <p className="text-black text-sm">No activity to display.</p>;
	}

	return (
		<div className="relative space-y-6">
			<div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

			{items.map((item) => {
				const icon = ICON_MAP[item.type] || (
					<Clock className="h-4 w-4 text-gray-400" />
				);

				return (
					<div key={item.id} className="relative pl-10">
						<div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 flex items-center justify-center">
							{icon}
						</div>

						{/* Message */}
						<div className="text-sm font-medium text-gray-800">
							{item.message}
						</div>

						{/* Timestamp */}
						<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							{new Date(item.created_at).toLocaleString()}
						</div>
					</div>
				);
			})}
		</div>
	);
}
