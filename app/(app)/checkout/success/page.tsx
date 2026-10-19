import Link from "next/link";

export default function CheckoutSuccess({ searchParams }: { searchParams: { plan?: string } }) {
  const plan = (searchParams.plan ?? "").replace("_", " ");
  return (
    <div className="mx-auto max-w-2xl">
      <div className="card text-center">
        <div className="pop-in mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand ring-1 ring-brand-100">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </div>
        <div className="eyebrow">Demo checkout</div>
        <h1 className="mt-2 font-display text-3xl font-medium">Simulated purchase complete</h1>
        <p className="mt-2 text-ink-600">
          The <strong className="capitalize">{plan}</strong> credits were added to this demo account. No card was charged and no Stripe payment took place.
        </p>

        <div className="mt-8 rounded-xl border border-line bg-paper-50 p-5 text-left">
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-500">What is next</div>
          <ol className="mt-3 space-y-3 text-sm text-ink-700">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">1</span>
              <div>
                <div className="font-medium">Create your next resume</div>
                <div className="text-ink-500">Tailored to a specific role gets you the best ATS score.</div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">2</span>
              <div>
                <div className="font-medium">Try the new templates</div>
                <div className="text-ink-500">Switch templates from the preview page in one click.</div>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">3</span>
              <div>
                <div className="font-medium">Use AI bullet rewriter</div>
                <div className="text-ink-500">Use Improve with AI under any bullet for a stronger version.</div>
              </div>
            </li>
          </ol>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/dashboard" className="btn-primary">Back to dashboard</Link>
          <Link href="/pricing" className="btn-secondary">Back to plans</Link>
        </div>

      </div>
    </div>
  );
}
