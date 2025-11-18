import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-white py-12 mt-32">
			<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">
				<div>
					<h3 className="text-xl font-semibold text-gray-900">Accordium</h3>
					<p className="text-gray-600 mt-4 text-sm leading-relaxed">
						Create, customize, and sign professional-grade legal documents with
						intelligence, speed, and security.
					</p>
				</div>

				{/* Product */}
				<div>
					<h4 className="text-gray-900 font-medium mb-3">Product</h4>
					<ul className="space-y-2 text-gray-600 text-sm">
						<li>
							<Link href="/#features">Features</Link>
						</li>
						<li>
							<Link href="/#templates">Templates</Link>
						</li>
						<li>
							<Link href="/#pricing">Pricing</Link>
						</li>
						<li>
							<Link href="/#security">Security</Link>
						</li>
					</ul>
				</div>

				{/* Company */}
				<div>
					<h4 className="text-gray-900 font-medium mb-3">Company</h4>
					<ul className="space-y-2 text-gray-600 text-sm">
						<li>
							<Link href="/about">About</Link>
						</li>
						<li>
							<Link href="/contact">Contact</Link>
						</li>
						<li>
							<Link href="/careers">Careers</Link>
						</li>
					</ul>
				</div>

				{/* Legal */}
				<div>
					<h4 className="text-gray-900 font-medium mb-3">Legal</h4>
					<ul className="space-y-2 text-gray-600 text-sm">
						<li>
							<Link href="/legal/privacy">Privacy Policy</Link>
						</li>
						<li>
							<Link href="/legal/terms">Terms of Service</Link>
						</li>
						<li>
							<Link href="/legal/cookies">Cookie Policy</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
				© {new Date().getFullYear()} Accordium. All rights reserved.
			</div>
		</footer>
	);
}
