"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Plan = "free" | "fresher_pack" | "pro_monthly" | "professional_pack";
type Billing = "monthly" | "annual";

const PLANS: Array<{ key: Plan; name: string; priceMonthly: string; priceAnnual: string; sub?: string; features: string[]; highlight?: boolean; badge?: string; oneTime?: boolean }> = [
  {
    key: "free",
    name: "Free",
    priceMonthly: "$0",
    priceAnnual: "$0",
    features: ["1 resume", "Basic template", "PDF export", "Limited AI rewrites"],
  },
  {
    key: "fresher_pack",
    name: "Fresher Pack",
    priceMonthly: "$5",
    priceAnnual: "$5",
    sub: "one-time",
    features: ["3 resumes", "All templates", "PDF + DOCX export", "Cover letters", "Priority email support"],
    badge: "For Students",
    oneTime: true,
  },
  {
    key: "pro_monthly",
    name: "Pro Monthly",
    priceMonthly: "$12",
    priceAnnual: "$115",
    sub: "/ month",
    features: ["20 credits / month", "Unlimited templates", "Job matcher", "Priority AI", "All export formats", "Resume version history"],
    highlight: true,
    badge: "Most Popular",
  },
  {
    key: "professional_pack",
    name: "Professional",
    priceMonthly: "$25",
    priceAnnual: "$25",
    sub: "one-time",
    features: ["5 executive resumes", "Priority AI", "Executive template", "Cover letters", "LinkedIn rewrite"],
    oneTime: true,
  },
];

export default function PricingPlans({ currentPlan = "free" as Plan }: { currentPlan?: Plan }) {
  const router = useRouter();
  const [loading, setLoading] = useState<Plan | null>(null);
  const [billing, setBilling] = useState<Billing>("monthly");

  async function buy(plan: Plan) {
    if (plan === "free") return;
    setLoading(plan);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.mock_url) router.push(data.mock_url);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-line bg-white p-1" role="group" aria-label="Billing period">
        {(["monthly", "annual"] as Billing[]).map((b) => (
          <button
            key={b}
            onClick={() => setBilling(b)}
            aria-pressed={billing === b}
            className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors duration-150 ${
              billing === b ? "bg-ink text-white" : "text-ink-600 hover:text-ink"
            }`}
          >
            {b}
            {b === "annual" && <span className="ml-1.5 rounded-full bg-brand px-1.5 py-0.5 text-[10px] text-white">Save 20%</span>}
          </button>
        ))}
      </div>

      <div className="grid items-stretch gap-5 pt-3 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p) => {
          const isCurrent = p.key === currentPlan;
          const price = p.oneTime ? p.priceMonthly : (billing === "annual" ? p.priceAnnual : p.priceMonthly);
          const sub = p.oneTime ? p.sub : (billing === "annual" ? "/ year" : p.sub);
          return (
            <div
              key={p.key}
              className={`card-hover rise relative flex flex-col rounded-2xl border bg-white p-6 ${
                p.highlight ? "border-brand shadow-lift" : "border-line shadow-paper"
              }`}
              style={{ ["--i" as string]: PLANS.indexOf(p) }}
            >
              {p.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-semibold ${p.highlight ? "bg-brand text-white" : "bg-gold-50 text-gold-700 ring-1 ring-gold/40"}`}>{p.badge}</div>
              )}
              {isCurrent && (
                <div className="absolute right-3 top-3 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                  Active
                </div>
              )}
              <div className="font-display text-lg font-semibold">{p.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-4xl font-medium tabular-nums">{price}</span>
                {sub && <span className="text-sm text-ink-500">{sub}</span>}
              </div>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-ink-700">
                {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-brand">✓</span> {f}</li>)}
              </ul>
              <button
                onClick={() => buy(p.key)}
                disabled={loading === p.key || isCurrent || p.key === "free"}
                className={`mt-6 w-full ${p.highlight ? "btn-accent" : "btn-secondary"} disabled:opacity-60`}
              >
                {isCurrent ? "Current plan" : p.key === "free" ? "Free plan" : loading === p.key ? "Processing..." : "Buy (demo)"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Comparison strip */}
      <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-paper">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-50">
              <th className="px-4 py-3 text-left font-semibold text-ink-600">Feature</th>
              {PLANS.map((p) => <th key={p.key} className="px-4 py-3 text-center font-semibold text-ink-600">{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Number of resumes", values: ["1", "3", "Unlimited", "5"] },
              { label: "Templates", values: ["1", "All", "All", "All"] },
              { label: "PDF export", values: ["✓", "✓", "✓", "✓"] },
              { label: "DOCX export", values: ["-", "✓", "✓", "✓"] },
              { label: "AI bullet rewrites", values: ["Limited", "Unlimited", "Unlimited", "Unlimited"] },
              { label: "Job matcher", values: ["-", "-", "✓", "-"] },
              { label: "Priority AI", values: ["-", "-", "✓", "✓"] },
              { label: "Cover letters", values: ["-", "✓", "✓", "✓"] },
              { label: "Version history", values: ["-", "-", "✓", "-"] },
            ].map((row, i) => (
              <tr key={i} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3 text-ink-700">{row.label}</td>
                {row.values.map((v, j) => (
                  <td key={j} className="px-4 py-3 text-center text-ink-600">
                    {v === "✓" ? <span className="text-brand font-bold">✓</span> : v === "-" ? <span className="text-ink-300">—</span> : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-xs text-ink-500">Prices are illustrative for this portfolio demo. Nothing here is billed.</p>
    </div>
  );
}
