import Link from "next/link";
import Logo from "@/components/logo";
import AtsScoreRing from "@/components/ats-score-ring";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Facts />
        <Stages />
        <RewriteDemo />
        <HowItWorks />
        <Features />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- Nav */

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium text-ink-600 md:flex">
          <a href="#how" className="transition hover:text-ink">How it works</a>
          <a href="#features" className="transition hover:text-ink">Features</a>
          <a href="#pricing" className="transition hover:text-ink">Pricing</a>
          <a href="#faq" className="transition hover:text-ink">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 transition hover:text-ink sm:inline-flex">Sign in</Link>
          <Link href="/signup" className="btn-primary !px-4 !py-2">Start free</Link>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="paper-grain absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28">
        <div className="fade-in">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            Resume builder for every career stage
          </span>
          <h1 className="mt-6 font-display text-[44px] font-medium leading-[1.02] sm:text-6xl lg:text-[72px]">
            Your experience,
            <br />
            written the way <em className="font-normal italic text-brand">recruiters read.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-600">
            Fill in a guided form, pick your level, and get a clean, ATS-friendly resume with a score and specific fixes. Edit every line, then export to PDF, DOCX or plain text.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/signup" className="btn-primary !px-6 !py-3 text-[15px]">
              Build my resume
              <Arrow />
            </Link>
            <a href="#how" className="btn-ghost !px-6 !py-3 text-[15px]">See how it works</a>
          </div>
          <p className="mt-5 text-sm text-ink-500">Free plan includes one resume. No card needed.</p>
        </div>

        <ProductShot />
      </div>
    </section>
  );
}

function ProductShot() {
  return (
    <div className="fade-in-delay-2 relative mx-auto w-full max-w-[520px]" aria-label="Example resume preview with ATS score" role="img">
      {/* back sheet */}
      <div className="absolute inset-x-6 -bottom-3 top-6 rotate-[2.5deg] rounded-xl border border-line bg-paper-50 shadow-lift" aria-hidden="true" />
      {/* resume sheet */}
      <div className="relative rounded-xl border border-line bg-white p-7 shadow-sheet sm:p-9" aria-hidden="true">
        <div className="flex items-end justify-between gap-4 border-b border-ink pb-4">
          <div>
            <div className="wipe font-display text-2xl font-semibold leading-none" style={D(200)}>Alex Morgan</div>
            <div className="wipe mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500" style={D(450)}>Software Engineer</div>
          </div>
          <div className="text-right text-[11px] leading-5 text-ink-500">
            <div className="wipe" style={D(600)}>Portfolio link</div>
            <div className="wipe" style={D(700)}>City, Country</div>
          </div>
        </div>
        <SheetHeading d={850}>Summary</SheetHeading>
        <p className="wipe text-[12px] leading-relaxed text-ink-700" style={D(1000)}>
          Engineer with 4 years building production web platforms. Turns loose requirements into reliable, well-tested systems.
        </p>
        <SheetHeading d={1350}>Experience</SheetHeading>
        <div className="wipe flex items-baseline justify-between text-[12px]" style={D(1500)}>
          <span className="font-semibold">Senior Engineer, Example Co.</span>
          <span className="text-ink-500">2021 to now</span>
        </div>
        <ul className="mt-1.5 space-y-1 text-[12px] leading-relaxed text-ink-700">
          <li className="wipe flex gap-2" style={D(1750)}><span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink" />Led the move to containers, raising uptime to 99.9%.</li>
          <li className="wipe -mx-1 flex gap-2 rounded bg-brand-50 px-1" style={{ ...D(2050), ["--wipe-bg" as string]: "#E8F3F0" }}><span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand" />Cut API latency 42% across five services.</li>
        </ul>
        <SheetHeading d={2350}>Skills</SheetHeading>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {["TypeScript", "React", "Next.js", "PostgreSQL", "AWS"].map((s, i) => (
            <span key={s} className="pop-in rounded border border-line px-2 py-0.5 text-ink-700" style={D(2500 + i * 90)}>{s}</span>
          ))}
        </div>
      </div>

      {/* ATS panel */}
      <div className="pop-in absolute -left-3 -bottom-10 w-48 rounded-xl border border-line bg-white p-4 shadow-lift sm:-left-10" style={D(2900)} aria-hidden="true">
        <div className="flex items-center gap-3">
          <AtsScoreRing score={94} size={48} stroke={5} caption={false} delay={3000} />
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500">ATS score</div>
            <div className="text-sm font-semibold text-brand">Strong</div>
          </div>
        </div>
        <ul className="mt-3 space-y-1.5 border-t border-line pt-3 text-[11px] text-ink-600">
          <li className="flex items-center gap-2"><Tick /> Quantified impact</li>
          <li className="flex items-center gap-2"><Tick /> Standard headings</li>
          <li className="flex items-center gap-2"><Tick muted /> Add 2 role keywords</li>
        </ul>
      </div>

      {/* rewrite chip */}
      <div className="pop-in absolute -right-2 -top-5 rounded-lg bg-ink px-3.5 py-2.5 text-[11px] text-white shadow-lift sm:-right-6" style={D(2250)} aria-hidden="true">
        <div className="font-semibold text-brand-100">Bullet rewritten</div>
        <div className="text-white/75">&ldquo;Worked on APIs&rdquo; to measurable result</div>
      </div>
    </div>
  );
}

