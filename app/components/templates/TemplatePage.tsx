"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wand2, ArrowLeft } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

export interface TemplateField {
	id: string;
	label: string;
	placeholder?: string;
	required?: boolean;
}

export interface TemplatePageProps {
	title: string;
	description: string;
	fields: TemplateField[];
	template: string;
}

export default function TemplatePage({
	title,
	description,
	fields,
	template,
}: TemplatePageProps) {
	const router = useRouter();
	const [form, setForm] = useState<Record<string, string>>({});
	const [aiDraft, setAiDraft] = useState("");
	const [loading, setLoading] = useState(false);

	function fillTemplate(template: string, data: Record<string, string>) {
		return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
	}

	const handleChange = (id: string, value: string) => {
		setForm((prev) => ({ ...prev, [id]: value }));
	};

const handleGenerate = () => {
		setLoading(true);
		setTimeout(() => {
			const draft = fillTemplate(template, form);
			setAiDraft(draft);
			setLoading(false);
			toast.success("Draft generated");
		}, 300);
	};

	const handleUseDraft = () => {
		if (!aiDraft.trim()) {
			toast.error("Generate a draft first");
			return;
		}

		if (typeof window !== "undefined") {
			window.sessionStorage.setItem("contract-prefill", aiDraft);
		}

		router.push("/contracts/new");
	};

	return (
		<div className="max-w-4xl mx-auto py-12 px-6">
			<button
				onClick={() => router.back()}
				className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition mb-8"
			>
				<ArrowLeft className="h-4 w-4" />
				<span>Back to Templates</span>
			</button>

		
			<div className="mb-10">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
				<p className="text-gray-600 text-lg">{description}</p>
			</div>

			<div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6">
				{fields.map((f) => (
					<div key={f.id} className="space-y-1">
						<label className="block font-semibold text-gray-800">
							{f.label}
							{f.required && <span className="text-red-500 ml-1">*</span>}
						</label>

						{f.placeholder && f.placeholder.length > 40 ? (
							<textarea
								placeholder={f.placeholder}
								required={f.required}
								onChange={(e) => handleChange(f.id, e.target.value)}
								className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 transition bg-white rounded-lg p-3 h-24"
							/>
						) : (
							<input
								type="text"
								placeholder={f.placeholder}
								required={f.required}
								onChange={(e) => handleChange(f.id, e.target.value)}
								className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 transition bg-white rounded-lg p-3"
							/>
						)}
					</div>
				))}

				<button
					onClick={handleGenerate}
					disabled={loading}
					className={clsx(
						"w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition",
						"bg-blue-600 text-white hover:bg-blue-700",
						loading && "opacity-50 cursor-not-allowed"
					)}
				>
					<Wand2 className="h-5 w-5" />
					{loading ? "Generating…" : "Generate AI Draft"}
				</button>

				{aiDraft && (
					<div className="mt-8 space-y-3">
						<h3 className="font-semibold text-gray-800 text-lg">
							Generated Contract Draft
						</h3>

						<textarea
							className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 h-64 focus:ring focus:ring-blue-100 focus:border-blue-500 transition"
							value={aiDraft}
							onChange={(e) => setAiDraft(e.target.value)}
						/>
					</div>
				)}
			</div>

			<div className="mt-8">
				<button
					onClick={handleUseDraft}
					disabled={!aiDraft.trim()}
					className={clsx(
						"w-full py-3 rounded-lg font-semibold transition",
						aiDraft.trim()
							? "bg-green-600 text-white hover:bg-green-700"
							: "bg-gray-200 text-gray-500 cursor-not-allowed"
					)}
				>
					Use This Draft → Create Contract
				</button>
			</div>
		</div>
	);
}
