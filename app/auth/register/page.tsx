"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import Link from "next/link";

export default function SignupPage() {
	const supabase = createSupabaseBrowserClient();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	async function handleSignup(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setErrorMessage("");

		const { error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			setErrorMessage(error.message);
			setLoading(false);
			return;
		}

		router.push("/dashboard");
		router.refresh();
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
			<div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm p-8">
				{/* Logo + Title */}
				<div className="text-center mb-6">
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Create an Account
					</h1>
					<p className="text-gray-500 mt-2">
						Start generating and signing contracts in minutes.
					</p>
				</div>

				{/* Error message */}
				{errorMessage && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 text-sm">
						{errorMessage}
					</div>
				)}

				<form onSubmit={handleSignup} className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700">
							Email Address
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							className="border border-gray-300 rounded-md px-3 py-2 outline-none
							focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition text-black"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="At least 6 characters"
							className="border border-gray-300 rounded-md px-3 py-2 outline-none
							focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition text-black"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-3 bg-gray-900 text-white rounded-md font-medium
						hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{loading ? "Creating Account..." : "Sign Up"}
					</button>
				</form>

				<p className="text-center text-gray-500 text-sm mt-6">
					Already have an account?{" "}
					<Link
						href="/auth/login"
						className="text-gray-900 font-medium hover:underline"
					>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}
