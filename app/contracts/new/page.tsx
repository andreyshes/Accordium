"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	FileText,
	User,
	Tag,
	Calendar,
	Upload,
	Check,
	Loader2,
	ScrollText,
} from "lucide-react";

import clsx from "clsx";
import BackButton from "../[id]/BackButton";
import { Modal } from "@/app/components/ui/Modal";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { createContract } from "../actions/createContract";
import { toast } from "sonner";

export default function NewContractPage() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [category, setCategory] = useState("");
	const [signerId, setSignerId] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [dueDate, setDueDate] = useState("");
	const [pdfFile, setPdfFile] = useState<File | null>(null);

	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	// Prefill draft text stored client-side
	useEffect(() => {
		if (typeof window === "undefined") return;
		const draft = window.sessionStorage.getItem("contract-prefill");
		if (draft) {
			setBody(draft);
			window.sessionStorage.removeItem("contract-prefill");
		}
	}, []);

	function showModal(message: string) {
		setModalMessage(message);
		setModalOpen(true);
	}

	// Handle PDF upload
	function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file && file.type === "application/pdf") {
			setPdfFile(file);
		} else {
			toast.error("Please upload a valid PDF file.");
		}
	}

	// Handle contract creation
	async function handleSubmit() {
		if (!title.trim()) return showModal("A contract title is required.");
		if (!body.trim()) return showModal("Contract body cannot be empty.");

		try {
			setLoading(true);

			const supabase = createSupabaseBrowserClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				showModal("You must be logged in to create a contract.");
				setLoading(false);
				return;
			}

			// Create contract using server action
			const contract = await createContract({
				title,
				signerId: signerId || undefined,
				category: category || undefined,
				tags,
				metadata: {},
				body,
				dueDate: dueDate || undefined,
				pdfFile,
			});

			toast.success("Contract created");
			router.push(`/contracts/${contract.id}`);
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong. Please try again.");
			showModal("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-6">
			<BackButton />

			<h1 className="text-3xl font-semibold tracking-tight text-center mb-4">
				Create a New Contract
			</h1>

			<p className="text-center text-gray-500 max-w-xl mx-auto mb-10">
				Upload a contract, assign signers, set due dates, and organize your
				paperwork.
			</p>

			<div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-8">
				{/* Title */}
				<Field label="Contract Title" required icon={<FileText />}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Service Agreement, NDA, Lease Contract..."
						className="form-input"
					/>
				</Field>

				{/* Signer */}
				<Field label="Signer ID (optional)" icon={<User />}>
					<input
						type="text"
						value={signerId}
						onChange={(e) => setSignerId(e.target.value)}
						placeholder="User ID or email"
						className="form-input"
					/>
				</Field>

				{/* Category */}
				<Field label="Category">
					<input
						type="text"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						placeholder="Legal, HR, Construction, Sales..."
						className="form-input"
					/>
				</Field>

				{/* Tags */}
				<Field label="Tags" icon={<Tag />}>
					<input
						type="text"
						placeholder="Comma separated (urgent, q1, onboarding)"
						onChange={(e) => {
							const arr = e.target.value.split(",").map((t) => t.trim());
							setTags(arr.filter(Boolean));
						}}
						className="form-input"
					/>

					{tags.length > 0 && (
						<div className="flex flex-wrap gap-2 mt-2">
							{tags.map((t, i) => (
								<span key={i} className="tag">
									{t}
								</span>
							))}
						</div>
					)}
				</Field>

				{/* Body */}
				<Field label="Contract Body" icon={<ScrollText />}>
					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						className="form-textarea h-80"
					/>
				</Field>

				<Field label="Due Date" icon={<Calendar />}>
					<input
						type="date"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						className="form-input"
					/>
				</Field>

				{/* PDF Upload */}
				<Field label="Upload PDF" icon={<Upload />}>
					<div className="upload-box">
						<input
							type="file"
							accept="application/pdf"
							onChange={handlePdfUpload}
						/>
						{pdfFile ? (
							<span className="upload-success">
								<Check /> {pdfFile.name}
							</span>
						) : (
							<span className="upload-empty">
								<Upload /> No file selected
							</span>
						)}
					</div>
				</Field>

				{/* Submit */}
				<button
					onClick={handleSubmit}
					disabled={loading}
					className={clsx(
						"btn-primary w-full flex items-center justify-center gap-2",
						loading && "opacity-50"
					)}
				>
					{loading ? (
						<Loader2 className="h-5 w-5 animate-spin" />
					) : (
						"Create Contract"
					)}
				</button>
			</div>

			<Modal
				open={modalOpen}
				title="Notice"
				message={modalMessage}
				onClose={() => setModalOpen(false)}
			/>
		</div>
	);
}

function Field({
	label,
	children,
	required,
	icon,
}: {
	label: string;
	children: React.ReactNode;
	required?: boolean;
	icon?: React.ReactNode;
}) {
	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-gray-600 flex items-center gap-2">
				{icon} {label} {required && <span className="text-red-500">*</span>}
			</label>
			{children}
		</div>
	);
}
