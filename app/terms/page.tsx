export default function TermsOfServicePage() {
	return (
		<main className="bg-background">
			<div className="mx-auto max-w-[760px] px-8 py-32 space-y-16">
				<header className="space-y-4">
					<h1 className="text-4xl font-semibold tracking-tight">
						Terms of Service
					</h1>
					<p className="text-muted-foreground">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</header>

				<section className="space-y-6">
					<p className="text-muted-foreground leading-relaxed">
						These Terms of Service govern your access to and use of Accordium.
						By using the platform, you agree to these terms.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">Use of the service</h2>
					<p className="text-muted-foreground leading-relaxed">
						You may use Accordium only in compliance with applicable laws and
						regulations. You are responsible for maintaining the confidentiality
						of your account credentials.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">Content</h2>
					<p className="text-muted-foreground leading-relaxed">
						You retain ownership of content you submit to Accordium. By using
						the service, you grant us a limited license to process that content
						solely to provide the platform.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">Termination</h2>
					<p className="text-muted-foreground leading-relaxed">
						We may suspend or terminate access to Accordium if you violate these
						terms or misuse the service.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="text-xl font-medium">Disclaimer</h2>
					<p className="text-muted-foreground leading-relaxed">
						Accordium is provided “as is” without warranties of any kind. We do
						not guarantee uninterrupted or error-free operation.
					</p>
				</section>
			</div>
		</main>
	);
}
