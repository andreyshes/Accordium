"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { Switch } from "@/app/components/ui/Switch";
import { Button } from "@/app/components/ui/Button";
import { toast } from "sonner";
import { Bell, Moon, ShieldCheck, AlertTriangle } from "lucide-react";
import { deleteAccount } from "@/app/settings/actions/deleteAccount";

export default function SettingsPage() {
	const supabase = createSupabaseBrowserClient();

	const [loading, setLoading] = useState(true);
	const [isDeleting, startDelete] = useTransition();

	// Settings state
	const [notifySigned, setNotifySigned] = useState(true);
	const [notifyViewed, setNotifyViewed] = useState(true);
	const [notifyDue, setNotifyDue] = useState(true);
	const [darkMode, setDarkMode] = useState(false);

	const loadSettings = useCallback(async () => {
		const { data: userData } = await supabase.auth.getUser();
		if (!userData.user) return;

		const { data: profile } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", userData.user.id)
			.single();

		if (profile) {
			setNotifySigned(profile.notify_signed ?? true);
			setNotifyViewed(profile.notify_viewed ?? true);
			setNotifyDue(profile.notify_due ?? true);
			setDarkMode(profile.dark_mode ?? false);
		}

		// Apply dark mode instantly
		if (profile?.dark_mode) {
			document.documentElement.classList.add("dark");
		}

		setLoading(false);
	}, [supabase]);

useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		loadSettings();
	}, [loadSettings]);

	// Generic save function
	async function saveSetting(key: string, value: boolean) {
		const { data: userData } = await supabase.auth.getUser();

		const { error } = await supabase
			.from("profiles")
			.update({ [key]: value })
			.eq("id", userData.user?.id);

		if (error) {
			console.error(error);
			toast.error("Failed to update setting");
		} else {
			toast.success("Saved!");
		}
	}

	if (loading) {
		return <p className="p-8 text-gray-600">Loading settings…</p>;
	}

	return (
		<div className="max-w-4xl mx-auto p-8 space-y-12">
			{/* Page Title */}
			<div>
				<h1 className="text-4xl font-bold tracking-tight">Settings</h1>
				<p className="text-gray-600 mt-1">
					Manage notifications, appearance, and security.
				</p>
			</div>

			{/* NOTIFICATIONS */}
			<Section
				icon={<Bell className="h-5 w-5" />}
				title="Notifications"
				description="Control how we notify you about activity related to your contracts."
			>
				<SettingRow
					label="Contract Signed"
					value={notifySigned}
					onChange={(v) => {
						setNotifySigned(v);
						saveSetting("notify_signed", v);
					}}
				/>

				<SettingRow
					label="Contract Viewed"
					value={notifyViewed}
					onChange={(v) => {
						setNotifyViewed(v);
						saveSetting("notify_viewed", v);
					}}
				/>

				<SettingRow
					label="Due Date Reminder"
					value={notifyDue}
					onChange={(v) => {
						setNotifyDue(v);
						saveSetting("notify_due", v);
					}}
				/>
			</Section>

			{/* APPEARANCE */}
			<Section
				icon={<Moon className="h-5 w-5" />}
				title="Appearance"
				description="Customize how Accordium looks to you."
			>
				<SettingRow
					label="Dark Mode"
					value={darkMode}
					onChange={(v) => {
						setDarkMode(v);
						saveSetting("dark_mode", v);
						document.documentElement.classList.toggle("dark", v);
					}}
				/>
			</Section>

			{/* SECURITY */}
			<Section
				icon={<ShieldCheck className="h-5 w-5" />}
				title="Security"
				description="Manage account privacy and security settings."
			>
				<Button
					className="w-full"
					onClick={async () => {
						const { data: userData } = await supabase.auth.getUser();

						if (userData.user?.email) {
							await supabase.auth.resetPasswordForEmail(userData.user.email);
							toast.success("Password reset email sent!");
						}
					}}
				>
					Send Password Reset Email
				</Button>
			</Section>

			{/* DANGER ZONE */}
			<Section
				icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
				title="Danger Zone"
				description="Deleting your account is permanent and cannot be undone."
				danger
			>
				<Button
					variant="default"
					className="w-full bg-red-600 hover:bg-red-700 text-white"
					disabled={isDeleting}
					onClick={() => {
						startDelete(async () => {
							const confirmed = confirm(
								"Are you absolutely sure? This action cannot be undone."
							);

							if (!confirmed) return;

							try {
								await deleteAccount();
								toast.success("Account deleted");
								window.location.href = "/";
							} catch (error) {
								console.error(error);
								toast.error("Failed to delete account");
							}
						});
					}}
				>
					{isDeleting ? "Deleting..." : "Delete Account"}
				</Button>
			</Section>
		</div>
	);
}

/* ----------------------------------------------- */
/* ----------------- COMPONENTS ------------------ */
/* ----------------------------------------------- */

function Section({
	icon,
	title,
	description,
	children,
	danger = false,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	children: React.ReactNode;
	danger?: boolean;
}) {
	return (
		<div
			className={`border rounded-xl p-6 shadow-sm bg-white/70 backdrop-blur space-y-6 ${
				danger ? "border-red-300 bg-red-50" : ""
			}`}
		>
			<div className="flex items-center gap-3">
				<div
					className={`p-2 rounded-lg ${danger ? "bg-red-100" : "bg-gray-100"}`}
				>
					{icon}
				</div>

				<div>
					<h2 className="text-lg font-semibold">{title}</h2>
					<p className="text-sm text-gray-600">{description}</p>
				</div>
			</div>

			<div className="space-y-4">{children}</div>
		</div>
	);
}

function SettingRow({
	label,
	value,
	onChange,
}: {
	label: string;
	value: boolean;
	onChange: (v: boolean) => void;
}) {
	return (
		<div className="flex items-center justify-between py-1">
			<p className="text-sm font-medium text-gray-700">{label}</p>
			<Switch checked={value} onCheckedChange={onChange} />
		</div>
	);
}
