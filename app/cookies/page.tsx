export default function CookiePolicyPage() {
	return (
		<main className="bg-background">
			<div className="mx-auto max-w-[760px] px-8 py-32 space-y-16">
				<header className="space-y-4">
					<h1 className="text-4xl font-semibold tracking-tight">
						Cookie Policy
					</h1>
					<p className="text-muted-foreground">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</header>

				<section className="space-y-6">
					<p className="text-muted-foreground leading-relaxed">
						This Cookie Policy explains how Accordium uses cookies and similar
						technologies to provide and improve the service.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">What are cookies?</h2>
					<p className="text-muted-foreground leading-relaxed">
						Cookies are small text files stored on your device that help
						websites function properly and remember preferences.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">How we use cookies</h2>
					<p className="text-muted-foreground leading-relaxed">
						We use cookies for authentication, security, and basic analytics. We
						do not use cookies for invasive tracking or advertising.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">Managing cookies</h2>
					<p className="text-muted-foreground leading-relaxed">
						You can control or delete cookies through your browser settings.
						Disabling cookies may affect certain features of the platform.
					</p>
				</section>
			</div>
		</main>
	);
}