/** Animation delay in ms for the hero sheet fill-in. */
const D = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

function SheetHeading({ children, d = 0 }: { children: React.ReactNode; d?: number }) {
  return <div className="wipe mb-1.5 mt-5 w-fit text-[10px] font-bold uppercase tracking-[0.2em] text-ink" style={D(d)}>{children}</div>;
}

/* -------------------------------------------- Facts (no social proof) */

function Facts() {
  const facts = [
    { k: "3", v: "career-stage layouts", d: "Fresher, intermediate and professional" },
    { k: "0 to 100", v: "ATS score", d: "With tips sorted by severity" },
    { k: "3", v: "export formats", d: "PDF, editable DOCX, plain TXT" },
    { k: "1", v: "free resume", d: "Upgrade only if you need more" },
  ];
  return (
    <section aria-label="Product facts" className="border-y border-line bg-white">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-line px-4 sm:px-6 md:grid-cols-4 md:divide-x">
        {facts.map((f) => (
          <div key={f.v} className="px-2 py-7 md:px-8">
            <dt className="text-sm font-semibold text-ink">{f.v}</dt>
            <dd className="mt-0.5 font-display text-3xl font-medium text-ink">{f.k}</dd>
            <dd className="mt-1 text-[13px] text-ink-500">{f.d}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------- Stages */

function Stages() {
  const stages = [
    {
      n: "01", title: "Fresh graduate", href: "/signup?type=fresher", cta: "Start as fresher",
      desc: "Little or no work history? Projects, education and skills move to the top and do the talking.",
      bullets: ["Projects-first layout", "Skills highlighted", "Entry-level language"],
    },
    {
      n: "02", title: "Working professional", href: "/signup?type=intermediate", cta: "Start as intermediate",
      desc: "One to five years in. Experience leads, rewritten with action verbs and measurable results.",
      bullets: ["Experience-first layout", "Achievement rewriting", "Clear progression"],
    },
    {
      n: "03", title: "Senior and executive", href: "/signup?type=professional", cta: "Start as professional",
      desc: "Five years or more of leadership. An executive summary that leads with impact, not duties.",
      bullets: ["Executive summary", "Metrics and scope", "Leadership focus"],
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow="Who it is for" title="Tuned to where you are in your career" body="Choose a level at sign-up. The form, the section order and the wording all adapt to it." />
      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {stages.map((s) => (
          <div key={s.n} className="group flex flex-col bg-white p-8 transition hover:bg-paper-50">
            <div className="font-display text-sm italic text-brand">{s.n}</div>
            <h3 className="mt-3 font-display text-2xl font-medium">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{s.desc}</p>
            <ul className="mt-6 space-y-2 text-sm text-ink-700">
              {s.bullets.map((b) => <li key={b} className="flex items-center gap-2.5"><Tick />{b}</li>)}
            </ul>
            <Link href={s.href} className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 transition group-hover:decoration-brand">
              {s.cta} <Arrow />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Rewrite demo */

function RewriteDemo() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-100">The rewrite</div>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">From a vague line to one that earns the interview.</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              Every bullet can be rewritten in one click: a strong verb up front, scope and result made explicit. You keep the final say on every word.
            </p>
            <p className="mt-6 text-xs text-white/60">Illustrative example. Numbers come from what you enter.</p>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">What you wrote</div>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75 line-through decoration-white/30">
                Worked on the website redesign. Helped users find what they needed.
              </p>
            </div>
            <div className="rounded-xl bg-paper p-6 text-ink shadow-sheet">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">Rewritten</div>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800">ATS 92 / 100</span>
              </div>
              <p className="mt-3 font-display text-xl leading-snug">
                <mark className="bg-brand-100/70 px-0.5 text-ink">Led</mark> the redesign of the customer website,{" "}
                <mark className="bg-gold-50 px-0.5 text-ink">raising task completion 42%</mark> for{" "}
                <mark className="bg-gold-50 px-0.5 text-ink">10K+ daily users</mark>.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4 text-xs text-ink-600">
                <span className="chip"><Tick /> Action verb</span>
                <span className="chip"><Tick /> Quantified result</span>
                <span className="chip"><Tick /> Role keywords</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- How it works */

function HowItWorks() {
  const steps = [
    { t: "Choose your level", b: "Fresher, intermediate or professional. It sets the layout and the tone." },
    { t: "Fill a guided form", b: "Step by step: personal details, experience, education, skills. Drafts save as you go." },
    { t: "Generate and refine", b: "Get a formatted resume with an ATS score, fix what the tips flag, then export." },
  ];
  return (
    <section id="how" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow="How it works" title="Three steps, about ten minutes" />
      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <li key={s.t} className="relative border-t-2 border-ink pt-6">
            <div className="font-display text-5xl font-light text-ink-300">{i + 1}</div>
            <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.b}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ----------------------------------------------------------- Features */

function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
        <SectionHeader eyebrow="Features" title="Everything a serious application needs" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Feature className="md:col-span-2 md:row-span-2" icon={<IconTarget />} title="ATS score and fix list"
            body="A 0 to 100 score that checks contact details, section structure, quantified bullets and keywords, with each tip labelled by severity so you know what to fix first.">
            <div className="mt-8 grid gap-2 sm:grid-cols-3" aria-hidden="true">
              {[["Critical", "Add a phone number", "bg-red-50 text-red-800 border-red-100"], ["Important", "Quantify 3 bullets", "bg-gold-50 text-gold-700 border-gold-50"], ["Nice to have", "Add a GitHub link", "bg-brand-50 text-brand-800 border-brand-100"]].map(([lvl, tip, cls]) => (
                <div key={lvl} className={`rounded-lg border p-3 text-xs ${cls}`}>
                  <div className="font-semibold">{lvl}</div>
                  <div className="mt-0.5 opacity-90">{tip}</div>
                </div>
              ))}
            </div>
          </Feature>
          <Feature icon={<IconSpark />} title="Bullet rewriter" body="One-click rewrites with action verbs and measurable results." />
          <Feature icon={<IconMatch />} title="Job match" body="Paste a job post to see which keywords your resume is missing." />
          <Feature icon={<IconLetter />} title="Cover letters" body="A first draft from your resume, in the tone you choose." />
          <Feature icon={<IconFile />} title="PDF, DOCX, TXT" body="Print-ready PDF, editable Word file, and plain text for strict portals." />
          <Feature icon={<IconLock />} title="Private by default" body="Stored behind row-level security. Export or delete your account any time." />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, body, className = "", children }: { icon: React.ReactNode; title: string; body: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-line bg-paper-50 p-7 transition hover:border-ink-300 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-brand">{icon}</div>
      <h3 className="mt-5 font-display text-xl font-medium">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{body}</p>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ Pricing */

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow="Pricing" title="Pay once, or monthly if you are actively applying" body="Start free. Upgrade only when you need more resumes or features." />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <PricingCard plan="Free" price="$0" note="forever" features={["1 resume", "Basic template", "PDF export"]} cta="Start free" />
        <PricingCard plan="Fresher Pack" price="$5" note="one-time" features={["3 resumes", "All templates", "Cover letters"]} badge="For students" cta="Choose Fresher" />
        <PricingCard plan="Pro Monthly" price="$12" note="per month" features={["Unlimited resumes", "Job matcher", "Priority AI", "All formats"]} badge="Most popular" highlight cta="Go Pro" />
        <PricingCard plan="Professional" price="$25" note="one-time" features={["5 executive resumes", "Priority AI", "All templates"]} cta="Choose Professional" />
      </div>
      <p className="mt-8 text-center text-sm text-ink-500">All plans include a 7-day refund and ATS-friendly output.</p>
    </section>
  );
}

function PricingCard({ plan, price, note, features, badge, highlight, cta }: {
  plan: string; price: string; note: string; features: string[]; badge?: string; highlight?: boolean; cta: string;
}) {
  return (
    <div className={`relative flex flex-col rounded-2xl p-7 ${highlight ? "bg-ink text-white shadow-sheet" : "border border-line bg-white"}`}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">{plan}</h3>
        {badge && (
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${highlight ? "bg-brand-100 text-brand-800" : "bg-gold-50 text-gold-700"}`}>{badge}</span>
        )}
      </div>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-5xl font-medium">{price}</span>
        <span className={`text-sm ${highlight ? "text-white/70" : "text-ink-500"}`}>{note}</span>
      </div>
      <ul className={`mt-6 flex-1 space-y-2.5 border-t pt-6 text-sm ${highlight ? "border-white/15 text-white/85" : "border-line text-ink-700"}`}>
        {features.map((f) => <li key={f} className="flex items-center gap-2.5"><Tick light={highlight} />{f}</li>)}
      </ul>
      <Link href="/signup" className={`mt-8 w-full ${highlight ? "btn-accent" : "btn-ghost"}`}>{cta}</Link>
    </div>
  );
}

/* ---------------------------------------------------------------- FAQ */

function Faq() {
  const items = [
    ["Is my data private?", "Resumes are stored in Supabase behind row-level security, so each account can only read its own rows. You can export everything or delete your account from Settings."],
    ["Will my resume pass applicant tracking systems?", "The output uses a clean single-column structure, standard section headings and real text (not images), which is what ATS parsers handle best. The built-in score flags what to fix, but no tool can guarantee how a specific employer's system behaves."],
    ["Can I edit what gets generated?", "Yes. You can edit every field, regenerate the resume, or rewrite single bullets."],
    ["How many resumes can I create?", "One on the free plan. Paid plans give 3, 5 or unlimited. Any resume can be duplicated and tailored to a different role."],
    ["Which formats can I download?", "PDF for applying, DOCX if you want to keep editing in Word, and plain TXT for portals that reject formatted files."],
    ["Do you offer refunds?", "Yes, paid plans come with a 7-day refund."],
  ];
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="eyebrow">FAQ</div>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">Questions, answered plainly.</h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {items.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold">
                <span>{q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-600 transition group-open:rotate-45" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </span>
              </summary>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-600">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Final CTA */

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-[28px] bg-brand-800 px-6 py-16 text-center text-white sm:px-12 md:py-20">
        <div className="rule-lines absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-medium leading-tight md:text-5xl">Start with one good resume.</h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">The free plan is enough to build, score and export your first one.</p>
          <Link href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-[15px] font-semibold text-ink shadow-lift transition hover:bg-paper">
            Build my resume <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Footer */

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm text-ink-500">A resume builder for every career stage.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-600">
          <a href="#how" className="hover:text-ink">How it works</a>
          <a href="#features" className="hover:text-ink">Features</a>
          <a href="#pricing" className="hover:text-ink">Pricing</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
          <Link href="/login" className="hover:text-ink">Sign in</Link>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-ink-500 sm:px-6">
          &copy; {new Date().getFullYear()} ResumeAI Pro. Portfolio demo: resume content is generated by a built-in mock engine and checkout is simulated, so no real payments are taken.
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------- Shared */

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-4 font-display text-4xl font-medium leading-[1.08] md:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-[17px] leading-relaxed text-ink-600">{body}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7h9M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

function Tick({ muted, light }: { muted?: boolean; light?: boolean }) {
  const color = muted ? "#C58A1E" : light ? "#CFE6E0" : "#0F6E5E";
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="shrink-0" aria-hidden="true">
      {muted ? <circle cx="7" cy="7" r="5" fill="none" stroke={color} strokeWidth="1.6" /> : <path d="M2.5 7.3 5.5 10l6-6.5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

const ic = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
function IconTarget() { return <svg {...ic}><circle cx="10" cy="10" r="7" /><circle cx="10" cy="10" r="3.5" /><circle cx="10" cy="10" r="0.6" fill="currentColor" /></svg>; }
function IconSpark() { return <svg {...ic}><path d="M10 2.5v4M10 13.5v4M2.5 10h4M13.5 10h4M5 5l2 2M13 13l2 2M15 5l-2 2M7 13l-2 2" /></svg>; }
function IconMatch() { return <svg {...ic}><rect x="2.5" y="4" width="8" height="12" rx="1.5" /><rect x="9.5" y="4" width="8" height="12" rx="1.5" /></svg>; }
function IconLetter() { return <svg {...ic}><rect x="2.5" y="4.5" width="15" height="11" rx="1.5" /><path d="m3 5.5 7 5.5 7-5.5" /></svg>; }
function IconFile() { return <svg {...ic}><path d="M5 2.5h6.5L15 6v11a.5.5 0 0 1-.5.5h-9.5A.5.5 0 0 1 4.5 17V3a.5.5 0 0 1 .5-.5Z" /><path d="M11 2.5V6.5h4M7.5 11h5M7.5 14h5" /></svg>; }
function IconLock() { return <svg {...ic}><rect x="4" y="9" width="12" height="8.5" rx="1.5" /><path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" /></svg>; }
