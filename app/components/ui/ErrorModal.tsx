"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/Button";

interface ErrorModalProps {
	open: boolean;
	message: string;
	onClose: () => void;
}

export function ErrorModal({ open, message, onClose }: ErrorModalProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-sm bg-white">
				<DialogHeader>
					<DialogTitle className="text-red-600">Login Failed</DialogTitle>
				</DialogHeader>

				<p className="text-gray-600">{message}</p>

				<DialogFooter>
					<Button
						onClick={onClose}
						className="bg-gray-900 text-white hover:bg-gray-800"
					>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
