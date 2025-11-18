"use client";

import { useState, useRef, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/app/lib/supabaseBrowser";
import { useRouter } from "next/navigation";
import { Bell, User } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
	const router = useRouter();
	const supabase = createSupabaseBrowserClient();

	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	async function handleLogout() {
		await supabase.auth.signOut();
		router.refresh();
		router.push("/auth/login");
	}

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 z-40">
			<Link href="/">
				<h1 className="text-xl font-semibold tracking-tight">Accordium</h1>
			</Link>

			<div className="flex items-center gap-6">
				<Bell className="text-gray-600 cursor-pointer hover:text-gray-900 transition" />

				<div className="relative" ref={menuRef}>
					<div
						onClick={() => setMenuOpen((prev) => !prev)}
						className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
					>
						<User className="text-gray-700" size={20} />
					</div>

					{menuOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
							<Link
								href="/profile"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								Profile
							</Link>

							<Link
								href="/settings"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								Settings
							</Link>

							<div className="border-t border-gray-200 my-2"></div>

							<button
								onClick={handleLogout}
								className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
							>
								Log Out
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
