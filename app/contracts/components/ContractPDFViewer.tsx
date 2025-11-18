"use client";

import { useEffect, useState } from "react";

interface Props {
	pdfUrl?: string | null;
	pdfPath?: string | null;
}

export default function ContractPDFViewer({ pdfUrl, pdfPath }: Props) {
	const [url, setUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			setLoading(true);
			setError(null);

			try {
				if (pdfPath) {
					const res = await fetch(
						`/api/contracts/pdf?path=${encodeURIComponent(pdfPath)}`
					);
					const json = await res.json();

					if (res.ok && json.signedUrl) {
						setUrl(json.signedUrl);
						setLoading(false);
						return;
					}
				}

				if (pdfUrl) {
					setUrl(pdfUrl);
					setLoading(false);
					return;
				}

				setError("No PDF is available for this contract.");
			} catch (err) {
				setError("Failed to load PDF.");
			} finally {
				setLoading(false);
			}
		}

		load();
	}, [pdfUrl, pdfPath]);

	if (loading) {
		return (
			<div className="w-full h-[500px] bg-gray-50 flex items-center justify-center rounded-lg">
				<p className="text-gray-500">Loading PDF...</p>
			</div>
		);
	}

	if (error || !url) {
		return (
			<div className="w-full h-[200px] bg-gray-50 flex items-center justify-center rounded-lg">
				<p className="text-red-500 font-medium">{error}</p>
			</div>
		);
	}

	return (
		<div className="w-full h-[650px] border rounded-lg overflow-hidden bg-white">
			<iframe src={url} className="w-full h-full" title="PDF Viewer" />
		</div>
	);
}
