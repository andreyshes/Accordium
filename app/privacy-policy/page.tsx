export default function PrivacyPolicyPage() {
	return (
		<main className="bg-background">
			<div className="mx-auto max-w-[760px] px-8 py-32 space-y-16">
				<header className="space-y-4">
					<h1 className="text-4xl font-semibold tracking-tight">
						Privacy Policy
					</h1>
					<p className="text-muted-foreground">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</header>

				<section className="space-y-6">
					<p className="leading-relaxed text-muted-foreground">
						Accordium values your privacy. This Privacy Policy explains how we
						collect, use, and protect your information when you use our
						platform.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">Information we collect</h2>
					<p className="text-muted-foreground leading-relaxed">
						We collect information you provide directly, such as account
						details, contact information, and content you upload. We may also
						collect limited technical data, including device and usage
						information, to operate and improve the service.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">How we use information</h2>
					<p className="text-muted-foreground leading-relaxed">
						We use your information to provide, maintain, and improve Accordium,
						communicate with you, ensure security, and comply with legal
						obligations.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">Data security</h2>
					<p className="text-muted-foreground leading-relaxed">
						We implement reasonable technical and organizational safeguards to
						protect your information. However, no system can be guaranteed to be
						100% secure.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">Contact</h2>
					<p className="text-muted-foreground leading-relaxed">
						If you have questions about this Privacy Policy, please contact us
						at <span className="underline">support@accordium.com</span>.
					</p>
				</section>
			</div>
		</main>
	);
}
