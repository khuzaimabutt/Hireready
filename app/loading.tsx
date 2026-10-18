export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-line border-t-brand" />
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">Loading</div>
      </div>
    </div>
  );
}
