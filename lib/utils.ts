export function cn(...args: (string | undefined | false | null)[]): string {
  return args.filter(Boolean).join(" ");
}

export function formatDate(d: string | Date): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-brand bg-brand-50 border-brand-100";
  if (score >= 60) return "text-gold-700 bg-gold-50 border-gold/40";
  return "text-rust bg-rust-50 border-rust-200";
}
