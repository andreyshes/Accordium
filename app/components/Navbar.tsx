"use client";

import Link from "next/link";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { Button } from "./ui/Button";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { User as UserIcon } from "lucide-react";

export default function Navbar() {
	const [user, setUser] = useState<User | null>(null);
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const supabase = createSupabaseBrowserClient();

		async function loadUser() {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			setUser(session?.user ?? null);
		}

		loadUser();
	}, []);

	// Close dropdown on outside click
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="fixed top-0 w-full bg-white/70 backdrop-blur border-b border-gray-200 z-50">
			<nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">
				<Link
					href="/"
					className="text-2xl font-semibold tracking-tight text-gray-800"
				>
					Accordium
				</Link>

				{/* Middle links */}
				<div className="hidden md:flex gap-8 text-gray-700">
					{!user ? (
						<>
							<Link href="/#features" className="hover:text-gray-400">
								Features
							</Link>
							<Link href="/#templates" className="hover:text-gray-400">
								Templates
							</Link>
							<Link href="/#pricing" className="hover:text-gray-400">
								Pricing
							</Link>
						</>
					) : (
						<>
							<Link href="/dashboard">Dashboard</Link>
							<Link href="/contracts">Contracts</Link>
							<Link href="/dashboard/clients">Clients</Link>
							<Link href="/templates">Templates</Link>
						</>
					)}
				</div>

				{/* Right side: auth events */}
				<div className="flex gap-4 items-center">
					{/* If NOT logged in */}
					{!user ? (
						<>
							<Button>
								<Link href="/auth/login">Log in</Link>
							</Button>
							<Button>
								<Link href="/auth/register">Get Started</Link>
							</Button>
						</>
					) : (
						<div className="relative" ref={menuRef}>
							<div
								onClick={() => setOpen((prev) => !prev)}
								className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
							>
								<UserIcon className="text-gray-700" size={20} />
							</div>

							{open && (
								<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-50 animate-fadeIn">
									<Link
										href="/profile"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={() => setOpen(false)}
									>
										Profile
									</Link>

									<Link
										href="/settings"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={() => setOpen(false)}
									>
										Settings
									</Link>

									<div className="border-t border-gray-200 my-2"></div>

									<button
										onClick={() => {
											setOpen(false);
											const supabase = createSupabaseBrowserClient();
											supabase.auth.signOut();
											window.location.href = "/auth/login";
										}}
										className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
									>
										Log Out
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}
