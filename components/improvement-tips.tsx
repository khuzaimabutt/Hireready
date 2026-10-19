import type { AtsTip } from "@/lib/ai/mock";

// Accept legacy string[] tips OR new structured tips
type RawTip = AtsTip | string;

export default function ImprovementTips({ tips }: { tips: RawTip[] }) {
  const normalized: AtsTip[] = tips.map((t) =>
    typeof t === "string"
      ? { severity: "suggestion" as const, category: "polish" as const, text: t }
      : t
  );

  if (normalized.length === 0) return null;

  const grouped = {
    critical: normalized.filter((t) => t.severity === "critical"),
    warning: normalized.filter((t) => t.severity === "warning"),
    suggestion: normalized.filter((t) => t.severity === "suggestion"),
  };

  return (
    <div className="space-y-4">
      <Group title="Critical fixes" tips={grouped.critical} dot="bg-rust" textColor="text-rust" bg="bg-rust-50" border="border-rust-200" />
      <Group title="Warnings" tips={grouped.warning} dot="bg-gold" textColor="text-gold-700" bg="bg-gold-50" border="border-gold/40" />
      <Group title="Suggestions" tips={grouped.suggestion} dot="bg-brand" textColor="text-brand-700" bg="bg-brand-50" border="border-brand-100" />
    </div>
  );
}

function Group({ title, tips, dot, textColor, bg, border }: {
  title: string; tips: AtsTip[]; dot: string; textColor: string; bg: string; border: string;
}) {
  if (!tips.length) return null;
  return (
    <div>
      <div className={`mb-2 text-[11px] font-semibold uppercase tracking-wider ${textColor}`}>
        <span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />{title} <span className="text-ink-500">({tips.length})</span>
      </div>
      <ul className="space-y-2">
        {tips.map((t, i) => (
          <li key={i} className={`rounded-lg border ${border} ${bg} px-3 py-2 text-sm`}>
            <div className={`font-medium ${textColor}`}>{t.text}</div>
            {t.fix && <div className="mt-1 text-xs text-ink-700">→ {t.fix}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
