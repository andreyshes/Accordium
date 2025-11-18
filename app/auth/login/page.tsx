"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import Link from "next/link";
import { ErrorModal } from "@/app/components/ui/ErrorModal";

export default function LoginPage() {
	const supabase = createSupabaseBrowserClient();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");
	const [showError, setShowError] = useState(false);

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setErrorMessage(error.message);
			setShowError(true);
			setLoading(false);
			return;
		}

		router.push("/dashboard");
		router.refresh();
	}

	return (
		<>
			<ErrorModal
				open={showError}
				message={errorMessage}
				onClose={() => setShowError(false)}
			/>

			<div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
				<div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm p-8">
					<div className="text-center mb-6">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">
							Welcome Back
						</h1>
						<p className="text-gray-500 mt-2">
							Sign in to continue to Accordium
						</p>
					</div>

					<form onSubmit={handleLogin} className="flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-700">
								Email Address
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition text-black"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								type="password"
								autoComplete="new-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition text-black"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{loading ? "Signing in..." : "Log In"}
						</button>
					</form>

					<p className="text-center text-gray-500 text-sm mt-6">
						Don’t have an account?{" "}
						<Link
							href="/auth/register"
							className="text-gray-900 font-medium hover:underline"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
