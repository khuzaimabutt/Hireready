"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LogoMark } from "@/components/logo";

export default function GlobalError({
  error,
  reset,
}: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="paper-grain min-h-screen text-ink">
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
        <LogoMark className="h-10 w-10" />
        <div className="eyebrow mt-8">Error</div>
        <h1 className="mt-3 font-display text-4xl font-medium">Something went wrong</h1>
        <p className="mt-3 max-w-md text-ink-600">
          We hit an unexpected error. Try again, and if it keeps happening, share the reference below.
        </p>
        {error.digest && (
          <code className="mt-4 rounded-md border border-line bg-white px-2.5 py-1 text-xs text-ink-600">{error.digest}</code>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary">Try again</button>
          <Link href="/" className="btn-ghost">Back home</Link>
        </div>
      </main>
    </div>
  );
}
