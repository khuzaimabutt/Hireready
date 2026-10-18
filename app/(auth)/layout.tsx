import Link from "next/link";
import Logo from "@/components/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
        {/* Editorial rail */}
        <aside className="relative hidden overflow-hidden bg-ink px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="rule-lines absolute inset-0 opacity-[0.12]" aria-hidden="true" />
          <div className="relative"><Logo tone="light" /></div>

          <div className="relative max-w-md">
            <h2 className="font-display text-[44px] font-medium leading-[1.05]">
              A resume that reads like you <em className="font-normal italic text-brand-100">meant every line.</em>
            </h2>
            <ul className="mt-10 space-y-4 text-[15px] text-white/80">
              <Bullet>ATS score with tips sorted by severity</Bullet>
              <Bullet>One-click rewrites for any bullet point</Bullet>
              <Bullet>Export to PDF, DOCX or plain text</Bullet>
              <Bullet>Layouts for fresher, intermediate and executive</Bullet>
            </ul>
          </div>

          <div className="relative flex gap-5 text-xs text-white/60">
            <span>&copy; {new Date().getFullYear()} ResumeAI Pro</span>
            <Link href="/" className="transition hover:text-white">Home</Link>
            <Link href="/#faq" className="transition hover:text-white">FAQ</Link>
          </div>
        </aside>

        {/* Form area */}
        <main className="flex flex-col px-4 py-6 sm:px-8 lg:py-10">
          <div className="lg:hidden"><Logo /></div>
          <div className="flex flex-1 items-center justify-center py-10">
            <div className="w-full max-w-[420px]">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg width="18" height="18" viewBox="0 0 18 18" className="mt-0.5 shrink-0" aria-hidden="true">
        <circle cx="9" cy="9" r="8.25" fill="none" stroke="rgba(207,230,224,0.45)" strokeWidth="1.2" />
        <path d="M5.5 9.3 7.8 11.5l4.7-5" stroke="#CFE6E0" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
