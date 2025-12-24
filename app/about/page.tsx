export default function AboutPage() {
	return (
		<main className="bg-background text-foreground">
			{/* HERO */}
			<section className="relative">
				<div className="mx-auto max-w-[1100px] px-8 pt-40 pb-32">
					<p className="text-sm font-medium text-muted-foreground">
						About Accordium
					</p>

					<h1 className="mt-6 text-[clamp(3rem,6vw,4.75rem)] leading-[1.05] font-semibold tracking-tight">
						Contracts should
						<br />
						feel effortless.
					</h1>

					<p className="mt-8 max-w-[560px] text-lg text-muted-foreground leading-relaxed">
						Accordium is a modern contract platform built to remove friction
						from how businesses create, manage, and move agreements forward.
					</p>
				</div>
			</section>

			{/* STATEMENT BAND */}
			<section className="border-y bg-muted/40">
				<div className="mx-auto max-w-[1100px] px-8 py-24">
					<p className="max-w-[720px] text-2xl leading-snug font-medium">
						We believe contract management should be invisible —
						<span className="text-muted-foreground">
							{" "}
							powerful when you need it, quiet when you don’t.
						</span>
					</p>
				</div>
			</section>

			{/* MISSION */}
			<section>
				<div className="mx-auto max-w-[1100px] px-8 py-32 grid grid-cols-1 md:grid-cols-[1fr_420px] gap-24">
					<div>
						<h2 className="text-3xl font-semibold tracking-tight">
							Our mission
						</h2>

						<p className="mt-8 text-muted-foreground leading-relaxed">
							Contracts sit at the center of every business, yet most teams
							still manage them through email threads, shared drives, and manual
							processes that don’t scale.
						</p>

						<p className="mt-6 text-muted-foreground leading-relaxed">
							Accordium exists to replace that chaos with clarity — giving teams
							a single, reliable system for managing agreements without slowing
							them down.
						</p>
					</div>

					<div className="self-start rounded-2xl bg-foreground text-background p-10">
						<p className="text-sm uppercase tracking-widest opacity-70">
							We optimize for
						</p>

						<ul className="mt-8 space-y-4 text-sm leading-relaxed">
							<li>Clarity over complexity</li>
							<li>Security by default</li>
							<li>Real workflows, not legal abstractions</li>
							<li>Systems that scale quietly</li>
						</ul>
					</div>
				</div>
			</section>

			{/* WHY */}
			<section className="bg-background">
				<div className="mx-auto max-w-[1100px] px-8 py-32">
					<h2 className="text-3xl font-semibold tracking-tight">
						Why Accordium was built
					</h2>

					<div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20">
						<div>
							<h3 className="font-medium">Fragmented tools</h3>
							<p className="mt-4 text-muted-foreground leading-relaxed">
								Contracts live across inboxes, PDFs, and drives — making them
								difficult to track and easy to lose.
							</p>
						</div>

						<div>
							<h3 className="font-medium">Manual workflows</h3>
							<p className="mt-4 text-muted-foreground leading-relaxed">
								Teams waste time copying templates, renaming files, and chasing
								signatures instead of closing work.
							</p>
						</div>

						<div>
							<h3 className="font-medium">No visibility</h3>
							<p className="mt-4 text-muted-foreground leading-relaxed">
								Once a contract is sent, there’s little insight into its status,
								changes, or history.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CLOSING */}
			<section className="bg-muted/40">
				<div className="mx-auto max-w-[1100px] px-8 py-40 text-center">
					<h2 className="text-4xl font-semibold tracking-tight">
						Built for today.
						<br />
						Designed for longevity.
					</h2>

					<p className="mx-auto mt-8 max-w-[520px] text-muted-foreground leading-relaxed">
						Accordium is built to evolve — adapting to how modern teams work,
						collaborate, and grow over time.
					</p>

					<div className="mt-12 flex justify-center gap-4">
						<a
							href="/signup"
							className="border-0
    inline-flex items-center justify-center
    rounded-xl
    bg-foreground
    px-6 py-3
    text-sm font-medium text-background
    transition
    duration-200
	hover:-translate-y-px
	hover:shadow-md
	active:translate-y-0
	active:shadow-sm
	focus:outline-none
	focus-visible:ring-2
	focus-visible:ring-foreground/30
  "
						>
							Get started
						</a>
					</div>
				</div>
			</section>
		</main>
	);
}
