"use client";

import { useEffect, useState, useCallback } from "react";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { toast } from "sonner";
import { User } from "lucide-react";

export default function ProfilePage() {
	const supabase = createSupabaseBrowserClient();

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [company, setCompany] = useState("");
	const [signatureName, setSignatureName] = useState("");
	const [signatureTitle, setSignatureTitle] = useState("");
	const [saved, setSaved] = useState(false);

	const loadProfile = useCallback(async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) return;

		setEmail(user.email ?? "");

		const { data: profile } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.single();

		if (profile) {
			setFullName(profile.full_name || "");
			setCompany(profile.company || "");
			setSignatureName(profile.signature_name || profile.full_name || "");
			setSignatureTitle(profile.signature_title || "");
		}

		setLoading(false);
	}, [supabase]);

useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		loadProfile();
	}, [loadProfile]);

	async function saveProfile() {
		setSaving(true);
		setSaved(false);

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			setSaving(false);
			return;
		}

		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			full_name: fullName,
			company,
			signature_name: signatureName,
			signature_title: signatureTitle,
			updated_at: new Date().toISOString(),
		});

		if (error) {
			console.error(error);
			toast.error("Failed to save profile");
			setSaving(false);
			return;
		}

		await new Promise((r) => setTimeout(r, 400));

		setSaving(false);
		setSaved(true);
		toast.success("Profile updated!");
	}

	if (loading) return <p className="p-8 text-gray-500">Loading profile...</p>;

	return (
		<div className="max-w-5xl mx-auto p-8 space-y-10 animate-in fade-in duration-200">
			{/* PAGE TITLE */}
			<div>
				<h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
				<p className="text-gray-500 mt-1 text-sm">
					Manage your personal information, identity, and contract signature
					details.
				</p>
			</div>
			{saved && (
				<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
					✓ Profile saved successfully
				</div>
			)}

			{/* CARD */}
			<div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
				{/* PROFILE HEADER */}
				<div className="p-8 border-b border-gray-200 flex items-center gap-6">
					<div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border">
						<User size={34} className="text-gray-400" />
					</div>

					<div>
						<h2 className="text-xl font-semibold">
							{fullName || "Your Profile"}
						</h2>
						<p className="text-gray-500">{email}</p>
					</div>
				</div>

				{/* CARD BODY */}
				<div className="p-8 space-y-12">
					{/* SECTION 1 — BASIC INFO */}
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-semibold">Basic Information</h3>
							<p className="text-gray-500 text-sm mt-1">
								This information is used for account identity and billing.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-1">
								<label className="text-sm font-medium text-gray-700">
									Full Name
								</label>
								<Input
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
									placeholder="Your name"
								/>
							</div>

							<div className="space-y-1">
								<label className="text-sm font-medium text-gray-700">
									Email
								</label>
								<Input value={email} disabled />
							</div>

							<div className="space-y-1 md:col-span-2">
								<label className="text-sm font-medium text-gray-700">
									Company
								</label>
								<Input
									value={company}
									onChange={(e) => setCompany(e.target.value)}
									placeholder="Your business or organization"
								/>
							</div>
						</div>
					</div>

					{/* DIVIDER */}
					<hr className="border-gray-200" />

					{/* SECTION 2 — SIGNATURE */}
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-semibold">Signature Block</h3>
							<p className="text-gray-500 text-sm mt-1">
								Used on generated and signed contracts.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-1">
								<label className="text-sm font-medium text-gray-700">
									Signature Name
								</label>
								<Input
									value={signatureName}
									onChange={(e) => setSignatureName(e.target.value)}
									placeholder="Name that appears on contracts"
								/>
							</div>

							<div className="space-y-1">
								<label className="text-sm font-medium text-gray-700">
									Signature Title
								</label>
								<Input
									value={signatureTitle}
									onChange={(e) => setSignatureTitle(e.target.value)}
									placeholder="Owner, Contractor, CEO..."
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="p-8 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
					<Button
						onClick={saveProfile}
						disabled={saving}
						className="w-full flex items-center justify-center gap-2 transition-all"
					>
						{saving ? (
							<>
								<span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
								Saving...
							</>
						) : (
							"Save Changes"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
