"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, ArrowLeft } from "lucide-react";
import clsx from "clsx";
import { createUserTemplate } from "@/app/dashboard/templates/actions/createUserTemplate";
import { toast } from "sonner";

export default function NewUserTemplatePage() {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [body, setBody] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit() {
		if (!title || !body) {
			toast.error("Title and body are required");
			return;
		}

		setLoading(true);

		try {
			await createUserTemplate({
				title,
				description: description || undefined,
				category: category || undefined,
				body,
			});

			toast.success("Template created");
			router.push("/templates");
		} catch (error) {
			console.error(error);
			toast.error("Failed to create template");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="p-10">
			{/* Back Button */}
			<button
				onClick={() => router.back()}
				className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition"
			>
				<ArrowLeft className="h-4 w-4" />
				<span>Back to Templates</span>
			</button>

			{/* Page Header */}
			<h1 className="text-3xl font-bold text-gray-900 mb-2">
				Create New Template
			</h1>
			<p className="text-gray-500 mb-10 max-w-xl">
				Add a reusable template your team can use when creating contracts.
			</p>

			{/* Card */}
			<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-8 max-w-3xl">
				{/* Title */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700">
						Template Title <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						placeholder="e.g. Vendor Agreement, Offer Letter, Cleaning Outline"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
					/>
				</div>

				{/* Description */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700">
						Description
					</label>
					<input
						type="text"
						placeholder="Short description (optional)"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
					/>
				</div>

				{/* Category */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700">Category</label>
					<input
						type="text"
						placeholder="e.g. Legal, Client Work, HR, Construction"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
					/>
				</div>

				{/* Body */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 flex items-center gap-2">
						<FileText className="h-4 w-4 text-gray-500" />
						Template Body <span className="text-red-500">*</span>
					</label>

					<textarea
						placeholder="Write or paste your contract template here..."
						value={body}
						onChange={(e) => setBody(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-3 bg-white h-72 focus:ring-2 focus:ring-blue-500 outline-none"
					/>
				</div>

				{/* Submit */}
				<button
					onClick={handleSubmit}
					disabled={!title || !body || loading}
					className={clsx(
						"w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition",
						loading
							? "bg-blue-600/60 cursor-not-allowed text-white"
							: "bg-blue-600 hover:bg-blue-700 text-white"
					)}
				>
					{loading ? (
						<>
							<Loader2 className="h-5 w-5 animate-spin" />
							Creating Template...
						</>
					) : (
						"Create Template"
					)}
				</button>
			</div>
		</div>
	);
}
