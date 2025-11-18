import Footer from "@/app/components/Footer";
import { Button } from "@/app/components/ui/Button";
import { ArrowRight, ShieldCheck, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
export default function LandingPage() {
	return (
		<main className="min-h-screen flex flex-col bg-white">
			<section id="hero" className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]"></div>

				<div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-28 text-center">
					<h1 className="text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
						Contracts made{" "}
						<span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
							effortless.
						</span>
					</h1>

					<p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Create, customize, and sign professional-grade contracts in minutes.
						AI-powered editing, intelligent templates, and secure e-signatures —
						designed for the modern professional.
					</p>

					<div className="mt-10 flex items-center justify-center gap-4">
						<Link href={"/auth/register"}>
							<Button className="px-7 py-3.5 text-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-300">
								Start Free <ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>

						<Button
							variant="outline"
							className="px-7 py-3.5 text-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
						>
							<Link href={"/templates"}>Explore Templates</Link>
						</Button>
					</div>
				</div>
			</section>

			<section
				id="features"
				className="bg-white py-28 px-6 border-t border-gray-100"
			>
				<div className="max-w-6xl mx-auto text-center mb-20">
					<h2 className="text-4xl font-semibold text-gray-900 tracking-tight">
						Powerful Features. Zero Complexity.
					</h2>
					<p className="mt-4 text-gray-600 max-w-3xl mx-auto">
						Tools built to help you move faster while staying compliant and
						professional.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
					<FeatureCard
						title="AI Clause Generation"
						description="Generate, rewrite, or strengthen contract clauses instantly using industry-trained AI."
						icon={<Sparkles className="h-6 w-6 text-indigo-600" />}
					/>

					<FeatureCard
						title="Secure E-Signatures"
						description="Send contracts for signature with one click — no friction, no extra logins needed."
						icon={<ShieldCheck className="h-6 w-6 text-indigo-600" />}
					/>

					<FeatureCard
						title="Version Control"
						description="Track every change, compare edits, and maintain a full audit trail effortlessly."
						icon={<FileText className="h-6 w-6 text-indigo-600" />}
					/>
				</div>
			</section>

			<section
				id="templates"
				className="py-28 px-6 bg-gray-50 border-t border-gray-200"
			>
				<div className="max-w-6xl mx-auto text-center mb-20">
					<h2 className="text-4xl font-semibold text-gray-900 tracking-tight">
						Industry-Ready Templates
					</h2>
					<p className="mt-4 text-gray-600 max-w-3xl mx-auto">
						Crafted with legal best practices — ready for freelancers, agencies,
						startups, and enterprise teams.
					</p>
				</div>

				<div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
					<TemplateCard name="NDA Agreement" />
					<TemplateCard name="Contractor Agreement" />
					<TemplateCard name="Service Agreement" />
					<TemplateCard name="Web Development Contract" />
				</div>
			</section>

			<section
				id="security"
				className="py-24 px-6 bg-gray-900 text-white border-t border-gray-800"
			>
				<div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">
					<div>
						<h2 className="text-4xl font-semibold tracking-tight">
							Security baked in.
						</h2>
						<p className="mt-4 text-gray-300 leading-relaxed">
							Data is encrypted at rest and in transit, audit trails are stored
							forever, and fine-grained access controls keep your contracts in
							the right hands.
						</p>
					</div>

					<ul className="space-y-4 text-gray-200">
						<li>• SOC 2–aligned processes</li>
						<li>• Secure Supabase storage</li>
						<li>• Automatic access logs</li>
					</ul>
				</div>
			</section>

			<section
				id="pricing"
				className="py-28 px-6 bg-white border-t border-gray-100"
			>
				<div className="max-w-4xl mx-auto text-center mb-12">
					<h2 className="text-4xl font-semibold text-gray-900 tracking-tight">
						Simple Pricing
					</h2>
					<p className="mt-4 text-gray-600">
						Start for free and upgrade when you need more collaboration and
						storage.
					</p>
				</div>

				<div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
					<div className="border border-gray-200 rounded-2xl p-8 shadow-sm">
						<h3 className="text-2xl font-semibold text-gray-900">Starter</h3>
						<p className="text-gray-600 mt-2">
							For individual professionals sending a few contracts a month.
						</p>
						<p className="text-4xl font-bold text-gray-900 mt-6">$0</p>
						<ul className="mt-6 space-y-2 text-left text-gray-600">
							<li>• Unlimited template access</li>
							<li>• 3 active contracts</li>
							<li>• Email support</li>
						</ul>
					</div>

					<div className="border border-gray-900 rounded-2xl p-8 shadow-lg bg-gray-900 text-white">
						<h3 className="text-2xl font-semibold">Pro</h3>
						<p className="text-gray-200 mt-2">
							Teams who need full audit logs, unlimited contracts, and AI
							assistance.
						</p>
						<p className="text-4xl font-bold mt-6">$29</p>
						<ul className="mt-6 space-y-2 text-left text-gray-100">
							<li>• Unlimited contracts & storage</li>
							<li>• Team collaboration</li>
							<li>• Priority support</li>
						</ul>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}

function FeatureCard({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-left">
			<div className="mb-4">{icon}</div>
			<h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
			<p className="text-gray-600 leading-relaxed">{description}</p>
		</div>
	);
}

function TemplateCard({ name }: { name: string }) {
	return (
		<div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
			<h4 className="text-lg font-medium text-gray-900">{name}</h4>
			<p className="text-gray-500 mt-1 text-sm">
				Professionally drafted & customizable
			</p>
		</div>
	);
}
