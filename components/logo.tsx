import Link from "next/link";

/** Brand mark: a folded sheet with a check tick, plus the wordmark. */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#15171C" />
      <path d="M10 8h9l4 4v12a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="#F6F3EC" />
      <path d="M19 8v4h4" fill="#E3DDCD" />
      <path d="M12.5 18.2l2.3 2.3 4.7-5" stroke="#0F6E5E" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ href = "/", tone = "ink" }: { href?: string; tone?: "ink" | "light" }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 font-display text-[19px] font-semibold tracking-tight ${tone === "light" ? "text-white" : "text-ink"}`}
    >
      <LogoMark />
      <span>
        ResumeAI <span className={tone === "light" ? "text-brand-100" : "text-brand"}>Pro</span>
      </span>
    </Link>
  );
}
