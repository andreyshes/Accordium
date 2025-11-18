"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import {
	LayoutDashboard,
	FileText,
	Users,
	Layers,
	Settings,
} from "lucide-react";

const links = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Contracts", href: "/contracts", icon: FileText },
	{ name: "Clients", href: "/dashboard/clients", icon: Users },
	{ name: "Templates", href: "/templates", icon: Layers },
	{ name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 px-4 py-6">
			<nav className="flex flex-col gap-2">
				{links.map((link) => {
					const Icon = link.icon;
					const active = pathname === link.href;

					return (
						<Link
							href={link.href}
							key={link.name}
							className={cn(
								"flex items-center gap-3 px-4 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 transition",
								active && "bg-gray-900 text-white hover:bg-gray-800"
							)}
						>
							<Icon size={18} />
							<span className="font-medium text-sm">{link.name}</span>
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
